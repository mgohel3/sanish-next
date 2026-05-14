import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#F4EDF7] to-[#EFE7F3] pt-20 border-t border-[var(--color-border-subtle)]" id="footer">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-16">
          <div className="col-span-1 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <img src="/assets/img/logo/footer-black-logo.svg" alt="Sanish Laminates" className="h-12 w-auto" />
            </Link>
            <div className="font-sans text-[12px] font-medium text-[var(--accent-blue)] mb-4 uppercase tracking-[0.1em]">
              Premium Decorative Surface Solutions
            </div>
            <p className="text-[15px] text-[var(--text-secondary)] leading-[1.6] max-w-[320px]">
              Crafting elegant laminate and decorative surface solutions for architects, interior designers, commercial projects, and modern living spaces across India.
            </p>
          </div>

          <div>
            <div className="text-[13px] font-semibold text-[var(--text-primary)] mb-5 uppercase tracking-[0.05em]">Collections</div>
            <div className="flex flex-col gap-2">
              <Link href="#" className="text-[15px] text-[var(--text-secondary)] hover:text-[var(--accent-blue)] hover:pl-1.5 transition-all">High Gloss Laminates</Link>
              <Link href="#" className="text-[15px] text-[var(--text-secondary)] hover:text-[var(--accent-blue)] hover:pl-1.5 transition-all">Ultra Matte</Link>
              <Link href="#" className="text-[15px] text-[var(--text-secondary)] hover:text-[var(--accent-blue)] hover:pl-1.5 transition-all">Textured Surfaces</Link>
              <Link href="#" className="text-[15px] text-[var(--text-secondary)] hover:text-[var(--accent-blue)] hover:pl-1.5 transition-all">Acrylic Laminates</Link>
              <Link href="#" className="text-[15px] text-[var(--text-secondary)] hover:text-[var(--accent-blue)] hover:pl-1.5 transition-all">Decorative Panels</Link>
              <Link href="#" className="text-[15px] text-[var(--text-secondary)] hover:text-[var(--accent-blue)] hover:pl-1.5 transition-all">Louvers</Link>
              <Link href="#" className="text-[15px] text-[var(--text-secondary)] hover:text-[var(--accent-blue)] hover:pl-1.5 transition-all">PVC Panels</Link>
            </div>
          </div>

          <div>
            <div className="text-[13px] font-semibold text-[var(--text-primary)] mb-5 uppercase tracking-[0.05em]">Company</div>
            <div className="flex flex-col gap-2">
              <Link href="/about-us" className="text-[15px] text-[var(--text-secondary)] hover:text-[var(--accent-blue)] hover:pl-1.5 transition-all">About Us</Link>
              <Link href="#" className="text-[15px] text-[var(--text-secondary)] hover:text-[var(--accent-blue)] hover:pl-1.5 transition-all">Dealer Enquiry</Link>
              <Link href="#" className="text-[15px] text-[var(--text-secondary)] hover:text-[var(--accent-blue)] hover:pl-1.5 transition-all">Careers</Link>
              <Link href="#" className="text-[15px] text-[var(--text-secondary)] hover:text-[var(--accent-blue)] hover:pl-1.5 transition-all">Press & Media</Link>
              <Link href="/contact-us" className="text-[15px] text-[var(--text-secondary)] hover:text-[var(--accent-blue)] hover:pl-1.5 transition-all">Contact Us</Link>
              <Link href="#" className="text-[15px] text-[var(--text-secondary)] hover:text-[var(--accent-blue)] hover:pl-1.5 transition-all">Blog</Link>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-1">
            <div className="text-[13px] font-semibold text-[var(--text-primary)] mb-5 uppercase tracking-[0.05em]">Stay Connected</div>
            <p className="text-[13px] font-normal leading-[1.7] mb-5 text-[var(--text-secondary)]">
              Subscribe for new collections, design inspiration, and exclusive dealer offers.
            </p>
            <div className="flex mb-6">
              <input type="email" placeholder="Your email address" className="flex-1 bg-white border border-r-0 border-[var(--color-border-subtle)] px-4 py-3 text-[12px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-blue)] transition-colors" />
              <button className="bg-[var(--accent-blue)] text-white px-5 py-3 text-[11px] tracking-[0.1em] uppercase font-medium hover:bg-[var(--color-soft-highlight)] hover:text-[var(--text-primary)] transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <div className="text-[13px] font-semibold text-[var(--text-primary)] mb-5 uppercase tracking-[0.05em]">Download App</div>
            <div className="flex flex-wrap gap-2.5">
              <a href="#" className="flex items-center gap-2 bg-white border border-[var(--color-border-subtle)] px-3.5 py-2 text-[10px] tracking-[0.05em] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] hover:border-[var(--accent-blue)] transition-all">
                <span className="text-base">▶</span> Play Store
              </a>
              <a href="#" className="flex items-center gap-2 bg-white border border-[var(--color-border-subtle)] px-3.5 py-2 text-[10px] tracking-[0.05em] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] hover:border-[var(--accent-blue)] transition-all">
                <span className="text-base">📱</span> App Store
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/45 border-t border-black/5 py-6">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-wrap items-center justify-between gap-4">
          <div className="text-[13px] text-[var(--text-secondary)]">
            &copy; 2026 SANISH Laminates. All Rights Reserved.
          </div>
          <div className="flex gap-5">
            <Link href="#" className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors">Terms & Conditions</Link>
          </div>
          <div className="flex gap-3">
            <a href="#" className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[var(--color-border-subtle)] text-[var(--text-primary)] hover:bg-[var(--accent-blue)] hover:text-white hover:border-[var(--accent-blue)] transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[var(--color-border-subtle)] text-[var(--text-primary)] hover:bg-[var(--accent-blue)] hover:text-white hover:border-[var(--accent-blue)] transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[var(--color-border-subtle)] text-[var(--text-primary)] hover:bg-[var(--accent-blue)] hover:text-white hover:border-[var(--accent-blue)] transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.406.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.688 0 1.029-.653 2.568-.992 3.992-.285 1.193.597 2.164 1.777 2.164 2.133 0 3.771-2.249 3.771-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.289 1.198c-.046.19-.153.232-.349.141-1.3-.604-2.115-2.502-2.115-4.032 0-3.284 2.388-6.302 6.892-6.302 3.636 0 6.466 2.593 6.466 6.059 0 3.615-2.279 6.526-5.441 6.526-1.062 0-2.061-.552-2.403-1.205l-.653 2.491c-.236.902-.876 2.031-1.306 2.719A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
            </a>
            <a href="#" className="flex items-center justify-center w-9 h-9 rounded-full bg-white border border-[var(--color-border-subtle)] text-[var(--text-primary)] hover:bg-[var(--accent-blue)] hover:text-white hover:border-[var(--accent-blue)] transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
