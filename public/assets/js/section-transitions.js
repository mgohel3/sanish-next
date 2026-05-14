// section-transitions.js - Horizontal Surface Explorer Logic
document.addEventListener("appReady", () => {
    
    const container = document.querySelector('.horizontal-scroll-container');
    const wrapper = document.querySelector('.horizontal-explorer-wrapper');
    
    if (container && wrapper) {
        // We have 2 panels, so we scroll 100vw to the left
        const scrollWidth = window.innerWidth;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: wrapper,
                start: "top top",
                end: `+=${scrollWidth}`, 
                pin: true,
                scrub: 1,
                anticipatePin: 1
            }
        });

        tl.to(container, {
            x: -scrollWidth,
            ease: "none"
        });

        // Add subtle parallax to images within panels
        const panels = document.querySelectorAll('.horizontal-panel img');
        panels.forEach((img, i) => {
            gsap.fromTo(img, 
                { scale: 1.1, xPercent: 5 },
                { 
                    scale: 1, 
                    xPercent: -5,
                    ease: "none",
                    scrollTrigger: {
                        trigger: wrapper,
                        start: "top top",
                        end: `+=${scrollWidth}`,
                        scrub: true
                    }
                }
            );
        });
    }
});
