"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    // Keep the same function reference so it can be properly removed on cleanup
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // When ScrollTrigger recalculates (after pins resolve), tell Lenis to resize
    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      lenis.destroy();
      gsap.ticker.remove(tick);
      lenisRef.current = null;
    };
  }, []);

  // On client-side navigation the document height changes but Lenis keeps the
  // old scroll limit (symptom: page won't scroll all the way down). Re-measure
  // after the new route paints. Two rAFs + a delayed pass covers late layout
  // (fonts, images, hero crop).
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    lenis.scrollTo(0, { immediate: true });

    const remeasure = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    const r1 = requestAnimationFrame(() => requestAnimationFrame(remeasure));
    const t1 = setTimeout(remeasure, 300);
    const t2 = setTimeout(remeasure, 1000);

    return () => {
      cancelAnimationFrame(r1);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [pathname]);

  return <>{children}</>;
}
