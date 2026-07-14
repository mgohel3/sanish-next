"use client";

export default function DemoForm() {
  return (
    <form
      className="rounded-[24px] p-8 flex flex-col gap-3.5 max-w-[520px]"
      style={{ border: "1px solid var(--color-border-subtle)", background: "#fff" }}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="grid grid-cols-2 gap-3">
        <input type="text" placeholder="Name *" required
          className="w-full rounded-2xl px-4 py-3 text-[13.5px] outline-none transition-all duration-200 focus:border-[#f39ba2] focus:bg-white"
          style={{ background: "#F7F7F9", border: "1.5px solid transparent", color: "var(--text-primary)" }} />
        <input type="tel" placeholder="Phone *" required
          className="w-full rounded-2xl px-4 py-3 text-[13.5px] outline-none transition-all duration-200 focus:border-[#f39ba2] focus:bg-white"
          style={{ background: "#F7F7F9", border: "1.5px solid transparent", color: "var(--text-primary)" }} />
      </div>
      <input type="email" placeholder="Email *" required
        className="w-full rounded-2xl px-4 py-3 text-[13.5px] outline-none transition-all duration-200 focus:border-[#f39ba2] focus:bg-white"
        style={{ background: "#F7F7F9", border: "1.5px solid transparent", color: "var(--text-primary)" }} />
      <select required defaultValue=""
        className="w-full rounded-2xl px-4 py-3 text-[13.5px] outline-none transition-all duration-200 appearance-none focus:border-[#f39ba2] focus:bg-white"
        style={{ background: "#F7F7F9", border: "1.5px solid transparent", color: "#9B9BB0" }}>
        <option value="" disabled>Enquire Type *</option>
        <option value="commercial">Commercial</option>
        <option value="consumer">Consumer</option>
      </select>
      <button type="submit" className="btn-pill btn-pill-primary justify-center mt-1">Submit Inquiry</button>
    </form>
  );
}
