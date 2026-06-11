import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Home2Hero from "@/components/sections/home2/Hero";
import Home2Stats from "@/components/sections/home2/Stats";
import Home2Categories from "@/components/sections/home2/Categories";
import Home2WhyUs from "@/components/sections/home2/WhyUs";
import Home2Applications from "@/components/sections/home2/Applications";
import Home2Process from "@/components/sections/home2/Process";
import Home2Dealers from "@/components/sections/home2/Dealers";
import Home2SampleCTA from "@/components/sections/home2/SampleCTA";

export const metadata = {
  title: "Sanish Laminates | Premium Laminates for Every Surface",
  description:
    "India's trusted laminate manufacturer — 500+ designs, ISI certified, moisture & scratch resistant. Explore decorative laminates for kitchens, wardrobes, offices & more.",
};

export default function Home2() {
  return (
    <main>
      <Header />
      <Home2Hero />
      <Home2Stats />
      <Home2Categories />
      <Home2WhyUs />
      <Home2Applications />
      <Home2Process />
      <Home2Dealers />
      <Home2SampleCTA />
      <Footer />
    </main>
  );
}
