document.addEventListener('DOMContentLoaded', function() {
    // Skill animation class
    class SkillAnimation {
        constructor(element) {
            this.skill = element;
            this.percentage = element.querySelector('.percentage');
            this.targetValue = parseInt(this.percentage.textContent);
            this.currentValue = 0;
            this.isAnimating = false;
        }

        animate() {
            if (this.isAnimating) return;
            this.isAnimating = true;

            // Reset to initial state
            this.currentValue = 0;
            this.percentage.textContent = '0%';
            this.skill.style.opacity = '0';
            this.skill.style.transform = 'translateY(30px)';

            // Fade in skill card
            setTimeout(() => {
                this.skill.style.opacity = '1';
                this.skill.style.transform = 'translateY(0)';

                // Animate percentage counter
                const duration = 2000;
                const steps = 60;
                const increment = this.targetValue / steps;
                const stepTime = duration / steps;

                const counter = setInterval(() => {
                    this.currentValue += increment;

                    if (this.currentValue >= this.targetValue) {
                        this.currentValue = this.targetValue;
                        clearInterval(counter);
                        this.isAnimating = false;
                        
                        // Add completion effect
                        this.addCompletionEffect();
                    }

                    this.percentage.textContent = `${Math.round(this.currentValue)}%`;
                }, stepTime);
            }, 300);
        }

        addCompletionEffect() {
            this.percentage.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.percentage.style.transform = 'scale(1)';
            }, 200);
        }

        reset() {
            this.isAnimating = false;
            this.currentValue = 0;
            this.percentage.textContent = '0%';
            this.skill.style.opacity = '0';
            this.skill.style.transform = 'translateY(30px)';
        }
    }

    // Initialize animations
    const skills = document.querySelectorAll('.skill');
    const skillAnimations = Array.from(skills).map(skill => new SkillAnimation(skill));

    // Intersection Observer for scroll-based animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skill = entry.target;
                const animation = skillAnimations.find(a => a.skill === skill);
                if (animation) {
                    animation.animate();
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px'
    });

    // Observe each skill element
    skills.forEach(skill => observer.observe(skill));

    // Optional: Add scroll-triggered parallax effect
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        skills.forEach((skill, index) => {
            const delay = index * 0.1;
            const movement = Math.sin(scrolled * 0.002 + delay) * 5;
            skill.style.transform = `translateY(${movement}px)`;
        });
    });

    // Optional: Add hover interactions
    skills.forEach(skill => {
        skill.addEventListener('mouseenter', () => {
            skill.style.transform = 'translateY(-10px) scale(1.02)';
        });

        skill.addEventListener('mouseleave', () => {
            skill.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Optional: Add click interaction
    skills.forEach(skill => {
        skill.addEventListener('click', () => {
            const animation = skillAnimations.find(a => a.skill === skill);
            if (animation) {
                animation.reset();
                setTimeout(() => animation.animate(), 100);
            }
        });
    });
});


document.querySelector('.menu-icon').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.navlist').classList.toggle('active');
});

// Đóng menu khi click vào một menu item
document.querySelectorAll('.navlist li a').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.menu-icon').classList.remove('active');
        document.querySelector('.navlist').classList.remove('active');
    });
});


// Scroll sections active link 
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.navlist a');

window.addEventListener('scroll', () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('.navlist a[href*=' + id + ']').classList.add('active');
            });
        }
    });
});

// Menu icon functionality
const menuIcon = document.querySelector('.menu-icon');
const navlist = document.querySelector('.navlist');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('active');
    navlist.classList.toggle('open');
});

// Scroll Reveal Animation
const sr = ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

// Hero section animations
sr.reveal('.hero-info h3', {origin: 'top'});
sr.reveal('.hero-info h1', {origin: 'left', delay: 100});
sr.reveal('.hero-info p', {origin: 'right', delay: 200});
sr.reveal('.btn-box', {origin: 'bottom', delay: 200});
sr.reveal('.social-media', {origin: 'bottom', delay: 200});

// Image hero animations
sr.reveal('.img-hero', {origin: 'right', delay: 400});

