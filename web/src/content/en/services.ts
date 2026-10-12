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
    name: "Tailor-made package tours",
    icon: "map",
    summary: "Every kind of package tour, from budget to luxury.",
    description:
      "Tell us how you like to travel and we will shape the trip around you: heritage cities, wildlife, mountain views, adventure or pilgrimage, at the level of comfort you choose.",
  },
  {
    slug: "air-ticketing",
    name: "Air ticketing",
    icon: "plane",
    summary: "International and domestic airline tickets.",
    description:
      "We book international flights to and from Nepal and domestic flights within the country, including scenic mountain flights.",
  },
  {
    slug: "hotel-booking",
    name: "Hotel booking",
    icon: "bell",
    summary: "Reservations at all standard hotels in Nepal.",
    description:
      "Through our long-standing partnerships with hotels, lodges and resorts, we secure competitive rates without compromising on quality.",
  },
  {
    slug: "transport",
    name: "Private vehicles & drivers",
    icon: "car",
    summary: "Our own fleet, with experienced, well-trained drivers.",
    description:
      "Travel safely and comfortably throughout your stay in cars from our own fleet, driven by experienced professionals.",
  },
  {
    slug: "yoga-meditation",
    name: "Yoga, meditation & astrology",
    icon: "lotus",
    summary: "Look beyond sightseeing with yoga, meditation and astrology.",
    description:
      "Add yoga, meditation or astrology to your journey, in a country where these traditions have deep roots.",
    detailsPending: true,
  },
  {
    slug: "massage-therapy",
    name: "Massage & therapy",
    icon: "leaf",
    summary: "Innovative, high-quality therapy with Green Hearts.",
    description:
      "Unwind with massage and therapy through Green Hearts, dedicated to providing innovative and excellent treatments.",
    detailsPending: true,
  },
  {
    slug: "japan-desk",
    name: "Support for travellers from Japan",
    icon: "globe",
    summary: "Japanese-language support from our Executive Director.",
    description:
      "Our Executive Director personally supports travellers from Japan, introducing Nepal's World Heritage sites, Himalayan trekking, yoga and cuisine suited to Japanese tastes.",
  },
  {
    slug: "import-assistance",
    name: "Import assistance",
    icon: "crate",
    summary: "Help importing Nepali tea, handicrafts and spices.",
    description:
      "Beyond travel, we can help businesses and individuals import tea, handicrafts and spices from Nepal. Contact us to discuss your needs.",
    detailsPending: true,
  },
];
