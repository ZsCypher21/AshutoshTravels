/**
 * Adventure activities.
 * Source: TravelWeb.pdf — Bungee Jumping, White Water Rafting, Mountain Flight
 * and Mountain Biking pages.
 */
import type { Adventure, RaftingRiver } from "@/lib/types";

export const adventures: Adventure[] = [
  {
    slug: "white-water-rafting",
    name: "ラフティング",
    tagline: "穏やかな川下りからグレードVの急流まで、世界屈指の川の数々",
    summary:
      "ヒマラヤに源を発するネパールの大河で、砕ける波と渦巻く急流に挑みます。2日間から2週間近くまでのツアーをご用意しています。",
    image: { alt: "ヒマラヤの川を下るラフティングの一行", tone: "lake" },
    seo: {
      title: "ネパールのラフティング｜トリシュリ川・ボテコシ川・スンコシ川ほか",
      description:
        "ネパールのラフティングの川をグレード・日数・シーズンで比較。トリシュリ、ボテコシ、カリガンダキ、マルシャンディ、スンコシ、カルナリ、アルン、セティ、タムール。",
    },
  },
  {
    slug: "mountain-flight",
    name: "エベレスト遊覧飛行",
    tagline: "エベレストを含むヒマラヤを、ひと朝で",
    summary:
      "カトマンズから早朝に出発し、ヒマラヤ山脈に沿ってエベレストまで飛ぶ約1時間のフライトです。時間の限られた旅行者に最適です。",
    image: { alt: "機窓から望むヒマラヤの峰々", tone: "glacier" },
    seo: {
      title: "カトマンズ発エベレスト遊覧飛行",
      description:
        "カトマンズ発の山岳遊覧飛行で、エベレストをはじめ十数座のヒマラヤの巨峰をわずか1時間で眺められます。",
    },
  },
  {
    slug: "bungee-jumping",
    name: "バンジージャンプ",
    tagline: "ボテコシ渓谷の上空160 mからのジャンプ",
    summary:
      "ネパール屈指の荒々しい川のはるか上に架かるバンジー専用の吊り橋から飛び込みます。カトマンズから3時間足らずです。",
    image: { alt: "ボテコシ渓谷に架かる吊り橋", tone: "forest" },
    seo: {
      title: "ネパールのバンジージャンプ｜ボテコシ川の上160 m",
      description:
        "ネパール初のバンジー施設。チベット国境近く、スイス設計の吊り橋から160 mのジャンプ。カトマンズから3時間以内です。",
    },
  },
  {
    slug: "mountain-biking",
    name: "マウンテンバイク",
    tagline: "カトマンズ盆地の裏道、村々、展望地をめぐる",
    summary:
      "盆地の縁に続く静かな小道を走り、農村を抜けて歴史ある古都や山の展望地へ向かう日帰りライドです。",
    image: { alt: "村の小道を走るマウンテンバイク", tone: "dawn" },
    seo: {
      title: "カトマンズ盆地のマウンテンバイク日帰りツアー",
      description:
        "ガイド付きでカトマンズ盆地の農村部をめぐるマウンテンバイク日帰りツアー。ブンガマティ、チャパガウン、ナガルコット、カカニ、サンクー、ブダニルカンタ。",
    },
  },
];

export const getAdventure = (slug: string) => adventures.find((a) => a.slug === slug);

/* ---------------------------------------------------------------- Rafting */

export const raftingIntro = [
  "ラフティングとは、ゴムボートやカヤックで激流を下り、砕ける波や渦巻く急流を乗り越えていく、一生に一度の興奮を味わえるアクティビティです。ネパールは世界屈指のラフティングの目的地として知られています。",
  "川の難易度は1から6までのグレードで表されます。トリシュリ川のラフティングを、ポカラやチトワン国立公園への旅と組み合わせる旅行者も多くいます。",
];

