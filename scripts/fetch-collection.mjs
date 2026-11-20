import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("public/images/collection");
const headers = {
  "User-Agent": "SearchlessLibrary/1.0 (educational prototype; local)",
  Accept: "application/json",
};

const categories = [
  "Category:Paintings_by_Vincent_van_Gogh",
  "Category:Paintings_by_Claude_Monet",
  "Category:Paintings_by_Paul_Cézanne",
  "Category:Paintings_by_Johannes_Vermeer",
  "Category:Paintings_by_Rembrandt",
  "Category:Paintings_by_Mary_Cassatt",
  "Category:Paintings_by_Camille_Pissarro",
  "Category:Paintings_by_Berthe_Morisot",
  "Category:Paintings_by_Edgar_Degas",
  "Category:Paintings_by_Paul_Gauguin",
  "Category:Paintings_by_Pierre-Auguste_Renoir",
  "Category:Paintings_by_Katsushika_Hokusai",
];

function allowedLicense(name) {
  const text = (name || "").toLowerCase();
  if (!text) return false;
  if (/non-commercial|\bnc\b|no derivatives|\bnd\b|all rights reserved|copyrighted/.test(text)) return false;
  return /public domain|cc0|cc by|no restrictions|pd-/.test(text);
}

function clean(value) {
  return String(value || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

async function listCategory(title) {
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  url.searchParams.set("action", "query");
  url.searchParams.set("generator", "categorymembers");
  url.searchParams.set("gcmtitle", title);
  url.searchParams.set("gcmtype", "file");
  url.searchParams.set("gcmlimit", "16");
  url.searchParams.set("prop", "imageinfo");
  url.searchParams.set("iiprop", "url|mime|size|extmetadata");
  url.searchParams.set("iiurlwidth", "480");
  url.searchParams.set("format", "json");
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`${title} ${response.status}`);
  const data = await response.json();
  return Object.values(data.query?.pages || {});
}

function overlaps(a, b, gap) {
  return !(a.x + a.w + gap <= b.x || b.x + b.w + gap <= a.x || a.y + a.h + gap <= b.y || b.y + b.h + gap <= a.y);
}

function place(items) {
  const cols = 16;
  const rows = 9;
  const cellW = 168;
  const cellH = 148;
  const originX = -((cols * cellW) / 2);
  const originY = -((rows * cellH) / 2);
  const blocked = [
    { x: originX + cellW * 3.1, y: originY + cellH * 2.2, w: 280, h: 160 },
    { x: originX + cellW * 10.4, y: originY + cellH * 1.3, w: 260, h: 170 },
    { x: originX + cellW * 11.2, y: originY + cellH * 4.5, w: 250, h: 180 },
    { x: originX + cellW * 6.6, y: originY + cellH * 6.4, w: 220, h: 140 },
    { x: originX + cellW * 1.4, y: originY + cellH * 6.6, w: 240, h: 130 },
  ];
  const spots = [];
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const jitterX = ((row * 17 + col * 11) % 29) - 14;
      const jitterY = ((row * 13 + col * 7) % 25) - 12;
      const x = originX + col * cellW + jitterX;
      const y = originY + row * cellH + jitterY;
      if (blocked.some((zone) => overlaps({ x, y, w: 96, h: 84 }, zone, 8))) continue;
      spots.push({ x, y, col, row });
    }
  }
  return items.slice(0, spots.length).map((item, index) => {
    const spot = spots[index];
    const aspect = item.tw / item.th;
    const area = 78 + ((index * 37) % 5) * 16;
    let w = Math.round(Math.sqrt(area * area * aspect));
    let h = Math.round(w / aspect);
    w = Math.max(68, Math.min(w, 168));
    h = Math.max(62, Math.min(h, 176));
    return {
      ...item,
      x: spot.x,
      y: spot.y,
      w,
      h,
    };
  });
}

const seen = new Set();
const candidates = [];
for (const category of categories) {
  try {
    const pages = await listCategory(category);
    for (const page of pages) {
      const info = page.imageinfo?.[0];
      if (!info?.thumburl || !/^image\/(jpeg|png)$/.test(info.mime || "")) continue;
      const meta = info.extmetadata || {};
      const license = clean(meta.LicenseShortName?.value);
      if (!allowedLicense(license)) continue;
      const title = page.title.replace(/^File:/, "");
      if (seen.has(title) || /svg|tiff|djvu/i.test(title)) continue;
      if ((info.thumbwidth || 0) < 240 || (info.thumbheight || 0) < 180) continue;
      seen.add(title);
      candidates.push({
        title: clean(meta.ObjectName?.value) || title.replace(/\.[a-z0-9]+$/i, "").replace(/_/g, " "),
        artist: clean(meta.Artist?.value) || category.replace("Category:Paintings_by_", "").replace(/_/g, " "),
        license,
        credit: clean(meta.Credit?.value),
        thumburl: info.thumburl,
        tw: info.thumbwidth,
        th: info.thumbheight,
        page: `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title).replace(/%3A/g, ":").replace(/%2F/g, "/")}`,
      });
    }
    console.log(category, candidates.length);
  } catch (error) {
    console.log("skip", category, error.message);
  }
  await new Promise((resolve) => setTimeout(resolve, 250));
}

await mkdir(root, { recursive: true });
await mkdir(path.resolve("src/collection"), { recursive: true });
const saved = [];
for (const item of candidates.slice(0, 96)) {
  const id = String(saved.length + 1).padStart(3, "0");
  try {
    const response = await fetch(item.thumburl, { headers });
    if (!response.ok) throw new Error(String(response.status));
    const bytes = Buffer.from(await response.arrayBuffer());
    const jpeg = bytes[0] === 0xff && bytes[1] === 0xd8;
    const png = bytes[0] === 0x89 && bytes[1] === 0x50;
    if (!jpeg && !png) throw new Error("not an image");
    const ext = jpeg ? "jpg" : "png";
    const file = `c${id}.${ext}`;
    await writeFile(path.join(root, file), bytes);
    saved.push({ ...item, id: `c${id}`, src: `/images/collection/${file}` });
    process.stdout.write(".");
  } catch (error) {
    process.stdout.write("x");
  }
  await new Promise((resolve) => setTimeout(resolve, 120));
}

const placed = place(saved);
const pictures = placed.map(({ thumburl, tw, th, credit, ...item }) => item);
const labels = [
  { id: "quiet", lines: ["Quiet", "rooms"], x: -980, y: -280 },
  { id: "colour", lines: ["Colour", "and light"], x: 520, y: -430 },
  { id: "told", lines: ["Told", "slowly"], x: 680, y: 80 },
  { id: "paper", lines: ["Paper", "and paint"], x: 40, y: 430 },
  { id: "faces", lines: ["Small", "faces"], x: -860, y: 390 },
];

const output = `export const pictures = ${JSON.stringify(pictures, null, 2)};\n\nexport const labels = ${JSON.stringify(labels, null, 2)};\n`;
await writeFile(path.resolve("src/collection/pictures.js"), output);
await writeFile(
  path.join(root, "CREDITS.md"),
  pictures
    .map((item) => `- ${item.src} — ${item.title}. ${item.artist}. ${item.license}. ${item.page}`)
    .join("\n") + "\n"
);
console.log(`\nsaved ${pictures.length}`);
