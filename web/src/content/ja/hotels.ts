/**
 * Accommodation partners.
 * Source: TravelWeb.pdf — Accommodation & Facilities page. Only Soaltee Crowne
 * Plaza has a full fact sheet in the source; other properties are listed by
 * name only (taken from the original site's links) and need details added.
 */
import type { Hotel } from "@/lib/types";

export { hotelCities } from "@/lib/types";

const yes = "あり";
const no = "なし";

export const hotels: Hotel[] = [
  {
    slug: "soaltee-crowne-plaza",
    name: "Soaltee Crowne Plaza",
    city: "Kathmandu",
    details: {
      highlights: [
        { label: "客室", value: "ダブル283室" },
        { label: "建築", value: "パゴダ様式" },
        { label: "敷地", value: "6エーカーの庭園" },
        { label: "空港から", value: "8 km" },
        { label: "市中心部から", value: "5 km" },
        { label: "チェックイン／チェックアウト", value: "13:00／12:00" },
        { label: "客室からの眺め", value: "ヒマラヤまたは庭園" },
        { label: "会議施設", value: "5ホール、18〜650名" },
      ],
      dining: [
        { name: "Bukhara", cuisine: "北インド・フロンティア料理", hours: "ランチ 12:00〜14:30・ディナー 19:00〜23:00" },
        { name: "Alfresco", cuisine: "イタリア料理", hours: "ランチ 12:00〜14:30・ディナー 19:00〜23:00" },
        { name: "Rodi Bar", cuisine: "バー", hours: "深夜0時まで" },
      ],
      groups: [
        {
          title: "客室設備",
          rows: [
            { label: "エアコン", value: yes },
            { label: "ミニバー", value: yes },
            { label: "冷蔵庫", value: no },
            { label: "テレビ", value: yes },
            { label: "ビデオ", value: "リクエストに応じて" },
            { label: "ろ過飲料水", value: yes },
            { label: "給湯・給水", value: yes },
            { label: "ベッドサイズ", value: "キング／クイーン" },
            { label: "音楽", value: yes },
            { label: "電話", value: yes },
            { label: "アメニティ・洗面用品", value: yes },
          ],
        },
        {
          title: "サービス",
          rows: [
            { label: "ルームサービス", value: yes },
            { label: "ランドリー・ドライクリーニング", value: yes },
            { label: "バレーサービス", value: no },
            { label: "専属バトラー", value: no },
            { label: "旅行カウンター", value: "2" },
            { label: "郵便カウンター", value: "1" },
            { label: "客用／業務用エレベーター", value: "2／2" },
            { label: "車椅子の貸し出し", value: yes },
            { label: "タクシーサービス", value: yes },
            { label: "市内シャトル", value: yes },
            { label: "ベビーシッター", value: yes },
            { label: "医師の呼び出し対応", value: yes },
          ],
        },
        {
          title: "レジャー",
          rows: [
            { label: "スイミングプール", value: yes },
            { label: "ヘルスクラブ", value: yes },
            { label: "美容室", value: yes },
            { label: "テニスコート", value: yes },
            { label: "ジョギングエリア", value: yes },
            { label: "ショッピングアーケード", value: yes },
            { label: "ビジネスセンター", value: yes },
            { label: "バドミントン、スカッシュ、卓球、ゴルフ、ビリヤード", value: no },
            { label: "ナイトクラブ、ディスコ、生バンド、民族舞踊", value: no },
          ],
        },
        {
          title: "その他",
          rows: [
            { label: "電力供給", value: yes },
            { label: "クレジットカード", value: "国際カード、JCB" },
            { label: "セーフティボックス", value: yes },
            { label: "防火設備", value: yes },
          ],
        },
      ],
    },
  },
  { slug: "hyatt-regency", name: "Hyatt Regency", city: "Kathmandu" },
  { slug: "yak-and-yeti", name: "Yak & Yeti", city: "Kathmandu" },
  { slug: "radisson", name: "Radisson Hotel", city: "Kathmandu" },
  { slug: "annapurna", name: "Hotel Annapurna", city: "Kathmandu" },
  { slug: "le-meridien", name: "Le Méridien", city: "Kathmandu" },
  { slug: "everest-hotel", name: "The Everest Hotel", city: "Kathmandu" },
  { slug: "dwarikas", name: "Dwarika's Hotel", city: "Kathmandu" },
  { slug: "shanker", name: "Hotel Shanker", city: "Kathmandu" },
  { slug: "vaishali", name: "Hotel Vaishali", city: "Kathmandu" },
  { slug: "hotel-malla", name: "Hotel Malla", city: "Kathmandu" },
  { slug: "hotel-himalaya", name: "Hotel Himalaya", city: "Kathmandu" },
  { slug: "fulbari-resort", name: "Fulbari Resort", city: "Pokhara" },
  { slug: "himalaya-shangrila-resort", name: "Himalaya Shangri-La Resort", city: "Pokhara" },
  { slug: "fishtail-lodge", name: "Fishtail Lodge", city: "Pokhara" },
  { slug: "chitwan-jungle-lodge", name: "Chitwan Jungle Lodge", city: "Chitwan" },
  { slug: "baghmara-wildlife-resort", name: "Baghmara Wildlife Resort", city: "Chitwan" },
  { slug: "chitwan-resort", name: "Chitwan Resort", city: "Chitwan" },
  { slug: "tiger-tops-jungle-lodge", name: "Tiger Tops Jungle Lodge", city: "Chitwan" },
  { slug: "club-himalaya-resort", name: "Club Himalaya Resort", city: "Nagarkot" },
];

export const getHotel = (slug: string) => hotels.find((h) => h.slug === slug);

export const hotelsNeedVerification: string =
  "Hotel names come from the original site's link list; all but Soaltee Crowne Plaza lack details. Confirm which partnerships are current before launch.";
