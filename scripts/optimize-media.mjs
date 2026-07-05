/**
 * Optimizes site images for fast web delivery.
 *
 * Run: npm run optimize:media
 *
 * - Converts photographic PNGs to JPEG (jobs, hero carousel, field photos)
 * - Resizes hero carousel to 1280px wide (LCP target)
 * - Recompresses JPEGs in public/images/jobs/ (max 1920px)
 * - Updates content/*.ts and content/*.json path references after PNG→JPG conversion
 * - Creates public/images/og/default.jpg
 * - Re-encodes MP4s when ffmpeg is available
 */

import { spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, extname, join, relative } from "node:path";
import sharp from "sharp";

const ROOT = join(process.cwd(), "public", "images");
const JOBS_DIR = join(ROOT, "jobs");
const OG_DIR = join(ROOT, "og");
const OG_SOURCE = join(JOBS_DIR, "pool-renovations", "2024-06-24-p01.jpg");
const OG_OUTPUT = join(OG_DIR, "default.jpg");
const CONTENT_DIR = join(process.cwd(), "content");

const JOBS_MAX_WIDTH = 1920;
const HERO_MAX_WIDTH = 1280;
const JPEG_QUALITY = 80;
const HERO_JPEG_QUALITY = 78;

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const SKIP_DIR_NAMES = new Set(["credentials", "logos", "og"]);

function formatMb(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function formatKb(bytes) {
  return `${(bytes / 1024).toFixed(0)} KB`;
}

function toWebPath(filePath) {
  return filePath
    .replace(join(process.cwd(), "public"), "")
    .replace(/\\/g, "/");
}

function dirSize(dir) {
  let total = 0;
  for (const entry of walk(dir)) {
    total += statSync(entry).size;
  }
  return total;
}

function* walk(dir) {
  if (!existsSync(dir)) return;
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stats = statSync(path);
    if (stats.isDirectory()) yield* walk(path);
    else yield path;
  }
}

function shouldSkipPath(filePath) {
  const parts = filePath.split(/[/\\]/);
  return parts.some((part) => SKIP_DIR_NAMES.has(part));
}

function isHeroCarousel(filePath) {
  return basename(filePath).startsWith("carousel-");
}

function maxWidthFor(filePath) {
  if (isHeroCarousel(filePath)) return HERO_MAX_WIDTH;
  return JOBS_MAX_WIDTH;
}

function jpegQualityFor(filePath) {
  if (isHeroCarousel(filePath)) return HERO_JPEG_QUALITY;
  return JPEG_QUALITY;
}

async function convertPngToJpeg(filePath) {
  const jpgPath = filePath.replace(/\.png$/i, ".jpg");
  const before = statSync(filePath).size;
  const maxWidth = maxWidthFor(filePath);
  const quality = jpegQualityFor(filePath);

  await sharp(filePath, { failOn: "none" })
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .jpeg({ quality, mozjpeg: true })
    .toFile(jpgPath);

  unlinkSync(filePath);
  const after = statSync(jpgPath).size;

  return {
    from: filePath,
    to: jpgPath,
    before,
    after,
    saved: before - after,
  };
}

async function optimizeRaster(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (!IMAGE_EXT.has(ext) || ext === ".png") return { skipped: true };

  const before = statSync(filePath).size;
  const meta = await sharp(filePath, { failOn: "none" }).metadata();
  const maxWidth = maxWidthFor(filePath);
  const needsResize = (meta.width ?? 0) > maxWidth;

  let pipeline = sharp(filePath, { failOn: "none" }).rotate();
  if (needsResize) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  const tempPath = `${filePath}.opt.tmp`;
  const quality = jpegQualityFor(filePath);

  if (ext === ".webp") {
    await pipeline.webp({ quality }).toFile(tempPath);
  } else {
    await pipeline.jpeg({ quality, mozjpeg: true }).toFile(tempPath);
  }

  const after = statSync(tempPath).size;
  if (after < before * 0.98) {
    unlinkSync(filePath);
    renameSync(tempPath, filePath);
    return { before, after, saved: before - after };
  }

  unlinkSync(tempPath);
  return { skipped: true, before, after: before };
}

function collectPhotoPaths() {
  const paths = [];
  for (const filePath of walk(ROOT)) {
    if (shouldSkipPath(filePath)) continue;
    const ext = extname(filePath).toLowerCase();
    if (!IMAGE_EXT.has(ext)) continue;
    paths.push(filePath);
  }
  return paths;
}

function updateContentReferences(conversions) {
  if (conversions.length === 0) return 0;

  const replacements = conversions.flatMap(({ from, to }) => [
    { from: toWebPath(from), to: toWebPath(to) },
    { from: basename(from), to: basename(to) },
  ]);

  let filesUpdated = 0;

  for (const filePath of walk(CONTENT_DIR)) {
    if (!/\.(ts|json)$/i.test(filePath)) continue;

    let content = readFileSync(filePath, "utf8");
    let changed = false;

    for (const { from, to } of replacements) {
      if (content.includes(from)) {
        content = content.split(from).join(to);
        changed = true;
      }
    }

    if (changed) {
      writeFileSync(filePath, content, "utf8");
      filesUpdated += 1;
      console.log(`  updated ${relative(process.cwd(), filePath)}`);
    }
  }

  return filesUpdated;
}

