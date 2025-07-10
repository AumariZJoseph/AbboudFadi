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
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.background = 'rgba(0,0,0,0.8)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = 1000;
        const imgLarge = document.createElement('img');
        imgLarge.src = this.src;
        imgLarge.style.maxWidth = '90%';
        imgLarge.style.maxHeight = '80%';
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

// About section animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    const doctorPhoto = document.getElementById('doctor-photo');
    const credentialItems = document.querySelectorAll('.credential-item');
    const highlightItems = document.querySelectorAll('.about-highlights li');
    const quoteContainer = document.querySelector('.quote-container');
    
    // Photo hover effect
    if (doctorPhoto) {
        doctorPhoto.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        doctorPhoto.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Animate credential items on scroll
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, observerOptions);
    
    // Observe credential and highlight items
    credentialItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    highlightItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    // Quote container animation
    if (quoteContainer) {
        quoteContainer.style.opacity = '0';
        quoteContainer.style.transform = 'translateY(30px)';
        quoteContainer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        const quoteObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 500);
                }
            });
        }, { threshold: 0.5 });
        
        quoteObserver.observe(quoteContainer);
    }
    
    // Experience badge pulse animation
    const experienceBadge = document.querySelector('.experience-badge');
    if (experienceBadge) {
        setInterval(() => {
            experienceBadge.style.transform = 'scale(1.05)';
            setTimeout(() => {
                experienceBadge.style.transform = 'scale(1)';
            }, 200);
        }, 3000);
    }
}); 