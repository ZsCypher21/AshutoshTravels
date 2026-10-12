/**
 * Adventure activities.
 * Source: TravelWeb.pdf — Bungee Jumping, White Water Rafting, Mountain Flight
 * and Mountain Biking pages.
 */
import type { Adventure, RaftingRiver } from "@/lib/types";

export const adventures: Adventure[] = [
  {
    slug: "white-water-rafting",
    name: "White-Water Rafting",
    tagline: "Some of the world's best rivers, from gentle floats to grade V rapids",
    summary:
      "Ride crashing waves and swirling rapids on Nepal's great Himalayan rivers, with trips from two days to nearly two weeks.",
    image: { alt: "Rafters on a Himalayan river", tone: "lake" },
    seo: {
      title: "White-Water Rafting in Nepal: Trisuli, Bhote Koshi, Sun Koshi & More",
      description:
        "Compare Nepal's rafting rivers by grade, duration and season: Trisuli, Bhote Koshi, Kali Gandaki, Marsyangdi, Sun Koshi, Karnali, Arun, Seti and Tamur.",
    },
  },
  {
    slug: "mountain-flight",
    name: "Everest Mountain Flight",
    tagline: "The Himalaya, including Everest, in a single morning",
    summary:
      "An hour-long early-morning flight from Kathmandu along the Himalayan range to Everest, ideal for travellers short on time.",
    image: { alt: "Himalayan peaks from an aircraft window", tone: "glacier" },
    seo: {
      title: "Everest Mountain Flight from Kathmandu",
      description:
        "See Everest and more than a dozen Himalayan giants in one hour on a scenic mountain flight from Kathmandu.",
    },
  },
  {
    slug: "bungee-jumping",
    name: "Bungee Jumping",
    tagline: "A 160 m leap above the Bhote Koshi gorge",
    summary:
      "Jump from a purpose-built suspension bridge high above one of Nepal's wildest rivers, less than three hours from Kathmandu.",
    image: { alt: "Suspension bridge over the Bhote Koshi gorge", tone: "forest" },
    seo: {
      title: "Bungee Jumping in Nepal: 160 m over the Bhote Koshi",
      description:
        "Nepal's first bungee site: a 160 m jump from a Swiss-designed suspension bridge near the Tibet border, under three hours from Kathmandu.",
    },
  },
  {
    slug: "mountain-biking",
    name: "Mountain Biking",
    tagline: "Back trails, villages and viewpoints of the Kathmandu Valley",
    summary:
      "Day rides along the valley rim's quiet trails, through rural villages and to historic cities and mountain viewpoints.",
    image: { alt: "Mountain biking on a village trail", tone: "dawn" },
    seo: {
      title: "Mountain Biking Day Tours in the Kathmandu Valley",
      description:
        "Guided mountain-bike day trips through rural Kathmandu Valley: Bungamati, Chapagaon, Nagarkot, Kakani, Sankhu and Budhanilkantha.",
    },
  },
];

export const getAdventure = (slug: string) => adventures.find((a) => a.slug === slug);

/* ---------------------------------------------------------------- Rafting */

export const raftingIntro = [
  "White-water rafting means riding a rushing river in an inflatable raft or kayak, over crashing waves and through swirling rapids, for the excitement of a lifetime. Nepal has earned a reputation as one of the world's best rafting destinations.",
  "Rivers are graded on a scale of one to six. Many travellers combine a Trisuli run with a trip to Pokhara or Chitwan National Park.",
];

export const raftingGrades = [
  { grade: "I", label: "Easy", text: "Moving water with occasional small rapids and few or no obstacles." },
  { grade: "II", label: "Moderate", text: "Small rapids with regular waves. Some manoeuvring needed, but easy to navigate." },
  {
    grade: "III",
    label: "Difficult",
    text: "Rapids with irregular waves and hazards. More difficult manoeuvring, though routes are usually obvious. Occasional scouting from the shore.",
  },
  {
    grade: "IV",
    label: "Very difficult",
    text: "Large rapids needing careful manoeuvring around dangerous hazards. Scouting is often necessary and rescue is usually difficult. Turbulent water and big, irregular waves may flip rafts.",
  },
  {
    grade: "V",
    label: "Extremely difficult",
    text: "Long, very violent rapids with severe hazards. Continuous, powerful water can make route-finding difficult.",
  },
  {
    grade: "VI",
    label: "Nearly impossible",
    text: "The extreme limit of navigability. Possibly runnable by expert teams at the right water level, in the right conditions, with every precaution, but still with considerable risk to life.",
  },
];

