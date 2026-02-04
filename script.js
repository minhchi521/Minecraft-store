// ==================== Hamburger Menu Toggle ==================== //
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ==================== Navbar Scroll Effect ==================== //
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==================== Filter Functionality ==================== //
const filterButtons = document.querySelectorAll('.filter-btn');
const rankCards = document.querySelectorAll('.rank-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        // Filter cards
        const filter = button.getAttribute('data-filter');
        rankCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.animation = 'fadeInUp 0.6s ease';
                }, 0);
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ==================== FAQ Accordion ==================== //
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        
        // Close all other FAQs
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });

        // Toggle current FAQ
        faqItem.classList.toggle('active');
    });
});

// ==================== Smooth Scroll for Navigation Links ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== Buy Button Actions ==================== //
const buyButtons = document.querySelectorAll('.rank-card .btn, .package-card .btn, .cta .btn-primary');

buyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Get the rank name or package info
        const rankCard = button.closest('.rank-card');
        const packageCard = button.closest('.package-card');
        const rankName = rankCard ? rankCard.querySelector('h3').textContent : 
                        packageCard ? packageCard.querySelector('h3').textContent : 'Product';
        
        // Show confirmation
        showNotification(`Added: ${rankName}`, 'success');
        
        // Here you would normally redirect to payment page
        // window.location.href = '/checkout?product=' + rankName;
    });
});

// ==================== Notification System ==================== //
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 30px;
            right: 30px;
            padding: 15px 25px;
            border-radius: 12px;
            font-weight: 600;
            animation: slideIn 0.5s ease;
            z-index: 2000;
            max-width: 300px;
        }

        .notification-success {
            background: linear-gradient(135deg, #00d46f, #00a852);
            color: white;
            box-shadow: 0 4px 20px rgba(0, 212, 111, 0.4);
        }

        .notification-error {
            background: linear-gradient(135deg, #ff4757, #ff1a3c);
            color: white;
            box-shadow: 0 4px 20px rgba(255, 71, 87, 0.4);
        }

        .notification-info {
            background: linear-gradient(135deg, #00d4ff, #00a8cc);
            color: white;
            box-shadow: 0 4px 20px rgba(0, 212, 255, 0.4);
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(400px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(400px);
            }
        }
    `;

    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// ==================== Counter Animation ==================== //
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Start counter animation when stats section is visible
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
            entry.target.setAttribute('data-animated', 'true');
            const stats = entry.target.querySelectorAll('.stat-number');
            
            stats.forEach(stat => {
                const text = stat.textContent.replace(/[^0-9]/g, '');
                const target = parseInt(text);
                animateCounter(stat, target);
            });
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}

// ==================== Scroll Reveal Animation ==================== //
const revealOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            revealObserver.unobserve(entry.target);
        }
    });
}, revealOptions);

// Observe elements
document.querySelectorAll('.rank-card, .package-card, .feature-item, .faq-item').forEach(el => {
    el.style.opacity = '0';
    revealObserver.observe(el);
});

// ==================== Search Functionality ==================== //
function searchRanks(query) {
    const cards = document.querySelectorAll('.rank-card');
    const queryLower = query.toLowerCase();
    
    cards.forEach(card => {
        const rankName = card.querySelector('h3').textContent.toLowerCase();
        const features = card.textContent.toLowerCase();
        
        if (rankName.includes(queryLower) || features.includes(queryLower)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.6s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// ==================== Price Formatter ==================== //
function formatPrice(price) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
}

// ==================== Cart System (Simple) ==================== //
let cart = JSON.parse(localStorage.getItem('kiwismpCart')) || [];

function addToCart(rankName, price) {
    const item = {
        id: Date.now(),
        name: rankName,
        price: price,
        quantity: 1,
        addedAt: new Date()
    };
    
    // Check if item already exists
    const existingItem = cart.find(i => i.name === rankName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push(item);
    }
    
    localStorage.setItem('kiwismpCart', JSON.stringify(cart));
    showNotification(`${rankName} added to cart!`, 'success');
    updateCartCount();
}

function updateCartCount() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    // Update cart count display if exists
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
    }
}

function getCart() {
    return cart;
}

function clearCart() {
    cart = [];
    localStorage.removeItem('kiwismpCart');
    updateCartCount();
}

// ==================== Dark Mode Toggle ==================== //
function initDarkMode() {
    const isDarkMode = localStorage.getItem('kiwismpDarkMode') !== 'false';
    if (!isDarkMode) {
        document.body.style.filter = 'invert(1)';
    }
}

initDarkMode();

// ==================== Form Validation ==================== //
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^(\+84|0)[0-9]{9,10}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
}

// ==================== Performance: Lazy Loading ==================== //
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== Cookie Management ==================== //
function setCookie(name, value, days = 7) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

// ==================== Page Load Animation ==================== //
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ==================== Console Message ==================== //
console.log('%cKiwiSMP Store', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cWelcome to our store! 🎮', 'color: #ff6b9d; font-size: 14px;');

// ==================== Utility Functions ==================== //
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

// ==================== Export Functions ==================== //
window.KiwiSMP = {
    showNotification,
    addToCart,
    getCart,
    clearCart,
    formatPrice,
    searchRanks,
    validateEmail,
    validatePhone
};
