document.addEventListener('DOMContentLoaded', () => {
    // Gallery lightbox effect
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            alert('This is where a lightbox would open the full image or animation!');
            // Add your preferred lightbox library here (e.g., Lightbox2 or Fancybox)
        });
    });

    // Toggle mobile menu on hamburger click
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('open');
        });
    }

    // Close mobile menu when a navigation link is clicked
    document.querySelectorAll('.nav-menu li a').forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            navMenu.classList.remove('active');
            hamburger.classList.remove('open');
        });
    });
});