/** Typical grade by season. `null` means not runnable ("Impossible" in the source). */
export const raftingSeasonColumns = ["Jan–May", "Jun–Aug", "Sep–Nov", "Late Nov–Dec"];
export const raftingSeasonMatrix: { river: string; grades: (string | null)[] }[] = [
  { river: "Trisuli", grades: ["2", "4", "3", "2"] },
  { river: "Sun Koshi", grades: ["3", "5", "4+", "3+"] },
  { river: "Kali Gandaki", grades: ["4", null, "5", "4"] },
  { river: "Karnali", grades: ["4+", null, "5", "4+"] },
  { river: "Arun", grades: ["4", null, "5", "4+"] },
  { river: "Seti", grades: ["2+", "4+", "3", "4"] },
  { river: "Bhote Koshi", grades: ["4", null, "4", "3-"] },
  { river: "Marsyangdi", grades: ["4", null, "5", "4"] },
];

export const raftingRivers: RaftingRiver[] = [
  {
    slug: "trisuli",
    name: "Trisuli River",
    nickname: "A blast at monsoon flows",
    duration: "2–3 days",
    grade: "III–IV",
    putIn: "Chaurandi",
    takeOut: "Jugeda",
    description:
      "Nepal's most popular river for short trips, with easy access from the Prithvi Highway that runs along its banks. Ideal for beginners, and even bigger during the monsoon.",
  },
  {
    slug: "bhote-koshi",
    name: "Bhote Koshi River",
    nickname: "100% adrenaline",
    duration: "2 days",
    grade: "III–IV",
    putIn: "Kathmandu",
    takeOut: "Kathmandu",
    description:
      "One of the best short trips in Nepal: about 18 km of continuous white water and some of the most action-packed paddling in the country, flowing down from the Tibet border.",
  },
  {
    slug: "kali-gandaki",
    name: "Kali Gandaki River",
    nickname: "The holy river",
    duration: "3 days",
    grade: "III–IV",
    putIn: "Naya Pul",
    takeOut: "Mirmi",
    description:
      "Through remote canyons in the world's deepest gorge, with bone-chilling rapids and outstanding views of snow-capped peaks. The river later joins the Narayani.",
  },
  {
    slug: "arun",
    name: "Arun River",
    nickname: "Wilderness experience",
    duration: "3 days",
    grade: "III–IV",
    putIn: "Tumlingtar",
    takeOut: "Tumlingtar",
    description:
      "Reach Tumlingtar by plane, or by a day's drive and three days' trek. Among Nepal's most challenging rafting, with remote countryside and spectacular mountain views.",
  },
  {
    slug: "seti",
    name: "Seti River",
    nickname: "Kayak clinic",
    duration: "4 days",
    grade: "III–IV",
    putIn: "Damauli",
    takeOut: "Devghat",
    description:
      "A warm, blue river rising on Mardi Himal beside Machhapuchhre (Fishtail), flowing partly underground through the Pokhara Valley. Limestone gorges, green forest and crystal-clear rapids make it ideal for learning to kayak.",
  },
  {
    slug: "marsyangdi",
    name: "Marsyangdi River",
    nickname: "The raging river",
    duration: "5 days",
    grade: "IV–V",
    putIn: "Ngadi",
    takeOut: "Bimalnagar",
    description:
      "Its name means \"raging river\" in the local dialect, and it is one of the world's best white-water runs. Trek through Gurung villages and emerald fields to Ngadi, then paddle beneath colossal Himalayan peaks. The first 90 km are steep and technical; in the final 90 km, scenery and wildlife take centre stage.",
  },
  {
    slug: "sun-koshi",
    name: "Sun Koshi River",
    nickname: "The river of gods",
    duration: "8–10 days",
    grade: "III–IV (up to V)",
    description:
      "A 270 km journey through narrow canyons and big, warm-water rapids, with road access only at the start and finish. A truly remarkable expedition.",
    needsVerification:
      "The PDF gives both 8–9 and 8–10 days, and grades of both III–IV and 4–5; put-in and take-out points are not provided.",
  },
  {
    slug: "karnali",
    name: "Karnali River",
    nickname: "The western bend",
    duration: "10 days",
    grade: "III–IV",
    description:
      "Nepal's longest river, rising high in the Himalaya. Expect powerful water, especially with summer snowmelt, green forest and small riverside villages, including communities of the Raute people.",
    needsVerification: "Put-in and take-out points are not provided in the PDF.",
  },
  {
    slug: "tamur",
    name: "Tamur River",
    nickname: "Jewel of the east",
    duration: "12 days",
    grade: "III–IV",
    description:
      "Recently opened to rafting, the Tamur flows along the eastern Himalaya with views of Kanchenjunga and Makalu, and includes a short trek through snow-capped mountains.",
    needsVerification: "Put-in and take-out points are not provided in the PDF.",
  },
];

/* ---------------------------------------------------------- Mountain flight */

