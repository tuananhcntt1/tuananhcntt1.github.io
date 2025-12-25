/**
 * Personal Blog - Main JavaScript File
 * Ngô Tuấn Anh
 * 
 * Features:
 * - Mobile menu toggle
 * - Smooth scroll animations
 * - Navigation active state
 * - Intersection Observer for animations
 * - Utility functions
 */

// ========== DOM ELEMENTS ==========
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

// ========== MOBILE MENU TOGGLE ==========
/**
 * Toggle mobile menu visibility
 */
function toggleMenu() {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

// Event listener for menu toggle button
if (menuToggle) {
    menuToggle.addEventListener('click', toggleMenu);
}

// Close menu when a link is clicked
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ========== ACTIVE NAVIGATION INDICATOR ==========
/**
 * Update active navigation link based on current page
 */
function updateActiveNavLink() {
    const currentPath = window.location.pathname;
    
    navLinkItems.forEach(link => {
        link.classList.remove('active');
        
        // Get the href attribute
        const href = link.getAttribute('href');
        
        // Check if current path matches
        if (currentPath === href || (href === '/' && currentPath === '/')) {
            link.classList.add('active');
        } else if (href !== '/' && currentPath.includes(href.replace('/', ''))) {
            link.classList.add('active');
        }
    });
}

// Update on page load
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// ========== SCROLL ANIMATIONS ==========
/**
 * Intersection Observer for fade-in animations
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
const animateElements = document.querySelectorAll(
    '.featured-post-card, .blog-post-card, .skill-card, .timeline-content, .contact-card'
);

animateElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// ========== SMOOTH SCROLL BEHAVIOR ==========
/**
 * Smooth scroll to anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== NAVBAR SCROLL EFFECT ==========
/**
 * Add shadow to navbar on scroll
 */
const navbar = document.querySelector('.navbar');

function handleNavbarScroll() {
    if (window.scrollY > 0) {
        navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-sm)';
    }
}

if (navbar) {
    window.addEventListener('scroll', handleNavbarScroll);
}

// ========== FORM UTILITIES ==========
/**
 * Validate email address
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Clear form error messages
 */
function clearFormErrors() {
    const errorElements = document.querySelectorAll('.form-error');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

// ========== COUNTER ANIMATION ==========
/**
 * Animate numbers from 0 to target value
 */
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ========== LAZY LOAD IMAGES ==========
/**
 * Lazy load images using Intersection Observer
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== SCROLL TO TOP BUTTON ==========
/**
 * Show/hide scroll to top button
 */
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.id = 'scrollToTop';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary-color);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-lg);
        z-index: 999;
        transition: var(--transition-base);
    `;

    document.body.appendChild(scrollBtn);

    // Show button when page is scrolled down
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effects
    scrollBtn.addEventListener('mouseover', () => {
        scrollBtn.style.backgroundColor = 'var(--primary-dark)';
        scrollBtn.style.transform = 'scale(1.1)';
    });

    scrollBtn.addEventListener('mouseout', () => {
        scrollBtn.style.backgroundColor = 'var(--primary-color)';
        scrollBtn.style.transform = 'scale(1)';
    });
}

// Create scroll to top button on page load
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// ========== COPY TO CLIPBOARD ==========
/**
 * Copy text to clipboard
 */
function copyToClipboard(text, callback) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text)
            .then(() => {
                if (callback) callback(true);
            })
            .catch(() => {
                fallbackCopyToClipboard(text, callback);
            });
    } else {
        fallbackCopyToClipboard(text, callback);
    }
}

/**
 * Fallback copy to clipboard for older browsers
 */
function fallbackCopyToClipboard(text, callback) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        if (callback) callback(true);
    } catch (err) {
        if (callback) callback(false);
    }
    document.body.removeChild(textarea);
}

// ========== DEBOUNCE UTILITY ==========
/**
 * Debounce function to limit function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========== THROTTLE UTILITY ==========
/**
 * Throttle function to limit function calls
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========== KEYBOARD SHORTCUTS ==========
/**
 * Handle keyboard shortcuts
 */
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K: Focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }

    // Esc: Close mobile menu
    if (e.key === 'Escape') {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// ========== TOAST NOTIFICATION ==========
/**
 * Show toast notification
 */
function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? 'var(--success-color)' : 
                           type === 'error' ? 'var(--error-color)' : 
                           'var(--primary-color)'};
        color: white;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// Add CSS animations for toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========== EXTERNAL LINKS ==========
/**
 * Open external links in new tab
 */
document.addEventListener('click', (e) => {
    const target = e.target.closest('a');
    
    if (target && target.hostname !== window.location.hostname && target.protocol.startsWith('http')) {
        target.target = '_blank';
        target.rel = 'noopener noreferrer';
    }
});

// ========== PAGE VISIBILITY ==========
/**
 * Handle page visibility change
 */
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Page is visible - resume animations if needed
        console.log('Page is now visible');
    } else {
        // Page is hidden - pause animations if needed
        console.log('Page is hidden');
    }
});

// ========== PERFORMANCE MONITORING ==========
/**
 * Log performance metrics (development only)
 */
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime, 'ms');
    });
}

// ========== ACCESSIBILITY IMPROVEMENTS ==========
/**
 * Improve keyboard navigation
 */
document.addEventListener('keydown', (e) => {
    // Tab navigation for buttons
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add focus visible styles
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .keyboard-nav *:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
`;
document.head.appendChild(styleSheet);

// ========== INIT FUNCTIONS ==========
/**
 * Initialize all features
 */
function initializeApp() {
    console.log('Blog application initialized');
    updateActiveNavLink();
}

// Run init when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// ========== EXPORT FUNCTIONS FOR TESTING ==========
// In case you want to use these functions from other scripts
window.blogUtils = {
    isValidEmail,
    clearFormErrors,
    animateCounter,
    copyToClipboard,
    debounce,
    throttle,
    showToast,
    toggleMenu
};
