// main.js - Core Setup & Utilities

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Lenis for Smooth Scrolling
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // power3.out equivalent
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // 2. GSAP ScrollTrigger Integration
  gsap.registerPlugin(ScrollTrigger);
  
  // Sync Lenis with ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // 3. SplitType Utility Function
  const initSplitText = () => {
    const splitElements = document.querySelectorAll('.split-lines');
    splitElements.forEach(el => {
      new SplitType(el, { types: 'lines, words' });
    });
  };
  
  // Wait for fonts to load to prevent split text calculation issues
  document.fonts.ready.then(() => {
    initSplitText();
    
    // Dispatch custom event to let other modules know it's safe to animate
    document.dispatchEvent(new Event('appReady'));
  });
});
