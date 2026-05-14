// sanish-animations.js

document.addEventListener("DOMContentLoaded", (event) => {
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

  // GSAP ScrollTrigger Integration
  gsap.registerPlugin(ScrollTrigger);
  
  // Sync Lenis with ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // SplitType Utility Function
  const initSplitText = () => {
    const splitElements = document.querySelectorAll('[data-split="true"]');
    splitElements.forEach(el => {
      new SplitType(el, { types: 'lines, words, chars' });
    });
  };
  initSplitText();
  
  // Base configuration for animations
  const premiumEase = "power3.out";
  const defaultDuration = 1.2;

  // Wait for fonts to load before doing text calculations
  document.fonts.ready.then(() => {
    
    // Global scroll reveal elements
    const revealElements = document.querySelectorAll('.gs-reveal-up');
    revealElements.forEach((el) => {
      // Don't double animate if it's already in the hero or animated inline
      if(!el.closest('.hero-section')) {
        gsap.fromTo(el, 
          { y: 50, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: defaultDuration, 
            ease: premiumEase,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    // About Section Parallax Image
    const aboutImg = document.querySelector('.about-img-parallax');
    if(aboutImg) {
      gsap.to(aboutImg, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-image-wrapper",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // Texture Experience Interaction
    const swatches = document.querySelectorAll('.texture-swatch');
    const previewInner = document.querySelector('.texture-preview-inner');
    const bgLayer = document.querySelector('.texture-bg-layer');
    
    swatches.forEach(swatch => {
      swatch.addEventListener('mouseenter', () => {
        // Remove active from all
        swatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        
        // Update images and colors
        const newImg = swatch.getAttribute('data-image');
        const newColor = swatch.getAttribute('data-bg');
        
        if(previewInner) previewInner.style.backgroundImage = `url('${newImg}')`;
        if(bgLayer) bgLayer.style.backgroundColor = newColor;
      });
    });

    // Testimonial Swiper Initialization
    if(typeof Swiper !== 'undefined') {
      new Swiper('.testimonial-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 800,
        navigation: {
          nextEl: '.testi-next',
          prevEl: '.testi-prev',
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        }
      });
    }

    ScrollTrigger.refresh();
  });
});
