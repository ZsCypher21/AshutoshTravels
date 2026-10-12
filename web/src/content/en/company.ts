import type { Company } from "@/lib/types";

/**
 * Company profile, leadership messages and contact details.
 * Source: TravelWeb.pdf — Home, About Us and Contact Us pages.
 */

export const company: Company = {
  name: "Ashutosh Travels & Tours",
  shortName: "Ashutosh Travels",
  founded: 1995,
  tagline: "Nepal, thoughtfully arranged since 1995",
  location: "In the heart of Kathmandu, near Thamel",
  pitch:
    "A Kathmandu-based tour company dedicated to promoting business and tourism in Nepal, offering custom-tailored journeys from budget to luxury.",

  about: {
    intro:
      "Ashutosh Travels & Tours was founded with a single purpose: to give every traveller the very best of service. Our team listens closely, responds promptly and turns each request into a custom-tailored, action-oriented plan.",
    paragraphs: [
      "Established in 1995, we have spent decades creating memorable journeys and lasting relationships with the travellers who have chosen us. That record rests on one thing: delivering quality service every single time.",
      "We are committed to promoting business and tourism in Nepal. When you work with us, you work with a team that gives 100% of its attention and effort to your needs, whether you are planning a budget-friendly package or a luxury escape.",
      "Our office sits in the heart of Kathmandu, close to Thamel, so we are never far from the places and partners that make your trip work.",
    ],
    strengths: [
      {
        title: "Trusted partner network",
        text: "Long-standing links with fine hotels, lodges, resorts, airlines and other tourism businesses across Nepal, so we can offer competitive prices without compromising on quality.",
      },
      {
        title: "Our own fleet",
        text: "We operate our own cars, driven by experienced, well-trained drivers, for safe and comfortable travel throughout your stay.",
      },
      {
        title: "Every budget, one standard",
        text: "From budget to luxury, we organise package tours of every kind, each one handled with the same care.",
      },
      {
        title: "Responsive, tailored planning",
        text: "Our staff respond promptly and efficiently, shaping options around your interests, schedule and budget.",
      },
    ],
  },

  registrations: [
    "Ministry of Tourism",
    "Nepal Rastra Bank",
    "Company Registrar's Office",
    "Tax Office",
  ],
  memberships: [
    { short: "NATTA", name: "Nepal Association of Tour & Travel Agents" },
    { short: "NATO", name: "Nepal Association of Tour Operators" },
  ],

  leaders: [
    {
      id: "ceo",
      name: "Nirmani Lal Shrestha",
      role: "Chief Executive Officer",
      photo: undefined, // original photo in the PDF is 120×132 px; supply a high-resolution portrait
      greeting: "Dear visitors,",
      message: [
        "Welcome to Ashutosh Travels & Tours, a Nepal-based tour company dedicated to promoting business and tourism in Nepal and the surrounding region.",
        "The world is not what it used to be. Journeys that were once long and arduous now take a matter of hours, and the world has become a smaller place. Yet we still travel for the same reasons: to learn, and to experience something completely different from home. Travel refreshes body and soul, and it opens the door to other cultures, traditions and the people who keep them alive.",
        "Since our founding, we have continually refined our services to meet our clients' needs in every way we can. We offer not only enjoyable experiences, but genuine value for money.",
        "The whole team at Ashutosh Travels & Tours invites travellers from around the world to visit Nepal and immerse themselves in its natural beauty and the warm hospitality of its people.",
      ],
      signOff: "With warm regards,",
    },
    {
      id: "executive-director",
      name: "長谷川裕子",
      nameRomanized: undefined, // PLACEHOLDER: confirm the romanised spelling with the Executive Director
      role: "Executive Director",
      photo: undefined,
      greeting: "Namaste!",
      message: [
        "Nepal, a small country cradled by the Himalayas, is said to be ruled by the gods, and it is packed with a magical charm all of its own: World Heritage sightseeing, Himalayan trekking, yoga in an extraordinary setting, food that suits Japanese tastes, and irresistible handicrafts. It will surely captivate you.",
        "We are fully committed to introducing this wonderful country to travellers from Japan and helping them enjoy it to the fullest.",
        "Beyond travel, we can also assist with importing tea, handicrafts and spices. Please feel free to contact us about anything at all.",
      ],
      messageOriginalJa: [
        "ナマステ〜！アシュトストラベルズ＆ツアーズの長谷川裕子です。",
        "ヒマラヤに抱かれる小さな国ネパールは、神々が国を治めていると言われているように、摩訶不思議な魅力がギュ〜ッと詰まった素晴らしい国です。世界遺産の観光や、ヒマラヤトレッキング、最高の環境でのヨーガレッスン、日本人の好みに合う美味しい料理、つい欲しくなってしまう可愛い雑貨など・・・きっとあなたを虜にしてしまうでしょう。",
        "こんな魅力溢れるネパールを、日本の多くの皆様にご紹介し、楽しんでいただくために、私たちは全力でサポート致します。",
        "旅行以外にも紅茶や雑貨、スパイスの輸入などのお手伝いもさせて頂きます。",
        "ご興味のある方、なんでもご遠慮なくお問い合わせください！！",
      ],
      signOff: "",
    },
  ],

  contact: {
    postal: "P.O. Box 471",
    street: "Thahity",
    city: "Kathmandu",
    country: "Nepal",
    phoneOffice: "+977-1-4224655",
    mobile: "+977-9851061266",
    fax: "+977-1-4222594",
    email: "nirmani@ashutoshtravels.com",
    // The PDF also lists a residence number; it is deliberately not published on the new site.
    hours: undefined, // PLACEHOLDER: office hours are not in the source
    mapEmbedUrl: undefined, // PLACEHOLDER: add a Google Maps embed for the office
    social: [], // PLACEHOLDER: no social profiles in the source
  },
};
