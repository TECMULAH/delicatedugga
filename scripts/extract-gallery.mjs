import fs from "fs";
import path from "path";

const pages = JSON.parse(
  fs.readFileSync(path.join(process.env.TEMP, "dd-pages.json"), "utf8")
);

function decode(s) {
  return s
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#038;/g, "&")
    .replace(/&#8211;/g, "–")
    .replace(/&#8217;/g, "'")
    .replace(/&hellip;/g, "…")
    .replace(/\s+/g, " ")
    .trim();
}

function bestSrc(imgTag) {
  const srcset = imgTag.match(/srcset="([^"]+)"/);
  const src = imgTag.match(/src="([^"]+)"/)?.[1];
  if (!srcset) return src;
  const candidates = srcset[1].split(",").map((part) => {
    const bits = part.trim().split(/\s+/);
    const url = bits[0];
    const w = parseInt(bits[1], 10) || 0;
    return { url, w };
  });
  const preferred =
    candidates.find((c) => c.w >= 700 && c.w <= 1024) ||
    candidates.sort((a, b) => b.w - a.w)[0];
  return preferred?.url || src;
}

function parsePage(slug) {
  const page = pages.find((p) => p.slug === slug);
  const html = page.content.rendered
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<script[\s\S]*?<\/script>/g, "");

  const tokenRe =
    /<h([34])[^>]*>([\s\S]*?)<\/h\1>|<dl class='gallery-item'>([\s\S]*?)<\/dl>/g;
  let section = "Featured";
  const items = [];
  let m;
  while ((m = tokenRe.exec(html))) {
    if (m[2]) {
      const heading = decode(m[2]);
      if (heading && !/select your/i.test(heading)) section = heading;
      continue;
    }
    const block = m[3];
    const img = block.match(/<img[^>]*>/)?.[0];
    if (!img) continue;
    const url = bestSrc(img);
    if (!url || url.includes("Screenshot")) continue;
    const caption = decode(
      block.match(/gallery-caption[^>]*>([\s\S]*?)<\/dd>/)?.[1] || ""
    );
    items.push({
      section,
      caption: caption || section,
      src: url,
    });
  }
  return items;
}

const dd = parsePage("delicate-dugga-designs").map((item) => ({
  ...item,
  collection: "delicate-dugga",
}));
const ros = parsePage("ros-byrn-designs").map((item) => ({
  ...item,
  collection: "ros-byrne",
}));

const all = [...dd, ...ros];
console.log("dd", dd.length, "ros", ros.length);
console.log("sections dd", [...new Set(dd.map((i) => i.section))].join(" | "));
console.log("sections ros", [...new Set(ros.map((i) => i.section))].join(" | "));

fs.writeFileSync(
  path.join(process.env.TEMP, "dd-gallery.json"),
  JSON.stringify(all, null, 2)
);