// Floating animation for profile image
function setupImageAnimation() {
    const floatAnimation = `
        @keyframes floatImage {
            0% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-24px);
            }
            100% {
                transform: translateY(0);
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = floatAnimation;
    document.head.appendChild(styleSheet);
}

// Animated text typing effect
function setupTypingAnimation() {
    const textAnimate = document.querySelector('.text-animate h2');
    const text = textAnimate.textContent;
    let index = 0;
    
    textAnimate.textContent = '';
    
    function type() {
        if (index < text.length) {
            textAnimate.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        } else {
            setTimeout(() => {
                textAnimate.textContent = '';
                index = 0;
                type();
            }, 3000);
        }
    }
    
    type();
}

// Social media icons hover effect
function setupSocialIconsAnimation() {
    const socialIcons = document.querySelectorAll('.social-media .bg-icon');
    
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            const span = icon.querySelector('span');
            span.style.animation = 'animate 1s linear infinite';
        });
        
        icon.addEventListener('mouseleave', () => {
            const span = icon.querySelector('span');
            span.style.animation = 'none';
        });
    });
}

// Rotating text animation enhancement
function enhanceRotatingText() {
    const rotateText = document.querySelector('.rotate-text .text');
    
    // Smooth rotation transition
    rotateText.style.transition = 'transform 0.3s ease-out';
    
    // Add hover effect to pause rotation
    rotateText.addEventListener('mouseenter', () => {
        rotateText.style.animationPlayState = 'paused';
    });
    
    rotateText.addEventListener('mouseleave', () => {
        rotateText.style.animationPlayState = 'running';
    });
}

// Smooth scroll for navigation
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    setupImageAnimation();
    setupTypingAnimation();
    setupSocialIconsAnimation();
    enhanceRotatingText();
    setupSmoothScroll();
});

// Additional keyframe animations
const additionalAnimations = `
    @keyframes moveCursorText {
        0%, 10%, 100% {
            width: 0;
        }
        65%, 85% {
            width: 100%;
            opacity: 1;
        }
    }

    @keyframes moveText {
        0%, 10%, 100% {
            background-position: -24rem 0;
        }
        65%, 85% {
            background-position: 0 0;
        }
    }
`;

// Add additional animations to document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalAnimations;
document.head.appendChild(styleSheet);

// Scroll reveal animation
ScrollReveal({ 
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.hero-info h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.hero-info p, .about-content', { origin: 'right' });
ScrollReveal().reveal('.heading', { origin: 'top' });
ScrollReveal().reveal('.img-hero img, .services-container, .projects-container', { origin: 'bottom' });

// Project cards hover effect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Loading animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1000);
    }
});

// Skills progress animation
const skillItems = document.querySelectorAll('.skill-progress');

const showProgress = () => {
    skillItems.forEach(skill => {
        const progressBar = skill.querySelector('.progress-bar');
        const progressValue = progressBar.dataset.progress;
        progressBar.style.width = progressValue + '%';
    });
};

// Animate skills on scroll
window.addEventListener('scroll', () => {
    const skillsSection = document.querySelector('#skill');
    if (skillsSection) {
        const sectionPos = skillsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight;

        if (sectionPos < screenPos) {
            showProgress();
        }
    }
});

// Service cards hover effect
const serviceCards = document.querySelectorAll('.icon-services');

serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('i').style.transform = 'scale(1.1) rotate(-5deg)';
    });

    card.addEventListener('mouseleave', () => {
        card.querySelector('i').style.transform = 'scale(1) rotate(0)';
    });
});

// Social media icons animation
const socialIcons = document.querySelectorAll('.social-media .bg-icon');

socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.querySelector('span').style.animation = 'animate 1s linear infinite';
    });

    icon.addEventListener('mouseleave', () => {
        icon.querySelector('span').style.animation = 'none';
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
});

// Add this if you want to use the rotating text animation
document.addEventListener('DOMContentLoaded', () => {
    const text = document.querySelector('.rotate-text .text');
    if (text) {
        text.style.animation = 'rotateText 30s linear infinite';
    }
});

// Form validation for contact section (if you have one)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Add your form validation and submission logic here
        const formData = new FormData(contactForm);
        console.log('Form submitted:', Object.fromEntries(formData));
        // Add your AJAX submission or other handling here
    });
}