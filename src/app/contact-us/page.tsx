import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "Contact Us | Sanish Laminates",
  description: "Get in touch with Sanish Laminates for inquiries, dealer network details, or any other questions.",
};

export default function ContactUsPage() {
  return (
    <main style={{ backgroundColor: "var(--bg-primary)" }}>
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-[200px] pb-[160px] text-center border-b border-[var(--border)] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000" 
            alt="Contact Sanish" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-[11px] tracking-[0.2em] uppercase text-white/80 mb-6 font-semibold">
            Get in Touch
          </div>
          <h1 className="font-serif text-[clamp(48px,6vw,80px)] text-white mb-6 leading-tight tracking-wide">
            CONTACT US
          </h1>
        </div>
      </section>

      <section className="py-[120px] bg-[var(--bg-primary)]">
        <div className="container mx-auto px-6 md:px-12">
          
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
                        123 Innovation Drive, Andheri West<br/>
                        Mumbai, Maharashtra 400053
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120663.02949704732!2d72.78453472099304!3d19.07609053975525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
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
              <h3 className="font-serif text-[28px] text-[var(--text-primary)] mb-2">Send an Inquiry</h3>
              <p className="text-[14px] text-[var(--text-secondary)] mb-8 leading-relaxed">
                Fill out the form below and our architectural consultants will get back to you within 24 hours.
              </p>
              
              <form className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2 relative group">
                    <label className="text-[12px] font-medium text-[var(--text-secondary)] tracking-wide uppercase">First Name</label>
                    <input 
                      type="text" 
                      required 
                      className="bg-transparent border-b border-[var(--border)] py-3 text-[15px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-2 relative group">
                    <label className="text-[12px] font-medium text-[var(--text-secondary)] tracking-wide uppercase">Last Name</label>
                    <input 
                      type="text" 
                      required 
                      className="bg-transparent border-b border-[var(--border)] py-3 text-[15px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2 relative group">
                    <label className="text-[12px] font-medium text-[var(--text-secondary)] tracking-wide uppercase">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      className="bg-transparent border-b border-[var(--border)] py-3 text-[15px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-2 relative group">
                    <label className="text-[12px] font-medium text-[var(--text-secondary)] tracking-wide uppercase">Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      className="bg-transparent border-b border-[var(--border)] py-3 text-[15px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors w-full"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2 relative group mt-2">
                  <label className="text-[12px] font-medium text-[var(--text-secondary)] tracking-wide uppercase">Subject</label>
                  <select className="bg-transparent border-b border-[var(--border)] py-3 text-[15px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors w-full appearance-none">
                    <option>General Inquiry</option>
                    <option>Dealer Network</option>
                    <option>Bulk Order / Project</option>
                    <option>Product Information</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2 relative group mt-2">
                  <label className="text-[12px] font-medium text-[var(--text-secondary)] tracking-wide uppercase">Your Message</label>
                  <textarea 
                    rows={4} 
                    required 
                    className="bg-transparent border-b border-[var(--border)] py-3 text-[15px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors w-full resize-y"
                  ></textarea>
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
