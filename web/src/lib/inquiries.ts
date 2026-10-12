import type { InquiryInput } from "./inquiry-schema";

/**
 * Persistence boundary for trip inquiries.
 *
 * TODO(backend): replace the body with a database insert (see Inquiry model in
 * prisma/schema.prisma) and an email notification to the office. Until then,
 * inquiries are logged on the server so nothing is silently dropped in testing.
 */
export async function saveInquiry(input: InquiryInput): Promise<{ reference: string }> {
  const reference = `ATT-${Date.now().toString(36).toUpperCase()}`;
  console.info("[inquiry]", reference, JSON.stringify({ ...input, website: undefined }));
  return { reference };
}
