import type { Service } from "@/lib/types";

export type IconName =
  | Service["icon"]
  | "arrow" | "check" | "phone" | "mail" | "pin" | "clock" | "menu" | "close" | "mountain" | "shield" | "star" | "chevron"
  | "search" | "sliders" | "calendar" | "users" | "gauge" | "image" | "route" | "external" | "info" | "arrowUp" | "minus" | "plus"
  | "chat" | "quote" | "wave" | "bike" | "compass" | "book" | "tag";
type Name = IconName;

const paths: Record<Name, string> = {
  lotus: "M12 20c-4 0-7-2-8-5 2-1 5 0 8 3 3-3 6-4 8-3-1 3-4 5-8 5Zm0-2c-1.5-2-2-4-2-6s1-4 2-6c1 2 2 4 2 6s-.5 4-2 6Z",
  plane: "M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5Z",
  bell: "M4 18h16M6 18a6 6 0 0 1 12 0M12 9V7m-2 0h4",
  leaf: "M5 19c0-8 6-14 15-14 0 9-6 15-14 15M5 19l7-7",
  map: "M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Zm0 0v14m6-12v14",
  car: "M5 16h14M5 16v2m14-2v2M6 16l1.5-5a2 2 0 0 1 2-1.5h5a2 2 0 0 1 2 1.5L18 16M7.5 13.5h.01M16.5 13.5h.01",
  crate: "M3 8l9-5 9 5v8l-9 5-9-5V8Zm0 0 9 5 9-5M12 13v8",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.5 2.5 3.5 5.5 3.5 9S14.5 18.5 12 21c-2.5-2.5-3.5-5.5-3.5-9S9.5 5.5 12 3Z",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  chevron: "m9 6 6 6-6 6",
  check: "m5 12 5 5 9-10",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2",
  mail: "M4 6h16v12H4zm0 0 8 7 8-7",
  pin: "M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12Zm0-9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4l3 2",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  mountain: "m3 20 6.5-11 4 6.5 2.5-4L21 20H3Zm6.5-11 1.5 2.5",
  shield: "M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Zm-3 9 2 2 4-4",
  star: "m12 4 2.4 5 5.6.8-4 3.9.9 5.5L12 16.6 7.1 19.2l.9-5.5-4-3.9L9.6 9 12 4Z",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 4 4",
  sliders: "M4 7h10m4 0h2M4 17h4m4 0h8M16 5v4M10 15v4",
  calendar: "M5 6h14v14H5zM5 10h14M9 4v4m6-4v4",
  users: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 9c0-3.3 2.7-6 6-6s6 2.7 6 6m1-9a3 3 0 1 0-1.5-5.6M18 14c2 .8 3 2.8 3 6",
  gauge: "M4 18a8 8 0 1 1 16 0M12 18l4-6",
  image: "M4 5h16v14H4zm0 11 5-5 4 4 2-2 5 5M15 9.5h.01",
  route: "M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12-10a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM8 17h7a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7",
  external: "M14 4h6v6m0-6-9 9M18 14v5H5V6h5",
  info: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-11v6m0-9h.01",
  arrowUp: "M12 19V5m-6 6 6-6 6 6",
  minus: "M5 12h14",
  plus: "M12 5v14M5 12h14",
  chat: "M4 5h16v11H9l-5 4V5Z",
  quote: "M7 7h4v4c0 3-1.5 5-4 6m6-10h4v4c0 3-1.5 5-4 6",
  wave: "M3 15c2 0 2-2 4.5-2S10 15 12 15s2-2 4.5-2S19 15 21 15M3 19c2 0 2-2 4.5-2S10 19 12 19s2-2 4.5-2S19 19 21 19M8 9l4-5 4 5",
  bike: "M6 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm12 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 15l4-7h5l3 7M9 8h2m4 0-1-3h2",
  compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3.5-12.5-2 5-5 2 2-5 5-2Z",
  book: "M4 5a2 2 0 0 1 2-1h5v16H6a2 2 0 0 0-2 1V5Zm16 0a2 2 0 0 0-2-1h-5v16h5a2 2 0 0 1 2 1V5Z",
  tag: "M3 12V4h8l10 10-8 8L3 12Zm5-4h.01",
};

export function Icon({ name, className = "size-5", filled = false }: { name: Name; className?: string; filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d={paths[name]} />
    </svg>
  );
}
