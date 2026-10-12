/**
 * Lists every place on the site that can show a real photo, the file name it
 * looks for, and whether that file exists yet: npm run images:list
 * Also writes ../docs/image-checklist.md (relative to the web/ folder).
 *
 * Photos are shared by both languages: one file serves English and Japanese.
 */
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { getContent } from "../src/content";
import { findGallery, findPhoto, photoKey } from "../src/lib/images";

const en = getContent("en");
type Slot = { key: string; where: string };
const groups: { title: string; note?: string; slots: Slot[] }[] = [
  {
    title: "Logo",
    note: "SVG preferred (or a PNG at least 400 px wide, transparent background). Replaces the placeholder mark in the header and footer.",
    slots: [{ key: photoKey.logo, where: "Header and footer" }],
  },
  {
    title: "Page headers",
    note: "Wide landscape photos behind each page title. Text sits on top, so calm skies or darker lower halves work best.",
    slots: [
      ["home", "Home page (full-screen)"],
      ["destinations", "Destinations overview"],
      ["adventures", "Adventures overview"],
      ["nepal", "Nepal guide"],
      ["travel-essentials", "Travel essentials"],
      ["stays", "Hotels & resorts"],
      ["services", "Services"],
      ["about", "About us"],
      ["contact", "Contact"],
      ["not-found", "404 page"],
      ["trips", "Find a trip"],
      ["guides", "Travel guides"],
      ["category-tours", "Home page \"Tours\" category card (the other category cards use the adventure photos)"],
    ].map(([k, where]) => ({ key: photoKey.page(k), where })),
  },
  {
    title: "Destinations",
    note: "Used on the destination cards (home, destinations, Nepal guide, menus) and as the destination page header.",
    slots: en.destinations.map((d) => ({ key: photoKey.destination(d.slug), where: d.name })),
  },
  {
    title: "Sights within each destination (optional)",
    note: "When present, the photo appears at the top of that sight's card on the destination page.",
    slots: en.destinations.flatMap((d) => d.attractions.map((a) => ({ key: photoKey.attraction(d.slug, a.name), where: `${d.name} → ${a.name}` }))),
  },
  {
    title: "Adventures",
    note: "Adventure cards and the adventure page header.",
    slots: en.adventures.map((a) => ({ key: photoKey.adventure(a.slug), where: a.name })),
  },
  {
    title: "Rafting rivers (optional)",
    note: "Shown at the top of each river card on the rafting page.",
    slots: en.raftingRivers.map((r) => ({ key: photoKey.river(r.slug), where: r.name })),
  },
  {
    title: "Hotels (optional)",
    note: "Shown on the hotel card; for hotels with a fact sheet it is also the page header.",
    slots: en.hotels.map((h) => ({ key: photoKey.hotel(h.slug), where: `${h.name} (${h.city})` })),
  },
  {
    title: "Leadership portraits",
    note: "Square photos, at least 400 × 400 px, face centred. Replace the initials circles on the About page.",
    slots: en.company.leaders.map((l) => ({ key: photoKey.team(l.id), where: `${l.name}, ${l.role}` })),
  },
];

const out: string[] = [];
let total = 0;
let found = 0;
out.push("# Image checklist", "");
out.push("Every place on the site that can show a real photo. Save a file with the name in the **File** column inside `web/public/images/`; any of `.jpg`, `.jpeg`, `.png`, `.webp` or `.avif` works (and `.svg` for the logo). How-to: [09-adding-images.md](09-adding-images.md).", "");
out.push("Regenerate this list with `npm run images:list` (run inside the `web` folder).", "");
for (const g of groups) {
  out.push(`## ${g.title}`, "");
  if (g.note) out.push(g.note, "");
  out.push("| Shows on | File (in `web/public/images/`) | Status |", "|---|---|---|");
  for (const s of g.slots) {
    total += 1;
    const photo = findPhoto(s.key);
    if (photo) found += 1;
    out.push(`| ${s.where} | \`${s.key}.jpg\` | ${photo ? `✅ ${photo.replace("/images/", "")}` : "— placeholder art"} |`);
  }
  out.push("");
}
// Galleries are folders, not single files: any number of photos, in file-name order.
const galleries = [
  ...en.destinations.map((d) => ({ key: photoKey.gallery("destinations", d.slug), where: `${d.name} page, Gallery section` })),
  ...en.raftingRivers.map((r) => ({ key: photoKey.gallery("rivers", r.slug), where: `${r.name} trip page, Gallery section` })),
];
out.push("## Photo galleries (optional, any number of photos)", "");
out.push(
  "Put extra photos in these folders to add them to the gallery slider on that page. They show in file-name order, and the file name becomes the caption: `01-phewa-lake-at-dawn.jpg` shows as \"Phewa lake at dawn\". Destination galleries also show the sight photos above; river galleries also show the river photo.",
  "",
);
out.push("| Shows on | Folder (in `web/public/images/`) | Photos |", "|---|---|---|");
for (const g of galleries) out.push(`| ${g.where} | \`gallery/${g.key}/\` | ${findGallery(g.key).length || "—"} |`);
out.push("");

out.splice(2, 0, `**${found} of ${total} slots have a photo.**`, "");

const target = resolve(process.cwd(), "../docs/image-checklist.md");
writeFileSync(target, out.join("\n"));
console.log(`${found} of ${total} image slots have a photo. Full list written to ${target}`);
for (const g of groups) {
  const missing = g.slots.filter((s) => !findPhoto(s.key)).length;
  console.log(`  ${g.title.padEnd(44)} ${g.slots.length - missing}/${g.slots.length}`);
}
