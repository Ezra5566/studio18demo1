/**
 * STUDIO 18 - Premium Fashion Website
 * Smooth animations, scroll effects, and interactions ezzz type
 */

// Initialize Lenis smooth scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// GSAP ScrollTrigger integration with Lenis
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

// Check if not touch device
const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

if (!isTouchDevice && cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth follow for main cursor
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX - 6 + 'px';
        cursor.style.top = cursorY - 6 + 'px';

        // Smoother follow for follower
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        cursorFollower.style.left = followerX - 20 + 'px';
        cursorFollower.style.top = followerY - 20 + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .collection-card, .gallery-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
}

// Navigation scroll effect
const nav = document.querySelector('.nav');
let lastScrollY = 0;

lenis.on('scroll', ({ scroll }) => {
    if (scroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    lastScrollY = scroll;
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        if (mobileMenu.classList.contains('active')) {
            lenis.stop();
            // Stagger animation for links
            mobileLinks.forEach((link, i) => {
                link.style.transitionDelay = `${i * 0.1}s`;
            });
        } else {
            lenis.start();
            mobileLinks.forEach(link => {
                link.style.transitionDelay = '0s';
            });
        }
    });
}

mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
        lenis.start();
    });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero entrance animation
timeline = gsap.timeline({ defaults: { ease: 'expo.out' } });

timeline
    .to('.hero-video', {
        scale: 1,
        duration: 1.5,
        ease: 'expo.out'
    })
    .to('.char', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.05,
        ease: 'expo.out'
    }, '-=1')
    .to('.hero-eyebrow', {
        y: 0,
        opacity: 1,
        duration: 0.8
    }, '-=0.6')
    .to('.hero-subtitle', {
        opacity: 1,
        duration: 0.8
    }, '-=0.4')
    .to('.hero-cta', {
        y: 0,
        opacity: 1,
        duration: 0.8
    }, '-=0.4')
    .to('.hero-scroll-indicator', {
        opacity: 1,
        duration: 0.8
    }, '-=0.4')
    .to('.hero-locations', {
        opacity: 1,
        duration: 0.8
    }, '-=0.4');

// Initialize hero characters
gsap.set('.char', { y: '100%', opacity: 0 });
gsap.set('.hero-eyebrow', { y: 20, opacity: 0 });
gsap.set('.hero-subtitle', { opacity: 0 });
gsap.set('.hero-cta', { y: 20, opacity: 0 });
gsap.set('.hero-scroll-indicator', { opacity: 0 });
gsap.set('.hero-locations', { opacity: 0 });

// Hero parallax on scroll
gsap.to('.hero-video', {
    yPercent: 30,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});

gsap.to('.hero-content', {
    yPercent: -20,
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: '50% top',
        scrub: true
    }
});

// About section animations
gsap.from('.about-image-wrapper', {
    clipPath: 'inset(0 100% 0 0)',
    duration: 1.2,
    ease: 'expo.out',
    scrollTrigger: {
        trigger: '.about',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    }
});

gsap.from('.about-floating-text', {
    y: 50,
    opacity: 0,
    duration: 0.8,
    delay: 0.4,
    ease: 'expo.out',
    scrollTrigger: {
        trigger: '.about',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    }
});

gsap.from('.about-content > *', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'expo.out',
    scrollTrigger: {
        trigger: '.about',
        start: 'top 60%',
        toggleActions: 'play none none reverse'
    }
});

// Stats counter animation
const stats = document.querySelectorAll('.stat-number');
stats.forEach(stat => {
    const target = parseInt(stat.dataset.count);
    
    ScrollTrigger.create({
        trigger: stat,
        start: 'top 80%',
        onEnter: () => {
            gsap.to(stat, {
                innerHTML: target,
                duration: 2,
                ease: 'power2.out',
                snap: { innerHTML: 1 },
                onUpdate: function() {
                    stat.innerHTML = Math.round(this.targets()[0].innerHTML);
                }
            });
        },
        once: true
    });
});

