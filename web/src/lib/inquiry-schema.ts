import { z } from "zod";

/** Shared by the booking request form (client) and POST /api/inquiries (server). */
export const travelStyles = ["Budget", "Standard", "Luxury"] as const;
export const contactPrefs = ["email", "phone", "whatsapp"] as const;

const optionalText = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

export const inquirySchema = z.object({
  /** "Which experience are you interested in?": an experience (trip) slug from src/lib/trips.ts, or "" for a custom experience */
  trip: optionalText(120),
  interests: z.array(z.string().max(80)).max(20).default([]),
  /** ISO date (yyyy-mm-dd) */
  startDate: optionalText(10).refine((v) => !v || /^\d{4}-\d{2}-\d{2}$/.test(v), "Invalid date"),
  flexibleDates: z.boolean().optional(),
  adults: z.coerce.number().int().min(1).max(200).default(2),
  children: z.coerce.number().int().min(0).max(200).default(0),
  travelStyle: z.enum(travelStyles).optional(),
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.email("Please enter a valid email address").max(200),
  phone: optionalText(40),
  country: optionalText(80),
  contactPref: z.enum(contactPrefs).default("email"),
  message: z.string().trim().min(10, "Tell us a little about your plans").max(4000),
  consent: z.literal(true, "Consent is required"),
  /** Language of the page the inquiry was sent from, so staff know which language to reply in. */
  locale: z.enum(["en", "ja"]).optional(),
  /** Honeypot: real visitors never fill this in. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
