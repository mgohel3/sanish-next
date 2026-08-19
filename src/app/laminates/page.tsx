import { redirect } from "next/navigation";

// Products listing temporarily hidden — redirect to /collection.
export default function LaminatesPage() {
  redirect("/collection");
}
