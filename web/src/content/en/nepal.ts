/**
 * "About Nepal" guide: overview, fast facts and travel essentials.
 * Source: TravelWeb.pdf — About Nepal page (main body and sidebar).
 */
import type { Fact } from "@/lib/types";

export const nepalIntro = {
  headline: "Nepal: the roof of the world, and so much more",
  lead:
    "Nepal is known for the highest Himalayan peaks, artistic monuments, exotic wildlife and a remarkably diverse culture. Set between China and India, it is a largely agricultural country home to many ethnic groups, each with its own language and traditions, and a people who live by the saying \"Unity in Diversity\".",
  paragraphs: [
    "Few places on earth offer so much variety in one journey. Nepal is a world-class destination for hiking, trekking, rock climbing, peak climbing and mountaineering; for kayaking, rafting and canoeing; for wildlife safaris, mountain biking and paragliding; and for cultural sites at every turn. It is also the land where Lord Buddha was born more than 2,500 years ago.",
  ],
  history: [
    "Nepal was unified in 1768 by King Prithvi Narayan Shah. Under Shah and his successors, its borders reached as far west as Kashmir and as far east as Sikkim (now part of India).",
    "A commercial treaty was signed with Britain in 1792, and again in 1816 after more than a year of hostilities with the British East India Company.",
  ],
  activities: [
    "Hiking & trekking",
    "Rock & peak climbing",
    "Mountaineering",
    "Kayaking & canoeing",
    "White-water rafting",
    "Wildlife safaris",
    "Mountain biking",
    "Paragliding",
    "Cultural heritage",
  ],
};

export const nepalFastFacts: Fact[] = [
  { label: "Capital", value: "Kathmandu" },
  { label: "Total area", value: "147,181 sq km" },
  { label: "East–west length", value: "885 km" },
  { label: "North–south breadth", value: "145 km at its narrowest, 541 km at its widest" },
  { label: "Latitude", value: "26°12′ to 30°27′ North" },
  { label: "Longitude", value: "80°4′ to 88°12′ East" },
  { label: "National flower", value: "Rhododendron, known in Nepali as Guras" },
  { label: "International dialling code", value: "+977 (Kathmandu 1, Pokhara 61)" },
  {
    label: "United Nations member since",
    value: "December 1955",
    needsVerification: "The PDF says \"1995 December\"; corrected to 1955 as an evident typo.",
  },
];

/** Topics listed in the original sidebar, kept in the same order. */
export const nepalEssentials: { id: string; title: string; body: string[]; facts?: Fact[] }[] = [
  {
    id: "national-flag",
    title: "National flag",
    body: [
      "Nepal's flag is the only national flag in the world that is not rectangular. Its design draws on an original Hindu form used for more than 2,000 years.",
      "It is crimson red with a blue border, and carries two emblems: a crescent moon at the top and the sun at the bottom.",
    ],
  },
  {
    id: "language",
    title: "Language",
    body: [
      "Nepali is the official language, alongside around 20 other languages and numerous dialects. Derived from Sanskrit and related to Hindi, Nepali is spoken by about 90% of the population as a first or second language.",
      "Most people in Kathmandu and other large cities understand and speak English.",
    ],
  },
  {
    id: "religion",
    title: "Religion",
    body: [
      "Hinduism is the major religion, and Nepal is also home to Buddhist, Muslim and Christian communities. All faiths live together in notable harmony.",
    ],
  },
  {
    id: "time-zone",
    title: "Time zone",
    body: ["Nepal Standard Time is GMT +5:45, which is 15 minutes ahead of Indian Standard Time."],
  },
  {
    id: "currency",
    title: "Currency",
    body: [
      "The official currency is the Nepalese Rupee (NPR), divided into 100 paisa. Banknotes are issued in a range of denominations up to 1,000 rupees.",
    ],
  },
  {
    id: "weekly-holiday",
    title: "Weekly holiday",
    body: [
      "Saturday is the official weekly holiday, and most shops close for the day. Museums close on Tuesdays and on government holidays.",
    ],
  },
  {
    id: "climate",
    title: "Climate",
    body: [
      "Nepal's climate ranges from subtropical summers and mild winters in the southern lowlands to an alpine climate, with cool summers and severe winters, in the mountains.",
      "Average annual rainfall falls from 1,778 mm (70 in) in the east to 899 mm (35 in) in the west.",
    ],
  },
  {
    id: "vegetation",
    title: "Vegetation",
    body: [
      "For its size, Nepal has some of the most outstanding biodiversity in the world, from subtropical rainforest to alpine desert.",
    ],
  },
];

