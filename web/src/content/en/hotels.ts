/**
 * Accommodation partners.
 * Source: TravelWeb.pdf — Accommodation & Facilities page. Only Soaltee Crowne
 * Plaza has a full fact sheet in the source; other properties are listed by
 * name only (taken from the original site's links) and need details added.
 */
import type { Hotel } from "@/lib/types";

export { hotelCities } from "@/lib/types";

const yes = "Yes";
const no = "No";

export const hotels: Hotel[] = [
  {
    slug: "soaltee-crowne-plaza",
    name: "Soaltee Crowne Plaza",
    city: "Kathmandu",
    details: {
      highlights: [
        { label: "Rooms", value: "283 doubles" },
        { label: "Architecture", value: "Pagoda style" },
        { label: "Grounds", value: "6 acres of gardens" },
        { label: "From the airport", value: "8 km" },
        { label: "From the town centre", value: "5 km" },
        { label: "Check-in / check-out", value: "13:00 / 12:00" },
        { label: "Room views", value: "Himalaya or garden" },
        { label: "Conference", value: "5 halls, 18 to 650 guests" },
      ],
      dining: [
        { name: "Bukhara", cuisine: "North Indian Frontier", hours: "Lunch 12:00–14:30 · Dinner 19:00–23:00" },
        { name: "Alfresco", cuisine: "Italian", hours: "Lunch 12:00–14:30 · Dinner 19:00–23:00" },
        { name: "Rodi Bar", cuisine: "Bar", hours: "Until midnight" },
      ],
      groups: [
        {
          title: "In your room",
          rows: [
            { label: "Air conditioning", value: yes },
            { label: "Mini bar", value: yes },
            { label: "Refrigerator", value: no },
            { label: "Television", value: yes },
            { label: "Video", value: "On request" },
            { label: "Filtered drinking water", value: yes },
            { label: "Hot & cold water", value: yes },
            { label: "Bed size", value: "King / Queen" },
            { label: "Music", value: yes },
            { label: "Telephone", value: yes },
            { label: "Guest amenities & toiletries", value: yes },
          ],
        },
        {
          title: "Services",
          rows: [
            { label: "Room service", value: yes },
            { label: "Laundry & dry cleaning", value: yes },
            { label: "Valet service", value: no },
            { label: "Personal butler", value: no },
            { label: "Travel counters", value: "2" },
            { label: "Post office counter", value: "1" },
            { label: "Guest / service lifts", value: "2 / 2" },
            { label: "Wheelchair available", value: yes },
            { label: "Taxi service", value: yes },
            { label: "City shuttle", value: yes },
            { label: "Babysitting", value: yes },
            { label: "Doctor on call", value: yes },
          ],
        },
        {
          title: "Leisure",
          rows: [
            { label: "Swimming pool", value: yes },
            { label: "Health club", value: yes },
            { label: "Beauty parlour", value: yes },
            { label: "Tennis court", value: yes },
            { label: "Jogging area", value: yes },
            { label: "Shopping arcade", value: yes },
            { label: "Business centre", value: yes },
            { label: "Badminton, squash, table tennis, golf, billiards", value: no },
            { label: "Nightclub, discotheque, live band, cultural dance", value: no },
          ],
        },
        {
          title: "Practical",
          rows: [
            { label: "Power supply", value: yes },
            { label: "Credit cards", value: "International cards, JCB" },
            { label: "Safe deposit lockers", value: yes },
            { label: "Fire safety", value: yes },
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
