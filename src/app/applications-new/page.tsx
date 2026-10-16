import { redirect } from "next/navigation";

/** The collage moved to /applications — keep old links (and ?space= / ?page=) working. */
export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const q = new URLSearchParams(Object.entries(await searchParams).filter(([, v]) => v) as [string, string][]).toString();
  redirect(q ? `/applications?${q}` : "/applications");
}
