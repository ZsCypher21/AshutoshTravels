import Image from "next/image";
import type { ImageSpec } from "@/lib/types";
import { findPhoto } from "@/lib/images";

/** Sky, sun and three ridge colours (far → near) for each placeholder tone. */
const palettes: Record<ImageSpec["tone"], { sky: [string, string]; sun: string; ridges: [string, string, string] }> = {
  dawn: { sky: ["#f6c58f", "#c2344b"], sun: "#fde7c4", ridges: ["#8a4a63", "#4e3358", "#1e2542"] },
  glacier: { sky: ["#dfe8f5", "#8fa6cc"], sun: "#ffffff", ridges: ["#b8c6e0", "#6d7fa8", "#2b3460"] },
  forest: { sky: ["#e8eccf", "#7fa58a"], sun: "#fbf6dc", ridges: ["#5f8a72", "#2f6b54", "#1f4537"] },
  lake: { sky: ["#cfe6ea", "#5f8fb0"], sun: "#f6fbfc", ridges: ["#7ea2bd", "#3f6788", "#1e3550"] },
  temple: { sky: ["#f3d7b0", "#b8671b"], sun: "#fff3df", ridges: ["#a35e3a", "#6e3a2e", "#33202a"] },
  dusk: { sky: ["#f0b878", "#4e5a8f"], sun: "#ffe6c2", ridges: ["#6b5a8a", "#3a3a68", "#141a2e"] },
};

/**
 * Renders a real photo when one exists, otherwise generated mountain art.
 * The photo comes from `image.src`, or from public/images/<photo>.jpg|png|webp
 * (see src/lib/images.ts). The PDF's images are too small (≈200 px) to reuse.
 */
export function Artwork({
  image,
  photo,
  className = "",
  priority = false,
  sizes = "100vw",
  placeholderLabel = "illustration placeholder",
}: {
  image: ImageSpec;
  /** Photo key, e.g. "destinations/pokhara" → public/images/destinations/pokhara.jpg */
  photo?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  placeholderLabel?: string;
}) {
  const pos = /\babsolute\b/.test(className) ? "" : "relative";
  const src = image.src ?? findPhoto(photo);
  if (src) {
    return (
      <div className={`${pos} overflow-hidden ${className}`}>
        <Image src={src} alt={image.alt} fill priority={priority} sizes={sizes} unoptimized={src.endsWith(".svg")} className="object-cover" />
      </div>
    );
  }
  const p = palettes[image.tone];
  const id = `art-${image.tone}`;
  return (
    <div className={`${pos} overflow-hidden ${className}`} role="img" aria-label={`${image.alt} (${placeholderLabel})`}>
      <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full">
        <defs>
          <linearGradient id={`${id}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={p.sky[0]} />
            <stop offset="1" stopColor={p.sky[1]} />
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill={`url(#${id}-sky)`} />
        <circle cx="560" cy="170" r="64" fill={p.sun} opacity="0.85" />
        <path d="M0 330 L90 250 L150 290 L250 170 L330 250 L400 200 L470 260 L560 150 L640 240 L720 200 L800 260 V500 H0Z" fill={p.ridges[0]} opacity="0.75" />
        <path d="M250 170 L280 200 L262 198 L250 214 L236 196 L222 200Z M560 150 L592 186 L572 182 L560 198 L548 182 L530 186Z" fill="#fff" opacity="0.7" />
        <path d="M0 380 L120 300 L210 350 L320 280 L430 360 L540 300 L650 370 L800 310 V500 H0Z" fill={p.ridges[1]} opacity="0.9" />
        <path d="M0 440 L160 390 L300 430 L460 380 L620 440 L800 400 V500 H0Z" fill={p.ridges[2]} />
      </svg>
    </div>
  );
}