export const raftingGrades = [
  { grade: "I", label: "易しい", text: "流れのある水域で、ときおり小さな瀬があり、障害物はほとんどありません。" },
  { grade: "II", label: "中級", text: "規則的な波が立つ小さな瀬。多少の操作は必要ですが、容易に進めます。" },
  {
    grade: "III",
    label: "難しい",
    text: "不規則な波や危険箇所のある瀬。より難しい操作が求められますが、通常はルートが明確です。ときには岸から下見をします。",
  },
  {
    grade: "IV",
    label: "非常に難しい",
    text: "危険な障害物を慎重に避ける操作が必要な大きな瀬。下見が必要なことが多く、救助は通常困難です。荒れた水流や大きく不規則な波でボートが転覆することもあります。",
  },
  {
    grade: "V",
    label: "極めて難しい",
    text: "長く非常に激しい瀬で、深刻な危険箇所があります。絶え間なく続く強い流れのため、ルートを見極めるのが難しい場合があります。",
  },
  {
    grade: "VI",
    label: "ほぼ不可能",
    text: "航行可能な限界。適切な水位と条件のもと、万全の予防策をとったうえで熟練チームなら下れる可能性がありますが、それでも生命に関わる大きな危険を伴います。",
  },
];

/** Typical grade by season. `null` means not runnable ("Impossible" in the source). */
export const raftingSeasonColumns = ["1〜5月", "6〜8月", "9〜11月", "11月下旬〜12月"];
export const raftingSeasonMatrix: { river: string; grades: (string | null)[] }[] = [
  { river: "トリシュリ", grades: ["2", "4", "3", "2"] },
  { river: "スンコシ", grades: ["3", "5", "4+", "3+"] },
  { river: "カリガンダキ", grades: ["4", null, "5", "4"] },
  { river: "カルナリ", grades: ["4+", null, "5", "4+"] },
  { river: "アルン", grades: ["4", null, "5", "4+"] },
  { river: "セティ", grades: ["2+", "4+", "3", "4"] },
  { river: "ボテコシ", grades: ["4", null, "4", "3-"] },
  { river: "マルシャンディ", grades: ["4", null, "5", "4"] },
];

export const raftingRivers: RaftingRiver[] = [
  {
    slug: "trisuli",
    name: "トリシュリ川",
    nickname: "モンスーン期の水量で大迫力",
    duration: "2〜3日間",
    grade: "III–IV",
    putIn: "チャウランディ",
    takeOut: "ジュゲダ",
    description:
      "短期ツアーでネパールいちばん人気の川で、川沿いを走るプリティビ・ハイウェイから簡単にアクセスできます。初心者に最適で、モンスーン期にはさらに迫力が増します。",
  },
  {
    slug: "bhote-koshi",
    name: "ボテコシ川",
    nickname: "100%アドレナリン",
    duration: "2日間",
    grade: "III–IV",
    putIn: "カトマンズ",
    takeOut: "カトマンズ",
    description:
      "ネパールで最高の短期ツアーのひとつ。チベット国境から流れ下る約18 kmの途切れない急流で、国内でも指折りのスリリングなパドリングが楽しめます。",
  },
  {
    slug: "kali-gandaki",
    name: "カリガンダキ川",
    nickname: "聖なる川",
    duration: "3日間",
    grade: "III–IV",
    putIn: "ナヤプル",
    takeOut: "ミルミ",
    description:
      "世界でもっとも深い峡谷の、人里離れた渓谷を下ります。背筋も凍る急流と、雪をいただく峰々のすばらしい眺めが魅力です。この川はやがてナラヤニ川に合流します。",
  },
  {
    slug: "arun",
    name: "アルン川",
    nickname: "大自然の体験",
    duration: "3日間",
    grade: "III–IV",
    putIn: "トゥムリンタール",
    takeOut: "トゥムリンタール",
    description:
      "トゥムリンタールへは飛行機で、または車で1日とトレッキング3日間でアクセスします。ネパールでもっとも挑戦しがいのあるラフティングのひとつで、人里離れた田園風景と壮大な山の眺めが広がります。",
  },
  {
    slug: "seti",
    name: "セティ川",
    nickname: "カヤック教室",
    duration: "4日間",
    grade: "III–IV",
    putIn: "ダマウリ",
    takeOut: "デヴガート",
    description:
      "マチャプチャレ（フィッシュテール）の隣、マルディ・ヒマールに源を発する温かく青い川で、ポカラ盆地では一部が地下を流れます。石灰岩の峡谷、緑の森、澄みきった瀬がそろい、カヤックを習うのに最適です。",
  },
  {
    slug: "marsyangdi",
    name: "マルシャンディ川",
    nickname: "荒れ狂う川",
    duration: "5日間",
    grade: "IV–V",
    putIn: "ンガディ",
    takeOut: "ビマルナガル",
    description:
      "その名は地元の言葉で「荒れ狂う川」を意味し、世界屈指のホワイトウォーターのひとつです。グルンの村々やエメラルド色の田畑を抜けてンガディまでトレッキングし、ヒマラヤの巨峰のもとでパドルを漕ぎます。最初の90 kmは急勾配で高い技術を要し、最後の90 kmでは景色と野生動物が主役となります。",
  },
  {
    slug: "sun-koshi",
    name: "スンコシ川",
    nickname: "神々の川",
    duration: "8〜10日間",
    grade: "III–IV（最大V）",
    description:
      "狭い渓谷と温かい水の大きな瀬を抜ける270 kmの旅で、道路でアクセスできるのは出発地点と終了地点のみです。まさに特筆すべき遠征です。",
    needsVerification:
      "The PDF gives both 8–9 and 8–10 days, and grades of both III–IV and 4–5; put-in and take-out points are not provided.",
  },
  {
    slug: "karnali",
    name: "カルナリ川",
    nickname: "西の大湾曲",
    duration: "10日間",
    grade: "III–IV",
    description:
      "ヒマラヤの高地に源を発する、ネパール最長の川です。特に夏の雪解け水による力強い流れ、緑の森、そしてラウテの人々の集落を含む川沿いの小さな村々が待っています。",
    needsVerification: "Put-in and take-out points are not provided in the PDF.",
  },
  {
    slug: "tamur",
    name: "タムール川",
    nickname: "東の宝石",
    duration: "12日間",
    grade: "III–IV",
    description:
      "近年ラフティングに開放されたタムール川は、カンチェンジュンガやマカルーを望みながら東ヒマラヤに沿って流れます。雪をいただく山々を歩く短いトレッキングも含まれます。",
    needsVerification: "Put-in and take-out points are not provided in the PDF.",
  },
];

