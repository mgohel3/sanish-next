import { redirect } from "next/navigation";

// Redirect old surface-explorer URL to /collection
export default function SurfaceExplorerRedirect() {
  redirect("/collection");
}
