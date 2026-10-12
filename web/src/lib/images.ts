/**
 * Real photos, found by file name. Drop a photo into web/public/images/ with the
 * right name and it replaces the placeholder art automatically; no code changes.
 *
 *   public/images/destinations/pokhara.jpg   → Pokhara card and page header
 *   public/images/pages/home.jpg             → home page header
 *
 * Every slot and its file name is listed in docs/image-checklist.md
 * (regenerate with `npm run images:list`). Server-only: uses the file system.
 */
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

export const photoExtensions = ["jpg", "jpeg", "png", "webp", "avif", "svg"] as const;
const imagesDir = join(process.cwd(), "public", "images");

/** Returns the public URL of the photo for `key` (e.g. "destinations/pokhara"), if one exists. */
export function findPhoto(key: string | undefined): string | undefined {
  if (!key) return undefined;
  for (const ext of photoExtensions) {
    if (existsSync(join(imagesDir, `${key}.${ext}`))) return `/images/${key}.${ext}`;
  }
  return undefined;
}

/**
 * Extra photos for a gallery slider: every image in public/images/gallery/<key>/,
 * sorted by file name (so 01-…, 02-… controls the order). The file name, minus
 * numbers and dashes, becomes the caption: "02-phewa-lake-at-dawn.jpg" → "Phewa lake at dawn".
 */
export function findGallery(key: string): { src: string; caption: string }[] {
  const dir = join(imagesDir, "gallery", key);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => photoExtensions.some((ext) => f.toLowerCase().endsWith(`.${ext}`)))
    .sort()
    .map((f) => {
      const words = f.replace(/\.[^.]+$/, "").replace(/^\d+[-_ ]*/, "").replace(/[-_]+/g, " ").trim();
      return { src: `/images/gallery/${key}/${f}`, caption: words ? words[0].toUpperCase() + words.slice(1) : "" };
    });
}

/** Turns a name into a file-name-safe key: "Durbar Square (Kathmandu)" → "durbar-square-kathmandu". */
export const slugify = (s: string) =>
  s
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Photo keys, in one place so pages and the checklist script agree. */
export const photoKey = {
  page: (name: string) => `pages/${name}`,
  destination: (slug: string) => `destinations/${slug}`,
  attraction: (destinationSlug: string, englishName: string) => `attractions/${destinationSlug}/${slugify(englishName)}`,
  adventure: (slug: string) => `adventures/${slug}`,
  river: (slug: string) => `rivers/${slug}`,
  hotel: (slug: string) => `hotels/${slug}`,
  team: (id: string) => `team/${id}`,
  logo: "logo",
  /** Folder for gallery photos, e.g. gallery/destinations/pokhara/01-phewa-lake.jpg */
  gallery: (kind: "destinations" | "adventures" | "rivers", slug: string) => `${kind}/${slug}`,
};
