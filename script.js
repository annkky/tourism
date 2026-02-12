// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.getElementById('burger-btn');
    const navMenu = document.getElementById('nav-menu');

    if (burgerBtn && navMenu) {
        console.log('✅ Burger menu elements found');
        
        // Toggle menu on burger click
        burgerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🍔 Burger clicked - toggling menu');
            burgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            const expanded = burgerBtn.classList.contains('active');
            burgerBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
            
            // Блокировка прокрутки при открытом меню
            if (expanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking nav links
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('📍 Nav link clicked');
                burgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
                burgerBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking book button
        const bookBtn = navMenu.querySelector('.btn-book');
        if (bookBtn) {
            bookBtn.addEventListener('click', function() {
                console.log('📘 Book button clicked');
                burgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
                burgerBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active')) {
                if (!e.target.closest('header') && !e.target.closest('#nav-menu')) {
                    console.log('❌ Clicked outside - closing menu');
                    burgerBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                    burgerBtn.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            }
        });

        // Close menu when pressing Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                console.log('⌨️ Escape pressed - closing menu');
                burgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
                burgerBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    } else {
        console.error('❌ Burger menu elements NOT found!');
    }
});

// Smooth navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Спасибо за ваше письмо! Мы свяжемся с вами вскоре.');
        contactForm.reset();
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.tour-card, .feature, .review-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
});

// Tour button clicks
document.querySelectorAll('.btn-tour').forEach(btn => {
    btn.addEventListener('click', function() {
        const tourTitle = this.closest('.tour-card').querySelector('h3').textContent;
        const emailInput = document.querySelector('.contact-form input[type="email"]');
        if (emailInput) {
            emailInput.focus();
            emailInput.placeholder = `Выбран тур: ${tourTitle}`;
        }
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

console.log('✈️ Странствие загружена успешно!');
