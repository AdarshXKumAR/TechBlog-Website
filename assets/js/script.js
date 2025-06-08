// Theme Management
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add smooth transition effect
    body.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    setTimeout(() => {
        body.style.transition = '';
    }, 300);
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const mobileToggle = document.getElementById('mobileToggle');
    
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
}

// Smooth Scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const elementPosition = element.offsetTop - navHeight;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
    
    // Close mobile menu if open
    const navMenu = document.getElementById('navMenu');
    const mobileToggle = document.getElementById('mobileToggle');
    navMenu.classList.remove('active');
    mobileToggle.classList.remove('active');
}

// Navbar Scroll Effect
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 50;
    
    navbar.classList.toggle('scrolled', scrolled);
}

// Scroll Animation Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Add staggered animation for grid items
                if (entry.target.classList.contains('blog-card') || 
                    entry.target.classList.contains('feature-card')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    entry.target.style.animationDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.blog-card, .feature-card, .contact-method, .stat-item'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Contact Form Handling
function initContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.form-submit');
    const submitText = submitBtn.querySelector('.submit-text');
    const submitLoader = submitBtn.querySelector('.submit-loader');
    const submitIcon = submitBtn.querySelector('.submit-icon');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Reset form and show success
        form.reset();
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        showModal();
    });
}

// Modal Functions
function showModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('show');
    
    // Auto close after 3 seconds
    setTimeout(() => {
        closeModal();
    }, 3000);
}

function closeModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
}

// Newsletter Subscription
function initNewsletterForms() {
    const newsletterBtns = document.querySelectorAll('.newsletter-btn');
    
    newsletterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const input = btn.previousElementSibling || btn.parentNode.querySelector('.newsletter-input');
            const email = input.value.trim();
            
            if (email && isValidEmail(email)) {
                input.value = '';
                showModal();
            } else {
                // Add error styling
                input.style.borderColor = '#ef4444';
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 2000);
            }
        });
    });
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Parallax Effect for Hero Section
function initParallaxEffect() {
    const hero = document.querySelector('.hero-section');
    const floatingElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        floatingElements.forEach((element, index) => {
            const speed = 0.2 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Smooth Page Load Animation
function initPageLoadAnimation() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        
        // Animate elements in sequence
        const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-cta');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });
}

// Keyboard Navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC key closes modal
        if (e.key === 'Escape') {
            closeModal();
        }
        
        // Enter key on newsletter inputs
        if (e.key === 'Enter' && e.target.classList.contains('newsletter-input')) {
            const btn = e.target.nextElementSibling || e.target.parentNode.querySelector('.newsletter-btn');
            if (btn) btn.click();
        }
    });
}

// Performance Optimization
function initPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            handleNavbarScroll();
        }, 10);
    }, { passive: true });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    initScrollAnimations();
    initContactForm();
    initNewsletterForms();
    initParallaxEffect();
    initPageLoadAnimation();
    initKeyboardNavigation();
    initPerformanceOptimizations();
    
    // Handle navbar scroll immediately
    handleNavbarScroll();
});

// Handle modal clicks outside content
document.addEventListener('click', (e) => {
    const modal = document.getElementById('successModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    const navMenu = document.getElementById('navMenu');
    const mobileToggle = document.getElementById('mobileToggle');
    navMenu.classList.remove('active');
    mobileToggle.classList.remove('active');
});

// Add smooth transitions for theme switching
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        * {
            transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                       color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
                       border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    document.head.appendChild(style);
});

// Add loading states for better UX
function addLoadingStates() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.disabled && !this.classList.contains('loading')) {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
}

// Initialize loading states
document.addEventListener('DOMContentLoaded', addLoadingStates);

// Add custom cursor effect for interactive elements
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    const interactiveElements = document.querySelectorAll('a, button, .blog-card, .feature-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

// Add scroll progress indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        document.querySelector('.scroll-progress-bar').style.width = scrollPercent + '%';
    });
}

// Initialize advanced features
document.addEventListener('DOMContentLoaded', () => {
    // Only add these features on larger screens for performance
    if (window.innerWidth > 768) {
        initCustomCursor();
        initScrollProgress();
    }
});