/**
 * Downloads 911 Pool Care images from the legacy Wix site.
 * Run: node scripts/import-wix-images.mjs
 */

import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const PAGES = [
  { url: "https://www.911poolcare.com/", category: "hero" },
  { url: "https://www.911poolcare.com/about", category: "about" },
  {
    url: "https://www.911poolcare.com/services/pool-leak-detection",
    category: "leak",
  },
  {
    url: "https://www.911poolcare.com/services/pool-renovation",
    category: "renovations",
  },
  {
    url: "https://www.911poolcare.com/services/pool-inspections",
    category: "inspections",
  },
  {
    url: "https://www.911poolcare.com/services/pool-repair",
    category: "equipment",
  },
];

const ROOT = join(process.cwd(), "public", "images");
const MEDIA_RE = /2aca84_[a-f0-9]+~mv2\.(jpg|jpeg|png|webp|avif)/gi;

function toOriginalUrl(match) {
  return `https://static.wixstatic.com/media/${match[0]}`;
}

function extFromMatch(match) {
  const ext = match[0].split(".").pop().toLowerCase();
  return ext === "jpeg" ? "jpg" : ext;
}

async function fetchHtml(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; 911poolcare-import/1.0)" },
  });
  if (!response.ok) {
    console.warn(`Skip ${url} (${response.status})`);
    return "";
  }
  return response.text();
}

async function downloadImage(url, dest) {
  if (existsSync(dest)) {
    console.log(`Exists: ${dest}`);
    return true;
  }

  const response = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; 911poolcare-import/1.0)" },
  });
  if (!response.ok) {
    console.warn(`Failed ${url} (${response.status})`);
    return false;
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  writeFileSync(dest, buffer);
  console.log(`Saved: ${dest}`);
  return true;
}

async function main() {
  const found = new Map();

  for (const page of PAGES) {
    const html = await fetchHtml(page.url);
    const matches = [...html.matchAll(MEDIA_RE)];
    for (const match of matches) {
      const id = match[0];
      if (!found.has(id)) {
        found.set(id, { id, category: page.category, pages: [page.url] });
      } else {
        found.get(id).pages.push(page.url);
      }
    }
  }

  console.log(`Found ${found.size} unique Wix media assets`);

  const manifest = [];

  for (const [id, meta] of found) {
    const ext = extFromMatch([id]);
    const dir = join(ROOT, meta.category);
    mkdirSync(dir, { recursive: true });

    const filename = `${id.replace(/~mv2\./, ".")}`;
    const dest = join(dir, filename);
    const url = toOriginalUrl([id]);

    const ok = await downloadImage(url, dest);
    if (ok) {
      manifest.push({
        id,
        src: `/images/${meta.category}/${filename}`,
        category: meta.category,
        pages: meta.pages,
      });
    }
  }

  writeFileSync(
    join(process.cwd(), "content", "imported-images.json"),
    JSON.stringify(manifest, null, 2),
  );

  console.log(`Manifest: content/imported-images.json (${manifest.length} images)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