async function optimizeVideo(filePath, ffmpegPath) {
  const before = statSync(filePath).size;
  if (before < 800_000) return { skipped: true, before, after: before };

  const tempPath = `${filePath}.opt.tmp.mp4`;
  const result = spawnSync(
    ffmpegPath,
    [
      "-y",
      "-i",
      filePath,
      "-c:v",
      "libx264",
      "-preset",
      "medium",
      "-crf",
      "28",
      "-movflags",
      "+faststart",
      "-c:a",
      "aac",
      "-b:a",
      "96k",
      "-vf",
      "scale='min(1280,iw)':-2",
      tempPath,
    ],
    { stdio: "pipe", encoding: "utf8" },
  );

  if (result.status !== 0 || !existsSync(tempPath)) {
    if (existsSync(tempPath)) unlinkSync(tempPath);
    return { skipped: true, before, after: before, error: true };
  }

  const after = statSync(tempPath).size;
  if (after < before) {
    unlinkSync(filePath);
    renameSync(tempPath, filePath);
    return { before, after, saved: before - after };
  }

  unlinkSync(tempPath);
  return { skipped: true, before, after: before };
}

async function buildOgImage() {
  const source = existsSync(OG_SOURCE)
    ? OG_SOURCE
    : join(JOBS_DIR, "pool-renovations", "2026-06-25-p01.jpg");

  if (!existsSync(source)) {
    console.warn("OG source missing — skipping OG image.");
    return;
  }

  mkdirSync(OG_DIR, { recursive: true });
  await sharp(source)
    .resize(1200, 630, { fit: "cover", position: "centre" })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(OG_OUTPUT);

  console.log(`Created OG image → ${relative(process.cwd(), OG_OUTPUT)}`);
}

async function main() {
  if (!existsSync(JOBS_DIR)) {
    console.error("No jobs media found. Run npm run import:media first.");
    process.exit(1);
  }

  const beforeTotal = dirSize(ROOT);
  console.log(`Optimizing ${relative(process.cwd(), ROOT)} (${formatMb(beforeTotal)})…\n`);

  const photoPaths = collectPhotoPaths();
  const conversions = [];
  let pngConverted = 0;
  let pngBytesSaved = 0;

  console.log("Converting photographic PNGs to JPEG…");
  for (const filePath of photoPaths) {
    if (extname(filePath).toLowerCase() !== ".png") continue;
    const result = await convertPngToJpeg(filePath);
    conversions.push(result);
    pngConverted += 1;
    pngBytesSaved += result.saved;
    console.log(
      `  ${basename(result.from)} → ${basename(result.to)}  ${formatKb(result.before)} → ${formatKb(result.after)}`,
    );
  }

  if (pngConverted === 0) {
    console.log("  (no PNGs to convert)");
  }

  console.log("\nCompressing JPEG/WebP images…");
  let imagesOptimized = 0;
  let imageBytesSaved = 0;

  for (const filePath of collectPhotoPaths()) {
    const ext = extname(filePath).toLowerCase();
    if (!IMAGE_EXT.has(ext) || ext === ".png") continue;
    const result = await optimizeRaster(filePath);
    if (result.saved) {
      imagesOptimized += 1;
      imageBytesSaved += result.saved;
      console.log(
        `  ${relative(process.cwd(), filePath)}  ${formatKb(result.before)} → ${formatKb(result.after)}`,
      );
    }
  }

  if (conversions.length > 0) {
    console.log("\nUpdating content references…");
    const filesUpdated = updateContentReferences(conversions);
    console.log(`  ${filesUpdated} content file(s) updated`);
  }

  await buildOgImage();

  let ffmpegPath = null;
  try {
    const ffmpegInstaller = await import("@ffmpeg-installer/ffmpeg");
    ffmpegPath = ffmpegInstaller.default?.path ?? ffmpegInstaller.path;
  } catch {
    ffmpegPath = null;
  }

  let videosOptimized = 0;
  let videoBytesSaved = 0;

  if (ffmpegPath && existsSync(ffmpegPath)) {
    console.log("\nRe-encoding videos with ffmpeg…");
    for (const filePath of walk(JOBS_DIR)) {
      if (extname(filePath).toLowerCase() !== ".mp4") continue;
      const result = await optimizeVideo(filePath, ffmpegPath);
      if (result.saved) {
        videosOptimized += 1;
        videoBytesSaved += result.saved;
        console.log(
          `  ${relative(process.cwd(), filePath)}  ${formatMb(result.before)} → ${formatMb(result.after)}`,
        );
      }
    }
  } else {
    console.log("\nSkipping video re-encode (ffmpeg not installed).");
  }

  const afterTotal = dirSize(ROOT);
  console.log(
    `\nDone.` +
      ` PNG→JPEG: ${pngConverted} (saved ${formatMb(pngBytesSaved)}).` +
      ` Recompressed: ${imagesOptimized} (saved ${formatMb(imageBytesSaved)}).` +
      ` Videos: ${videosOptimized} (saved ${formatMb(videoBytesSaved)}).` +
      `\nTotal images folder: ${formatMb(beforeTotal)} → ${formatMb(afterTotal)}.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
