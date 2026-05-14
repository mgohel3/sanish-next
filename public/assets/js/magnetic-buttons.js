// magnetic-buttons.js - Magnetic Hover Effects
document.addEventListener("appReady", () => {
    
    const magnetics = document.querySelectorAll('.magnetic-element');
    
    magnetics.forEach(magnetic => {
        const xTo = gsap.quickTo(magnetic, "x", {duration: 1, ease: "elastic.out(1, 0.3)"});
        const yTo = gsap.quickTo(magnetic, "y", {duration: 1, ease: "elastic.out(1, 0.3)"});

        magnetic.addEventListener("mousemove", (e) => {
            const bound = magnetic.getBoundingClientRect();
            const mouseX = e.clientX - bound.left - (bound.width / 2);
            const mouseY = e.clientY - bound.top - (bound.height / 2);
            
            // Move element towards mouse slightly
            xTo(mouseX * 0.4);
            yTo(mouseY * 0.4);
        });

        magnetic.addEventListener("mouseleave", () => {
            // Reset position
            xTo(0);
            yTo(0);
        });
    });
});
