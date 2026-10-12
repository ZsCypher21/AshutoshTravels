/**
 * Services. Source: TravelWeb.pdf — "Our Services" footer tiles (Yoga &
 * Meditation, Air Ticketing, Hotels in Nepal, Massage & Therapy), the About Us
 * page (package tours, own fleet) and the Executive Director's message (Japan
 * support, import assistance).
 */
import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    slug: "package-tours",
    name: "オーダーメイドのパッケージツアー",
    icon: "map",
    summary: "格安からラグジュアリーまで、あらゆるパッケージツアーをご用意します。",
    description:
      "お好みの旅のスタイルをお聞かせください。歴史ある街並み、野生動物、山の絶景、アドベンチャー、巡礼など、お客様が選ばれる快適さのレベルに合わせて、旅をお客様中心に組み立てます。",
  },
  {
    slug: "air-ticketing",
    name: "航空券の手配",
    icon: "plane",
    summary: "国際線・国内線の航空券を手配します。",
    description:
      "ネパール発着の国際線と、景観を楽しめるマウンテンフライトを含むネパール国内線の航空券をお取りします。",
  },
  {
    slug: "hotel-booking",
    name: "ホテルの予約",
    icon: "bell",
    summary: "ネパール国内のあらゆるクラスのホテルをご予約いただけます。",
    description:
      "ホテル、ロッジ、リゾートとの長年にわたるパートナーシップにより、品質を損なうことなく競争力のある料金をご提供します。",
  },
  {
    slug: "transport",
    name: "専用車とドライバー",
    icon: "car",
    summary: "経験豊富で十分な訓練を受けたドライバーによる自社車両。",
    description:
      "経験豊富なプロのドライバーが運転する自社車両で、ご滞在中も安全かつ快適に移動していただけます。",
  },
  {
    slug: "yoga-meditation",
    name: "ヨガ、瞑想、占星術",
    icon: "lotus",
    summary: "ヨガ、瞑想、占星術で、観光の先にある体験を。",
    description:
      "これらの伝統が深く根付いた国で、旅にヨガ、瞑想、占星術を取り入れてみませんか。",
    detailsPending: true,
  },
  {
    slug: "massage-therapy",
    name: "マッサージ＆セラピー",
    icon: "leaf",
    summary: "グリーン・ハーツによる革新的で質の高いセラピー。",
    description:
      "革新的で優れた施術の提供に力を注ぐグリーン・ハーツのマッサージとセラピーで、心身ともにくつろいでください。",
    detailsPending: true,
  },
  {
    slug: "japan-desk",
    name: "日本からの旅行者へのサポート",
    icon: "globe",
    summary: "エグゼクティブ・ディレクターによる日本語サポート。",
    description:
      "日本からお越しの皆様を、エグゼクティブ・ディレクターが自らサポートし、ネパールの世界遺産、ヒマラヤトレッキング、ヨガ、日本人の好みに合う料理をご紹介します。",
  },
  {
    slug: "import-assistance",
    name: "輸入のお手伝い",
    icon: "crate",
    summary: "ネパール産の紅茶、手工芸品、スパイスの輸入をお手伝いします。",
    description:
      "旅行以外にも、企業や個人のお客様によるネパールからの紅茶、手工芸品、スパイスの輸入をお手伝いします。ご要望についてお気軽にお問い合わせください。",
    detailsPending: true,
  },
];
