// Smooth scroll for anchor links (including navbar)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Simple lightbox for gallery images
const galleryImages = document.querySelectorAll('.gallery-item img');
galleryImages.forEach(img => {
    img.addEventListener('click', function () {
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = 'rgba(0,0,0,0.8)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = 1000;
        const imgLarge = document.createElement('img');
        imgLarge.src = this.src;
        imgLarge.style.maxWidth = '90vw';
        imgLarge.style.maxHeight = '80vh';
        imgLarge.style.borderRadius = '10px';
        overlay.appendChild(imgLarge);
        overlay.addEventListener('click', function () {
            document.body.removeChild(overlay);
        });
        document.body.appendChild(overlay);
    });
});

// Gallery slider logic
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('gallery-slider');
    const leftArrow = document.getElementById('gallery-arrow-left');
    const rightArrow = document.getElementById('gallery-arrow-right');
    const items = slider.querySelectorAll('.gallery-item');
    const itemsPerView = 3;
    let currentIndex = 0;

    function updateSlider() {
        const itemWidth = items[0].offsetWidth + parseInt(getComputedStyle(items[0]).marginRight || 0);
        slider.scrollTo({
            left: currentIndex * itemWidth,
            behavior: 'smooth'
        });
        leftArrow.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
        rightArrow.style.visibility = currentIndex >= items.length - itemsPerView ? 'hidden' : 'visible';
    }

    leftArrow.addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex = Math.max(0, currentIndex - itemsPerView);
            updateSlider();
        }
    });
    rightArrow.addEventListener('click', function () {
        if (currentIndex < items.length - itemsPerView) {
            currentIndex = Math.min(items.length - itemsPerView, currentIndex + itemsPerView);
            updateSlider();
        }
    });

    // Responsive: recalculate on resize
    window.addEventListener('resize', updateSlider);
    updateSlider();

    // Consultation form submit handler
    const form = document.querySelector('.consultation-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your message! We will contact you soon.');
            form.reset();
        });
    }
});

// Contact section animation on scroll
window.addEventListener('DOMContentLoaded', function() {
    var contactSection = document.querySelector('.contact');
    if (!contactSection) return;
    function onScroll() {
        var rect = contactSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            contactSection.classList.add('contact-in-view');
            window.removeEventListener('scroll', onScroll);
        }
    }
    window.addEventListener('scroll', onScroll);
    onScroll();
}); 