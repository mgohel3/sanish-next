export type InquiryType = "contact" | "dealer" | "architect";

export interface InquiryPayload {
  type?: InquiryType;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  city?: string;
  source_page?: string;
}

export async function submitInquiry(payload: InquiryPayload): Promise<boolean> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
  try {
    const res = await fetch(`${apiUrl}/inquiries/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: payload.type || "contact",
        name: payload.name,
        email: payload.email,
        phone: payload.phone || "",
        message: payload.message || "",
        city: payload.city || "",
        source_page: payload.source_page || (typeof window !== "undefined" ? window.location.pathname : ""),
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
