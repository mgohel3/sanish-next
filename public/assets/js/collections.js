// collections.js - Interactive Collections Section Logic
document.addEventListener("appReady", () => {
    const buttons = document.querySelectorAll('.collection-category-btn');
    const images = document.querySelectorAll('.collection-preview-img');

    if (!buttons.length || !images.length) return;

    buttons.forEach(btn => {
        // Change image on hover or click
        btn.addEventListener('mouseenter', () => {
            const targetId = btn.getAttribute('data-target');

            // Remove active classes
            buttons.forEach(b => b.classList.remove('active'));
            images.forEach(img => img.classList.remove('active'));

            // Add active to current
            btn.classList.add('active');
            const targetImg = document.getElementById(targetId);
            if(targetImg) targetImg.classList.add('active');
        });
    });
});