export const mountainFlight = {
  headline: "Your window to the Himalaya",
  intro: [
    "Only awed silence can match the experience of a mountain flight past the tallest peaks on earth. No wonder these flights have become one of Nepal's most popular experiences.",
    "They suit every kind of traveller. If time or other considerations keep you from trekking, you can see the Himalayan panorama in just one hour, and even seasoned trekkers rarely miss the chance to \"conquer\" the mountains in one sweep.",
    "Flights leave Kathmandu early in the morning and head east. You won't wait long: the mountains appear almost at once, as they always have been.",
  ],
  /** In the order they appear from the aircraft, west to east. */
  peaks: [
    { name: "Shishapangma (Gosaithan)", height: 8013, note: "Seen first, far to the left." },
    { name: "Dorje Lakpa", height: 6996, note: "Shaped like a figure 8 lying on its side, covered in snow." },
    { name: "Phurbi Ghyachu", height: null, note: "Looms over the Kathmandu Valley." },
    { name: "Choba Bhamare", height: 5993, note: "The smallest peak on the route." },
    { name: "Gauri Shankar", height: 7134, note: "Sacred to Lord Shiva and his consort Gauri; resisted all summit attempts until 1979." },
    { name: "Melungtse", height: 7023, note: "A plateau-like massif." },
    { name: "Chugimago", height: 6297, note: "" },
    { name: "Numbur", height: 6956, note: "Revered as the source of pure milk for the Sherpas of Solukhumbu." },
    { name: "Karyolung", height: 6511, note: "An intensely white peak that gleams in the rising sun." },
    { name: "Cho Oyu", height: 8201, note: "One of the world's 8,000 m giants, stunning from the air." },
    { name: "Gyachung Kang", height: 7952, note: "Considered an extremely difficult climb." },
    { name: "Pumori", height: 7161, note: "" },
    { name: "Nuptse", height: 7855, note: "Its name means \"west peak\", for its position relative to Everest." },
    { name: "Everest", height: 8848, note: "Sagarmatha in Nepali, Chomolungma in Tibetan: the highest point on earth." },
  ],
  closing:
    "Much has been written about Everest, but seeing it face to face is something else entirely. Even as it fills your window, the highest spot on earth remains an enigma.",
  needsVerification:
    "Peak heights are as printed in the PDF. The PDF also calls Cho Oyu the eighth-highest mountain and says Choba Bhamare and Chugimago are unclimbed; those claims were removed.",
};

/* ----------------------------------------------------------------- Bungee */

export const bungee = {
  intro: [
    "Imagine a bridge 160 metres above a tropical gorge, with the Bhote Koshi, one of Nepal's wildest rivers, raging below. Close your eyes and jump!",
    "Nepal's first bungee site was designed by one of New Zealand's leading bungee consultants and is run by some of the most experienced jump masters in the business. Safety is taken very seriously.",
  ],
  facts: [
    { label: "Jump height", value: "160 m (about 500 ft)" },
    { label: "From Kathmandu", value: "Under 3 hours by road" },
    { label: "Route", value: "Arniko Highway, to within 12 km of the Tibet border and the Friendship Bridge" },
    { label: "Bridge length", value: "166 m steel suspension bridge" },
  ],
  bridge: [
    "The Swiss-designed bridge was built especially for bungee jumping, with a fourfold safety factor and a load capacity of 250 kg per running metre, about 41,500 kg across its span. More than 6,000 m of steel wire went into what was built as the longest suspension bridge in Nepal.",
    "It joins the two sides of a great valley. Before it was built, local people walked five hours to cross the gorge.",
  ],
  beforeYouJump: [
    "Empty your pockets before the jump.",
    "Do not take alcohol or any intoxicants beforehand.",
    "Everyone is weighed so the right cord can be used: green for the lightest, red for heavier and black for the heaviest jumpers.",
  ],
  needsVerification:
    "The PDF states the bridge's capacity as \"41,500 kg or 4.5 tonnes\"; 41,500 kg is 41.5 tonnes. Claims that the site is the only one in Nepal and \"mishap-proof\" were removed.",
};

/* --------------------------------------------------------- Mountain biking */

export const mountainBiking = {
  intro: [
    "Ride the back trails around the valley rim, through rural villages with ups and downs along the way. These day trips leave time to soak up the peaceful surroundings and make friends with local people.",
    "Our day rides explore hidden corners of the Kathmandu Valley that few visitors see, revealing the other side of Kathmandu.",
  ],
  routes: [
    {
      name: "Back Trails of Kathmandu",
      route: ["Kathmandu", "Bungamati", "Chapagaon", "Kathmandu"],
      description: "A day on the back roads through the valley's rural south.",
    },
    {
      name: "City tour with a difference",
      route: ["Kathmandu", "Bhaktapur", "Patan"],
      description: "Cycle to the famous historic and medieval sites of the valley's three royal cities.",
    },
    {
      name: "Viewpoint rides",
      route: ["Nagarkot", "Kakani"],
      description: "Climb to the valley's classic Himalayan viewpoints.",
    },
    {
      name: "Quiet towns",
      route: ["Sankhu", "Budhanilkantha"],
      description: "Visit the sleepy town of Sankhu and the shrine at Budhanilkantha.",
    },
  ],
};
