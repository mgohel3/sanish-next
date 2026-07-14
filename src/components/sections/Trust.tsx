"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Award, Droplet, Leaf } from "lucide-react";

export default function Trust() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    gsap.fromTo(
      ".trust-card",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      }
    );
  }, []);

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Scratch & Mar Resistant",
      desc: "Advanced overlay technology ensures high resistance to everyday wear."
    },
    {
      icon: <Droplet className="w-6 h-6" />,
      title: "Moisture Protection",
      desc: "Treated Kraft paper core providing superior stability in humid conditions."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "ISO 9001 Certified",
      desc: "Manufactured under strict quality control processes meeting global standards."
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "FSC Certified Options",
      desc: "Responsibly sourced raw materials supporting sustainable forestry."
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 bg-[var(--bg-secondary)] relative z-10">
      <div className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="trust-card bg-white p-8 border border-[var(--color-border-subtle)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all duration-300 group">
              <div className="w-14 h-14 rounded-full bg-[var(--bg-primary)] text-[var(--accent-blue)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                {feature.icon}
              </div>
              <h3 className="font-serif text-lg text-[var(--text-primary)] mb-3">{feature.title}</h3>
              <p className="text-[13px] text-[var(--text-secondary)] leading-[1.6]">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
