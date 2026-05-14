import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "About Us | Sanish Laminates",
  description: "Best Laminate Company in India. Innovation and Design.",
};

export default function AboutUsPage() {
  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-[200px] pb-[160px] text-center border-b border-[var(--border)] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1618221118493-9c48b2eb5959?q=80&w=2000" 
            alt="About Sanish" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-[11px] tracking-[0.2em] uppercase text-white/80 mb-6 font-semibold">
            About Sanish Laminate
          </div>
          <h1 className="font-serif text-[clamp(48px,6vw,80px)] text-white mb-6 leading-tight tracking-wide">
            ABOUT US
          </h1>
        </div>
      </section>

      {/* Innovation & Design Section */}
      <section className="py-[120px] bg-[var(--bg-primary)]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] lg:gap-[100px] items-center">
            <div>
              <div className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] mb-4 font-medium">
                Best Laminate Company in India
              </div>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] text-[var(--text-primary)] mb-8 leading-[1.1]">
                Innovation and Design
              </h2>
              
              <div className="space-y-6 text-[15px] text-[var(--text-secondary)] leading-[1.8]">
                <p>
                  Founded in 2017, Sanish has made a strong foothold in the market as one of the fastest-growing laminate brands. With a strong commitment to innovation and design, we have stepped forward to bring the most innovative designs for your interior spaces. We believe that every space deserves the best, that's why we are here to adorn your space with nothing but perfection. Our focus on trailblazing, quirky designs sets us apart and makes us one of the best laminate brands in India.
                </p>
                <p>
                  Our dedication goes beyond just products; it's about cultivating lasting connections. We prioritize delivering exceptional value to our clients, aiming to leave an indelible mark of quality, innovation, and beauty in every space we have the privilege to influence.
                </p>
                <p>
                  At the heart of our success lies an unwavering commitment to research and development. Through extensive investment in R&D, we bring forth products of the highest quality that are not only ahead of their time but also possess a timeless appeal in their design and craftsmanship.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/5] bg-[var(--bg-secondary)] border border-[var(--border)] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                <img 
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200" 
                  className="w-full h-full object-cover" 
                  alt="Material Finishes"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision & Values */}
      <section className="py-[100px] bg-[var(--bg-secondary)] border-y border-[var(--border)]">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="font-serif text-[clamp(32px,4vw,48px)] text-[var(--text-primary)] mb-[80px]">
            Mission, Vision & Values
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[40px] lg:gap-[60px]">
            {/* Mission */}
            <div className="text-center group">
              <div className="mb-8 overflow-hidden rounded-[4px] aspect-[4/3]">
                <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Mission" />
              </div>
              <h3 className="text-[13px] tracking-[0.1em] uppercase font-semibold text-[var(--text-primary)] mb-4">Mission</h3>
              <p className="text-[14px] text-[var(--text-secondary)] leading-[1.7] max-w-[280px] mx-auto">
                Transforming spaces through the timeless design and longevity of our pioneering decorative solutions.
              </p>
            </div>
            
            {/* Vision */}
            <div className="text-center group">
              <div className="mb-8 overflow-hidden rounded-[4px] aspect-[4/3]">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Vision" />
              </div>
              <h3 className="text-[13px] tracking-[0.1em] uppercase font-semibold text-[var(--text-primary)] mb-4">Vision</h3>
              <p className="text-[14px] text-[var(--text-secondary)] leading-[1.7] max-w-[280px] mx-auto">
                To craft products that inspire people to adorn their spaces with unmatched aesthetic brilliance.
              </p>
            </div>
            
            {/* Values */}
            <div className="text-center group">
              <div className="mb-8 overflow-hidden rounded-[4px] aspect-[4/3]">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Values" />
              </div>
              <h3 className="text-[13px] tracking-[0.1em] uppercase font-semibold text-[var(--text-primary)] mb-4">Values</h3>
              <p className="text-[14px] text-[var(--text-secondary)] leading-[1.7] max-w-[280px] mx-auto">
                At Sanish, integrity is our cornerstone, guiding every interaction with unwavering honesty and transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us & Sustainability */}
      <section className="py-[120px] bg-[var(--bg-primary)]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-[800px] mx-auto text-center mb-16">
            <h2 className="font-serif text-[36px] text-[var(--text-primary)] mb-6">Why Choose Us?</h2>
            <p className="text-[15px] text-[var(--text-secondary)] leading-[1.8] mb-6">
              When it comes to laminates, Sanish offers a comprehensive selection to cater to diverse preferences. From cost-effective options to premium, luxurious designs, we've got your needs covered. We are dedicated to delivering innovative products that meet a wide range of design requirements.
            </p>
            <p className="text-[15px] text-[var(--text-secondary)] leading-[1.8]">
              Our portfolio includes first-in-market textured glitter laminates along with specialized collections. That's precisely why, when it comes to enhancing your interior spaces, you choose Sanish, and <strong>"Just Design With It!"</strong>
            </p>
          </div>

          <div className="mt-[100px] bg-[var(--bg-card)] border border-[var(--border)] p-[40px] md:p-[80px] text-center">
            <div className="text-[11px] tracking-[0.15em] uppercase text-[var(--text-secondary)] mb-4 font-medium">
              Responsibility
            </div>
            <h3 className="font-serif text-[32px] text-[var(--text-primary)] mb-6">Sustainable Practices</h3>
            <div className="max-w-[700px] mx-auto text-[15px] text-[var(--text-secondary)] leading-[1.8] space-y-6">
              <p>
                Being the best laminate manufacturer and supplier in India, we never compromise when it comes to following sustainable practices. We believe that being at the forefront of the industry requires responsibility towards the environment.
              </p>
              <p>
                Our products undergo meticulous processes that minimize our ecological footprint. From manufacturing to supply, we are committed to employing efficient and sustainable practices that align with our dedication to a greener future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-[120px] bg-[var(--bg-secondary)] border-t border-[var(--border)] text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2000" 
            alt="Ready to start" 
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-[700px] mx-auto">
            <h2 className="font-serif text-[clamp(36px,4.5vw,56px)] leading-[1.1] text-[var(--text-primary)] mb-6">
              Ready to elevate your space?
            </h2>
            <p className="text-[16px] text-[var(--text-secondary)] mb-10 leading-[1.7]">
              Whether you're an architect working on a large-scale project or a homeowner looking for the perfect finish, our team is here to assist you with expert advice and material samples.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/contact-us" className="inline-flex items-center justify-center px-8 py-4 bg-[var(--accent-blue)] text-white text-[13px] font-medium transition-colors hover:bg-[var(--text-primary)]">
                Contact Our Team
              </a>
              <a href="/surface-explorer" className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-[var(--border)] text-[var(--text-primary)] text-[13px] font-medium transition-colors hover:bg-white">
                Explore Collection
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
