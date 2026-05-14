// material-interactions.js - Texture Interactions
document.addEventListener("appReady", () => {
    
    const container = document.querySelector('.laboratory-interactive-container');
    const glossLayer = document.querySelector('.lab-bg-gloss');
    const dragger = document.querySelector('.lab-dragger');
    
    if (!container || !glossLayer || !dragger) return;

    let isDragging = false;

    // Vanilla JS Dragger Implementation
    const onMove = (clientX) => {
        const rect = container.getBoundingClientRect();
        let x = clientX - rect.left;
        
        // Clamp bounds
        if (x < 0) x = 0;
        if (x > rect.width) x = rect.width;
        
        const percentage = (x / rect.width) * 100;
        
        // Move the gloss layer width and dragger position
        glossLayer.style.width = `${percentage}%`;
        dragger.style.left = `${percentage}%`;
    };

    container.addEventListener('mousedown', (e) => {
        isDragging = true;
        onMove(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        onMove(e.clientX);
    });

    window.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // Touch support
    container.addEventListener('touchstart', (e) => {
        isDragging = true;
        onMove(e.touches[0].clientX);
    }, {passive: true});

    window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        onMove(e.touches[0].clientX);
    }, {passive: true});

    window.addEventListener('touchend', () => {
        isDragging = false;
    });
});
