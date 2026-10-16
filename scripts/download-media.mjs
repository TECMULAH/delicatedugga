import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import { Readable } from "stream";

const root = path.resolve(".");
const imageDir = path.join(root, "public", "images");
const dataDir = path.join(root, "src", "data");
fs.mkdirSync(imageDir, { recursive: true });
fs.mkdirSync(dataDir, { recursive: true });

const gallery = JSON.parse(
  fs.readFileSync(path.join(process.env.TEMP, "dd-gallery.json"), "utf8")
);

const extras = [
  ["logo", "https://delicatedugga.com/wp-content/uploads/2018/09/Logo-1-1.png"],
  ["favicon", "https://delicatedugga.com/wp-content/uploads/2018/09/fav.png"],
  ["hero-1", "https://delicatedugga.com/wp-content/uploads/2019/02/hf-1024x1024.png"],
  ["hero-2", "https://delicatedugga.com/wp-content/uploads/2019/02/hg-1024x1024.png"],
  ["hero-3", "https://delicatedugga.com/wp-content/uploads/2019/02/hjd-1024x1024.png"],
  ["hero-4", "https://delicatedugga.com/wp-content/uploads/2019/02/hjj-1024x1024.png"],
  ["hero-5", "https://delicatedugga.com/wp-content/uploads/2019/02/hkh.-1024x1024.png"],
  ["hero-6", "https://delicatedugga.com/wp-content/uploads/2019/02/j-1-1024x1024.png"],
  ["hero-7", "https://delicatedugga.com/wp-content/uploads/2019/02/jg-1024x1024.png"],
  ["hero-8", "https://delicatedugga.com/wp-content/uploads/2019/02/k-1-1024x1024.png"],
  ["hero-9", "https://delicatedugga.com/wp-content/uploads/2019/02/u-1024x1024.png"],
  ["about-1", "https://delicatedugga.com/wp-content/uploads/2018/09/Delicate-DuggaLR-12.jpg"],
  ["about-2", "https://delicatedugga.com/wp-content/uploads/2019/02/About-Us-1.jpg"],
  ["about-3", "https://delicatedugga.com/wp-content/uploads/2019/02/About-us-2-a.jpg"],
  ["about-4", "https://delicatedugga.com/wp-content/uploads/2019/02/About-us-3.jpg"],
  ["team-group", "https://delicatedugga.com/wp-content/uploads/2025/08/Team-photo_2.jpg"],
  ["team-sascha", "https://delicatedugga.com/wp-content/uploads/2019/02/y-1024x1024.png"],
  ["team-motion", "https://delicatedugga.com/wp-content/uploads/2019/02/j-1024x1024.png"],
  ["team-pedzi", "https://delicatedugga.com/wp-content/uploads/2019/02/n-1024x1024.png"],
  ["team-patrick", "https://delicatedugga.com/wp-content/uploads/2019/02/k-1024x1024.png"],
  ["team-linnet", "https://delicatedugga.com/wp-content/uploads/2025/08/li2-1024x1024.png"],
  ["team-nyararai", "https://delicatedugga.com/wp-content/uploads/2025/08/nya-1024x1024.png"],
  ["shop-harare", "https://delicatedugga.com/wp-content/uploads/2019/02/Delicate-Dugga-Shop-3.jpg"],
  ["shop-falls", "https://delicatedugga.com/wp-content/uploads/2019/02/48368847_2382880435272883_2152842719213387776_o.jpg"],
  ["shop-denmark", "https://delicatedugga.com/wp-content/uploads/2019/02/African-Touch-shop.jpg"],
  ["shop-contact", "https://delicatedugga.com/wp-content/uploads/2019/02/44948673_2093916244003549_2232541236164558848_o.jpg"],
  ["paint-1", "https://delicatedugga.com/wp-content/uploads/2025/08/323.jpeg"],
  ["paint-2", "https://delicatedugga.com/wp-content/uploads/2025/08/324.jpeg"],
  ["catalog-1", "https://delicatedugga.com/wp-content/uploads/2019/02/dd-page-1-1024x1024.png"],
  ["catalog-2", "https://delicatedugga.com/wp-content/uploads/2019/02/dd-page-2-1024x1024.png"],
  ["trinkets", "https://delicatedugga.com/wp-content/uploads/2019/02/PNRkbQMQ.jpg"],
];

function fileNameFromUrl(url, key) {
  const base = decodeURIComponent(url.split("/").pop()).split("?")[0];
  const ext = path.extname(base) || ".jpg";
  const safe = `${key}${ext.toLowerCase()}`;
  return safe;
}

const jobs = extras.map(([key, url]) => ({
  key,
  url,
  file: fileNameFromUrl(url, key),
}));

const seen = new Set(jobs.map((j) => j.url));
gallery.forEach((item, index) => {
  if (seen.has(item.src)) return;
  seen.add(item.src);
  const key = `piece-${String(index + 1).padStart(3, "0")}`;
  jobs.push({ key, url: item.src, file: fileNameFromUrl(item.src, key) });
});

async function download(job) {
  const dest = path.join(imageDir, job.file);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
    return;
  }
  const res = await fetch(job.url, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!res.ok) throw new Error(`${res.status} ${job.url}`);
  await pipeline(Readable.fromWeb(res.body), fs.createWriteStream(dest));
}

const queue = [...jobs];
const errors = [];
async function worker() {
  while (queue.length) {
    const job = queue.shift();
    try {
      await download(job);
      process.stdout.write(".");
    } catch (err) {
      errors.push(`${job.key}: ${err.message}`);
      process.stdout.write("x");
    }
  }
}

await Promise.all(Array.from({ length: 8 }, worker));
console.log(`\nDownloaded ${jobs.length - errors.length}/${jobs.length}`);
if (errors.length) console.log(errors.join("\n"));

const byUrl = Object.fromEntries(jobs.map((j) => [j.url, `/images/${j.file}`]));
const localGallery = gallery.map((item) => ({
  collection: item.collection,
  section: item.section === "Featured" ? "Designs" : item.section,
  caption: item.caption
    .replace("Sebra Hide", "Zebra Hide")
    .replace("Suacer", "Saucer")
    .replace("Demmi", "Demi")
    .replace("Includes,: Angle", "Includes: Angel")
    .replace("2000l", "2000ml"),
  src: byUrl[item.src],
}));

localGallery.push({
  collection: "delicate-dugga",
  section: "Modelled animal trinket boxes",
  caption: "A variety of modelled animal trinket boxes",
  src: byUrl["https://delicatedugga.com/wp-content/uploads/2019/02/PNRkbQMQ.jpg"],
});

const media = Object.fromEntries(
  extras.map(([key, url]) => [key, byUrl[url]])
);

fs.writeFileSync(
  path.join(dataDir, "gallery.json"),
  JSON.stringify(localGallery, null, 2)
);
fs.writeFileSync(path.join(dataDir, "media.json"), JSON.stringify(media, null, 2));
console.log("Wrote gallery and media data");