// Collections section animations
gsap.from('.collections-header', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'expo.out',
    scrollTrigger: {
        trigger: '.collections',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    }
});

const collectionCards = document.querySelectorAll('.collection-card');
collectionCards.forEach((card, i) => {
    gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.15,
        ease: 'expo.out',
        scrollTrigger: {
            trigger: '.collections-grid',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Parallax effect on collection cards
collectionCards.forEach(card => {
    const speed = card.dataset.speed || 1;
    const image = card.querySelector('.collection-image img');
    
    gsap.to(image, {
        yPercent: 10 * speed,
        ease: 'none',
        scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
});

// Events section animations
gsap.from('.events-content > *', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'expo.out',
    scrollTrigger: {
        trigger: '.events',
        start: 'top 60%',
        toggleActions: 'play none none reverse'
    }
});

const eventItems = document.querySelectorAll('.event-item');
eventItems.forEach((item, i) => {
    gsap.from(item, {
        x: i % 2 === 0 ? -50 : 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.15,
        ease: 'expo.out',
        scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Gallery section animations
gsap.from('.gallery-header', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    ease: 'expo.out',
    scrollTrigger: {
        trigger: '.gallery',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    }
});

const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach((item, i) => {
    gsap.from(item, {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.08,
        ease: 'expo.out',
        scrollTrigger: {
            trigger: '.gallery-grid',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        }
    });
});

// Partners section animations
gsap.from('.partners-header', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'expo.out',
    scrollTrigger: {
        trigger: '.partners',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    }
});

gsap.from('.partner-logo, .partner-name', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.05,
    ease: 'expo.out',
    scrollTrigger: {
        trigger: '.partners-grid',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
    }
});

// Newsletter section animations
gsap.from('.newsletter-content > *', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'expo.out',
    scrollTrigger: {
        trigger: '.newsletter',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target, {
                offset: -80,
                duration: 1.2
            });
        }
    });
});

// Magnetic effect for buttons
const magneticElements = document.querySelectorAll('.btn-primary, .btn-outline, .social-link');
magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(el, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    el.addEventListener('mouseleave', () => {
        gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        const button = newsletterForm.querySelector('button');
        
        if (input.value) {
            // Success animation
            gsap.to(button, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                    button.innerHTML = '<span>Subscribed!</span>';
                    input.value = '';
                    
                    setTimeout(() => {
                        button.innerHTML = `
                            <span>Subscribe</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        `;
                    }, 3000);
                }
            });
        }
    });
}

// Scroll velocity-based skew effect
let currentSkew = 0;
let targetSkew = 0;

lenis.on('scroll', ({ velocity }) => {
    targetSkew = Math.max(-2, Math.min(2, velocity * 0.01));
});

function updateSkew() {
    currentSkew += (targetSkew - currentSkew) * 0.1;
    targetSkew *= 0.9;
    
    document.querySelectorAll('.collection-card, .gallery-item').forEach(el => {
        el.style.transform = `skewY(${currentSkew}deg)`;
    });
    
    requestAnimationFrame(updateSkew);
}
updateSkew();

// Marquee speed based on scroll velocity
const marqueeContent = document.querySelector('.marquee-content');
let baseSpeed = 30;

lenis.on('scroll', ({ velocity }) => {
    if (marqueeContent) {
        const speedMultiplier = 1 + Math.abs(velocity) * 0.01;
        marqueeContent.style.animationDuration = `${baseSpeed / speedMultiplier}s`;
    }
});

// Intersection Observer for reveal animations
const revealElements = document.querySelectorAll('.section-label, h2, p');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// Prefers reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    lenis.destroy();
    gsap.globalTimeline.clear();
    ScrollTrigger.getAll().forEach(t => t.kill());
}

// Preloader (optional enhancement)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

console.log('🎨 STUDIO 18 - Website initialized');
