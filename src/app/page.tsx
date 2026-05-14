import Header from "@/components/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import HorizontalShowcase from "@/components/sections/HorizontalShowcase";
import EliteCollection from "@/components/sections/EliteCollection";
import SpecialEdition from "@/components/sections/SpecialEdition";
import Trust from "@/components/sections/Trust";
import Infrastructure from "@/components/sections/Infrastructure";
import Applications from "@/components/sections/Applications";
import Blog from "@/components/sections/Blog";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[var(--bg-primary)]">
      <Header />
      <Hero />
      <About />
      <HorizontalShowcase />
      <EliteCollection />
      <SpecialEdition />
      <Trust />
      <Infrastructure />
      <Applications />
      <Blog />
      <CTA />
      <Footer />
    </main>
  );
}
