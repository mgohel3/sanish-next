import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { MapPin, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "Contact Us | Sanish Laminates",
  description: "Get in touch with Sanish Laminates for inquiries, dealer network details, or any other questions.",
};

export default function ContactUsPage() {
  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>
      <Header />
      <PageHero
        eyebrow="Get in Touch"
        title="Contact Us"
        image="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000"
        description="Speak with our team about products, samples, specifications and dealer support."
      />

      <section className="home-section bg-[var(--bg-primary)]">
        <div className="site-container">
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-[60px] lg:gap-[100px]">
            
            {/* Contact Info & Map */}
            <div className="flex flex-col gap-10">
              <div>
                <h3 className="font-serif text-[clamp(28px,3vw,36px)] text-[var(--text-primary)] mb-8">Our Headquarters</h3>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center flex-shrink-0 text-[var(--accent-blue)]">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--text-secondary)] mb-2">Address</h4>
                      <p className="text-[15px] text-[var(--text-primary)] leading-[1.6]">
                        SAPPHIRE WOODS (INDIA) LLP<br/>
                        Regd. Office: 203 Aggarwal Chamber, Sainik Vihar<br/>
                        Pitam Pura, Delhi - 110034
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center flex-shrink-0 text-[var(--accent-blue)]">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--text-secondary)] mb-2">Phone</h4>
                      <p className="text-[15px] text-[var(--text-primary)] leading-[1.6]">
                        <a href="tel:+917027777032" className="hover:text-[var(--accent-blue)] transition-colors">(+91) 7027 777 032</a><br/>
                        <a href="tel:+919876543210" className="hover:text-[var(--accent-blue)] transition-colors">(+91) 9876 543 210</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center flex-shrink-0 text-[var(--accent-blue)]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--text-secondary)] mb-2">Email</h4>
                      <p className="text-[15px] text-[var(--text-primary)] leading-[1.6]">
                        <a href="mailto:info@sanishlaminate.com" className="hover:text-[var(--accent-blue)] transition-colors">info@sanishlaminate.com</a><br/>
                        <a href="mailto:sales@sanishlaminate.com" className="hover:text-[var(--accent-blue)] transition-colors">sales@sanishlaminate.com</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Map */}
              <div className="w-full h-[300px] bg-gray-200 border border-[var(--border)] overflow-hidden">
                <iframe
                  src="https://maps.google.com/maps?q=Sanish+Laminate,28.6895846,77.1227317&z=17&ie=UTF8&iwloc=&output=embed"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sanish Laminates Headquarters Map"
                ></iframe>
              </div>
            </div>
            
            {/* Premium Form */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] p-[40px] md:p-[60px] shadow-[0_30px_60px_rgba(0,0,0,0.04)] h-fit">
              <h3 className="font-serif text-[28px] text-[var(--text-primary)] mb-2">Post your requirements</h3>
              <p className="text-[14px] text-[var(--text-secondary)] mb-8 leading-relaxed">
                Fill out the form below and our architectural consultants will get back to you within 24 hours.
              </p>
              
              <form className="flex flex-col gap-6">
                {/* Row 1: Name + Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] font-medium text-[var(--text-secondary)] tracking-wide uppercase">Name</label>
                    <input type="text" required
                      className="bg-transparent border-b border-[var(--border)] py-3 text-[15px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors w-full" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] font-medium text-[var(--text-secondary)] tracking-wide uppercase">Phone</label>
                    <input type="tel" required
                      className="bg-transparent border-b border-[var(--border)] py-3 text-[15px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors w-full" />
                  </div>
                </div>

                {/* Row 2: Email + Pin Code */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] font-medium text-[var(--text-secondary)] tracking-wide uppercase">Email</label>
                    <input type="email" required
                      className="bg-transparent border-b border-[var(--border)] py-3 text-[15px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors w-full" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] font-medium text-[var(--text-secondary)] tracking-wide uppercase">Pin Code</label>
                    <input type="text" required
                      className="bg-transparent border-b border-[var(--border)] py-3 text-[15px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors w-full" />
                  </div>
                </div>

                {/* Enquire Type */}
                <div className="flex flex-col gap-2 mt-2">
                  <label className="text-[12px] font-medium text-[var(--text-secondary)] tracking-wide uppercase">Enquire Type</label>
                  <select required className="bg-transparent border-b border-[var(--border)] py-3 text-[15px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors w-full appearance-none">
                    <option value="" disabled selected>Select type</option>
                    <option value="commercial">Commercial</option>
                    <option value="consumer">Consumer</option>
                  </select>
                </div>

                <button type="button" className="mt-8 bg-[var(--text-primary)] text-[var(--bg-primary)] px-8 py-4 text-[13px] font-medium tracking-[0.05em] transition-colors hover:bg-[var(--accent-blue)] hover:text-white w-full">
                  SUBMIT INQUIRY
                </button>
              </form>
            </div>
            
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
