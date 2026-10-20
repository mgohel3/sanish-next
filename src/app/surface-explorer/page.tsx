import { redirect } from "next/navigation";

export const metadata = {
  robots: { index: false, follow: false }, // design variant / internal page - not for search engines
};

// Redirect old surface-explorer URL to /collection
export default function SurfaceExplorerRedirect() {
  redirect("/collection");
}
