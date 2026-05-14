// hero.js - Product-Focused Laminate Slabs Animation
document.addEventListener("appReady", () => {
    
    // 1. Initial Load Cinematic Animation
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    // Background image slight zoom
    tl.fromTo('.hero-bg-image img', 
        { scale: 1.1 }, 
        { scale: 1, duration: 2.5, ease: "power2.out" }, 
        0
    );
    
    // Text staggering
    tl.fromTo('.hero-title .split-lines',
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 1.5, stagger: 0.15 },
        0.5
    );
    
    tl.fromTo('.hero-pinned-wrapper p, .hero-pinned-wrapper a',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2 },
        1
    );

    // 2. Sample Kit Cards Staggered Entry
    tl.fromTo('.sample-kit-card',
        { y: 150, opacity: 0, rotation: 5 },
        { y: 0, opacity: 1, rotation: 0, duration: 1.5, stagger: 0.2, ease: "back.out(1.2)" },
        0.8
    );

    // 3. Continuous floating for sample cards
    gsap.to('.sample-kit-card', {
        y: "-=15",
        rotation: "random(-2, 2)",
        duration: 4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: {
            each: 0.5,
            from: "random"
        }
    });

    // 4. Parallax overlap effect into Collections
    gsap.to('.sample-kit-card', {
        y: -150,
        ease: "none",
        scrollTrigger: {
            trigger: ".hero-pinned-wrapper",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
});
