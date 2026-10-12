# 09 · Adding real photos

The site shows generated mountain artwork wherever a photo is missing. To replace it you only **save a photo with the right file name** in `web/public/images/`. You don't need to edit any code, and one photo serves both the English and Japanese pages.

## Step by step

1. **Find the file name.** Open [image-checklist.md](image-checklist.md). It lists all 99 photo spots, plus the gallery folders, on the site, where each one appears, and the file name it expects, for example `destinations/pokhara.jpg`.
2. **Prepare the photo** (see the sizes below). Rename it to the file name from the checklist, using lower-case letters and hyphens exactly as shown.
3. **Save it** in `web/public/images/`, creating any sub-folder the name includes. For example, `destinations/pokhara.jpg` goes in `web/public/images/destinations/pokhara.jpg`.
4. **Look at it:**
   - If `npm run dev` is running, refresh the browser and the photo appears.
   - For the live site, run `npm run build` again and redeploy, because production pages are built once.
5. **Tick it off** by running `npm run images:list` in the `web` folder. It prints how many spots now have photos and refreshes `docs/image-checklist.md`.

You can save the photo as `.jpg`, `.jpeg`, `.png`, `.webp` or `.avif` (the logo can also be `.svg`). If two files have the same name with different extensions, the site uses `.jpg` first.

## What goes where

| Folder in `web/public/images/` | Shows on | Recommended photo |
|---|---|---|
| `pages/` (`home`, `destinations`, `adventures`, `nepal`, `travel-essentials`, `stays`, `services`, `about`, `contact`, `not-found`) | The big header behind each page title | Landscape, at least **2400 × 1500 px**. White text sits on the lower-left, so pick photos with calm or darker areas there. |
| `destinations/<name>` | Destination cards (home page, Destinations, Nepal guide) and the top of each destination page | Landscape, at least 2400 × 1500 px. The card crops the centre, so keep the subject in the middle. |
| `attractions/<destination>/<sight>` | The top of each sight's card on a destination page, e.g. `attractions/kathmandu-valley/boudhanath-stupa.jpg` | Landscape 3:2, at least 1200 × 800 px. Optional: cards without a photo stay text-only. |
| `adventures/<name>` | Adventure cards and the top of each adventure page | Landscape, at least 2400 × 1500 px. |
| `rivers/<name>` | The top of each river card on the rafting page, and the header of that river's trip page | Landscape 3:2, at least 1200 × 800 px. Optional. |
| `hotels/<name>` | Hotel cards on the Stays page; for Soaltee Crowne Plaza, also the page header | Landscape 3:2, at least 1200 × 800 px (2400 × 1500 for Soaltee). Optional. Use photos the hotel allows partners to use. |
| `pages/experiences`, `pages/guides` | Headers of Experiences and Travel guides | Same as other page headers. |
| `pages/category-tours` | The "Tours" category card on the home page (the other category cards reuse the adventure photos) | Landscape or square, at least 1200 × 1200 px; text sits on the lower half. |
| `gallery/destinations/<name>/`, `gallery/rivers/<name>/` (folders) | The photo gallery slider on that destination or river trip page | Any number of landscape 4:3 photos, at least 1600 × 1200 px. Name them `01-…`, `02-…` to set the order; the rest of the file name becomes the caption, e.g. `01-phewa-lake-at-dawn.jpg` → "Phewa lake at dawn". Optional. |
| `team/ceo`, `team/executive-director` | Leadership portraits on the About page | Square, at least 400 × 400 px, face centred. |
| `logo` | Header and footer, replacing the placeholder mark | SVG preferred, or a PNG at least 400 px wide with a transparent background. |

## Photo tips

- **File size:** keep each file under about 1 MB (JPEG quality 80 or WebP is ideal). The site automatically creates smaller versions for phones and modern formats, but a smaller original keeps the project light.
- **Rights:** only use photos the agency owns or has permission to use. The old site's images are about 200 px wide, which is too small to reuse.
- **Description (alt text):** each spot already has a description for screen readers and Google in both languages (for example "Phewa Lake at dawn"). If your photo shows something different, update the `alt` text in the content files: `web/src/content/en/…` for English and `web/src/content/ja/…` for Japanese. Page-header descriptions are in `web/src/i18n/ui.ts` under `heroImage`.

## Using a photo hosted elsewhere (optional)

To use an image from another website or a CMS instead of a file, set `src` on the item's `image` in the content files (e.g. `image: { src: "https://…/pokhara.jpg", alt: "…", tone: "lake" }`) and allow that domain under `images.remotePatterns` in `web/next.config.ts`. Local files are simpler and are recommended.

## How it works (for developers)

`src/lib/images.ts` defines a photo key for every slot (`photoKey.destination("pokhara")` → `destinations/pokhara`) and `findPhoto(key)` checks `public/images/` for a matching file. `Artwork` renders the photo through `next/image` when one exists and the SVG placeholder otherwise. `scripts/list-images.ts` (`npm run images:list`) walks the same keys to build the checklist. Sight photos use the English sight name, so the file name is the same for both languages.
