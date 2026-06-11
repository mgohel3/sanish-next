import { redirect } from "next/navigation";

// Redirect old surface-explorer URL to /products
export default function SurfaceExplorerRedirect() {
  redirect("/products");
}
