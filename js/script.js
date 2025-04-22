document.addEventListener('DOMContentLoaded', () => {
    // Prevent multiple DOMContentLoaded executions
    if (window.hamburgerInitialized) return;
    window.hamburgerInitialized = true;

    // Gallery lightbox effect
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            alert('This is where a lightbox would open the full image or animation!');
            console.log('Gallery item clicked:', item.src); // Debug log
        });
    });

    // Debounce function to prevent rapid clicks/touches
    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    // Hamburger menu toggle with event delegation
    const handleHamburgerInteraction = debounce((event) => {
        const hamburger = event.target.closest('.hamburger');
        if (hamburger) {
            event.preventDefault(); // Prevent default for touch/click consistency
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu) {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('open');
                console.log('Hamburger interaction, menu state:', navMenu.classList.contains('active'), 'Event type:', event.type); // Debug log
            } else {
                console.error('Nav menu not found');
            }
        }
    }, 200); // 200ms debounce

    // Remove existing listeners to prevent stacking
    document.removeEventListener('click', handleHamburgerInteraction);
    document.removeEventListener('touchstart', handleHamburgerInteraction);

    // Add listeners for click and touch
    document.addEventListener('click', handleHamburgerInteraction);
    document.addEventListener('touchstart', handleHamburgerInteraction, { passive: false });

    // Close mobile menu when a navigation link is clicked
    document.querySelectorAll('.nav-menu li a').forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            if (navMenu && hamburger) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('open');
                console.log('Nav link clicked, menu closed:', link.href); // Debug log
            }
        });
    });

    // Log when listeners are set up
    console.log('Hamburger listeners initialized');
});