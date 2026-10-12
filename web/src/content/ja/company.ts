import type { Company } from "@/lib/types";

/**
 * Company profile, leadership messages and contact details.
 * Source: TravelWeb.pdf — Home, About Us and Contact Us pages.
 */

export const company: Company = {
  name: "Ashutosh Travels & Tours",
  shortName: "Ashutosh Travels",
  founded: 1995,
  tagline: "1995年から、心を込めて手配するネパールの旅",
  location: "カトマンズの中心部、タメルのすぐ近く",
  pitch:
    "ネパールのビジネスと観光の振興に力を注ぐカトマンズの旅行会社です。格安からラグジュアリーまで、お客様に合わせたオーダーメイドの旅をご提供します。",

  about: {
    intro:
      "アシュトストラベルズ＆ツアーズは、すべての旅行者に最高のサービスをお届けするという、ただひとつの目的のために創業しました。私たちのチームはお客様のお話にしっかりと耳を傾け、迅速に対応し、一つひとつのご要望を、お客様に合わせた実行力のあるプランへと形にします。",
    paragraphs: [
      "1995年の創業以来、私たちは数十年にわたり、思い出に残る旅をつくり、私たちを選んでくださった旅行者の皆様と末永い関係を築いてきました。その実績を支えているのは、毎回必ず質の高いサービスをお届けするという、ただ一点です。",
      "私たちはネパールのビジネスと観光の振興に力を注いでいます。格安のパッケージをご計画の方にも、ラグジュアリーな休暇をお考えの方にも、私たちのチームはお客様のご要望に100%の注意と力を注ぎます。",
      "オフィスはカトマンズの中心部、タメルのすぐ近くにあり、お客様の旅を支える場所やパートナーにいつでもすぐ手が届きます。",
    ],
    strengths: [
      {
        title: "信頼できるパートナーネットワーク",
        text: "ネパール各地の上質なホテル、ロッジ、リゾート、航空会社、その他の観光事業者と長年にわたるつながりがあるため、品質を損なうことなく競争力のある料金をご提供できます。",
      },
      {
        title: "自社車両",
        text: "経験豊富で十分な訓練を受けたドライバーが運転する自社車両を運行しており、ご滞在中を通じて安全で快適な移動をお約束します。",
      },
      {
        title: "ご予算は様々、品質はひとつ",
        text: "格安からラグジュアリーまで、あらゆる種類のパッケージツアーを手配し、そのすべてを同じ心配りでお世話します。",
      },
      {
        title: "迅速できめ細かなプランニング",
        text: "スタッフが迅速かつ的確に対応し、お客様のご興味、日程、ご予算に合わせてプランをご提案します。",
      },
    ],
  },

  registrations: [
    "観光省",
    "ネパール中央銀行",
    "会社登記所",
    "税務署",
  ],
  memberships: [
    { short: "NATTA", name: "ネパール旅行業協会" },
    { short: "NATO", name: "ネパール・ツアーオペレーター協会" },
  ],

  leaders: [
    {
      id: "ceo",
      name: "ニルマニ・ラル・シュレスタ",
      role: "最高経営責任者（CEO）",
      photo: undefined, // original photo in the PDF is 120×132 px; supply a high-resolution portrait
      greeting: "ご来訪の皆様へ",
      message: [
        "アシュトストラベルズ＆ツアーズへようこそ。私たちは、ネパールおよび周辺地域のビジネスと観光の振興に力を注ぐ、ネパールの旅行会社です。",
        "世界はかつての姿とは変わりました。かつては長く困難だった旅も今ではわずか数時間となり、世界は小さくなりました。それでも、私たちが旅をする理由は変わりません。学ぶため、そして故郷とはまったく異なる何かを体験するためです。旅は心と体をリフレッシュさせ、異なる文化や伝統、そしてそれを今に受け継ぐ人々への扉を開いてくれます。",
        "創業以来、私たちはお客様のご要望にあらゆる形でお応えできるよう、サービスを磨き続けてきました。楽しい体験だけでなく、価格に見合う確かな価値をご提供します。",
        "アシュトストラベルズ＆ツアーズのスタッフ一同、世界中の旅行者の皆様がネパールを訪れ、その豊かな自然と人々の温かいおもてなしに浸っていただけることを心よりお待ちしております。",
      ],
      signOff: "心を込めて",
    },
    {
      id: "executive-director",
      name: "長谷川裕子",
      nameRomanized: undefined, // PLACEHOLDER: confirm the romanised spelling with the Executive Director
      role: "エグゼクティブ・ディレクター",
      photo: undefined,
      greeting: "ナマステ〜！アシュトストラベルズ＆ツアーズの長谷川裕子です。",
      message: [
        "ヒマラヤに抱かれる小さな国ネパールは、神々が国を治めていると言われているように、摩訶不思議な魅力がギュ〜ッと詰まった素晴らしい国です。世界遺産の観光や、ヒマラヤトレッキング、最高の環境でのヨーガレッスン、日本人の好みに合う美味しい料理、つい欲しくなってしまう可愛い雑貨など・・・きっとあなたを虜にしてしまうでしょう。",
        "こんな魅力溢れるネパールを、日本の多くの皆様にご紹介し、楽しんでいただくために、私たちは全力でサポート致します。",
        "旅行以外にも紅茶や雑貨、スパイスの輸入などのお手伝いもさせて頂きます。",
        "ご興味のある方、なんでもご遠慮なくお問い合わせください！！",
      ],
      signOff: "",
    },
  ],

  contact: {
    postal: "私書箱 471",
    street: "タヒティ",
    city: "カトマンズ",
    country: "ネパール",
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
