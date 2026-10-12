/**
 * "About Nepal" guide: overview, fast facts and travel essentials.
 * Source: TravelWeb.pdf — About Nepal page (main body and sidebar).
 */
import type { Fact } from "@/lib/types";

export const nepalIntro = {
  headline: "ネパール：世界の屋根、そしてそれだけではない国",
  lead:
    "ネパールは、ヒマラヤの最高峰、芸術的な建造物、珍しい野生動物、そして驚くほど多様な文化で知られています。中国とインドの間に位置する農業中心の国で、それぞれ独自の言語と伝統を持つ多くの民族が暮らしており、人々は「多様性の中の統一」という言葉を大切にして生きています。",
  paragraphs: [
    "一度の旅でこれほど多彩な体験ができる場所は、世界でもそう多くありません。ネパールは、ハイキング、トレッキング、ロッククライミング、ピーククライミング、登山、カヤック、ラフティング、カヌー、野生動物サファリ、マウンテンバイク、パラグライダーが楽しめる世界有数の旅行先であり、いたるところに文化遺産があります。また、2,500年以上前にお釈迦様が誕生した地でもあります。",
  ],
  history: [
    "ネパールは1768年、プリトビ・ナラヤン・シャハ王によって統一されました。シャハ王とその後継者のもとで、国境は西はカシミール、東はシッキム（現在はインドの一部）にまで及びました。",
    "1792年にイギリスとの通商条約が結ばれ、1年以上にわたるイギリス東インド会社との戦いを経て、1816年にも再び条約が結ばれました。",
  ],
  activities: [
    "ハイキング＆トレッキング",
    "ロッククライミング＆ピーククライミング",
    "登山",
    "カヤック＆カヌー",
    "ラフティング",
    "野生動物サファリ",
    "マウンテンバイク",
    "パラグライダー",
    "文化遺産",
  ],
};

export const nepalFastFacts: Fact[] = [
  { label: "首都", value: "カトマンズ" },
  { label: "総面積", value: "147,181平方キロメートル" },
  { label: "東西の長さ", value: "885キロメートル" },
  { label: "南北の幅", value: "最も狭い所で145キロメートル、最も広い所で541キロメートル" },
  { label: "緯度", value: "北緯26度12分～30度27分" },
  { label: "経度", value: "東経80度4分～88度12分" },
  { label: "国花", value: "シャクナゲ（ネパール語でグラス）" },
  { label: "国際電話の国番号", value: "+977（カトマンズ 1、ポカラ 61）" },
  {
    label: "国連加盟",
    value: "1955年12月",
    needsVerification: "The PDF says \"1995 December\"; corrected to 1955 as an evident typo.",
  },
];

/** Topics listed in the original sidebar, kept in the same order. */
export const nepalEssentials: { id: string; title: string; body: string[]; facts?: Fact[] }[] = [
  {
    id: "national-flag",
    title: "国旗",
    body: [
      "ネパールの国旗は、世界で唯一、長方形ではない国旗です。そのデザインは、2,000年以上にわたって用いられてきたヒンドゥー教の原型に由来しています。",
      "深紅の地に青い縁取りが施され、上部に三日月、下部に太陽という2つの紋章が描かれています。",
    ],
  },
  {
    id: "language",
    title: "言語",
    body: [
      "公用語はネパール語で、そのほかに約20の言語と数多くの方言があります。ネパール語はサンスクリット語から派生し、ヒンディー語と近い関係にあり、人口の約90%が第一言語または第二言語として話しています。",
      "カトマンズやその他の大都市では、ほとんどの人が英語を理解し、話すことができます。",
    ],
  },
  {
    id: "religion",
    title: "宗教",
    body: [
      "主な宗教はヒンドゥー教ですが、仏教徒、イスラム教徒、キリスト教徒のコミュニティもあります。すべての信仰が見事な調和のもとに共存しています。",
    ],
  },
  {
    id: "time-zone",
    title: "時差",
    body: ["ネパール標準時はGMT+5:45で、インド標準時より15分進んでいます。"],
  },
  {
    id: "currency",
    title: "通貨",
    body: [
      "公式通貨はネパール・ルピー（NPR）で、1ルピーは100パイサです。紙幣は最高1,000ルピーまで、さまざまな額面のものが発行されています。",
    ],
  },
  {
    id: "weekly-holiday",
    title: "週休日",
    body: [
      "土曜日が公式の週休日で、ほとんどのお店がお休みになります。博物館は火曜日と政府の祝日が休館です。",
    ],
  },
  {
    id: "climate",
    title: "気候",
    body: [
      "ネパールの気候は、夏は亜熱帯性で冬は温暖な南部の低地から、夏は涼しく冬は厳しい山岳地帯の高山気候まで、幅広く変化します。",
      "年間平均降水量は、東部の1,778mm（70インチ）から西部の899mm（35インチ）へと減少します。",
    ],
  },
  {
    id: "vegetation",
    title: "植生",
    body: [
      "ネパールは国土の大きさの割に、亜熱帯雨林から高山砂漠まで、世界でも屈指の豊かな生物多様性を誇ります。",
    ],
  },
];

