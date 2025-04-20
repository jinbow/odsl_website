// Simple gallery lightbox effect
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            alert('This is where a lightbox would open the full image or animation!');
            // Add your preferred lightbox library here (e.g., Lightbox2 or Fancybox)
        });
    });
});