// Portfolio JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    if (themeToggle) {
        const themeIcon = themeToggle.querySelector('i');
        
        // Check for saved theme preference or default to light mode
        const currentTheme = localStorage.getItem('theme') || 'light';
        body.setAttribute('data-color-scheme', currentTheme);
        updateThemeIcon(currentTheme);
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = body.getAttribute('data-color-scheme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-color-scheme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
        
        function updateThemeIcon(theme) {
            if (themeIcon) {
                themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                }
                
                // Update active link
                updateActiveNavLink(this);
            }
        });
    });
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink(activeLink = null) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    // Intersection Observer for active navigation and animations
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Update active navigation
                const sectionId = entry.target.id;
                const correspondingNavLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (correspondingNavLink) {
                    updateActiveNavLink(correspondingNavLink);
                }
                
                // Trigger animations
                const animatedElements = entry.target.querySelectorAll('.fade-in, .scale-in, .slide-in-left, .slide-in-right');
                animatedElements.forEach(element => {
                    element.classList.add('visible');
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Typing animation for hero title
    function initTypingAnimation() {
        const typingElement = document.querySelector('.typing-animation');
        if (typingElement) {
            const text = "Hi, I'm Shubham Sourav";
            typingElement.textContent = '';
            typingElement.style.borderRight = '3px solid var(--color-primary)';
            
            let index = 0;
            function typeText() {
                if (index < text.length) {
                    typingElement.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeText, 100);
                } else {
                    // Remove cursor after typing is complete
                    setTimeout(() => {
                        typingElement.style.borderRight = 'none';
                    }, 2000);
                }
            }
            
            // Start typing animation after a short delay
            setTimeout(typeText, 1000);
        }
    }
    
    // Initialize typing animation
    initTypingAnimation();
    
    // Animated counters for statistics
    function animateCounter(element, target, duration = 2000) {
        const start = parseInt(element.textContent) || 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
    
    // Trigger counter animations when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        statsObserver.observe(aboutSection);
    }
    
    // Skill bar animations
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 200);
                });
                skillsObserver.unobserve(entry.target);
            }
        });
    });
    
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Enhanced notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        
        const iconClass = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle';
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${iconClass}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 10000;
            background: var(--color-surface);
            color: var(--color-text);
            padding: 16px 20px;
            border-radius: 8px;
            border: 1px solid var(--color-border);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 350px;
            min-width: 300px;
        `;
        
        // Type-specific styling
        if (type === 'success') {
            notification.style.borderColor = 'var(--color-success)';
            notification.style.backgroundColor = 'rgba(var(--color-success-rgb), 0.1)';
        } else if (type === 'error') {
            notification.style.borderColor = 'var(--color-error)';
            notification.style.backgroundColor = 'rgba(var(--color-error-rgb), 0.1)';
        }
        
        const notificationContent = notification.querySelector('.notification-content');
        notificationContent.style.cssText = `
            display: flex;
            align-items: center;
            gap: 12px;
            font-size: 14px;
            position: relative;
        `;
        
        const closeButton = notification.querySelector('.notification-close');
        closeButton.style.cssText = `
            background: none;
            border: none;
            color: var(--color-text-secondary);
            cursor: pointer;
            padding: 4px;
            margin-left: auto;
            border-radius: 4px;
            transition: background-color 0.3s ease;
        `;
        
        closeButton.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });
        
        closeButton.addEventListener('mouseenter', () => {
            closeButton.style.backgroundColor = 'var(--color-secondary)';
        });
        
        closeButton.addEventListener('mouseleave', () => {
            closeButton.style.backgroundColor = 'transparent';
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }
    
    // Enhanced smooth scroll for hero buttons
    function setupHeroButtons() {
        const heroButtons = document.querySelectorAll('.hero-buttons a');
        heroButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        const navHeight = document.querySelector('.navbar').offsetHeight;
                        const targetPosition = targetSection.offsetTop - navHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Update active nav link
                        const correspondingNavLink = document.querySelector(`a[href="#${targetId}"]`);
                        if (correspondingNavLink) {
                            updateActiveNavLink(correspondingNavLink);
                        }
                    }
                }
            });
        });
    }
    
    // Initialize hero buttons
    setupHeroButtons();
    
    // Enhanced parallax effect for hero background
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate);
    
    // Add animation classes to elements
    function addAnimationClasses() {
        // Hero elements
        const heroText = document.querySelector('.hero-text');
        const heroImage = document.querySelector('.hero-image');
        if (heroText) heroText.classList.add('fade-in');
        if (heroImage) heroImage.classList.add('scale-in');
        
        // About section
        const aboutText = document.querySelector('.about-text');
        const aboutStats = document.querySelector('.about-stats');
        if (aboutText) aboutText.classList.add('slide-in-left');
        if (aboutStats) aboutStats.classList.add('slide-in-right');
        
        // Skills
        const skillCategories = document.querySelectorAll('.skill-category');
        skillCategories.forEach((category, index) => {
            category.classList.add('fade-in');
            category.style.animationDelay = `${index * 0.2}s`;
        });
        
        // Projects
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.animationDelay = `${index * 0.1}s`;
        });
        
        // Timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.classList.add('slide-in-left');
            item.style.animationDelay = `${index * 0.2}s`;
        });
        
        // Education cards
        const educationCards = document.querySelectorAll('.education-card');
        educationCards.forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.animationDelay = `${index * 0.1}s`;
        });
        
        // Achievement cards
        const achievementCards = document.querySelectorAll('.achievement-card');
        achievementCards.forEach((card, index) => {
            card.classList.add('slide-in-right');
            card.style.animationDelay = `${index * 0.1}s`;
        });
        
        // Contact section
        const contactInfo = document.querySelector('.contact-info');
        const contactFormEl = document.querySelector('.contact-form');
        if (contactInfo) contactInfo.classList.add('slide-in-left');
        if (contactFormEl) contactFormEl.classList.add('slide-in-right');
    }
    
    // Initialize animations
    addAnimationClasses();
    
    // Enhanced navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            if (navbar) {
                navbar.style.transform = 'translateY(-100%)';
            }
        } else {
            // Scrolling up
            if (navbar) {
                navbar.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Scroll to top functionality
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 50%;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        font-size: 18px;
        cursor: pointer;
        z-index: 1000;
        transform: translateY(100px);
        transition: transform 0.3s ease, background-color 0.3s ease;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollToTopBtn.style.transform = 'translateY(100px)';
        }
    });
    
    // Add hover effect to scroll to top button
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = 'var(--color-primary-hover)';
        this.style.transform = 'translateY(0) scale(1.1)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'var(--color-primary)';
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    // Initialize hero section animation
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero .fade-in, .hero .scale-in');
        heroElements.forEach(element => {
            element.classList.add('visible');
        });
    }, 500);
    
    // Initialize first nav link as active
    const firstNavLink = document.querySelector('.nav-link[href="#home"]');
    if (firstNavLink) {
        firstNavLink.classList.add('active');
    }
    
    // Add loading completion handler
    window.addEventListener('load', function() {
        // Ensure all animations are ready
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    });
    
    // Add CSS for loaded state
    const loadedStyles = document.createElement('style');
    loadedStyles.textContent = `
        .loaded .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .loaded .scale-in.visible {
            opacity: 1;
            transform: scale(1);
        }
        
        .loaded .slide-in-left.visible {
            opacity: 1;
            transform: translateX(0);
        }
        
        .loaded .slide-in-right.visible {
            opacity: 1;
            transform: translateX(0);
        }
    `;
    document.head.appendChild(loadedStyles);
});