/** Kathmandu seasonal averages, from the "four climatic seasons" table. */
export const kathmanduSeasons = [
  { season: "春", months: "3月～5月", max: 28, min: 12, wear: "半ズボンまたは長袖シャツ" },
  { season: "夏", months: "6月～8月", max: 30, min: 20, wear: "薄手でゆったりした服" },
  { season: "秋", months: "9月～11月", max: 24, min: 12, wear: "重ね着。10月からは防寒着を" },
  { season: "冬", months: "12月～2月", max: 20, min: 3, wear: "ウールのセーターと上着" },
];

export const packingAdvice: string =
  "10月から2月は、ウールのセーターや上着など暖かい服をお持ちください。3月から5月は半ズボンや長袖シャツが適しており、6月から9月は薄手でゆったりした服がおすすめです。";

export const bestSeasons = {
  summary:
    "ネパール旅行のベストシーズンは、春（3月～5月）と秋（9月～11月）です。モンスーンの時期（6月～8月）にも旅行は可能です。",
  seasons: [
    { name: "春", months: "3月～5月", note: "おすすめ" },
    { name: "秋", months: "9月～11月", note: "おすすめ" },
    { name: "モンスーン", months: "6月～8月", note: "旅行可能" },
  ],
};

export const entering = {
  byAir:
    "カトマンズはネパールの空の玄関口で、デリー、ムンバイ、コルカタ、バラナシ、ダッカ、パロ、ラサ、香港、バンコク、シンガポール、ドバイ、大阪など、南アジア、東南アジア、中東をはじめとする各地の都市と空路で結ばれています。",
  byAirNeedsVerification:
    "Route list adapted from the PDF, which also names Frankfurt, London, Vienna, Paris, Karachi and Patna. Confirm current direct routes before launch.",
  byLand: "インドから陸路でネパールに入国することもできます。",
  visa: {
    how: "観光ビザは、ネパール大使館・領事館で取得するか、ネパールの入国地点で到着時に取得できます。",
    tourist: [
      { duration: "15日間", entry: "数次入国", fee: "US$25" },
      { duration: "30日間", entry: "数次入国", fee: "US$40" },
      { duration: "90日間", entry: "数次入国", fee: "US$100" },
    ],
    feeNote: "手数料は米ドル、またはそれに相当する交換可能な通貨でお支払いいただけます。",
    needsVerification:
      "Visa and extension fees are as printed in the PDF and are likely out of date. Confirm with Nepal's Department of Immigration before publishing.",
    gratis: [
      "SAARC（南アジア地域協力連合）加盟国の国籍の方には、30日間の無料ビザが発給されます。延長については、その他の国籍の方と同じ規定が適用されます。",
      "インド国籍の方は、ネパールへの入国にビザは不要です。",
    ],
    extension:
      "観光客は、1ビザ年（1月1日～12月31日）につき最長150日間滞在できます。延長料金は1日あたりUS$2で、15日以下の場合は最低US$30がかかります。",
  },
  passport: "インド国籍の方を除き、すべての国籍の方に有効なパスポートが必要です。",
};

export const customs = {
  allowances: [
    "紙巻たばこ 200本",
    "葉巻 50本",
    "蒸留酒 1.15リットル",
  ],
  temporaryImport:
    "出国時に持ち帰ることを条件に、双眼鏡、ビデオカメラ、スチルカメラ、ノートパソコン、ポータブル音楽プレーヤーは免税で持ち込むことができます。",
  prohibited: "麻薬、武器、弾薬の持ち込みは固く禁じられています。",
  antiques: [
    "骨董品、および貴石・半貴石を国外に持ち出す際は、事前にネパール政府考古局（カトマンズ、ラム・シャハ・パト、国立公文書館ビル）の審査と証明を受ける必要があります。",
    "神像、絵画、写本など、文化的・宗教的な理由で価値のある100年以上前の品物を国外に持ち出すことは違法です。こうした品物はネパールの文化遺産の一部であり、この地にあるべきものですので、購入はお控えください。",
  ],
  needsVerification: "Allowances are from the PDF (which also allowed 15 rolls of film). Confirm current limits with Nepal Customs.",
};