/** Kathmandu seasonal averages, from the "four climatic seasons" table. */
export const kathmanduSeasons = [
  { season: "Spring", months: "Mar–May", max: 28, min: 12, wear: "Shorts or long-sleeved shirts" },
  { season: "Summer", months: "Jun–Aug", max: 30, min: 20, wear: "Light, loose clothing" },
  { season: "Autumn", months: "Sep–Nov", max: 24, min: 12, wear: "Layers; warm wear from October" },
  { season: "Winter", months: "Dec–Feb", max: 20, min: 3, wear: "Woollen sweaters and jackets" },
];

export const packingAdvice: string =
  "From October to February, pack woollen sweaters, jackets or similar warm clothing. Shorts or long-sleeved shirts suit March to May, and light, loose garments are best from June to September.";

export const bestSeasons = {
  summary:
    "The best seasons to visit Nepal are spring (March–May) and autumn (September–November). Travel is also possible during the monsoon (June–August).",
  seasons: [
    { name: "Spring", months: "March–May", note: "Recommended" },
    { name: "Autumn", months: "September–November", note: "Recommended" },
    { name: "Monsoon", months: "June–August", note: "Possible" },
  ],
};

export const entering = {
  byAir:
    "Kathmandu is Nepal's international gateway, with air links to cities across South Asia, Southeast Asia, the Middle East and beyond, including Delhi, Mumbai, Kolkata, Varanasi, Dhaka, Paro, Lhasa, Hong Kong, Bangkok, Singapore, Dubai and Osaka.",
  byAirNeedsVerification:
    "Route list adapted from the PDF, which also names Frankfurt, London, Vienna, Paris, Karachi and Patna. Confirm current direct routes before launch.",
  byLand: "Visitors can also enter Nepal overland from India.",
  visa: {
    how: "A tourist visa can be obtained from a Nepalese embassy or consulate, or on arrival at Nepal's entry points.",
    tourist: [
      { duration: "15 days", entry: "Multiple entry", fee: "US$25" },
      { duration: "30 days", entry: "Multiple entry", fee: "US$40" },
      { duration: "90 days", entry: "Multiple entry", fee: "US$100" },
    ],
    feeNote: "Fees are payable in US dollars or an equivalent convertible currency.",
    needsVerification:
      "Visa and extension fees are as printed in the PDF and are likely out of date. Confirm with Nepal's Department of Immigration before publishing.",
    gratis: [
      "Nationals of SAARC countries receive a free (gratis) 30-day visa. Extensions follow the same rules as for other nationalities.",
      "Indian nationals do not need a visa to enter Nepal.",
    ],
    extension:
      "Tourists may stay up to 150 days in a visa year (1 January to 31 December). Extensions cost US$2 per day, with a minimum charge of US$30 for 15 days or less.",
  },
  passport: "A valid passport is required for all nationals except Indian citizens.",
};

export const customs = {
  allowances: [
    "200 cigarettes",
    "50 cigars",
    "1.15 litres of distilled spirits",
  ],
  temporaryImport:
    "You may bring the following items duty-free, provided you take them with you when you leave: binoculars, a video camera, a still camera, a laptop computer and a portable music system.",
  prohibited: "Narcotics, arms and ammunition are strictly prohibited.",
  antiques: [
    "Antiques, and precious or semi-precious stones, must be cleared and certified by the Government of Nepal's Department of Archaeology (National Archive Building, Ram Shah Path, Kathmandu) before export.",
    "It is illegal to export objects more than 100 years old, such as sacred images, paintings and manuscripts valued for cultural and religious reasons. Please avoid buying such items: they are part of Nepal's cultural heritage and belong here.",
  ],
  needsVerification: "Allowances are from the PDF (which also allowed 15 rolls of film). Confirm current limits with Nepal Customs.",
};
