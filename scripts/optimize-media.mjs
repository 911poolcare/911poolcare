/**
 * Optimizes job photos for web delivery and builds the OG share image.
 *
 * Run: npm run optimize:media
 *
 * - Resizes photos wider than 1920px
 * - Recompresses JPEG/PNG in public/images/jobs/
 * - Creates public/images/og/default.jpg (1200×630) for social previews
 * - Re-encodes MP4s when ffmpeg is available (via @ffmpeg-installer/ffmpeg)
 */

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, renameSync, statSync, unlinkSync } from "node:fs";
import { basename, dirname, extname, join, relative } from "node:path";
import sharp from "sharp";

const ROOT = join(process.cwd(), "public", "images");
const JOBS_DIR = join(ROOT, "jobs");
const OG_DIR = join(ROOT, "og");
const OG_SOURCE = join(JOBS_DIR, "pool-renovations", "2024-06-24-p01.jpg");
const OG_OUTPUT = join(OG_DIR, "default.jpg");

const MAX_WIDTH = 1920;
const JPEG_QUALITY = 82;
const PNG_QUALITY = 80;

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function formatMb(bytes) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
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

async function optimizeImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (!IMAGE_EXT.has(ext)) return { skipped: true };

  const before = statSync(filePath).size;
  const image = sharp(filePath, { failOn: "none" });
  const meta = await image.metadata();
  const needsResize = (meta.width ?? 0) > MAX_WIDTH;

  let pipeline = sharp(filePath, { failOn: "none" });
  if (needsResize) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  const tempPath = `${filePath}.opt.tmp`;

  if (ext === ".png") {
    await pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 }).toFile(tempPath);
  } else if (ext === ".webp") {
    await pipeline.webp({ quality: JPEG_QUALITY }).toFile(tempPath);
  } else {
    await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(tempPath);
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
  if (!existsSync(OG_SOURCE)) {
    console.warn(`OG source missing: ${OG_SOURCE}`);
    return;
  }

  mkdirSync(OG_DIR, { recursive: true });
  await sharp(OG_SOURCE)
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

  const beforeTotal = dirSize(JOBS_DIR);
  console.log(`Optimizing images in ${relative(process.cwd(), JOBS_DIR)} (${formatMb(beforeTotal)})…`);

  let imagesOptimized = 0;
  let imageBytesSaved = 0;

  for (const filePath of walk(JOBS_DIR)) {
    const ext = extname(filePath).toLowerCase();
    if (!IMAGE_EXT.has(ext)) continue;
    const result = await optimizeImage(filePath);
    if (result.saved) {
      imagesOptimized += 1;
      imageBytesSaved += result.saved;
      console.log(
        `  ${relative(process.cwd(), filePath)}  ${formatMb(result.before)} → ${formatMb(result.after)}`,
      );
    }
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
    console.log("\nSkipping video re-encode (ffmpeg not installed). Thumbnails use poster images only.");
  }

  const afterTotal = dirSize(JOBS_DIR);
  console.log(
    `\nDone. Images optimized: ${imagesOptimized} (saved ${formatMb(imageBytesSaved)}).` +
      ` Videos optimized: ${videosOptimized} (saved ${formatMb(videoBytesSaved)}).` +
      ` Jobs folder: ${formatMb(beforeTotal)} → ${formatMb(afterTotal)}.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
