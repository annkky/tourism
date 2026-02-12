// Burger Menu Toggle
const burgerBtn = document.getElementById('burger-btn');
const navMenu = document.getElementById('nav-menu');

if (burgerBtn && navMenu) {
    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navMenu.querySelectorAll('a, button').forEach(item => {
        item.addEventListener('click', () => {
            burgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header')) {
            burgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

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

console.log('✈️ Странствие загружена успешно!');