/* ---------------------------------------------------------- Mountain flight */

export const mountainFlight = {
  headline: "ヒマラヤへの窓",
  intro: [
    "地上でもっとも高い峰々のそばを飛ぶ遊覧飛行の体験には、ただ畏敬の念に満ちた沈黙しかふさわしくありません。このフライトがネパールでもっとも人気のある体験のひとつとなったのも当然です。",
    "あらゆる旅行者に向いています。時間などの事情でトレッキングができなくても、わずか1時間でヒマラヤのパノラマを眺められます。経験豊富なトレッカーでさえ、ひと息に山々を「制覇」できるこの機会を逃すことはめったにありません。",
    "フライトは早朝にカトマンズを出発し、東へ向かいます。待つ時間はほとんどありません。山々は昔から変わらぬ姿で、すぐに現れます。",
  ],
  /** In the order they appear from the aircraft, west to east. */
  peaks: [
    { name: "シシャパンマ（ゴサインタン）", height: 8013, note: "最初に、はるか左手に見えます。" },
    { name: "ドルジェ・ラクパ", height: 6996, note: "横に寝かせた数字の8のような形で、雪に覆われています。" },
    { name: "プルビ・ギャチュ", height: null, note: "カトマンズ盆地の上にそびえ立ちます。" },
    { name: "チョバ・バマレ", height: 5993, note: "ルート上でもっとも小さな峰です。" },
    { name: "ガウリシャンカール", height: 7134, note: "シヴァ神とその妃ガウリの聖なる山で、1979年まであらゆる登頂の試みを退けてきました。" },
    { name: "メルンツェ", height: 7023, note: "台地のような山塊です。" },
    { name: "チュギマゴ", height: 6297, note: "" },
    { name: "ヌンブール", height: 6956, note: "ソルクンブのシェルパの人々に、清らかな乳の源として崇められています。" },
    { name: "カリョルン", height: 6511, note: "朝日に輝く、ひときわ白い峰です。" },
    { name: "チョ・オユー", height: 8201, note: "世界の8,000 m級の巨峰のひとつで、空から見ると圧巻です。" },
    { name: "ギャチュン・カン", height: 7952, note: "登頂が極めて難しい山とされています。" },
    { name: "プモリ", height: 7161, note: "" },
    { name: "ヌプツェ", height: 7855, note: "エベレストから見た位置にちなみ、その名は「西の峰」を意味します。" },
    { name: "エベレスト", height: 8848, note: "ネパール語でサガルマータ、チベット語でチョモランマ。地球上でもっとも高い地点です。" },
  ],
  closing:
    "エベレストについては多くのことが書かれてきましたが、実際に間近で向き合う体験はまったくの別物です。窓いっぱいに広がってもなお、地球の最高地点は謎に包まれたままです。",
  needsVerification:
    "Peak heights are as printed in the PDF. The PDF also calls Cho Oyu the eighth-highest mountain and says Choba Bhamare and Chugimago are unclimbed; those claims were removed.",
};

