// navigation.js - Mega Menu and Header Animation
document.addEventListener("appReady", () => {
    
    // Header Scroll Effect
    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: {className: 'scrolled', targets: '.sanish-header'}
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const megaMenu = document.querySelector('.mega-menu-overlay');
    let isMenuOpen = false;

    if (menuToggle && megaMenu) {
        menuToggle.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                menuToggle.classList.add('active');
                gsap.to(megaMenu, {
                    y: 0,
                    duration: 0.8,
                    ease: "power4.inOut"
                });
            } else {
                menuToggle.classList.remove('active');
                gsap.to(megaMenu, {
                    y: "-100%",
                    duration: 0.8,
                    ease: "power4.inOut"
                });
            }
        });
    }

    // Mega Menu Hover Image Previews
    const menuLinks = document.querySelectorAll('.mega-menu-links a');
    const previewImg = document.querySelector('.menu-preview-img');

    if (previewImg && menuLinks.length) {
        menuLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const imgUrl = link.getAttribute('data-preview');
                if (imgUrl) {
                    gsap.to(previewImg, {
                        opacity: 0,
                        duration: 0.2,
                        onComplete: () => {
                            // Normally we'd set backgroundImage here, but using placeholder URLs for now
                            // previewImg.style.backgroundImage = `url(${imgUrl})`;
                            gsap.to(previewImg, { opacity: 1, duration: 0.4 });
                        }
                    });
                }
            });
        });
    }
});
