// cursor.js - Custom Dot Cursor Logic
document.addEventListener("appReady", () => {
    
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.custom-cursor-follower');
    
    if (!cursor || !follower) return;

    // Use GSAP quickTo for performance
    const cursorX = gsap.quickTo(cursor, "left", { duration: 0.1, ease: "power3" });
    const cursorY = gsap.quickTo(cursor, "top", { duration: 0.1, ease: "power3" });
    
    const followerX = gsap.quickTo(follower, "left", { duration: 0.4, ease: "power3" });
    const followerY = gsap.quickTo(follower, "top", { duration: 0.4, ease: "power3" });

    window.addEventListener('mousemove', (e) => {
        cursorX(e.clientX);
        cursorY(e.clientY);
        followerX(e.clientX);
        followerY(e.clientY);
    });

    // Handle hover states on links, buttons, and magnetic elements
    const hoverElements = document.querySelectorAll('a, button, .magnetic-element');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });
});