/* ----------------------------------------------------------------- Bungee */

export const bungee = {
  intro: [
    "熱帯の渓谷の160メートル上に架かる橋を思い浮かべてください。眼下にはネパール屈指の荒々しい川、ボテコシ川が逆巻いています。目を閉じて、飛び込みましょう！",
    "ネパール初のバンジー施設は、ニュージーランドを代表するバンジーコンサルタントの一人が設計し、業界でも指折りの経験豊富なジャンプマスターたちが運営しています。安全には細心の注意が払われています。",
  ],
  facts: [
    { label: "ジャンプの高さ", value: "160 m（約500フィート）" },
    { label: "カトマンズから", value: "車で3時間以内" },
    { label: "ルート", value: "アルニコ・ハイウェイ経由、チベット国境とフレンドシップ・ブリッジまで12 kmの地点" },
    { label: "橋の長さ", value: "166 mの鋼製吊り橋" },
  ],
  bridge: [
    "スイス設計のこの橋はバンジージャンプ専用に建設されたもので、安全率は4倍、耐荷重は1メートルあたり250 kg、橋全体で約41,500 kgです。6,000 mを超える鋼製ワイヤーが使われ、ネパール最長の吊り橋として建設されました。",
    "橋は大きな谷の両岸を結んでいます。建設前、地元の人々は渓谷を渡るのに5時間歩いていました。",
  ],
  beforeYouJump: [
    "ジャンプの前にポケットの中身を出してください。",
    "事前のアルコールや酩酊作用のあるものの摂取はおやめください。",
    "適切なコードを使用するため、全員の体重を量ります。もっとも軽い方は緑、重めの方は赤、もっとも重い方は黒のコードを使います。",
  ],
  needsVerification:
    "The PDF states the bridge's capacity as \"41,500 kg or 4.5 tonnes\"; 41,500 kg is 41.5 tonnes. Claims that the site is the only one in Nepal and \"mishap-proof\" were removed.",
};

/* --------------------------------------------------------- Mountain biking */

export const mountainBiking = {
  intro: [
    "盆地の縁をめぐる裏道を走り、起伏のある道で農村を抜けていきます。日帰りの旅なので、のどかな風景を満喫し、地元の人々と触れ合う時間もたっぷりあります。",
    "私たちの日帰りライドでは、訪れる人の少ないカトマンズ盆地の隠れた一角を探訪し、カトマンズのもうひとつの顔をご紹介します。",
  ],
  routes: [
    {
      name: "カトマンズの裏道",
      route: ["カトマンズ", "ブンガマティ", "チャパガウン", "カトマンズ"],
      description: "盆地南部の農村地帯を裏道でめぐる一日です。",
    },
    {
      name: "ひと味違う市内観光",
      route: ["カトマンズ", "バクタプル", "パタン"],
      description: "盆地にある3つの古都の、名高い歴史的・中世の名所を自転車で訪ねます。",
    },
    {
      name: "展望地ライド",
      route: ["ナガルコット", "カカニ"],
      description: "盆地の定番のヒマラヤ展望地へ上ります。",
    },
    {
      name: "静かな町",
      route: ["サンクー", "ブダニルカンタ"],
      description: "のどかな町サンクーと、ブダニルカンタの聖地を訪ねます。",
    },
  ],
};
