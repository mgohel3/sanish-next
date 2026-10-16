import { revalidatePath } from "next/cache";

/**
 * Called by the Django backend (internal Docker network) every time something public is saved in the CMS, so changes show on the
 * site immediately instead of after the cache timer. Protected by a shared secret.
 */
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || req.headers.get("x-revalidate-secret") !== secret) {
    return new Response("forbidden", { status: 403 });
  }
  revalidatePath("/", "layout");
  return Response.json({ ok: true, at: Date.now() });
}
