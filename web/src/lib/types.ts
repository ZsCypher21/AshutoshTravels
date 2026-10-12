/**
 * Shared content types. Every page renders from typed content in `src/content`,
 * so the same shapes can later be served from the database described in
 * docs/07-data-models.md without changing components.
 */

/** A fact that came from the source PDF but should be confirmed before launch. */
export type Verifiable = {
  /** Shown as a small "verify" badge in development and listed in docs/content-notes.md */
  needsVerification?: string;
};

export type Fact = Verifiable & {
  label: string;
  value: string;
};

export type Attraction = Verifiable & {
  name: string;
  description: string;
  /** Optional grouping label, e.g. "In the valley" or "Beyond the valley" */
  group?: string;
  tags?: string[];
};

export type ImageSpec = {
  /** Path under /public once real photography is supplied; undefined means placeholder art */
  src?: string;
  alt: string;
  /** Palette used by the placeholder art until a photo is supplied */
  tone: "dawn" | "glacier" | "forest" | "lake" | "temple" | "dusk";
};

export type Destination = {
  slug: string;
  name: string;
  region: string;
  tagline: string;
  summary: string;
  overview: string[];
  facts: Fact[];
  climate?: { text: string; facts?: Fact[] };
  attractionsTitle: string;
  attractions: Attraction[];
  extras?: { title: string; intro?: string; items: Attraction[] }[];
  image: ImageSpec;
  seo: { title: string; description: string };
};

export type RaftingRiver = Verifiable & {
  slug: string;
  name: string;
  nickname: string;
  duration: string;
  grade: string;
  putIn?: string;
  takeOut?: string;
  description: string;
};

export type Adventure = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  image: ImageSpec;
  seo: { title: string; description: string };
};

export type Service = {
  slug: string;
  name: string;
  summary: string;
  description: string;
  icon: "lotus" | "plane" | "bell" | "leaf" | "map" | "car" | "crate" | "globe";
  /** Service exists in the PDF but details (pricing, schedule, partner) are not provided */
  detailsPending?: boolean;
};

export type HotelDetailRow = { label: string; value: string };
export type HotelDetailGroup = { title: string; rows: HotelDetailRow[] };

export const hotelCities = ["Kathmandu", "Pokhara", "Chitwan", "Nagarkot"] as const;
/** A stable key; the display name for each language comes from the UI dictionary. */
export type HotelCity = (typeof hotelCities)[number];

export type Hotel = {
  slug: string;
  /** Hotel names stay in their official (English) form in every language */
  name: string;
  city: HotelCity;
  /** Only one property has full details in the source PDF */
  details?: {
    highlights: Fact[];
    dining: { name: string; cuisine: string; hours: string }[];
    groups: HotelDetailGroup[];
  };
};

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
};

export type Leader = {
  /** Also the photo key: public/images/team/<id>.jpg */
  id: "ceo" | "executive-director";
  name: string;
  nameRomanized?: string;
  role: string;
  /** Optional explicit path; otherwise public/images/team/<id>.jpg is used when present */
  photo?: string;
  greeting: string;
  message: string[];
  /** The original Japanese text, shown in a disclosure on the English site */
  messageOriginalJa?: string[];
  signOff: string;
};

export type Company = {
  name: string;
  shortName: string;
  founded: number;
  tagline: string;
  location: string;
  pitch: string;
  about: { intro: string; paragraphs: string[]; strengths: { title: string; text: string }[] };
  registrations: string[];
  memberships: { short: string; name: string }[];
  leaders: Leader[];
  contact: {
    postal: string;
    street: string;
    city: string;
    country: string;
    phoneOffice: string;
    mobile: string;
    fax: string;
    email: string;
    hours?: string;
    mapEmbedUrl?: string;
    /** Google Maps search for the office, e.g. its exact business name. Defaults to the street name. */
    mapQuery?: string;
    /** WhatsApp number in international format. PLACEHOLDER: not stated in the source. */
    whatsapp?: string;
    social: { label: string; href: string }[];
  };
};

/* ------------------------------------------------------------ Trips & booking */

export type TripCategory = "tours" | "rafting" | "adventure" | "biking";

/** One step of an itinerary: a day, a stop on a route, or a stage of a river trip. */
export type ItineraryStep = {
  title: string;
  /** Optional label shown in the timeline marker, e.g. "Day 1" or "Start" */
  label?: string;
  description?: string;
  /** Short facts shown as chips, e.g. "2 days", "Grade III–IV" */
  meta?: string[];
};

/** Group-size price tiers. Not in the source PDF: leave undefined until the agency supplies prices. */
export type Pricing = {
  currency: "USD" | "NPR" | "JPY";
  /** Lowest per-person price, shown as "From …" on cards */
  fromPerPerson: number;
  tiers?: { minPax: number; maxPax?: number; perPerson: number }[];
  note?: string;
};

export type Review = {
  author: string;
  country?: string;
  /** 1–5 */
  rating: number;
  title?: string;
  text: string;
  /** ISO date, e.g. "2026-09-14" */
  date: string;
  source?: "Google" | "Tripadvisor" | "Direct";
  url?: string;
  /** Trip slugs this review is about; empty means a general review */
  trips?: string[];
};

export type Faq = { q: string; a: string[] };

/** A bookable product, normalised from the content files so every listing can share one card and one filter. */
export type Trip = {
  slug: string;
  category: TripCategory;
  name: string;
  tagline: string;
  href: string;
  photo: string;
  image: ImageSpec;
  /** Number of days, when the source gives one */
  days?: number;
  /** Display label for the duration, e.g. "2 days" or "Day ride" */
  durationLabel: string;
  /** River grade, rafting only */
  grade?: string;
  /** Highest grade number, for filtering */
  gradeMax?: number;
  region?: string;
  pricing?: Pricing;
  /** Text used by the search box */
  keywords: string;
};
