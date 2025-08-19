document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        delay: 100,
        once: true,
        easing: 'ease-out-cubic'
    });
    
    // Dark Mode Functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }
    
    // Toggle dark mode
    darkModeToggle.addEventListener('change', function() {
        // Add ripple effect
        createRippleEffect();
        
        // Add theme transition class for smooth effects
        body.classList.add('theme-transitioning');
        
        if (this.checked) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            
            // Add transition effect with page fade
            body.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Animate elements sequentially
            animateElementsToTheme('dark');
            
            // Update all elements with CSS variables
            updateCSSVariables('dark');
            
            setTimeout(() => {
                body.style.transition = '';
                body.classList.remove('theme-transitioning');
            }, 400);
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            
            // Add transition effect with page fade
            body.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Animate elements sequentially
            animateElementsToTheme('light');
            
            // Update all elements with CSS variables
            updateCSSVariables('light');
            
            setTimeout(() => {
                body.style.transition = '';
                body.classList.remove('theme-transitioning');
            }, 400);
        }
    });

    // Function to update CSS variables for consistent theming
    function updateCSSVariables(theme) {
        const root = document.documentElement;
        
        if (theme === 'dark') {
            root.style.setProperty('--bg-color', '#0c0c0c');
            root.style.setProperty('--gradient-white-bg', 'linear-gradient(0deg, #1e1e1e 0%, #2d2d2d 51%, #404040 100%)');
            root.style.setProperty('--gradient-color-bg', 'linear-gradient(180deg, rgba(102, 126, 234, 1) 0%, rgba(118, 75, 162, 1) 51%, rgba(76, 29, 149, 1) 100%)');
            root.style.setProperty('--main-color', '#667eea');
            root.style.setProperty('--font-color', '#e0e0e0');
            root.style.setProperty('--hover-box-shadow', 'rgba(102, 126, 234, 0.3) 0px 10px 20px, rgba(118, 75, 162, 0.2) 0px 6px 6px');
            root.style.setProperty('--gradient-white-bg2', 'linear-gradient(98deg, #2d2d2d 0%, #1e1e1e 100%)');
        } else {
            root.style.setProperty('--bg-color', '#f5e6d3');
            root.style.setProperty('--gradient-white-bg', 'linear-gradient(0deg, #faf5f0 0%, #f5e6d3 51%, #f0d5b8 100%)');
            root.style.setProperty('--gradient-color-bg', 'linear-gradient(180deg, rgba(220,75,35,1) 0%, rgba(180,50,25,1) 51%, rgba(140,35,15,1) 100%)');
            root.style.setProperty('--main-color', '#DC4B23');
            root.style.setProperty('--font-color', '#8B4513');
            root.style.setProperty('--hover-box-shadow', 'rgba(220,75,35,0.3) 0px 10px 20px, rgba(180,50,25,0.2) 0px 6px 6px');
            root.style.setProperty('--gradient-white-bg2', 'linear-gradient(98deg, #f0d5b8 0%, #faf5f0 100%)');
        }
        
        // Force repaint of all elements that use CSS variables
        const elementsWithVariables = document.querySelectorAll(
            'header, .btn, .social-media a, .icon-services, .about-content h2, ' +
            '.main-text .heading, .title, .contact-info-container a, .bg-icon span, ' +
            '.readMore, span, .navlist li a:hover, .navlist li a.active'
        );
        
        elementsWithVariables.forEach(element => {
            element.style.transform = 'translateZ(0)'; // Force hardware acceleration
            setTimeout(() => {
                element.style.transform = '';
            }, 50);
        });
    }
    
    // Create ripple effect when toggle is clicked
    function createRippleEffect() {
        const toggle = document.querySelector('.dark-mode-label');
        const ripple = document.createElement('div');
        
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';
        ripple.style.pointerEvents = 'none';
        
        toggle.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Animate elements when theme changes
    function animateElementsToTheme(theme) {
        const elements = [
            'header',
            '.hero-info',
            '.img-hero',
            '.about',
            '.allServices',
            '.services',
            '.project',
            '.blog',
            '.skills-container',
            '#contact',
            'footer',
            '.social-media',
            '.icon-services',
            '.project-card',
            '.skill',
            '.btn',
            '.contact-info-upper-container'
        ];
        
        elements.forEach((selector, index) => {
            const elementList = document.querySelectorAll(selector);
            elementList.forEach((element, subIndex) => {
                if (element) {
                    setTimeout(() => {
                        element.style.transform = 'translateY(-5px) scale(1.02)';
                        element.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                        element.style.opacity = '0.8';
                        
                        setTimeout(() => {
                            element.style.transform = 'translateY(0) scale(1)';
                            element.style.opacity = '1';
                        }, 150);
                        
                        setTimeout(() => {
                            element.style.transition = '';
                        }, 300);
                    }, (index * 30) + (subIndex * 10));
                }
            });
        });
        
        // Animate text elements
        const textElements = document.querySelectorAll('h1, h2, h3, p, span');
        textElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.transition = 'color 0.4s ease';
                element.style.transform = 'scale(1.01)';
                
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 100);
            }, index * 5);
        });
    }
    
    // Add floating animation to dark mode toggle
    const darkModeToggleElement = document.querySelector('.dark-mode-toggle');
    let floatAnimation;
    
    function startFloating() {
        let start = Date.now();
        floatAnimation = requestAnimationFrame(function animate() {
            let timePassed = Date.now() - start;
            let progress = timePassed / 3000; // 3 second cycle
            
            if (progress > 1) {
                start = Date.now();
                progress = 0;
            }
            
            let y = Math.sin(progress * Math.PI * 2) * 3; // Float 3px up and down
            darkModeToggleElement.style.transform = `translateY(${y}px)`;
            
            floatAnimation = requestAnimationFrame(animate);
        });
    }
    
    startFloating();
    
    // Add keyboard support for dark mode toggle
    document.addEventListener('keydown', function(e) {
        // Toggle with Ctrl + D
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            darkModeToggle.checked = !darkModeToggle.checked;
            darkModeToggle.dispatchEvent(new Event('change'));
        }
    });
    
    // Add mouse tracking for theme transition effect
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', function(e) {
        mouseX = (e.clientX / window.innerWidth) * 100;
        mouseY = (e.clientY / window.innerHeight) * 100;
        document.documentElement.style.setProperty('--mouse-x', mouseX + '%');
        document.documentElement.style.setProperty('--mouse-y', mouseY + '%');
    });
    
    // Add visual feedback when hovering over dark mode toggle
    darkModeToggleElement.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    darkModeToggleElement.addEventListener('mouseleave', function() {
        this.style.animation = '';
        this.style.transform = '';
        startFloating();
    });
    
    // Add click feedback
    darkModeToggleElement.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(-1px) scale(0.98)';
    });
    
    darkModeToggleElement.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    // Smooth scroll behavior enhancement for dark mode
    function enhanceSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    enhanceSmoothScroll();
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                body.classList.add('dark-mode');
                darkModeToggle.checked = true;
            } else {
                body.classList.remove('dark-mode');
                darkModeToggle.checked = false;
            }
        }
    });

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
    setupRoleTypingAnimation();
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

// Animated role typing effect
function setupRoleTypingAnimation() {
    const roleLines = document.querySelectorAll('.role-line');
    const roles = ['Frontend Developer', 'Back-end Developer', 'Android Development', 'UX/UI Designer'];
    let currentRoleIndex = 0;
    
    // Clear all role lines initially
    roleLines.forEach(line => {
        line.textContent = '';
        line.classList.remove('typing');
    });
    
    function typeRole(roleIndex) {
        if (roleIndex >= roles.length) {
            // Reset and start over
            setTimeout(() => {
                roleLines.forEach(line => {
                    line.textContent = '';
                    line.classList.remove('typing');
                });
                currentRoleIndex = 0;
                typeRole(0);
            }, 2000);
            return;
        }
        
        const role = roles[roleIndex];
        const targetLine = roleLines[roleIndex];
        let charIndex = 0;
        
        // Add typing class to show cursor
        targetLine.classList.add('typing');
        
        function typeChar() {
            if (charIndex < role.length) {
                targetLine.textContent += role.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 100);
            } else {
                // Remove typing class and move to next role after a delay
                targetLine.classList.remove('typing');
                setTimeout(() => {
                    typeRole(roleIndex + 1);
                }, 500);
            }
        }
        
        typeChar();
    }
    
    // Start the typing animation
    setTimeout(() => {
        typeRole(0);
    }, 1000);
}

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

// Language Toggle Functionality
class LanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.languageToggle = document.getElementById('languageToggle');
        this.currentLangDisplay = document.getElementById('currentLang');
        
        this.translations = {
            en: {
                // Navigation
                'Home': 'Home',
                'About': 'About',
                'Services': 'Services',
                'Project': 'Project',
                'Skill': 'Skill',
                'Contact': 'Contact',
                'Let\'s Chat': 'Let\'s Chat',
                
                // Home Section
                'Welcome to my Portfolio': 'Welcome to my Portfolio',
                'Hi I\'m Phong': 'Hi I\'m Phong',
                'Hello, I\'m Phong, a passionate and lifelong learner. I love exploring new things and always strive to push my boundaries. With a positive mindset, I believe that every challenge is an opportunity to grow and make a positive impact on those around me.': 'Hello, I\'m Phong, a passionate and lifelong learner. I love exploring new things and always strive to push my boundaries. With a positive mindset, I believe that every challenge is an opportunity to grow and make a positive impact on those around me.',
                'Hire Me Now!': 'Hire Me Now!',
                'Download CV': 'Download CV',
                
                // About Section
                'Get to know me': 'Get to know me',
                'About Me': 'About Me',
                'I am a third-year Software Engineering student with a solid foundation in Backend and Android development. Through my personal projects, I have gained practical experience in building and improving applications, which helps me strengthen my technical skills and problem-solving abilities.': 'I am a third-year Software Engineering student with a solid foundation in Backend and Android development. Through my personal projects, I have gained practical experience in building and improving applications, which helps me strengthen my technical skills and problem-solving abilities.',
                'I am always eager to learn new things, both in programming and in technology in general, to keep improving myself and prepare for future challenges.': 'I am always eager to learn new things, both in programming and in technology in general, to keep improving myself and prepare for future challenges.',
                'Outside of studying and coding, I spend my free time playing games, listening to music, and reading novels. These hobbies not only help me relax but also give me new ideas and perspectives that I can sometimes apply in my work and studies.': 'Outside of studying and coding, I spend my free time playing games, listening to music, and reading novels. These hobbies not only help me relax but also give me new ideas and perspectives that I can sometimes apply in my work and studies.',
                
                // Services Section
                'My Services': 'My Services',
                'what i will do for you': 'what i will do for you',
                'App Development': 'App Development',
                'App development is the process of creating software for mobile devices such as smartphones or tablets, including stages from design, programming to deployment. Applications can be developed for operating systems such as iOS, Android or multi-platform.': 'App development is the process of creating software for mobile devices such as smartphones or tablets, including stages from design, programming to deployment. Applications can be developed for operating systems such as iOS, Android or multi-platform.',
                'Web Development': 'Web Development',
                'Web development is the process of building and maintaining websites or web applications, including both front-end (user interface) and back-end (server-side processing). It utilizes various technologies such as HTML, CSS, JavaScript, and other programming languages to create interactive and user-friendly websites.': 'Web development is the process of building and maintaining websites or web applications, including both front-end (user interface) and back-end (server-side processing). It utilizes various technologies such as HTML, CSS, JavaScript, and other programming languages to create interactive and user-friendly websites.',
                'UI/ UX Design': 'UI/ UX Design',
                'UI/UX Design is the process of designing the user interface and user experience to create products that are easy to use, attractive, and efficient. UI focuses on form and aesthetics, while UX focuses on the user\'s feelings and experiences when interacting with the product.': 'UI/UX Design is the process of designing the user interface and user experience to create products that are easy to use, attractive, and efficient. UI focuses on form and aesthetics, while UX focuses on the user\'s feelings and experiences when interacting with the product.',
                'See More': 'See More',
                
                // Project Section
                'My Project': 'My Project',
                'What i will do for you': 'What i will do for you',
                
                // Skills Section
                'My Skill': 'My Skill',
                'I show you about my skill': 'I show you about my skill',
                
                // Contact Section
                'Get in Touch': 'Get in Touch',
                'Contact Me': 'Contact Me',
                'Contact me': 'Contact me',
                'Leave a message, I will reply as soon as possible.': 'Leave a message, I will reply as soon as possible.',
                'Name': 'Name',
                'Email': 'Email',
                'Message': 'Message',
                'Send message': 'Send message'
            },
            vi: {
                // Navigation
                'Home': 'Trang chủ',
                'About': 'Giới thiệu',
                'Services': 'Dịch vụ',
                'Project': 'Dự án',
                'Skill': 'Kỹ năng',
                'Contact': 'Liên hệ',
                'Let\'s Chat': 'Liên hệ',
                
                // Home Section
                'Welcome to my Portfolio': 'Chào mừng đến với Portfolio của tôi',
                'Hi I\'m Phong': 'Xin chào, tôi là Phong',
                'Hello, I\'m Phong, a passionate and lifelong learner. I love exploring new things and always strive to push my boundaries. With a positive mindset, I believe that every challenge is an opportunity to grow and make a positive impact on those around me.': 'Xin chào, tôi là Phong, một người học hỏi đam mê và suốt đời. Tôi thích khám phá những điều mới và luôn cố gắng vượt qua giới hạn của bản thân. Với tư duy tích cực, tôi tin rằng mọi thử thách đều là cơ hội để phát triển và tạo ra tác động tích cực cho những người xung quanh.',
                'Hire Me Now!': 'Thuê tôi ngay!',
                'Download CV': 'Tải CV',
                
                // About Section
                'Get to know me': 'Tìm hiểu về tôi',
                'About Me': 'Về tôi',
                'I am a third-year Software Engineering student with a solid foundation in Backend and Android development. Through my personal projects, I have gained practical experience in building and improving applications, which helps me strengthen my technical skills and problem-solving abilities.': 'Tôi là sinh viên năm ba ngành Kỹ thuật Phần mềm với nền tảng vững chắc về Backend và phát triển Android. Thông qua các dự án cá nhân, tôi đã có được kinh nghiệm thực tế trong việc xây dựng và cải thiện ứng dụng, giúp tôi củng cố kỹ năng kỹ thuật và khả năng giải quyết vấn đề.',
                'I am always eager to learn new things, both in programming and in technology in general, to keep improving myself and prepare for future challenges.': 'Tôi luôn háo hức học hỏi những điều mới, cả trong lập trình và công nghệ nói chung, để không ngừng hoàn thiện bản thân và chuẩn bị cho những thử thách trong tương lai.',
                'Outside of studying and coding, I spend my free time playing games, listening to music, and reading novels. These hobbies not only help me relax but also give me new ideas and perspectives that I can sometimes apply in my work and studies.': 'Ngoài học tập và lập trình, tôi dành thời gian rảnh để chơi game, nghe nhạc và đọc tiểu thuyết. Những sở thích này không chỉ giúp tôi thư giãn mà còn mang lại những ý tưởng và góc nhìn mới mà đôi khi tôi có thể áp dụng trong công việc và học tập.',
                
                // Services Section
                'My Services': 'Dịch vụ của tôi',
                'what i will do for you': 'những gì tôi sẽ làm cho bạn',
                'App Development': 'Phát triển ứng dụng',
                'App development is the process of creating software for mobile devices such as smartphones or tablets, including stages from design, programming to deployment. Applications can be developed for operating systems such as iOS, Android or multi-platform.': 'Phát triển ứng dụng là quá trình tạo ra phần mềm cho các thiết bị di động như smartphone hoặc tablet, bao gồm các giai đoạn từ thiết kế, lập trình đến triển khai. Ứng dụng có thể được phát triển cho các hệ điều hành như iOS, Android hoặc đa nền tảng.',
                'Web Development': 'Phát triển Web',
                'Web development is the process of building and maintaining websites or web applications, including both front-end (user interface) and back-end (server-side processing). It utilizes various technologies such as HTML, CSS, JavaScript, and other programming languages to create interactive and user-friendly websites.': 'Phát triển web là quá trình xây dựng và duy trì các trang web hoặc ứng dụng web, bao gồm cả front-end (giao diện người dùng) và back-end (xử lý phía máy chủ). Nó sử dụng các công nghệ khác nhau như HTML, CSS, JavaScript và các ngôn ngữ lập trình khác để tạo ra các trang web tương tác và thân thiện với người dùng.',
                'UI/ UX Design': 'Thiết kế UI/UX',
                'UI/UX Design is the process of designing the user interface and user experience to create products that are easy to use, attractive, and efficient. UI focuses on form and aesthetics, while UX focuses on the user\'s feelings and experiences when interacting with the product.': 'Thiết kế UI/UX là quá trình thiết kế giao diện người dùng và trải nghiệm người dùng để tạo ra các sản phẩm dễ sử dụng, hấp dẫn và hiệu quả. UI tập trung vào hình thức và tính thẩm mỹ, trong khi UX tập trung vào cảm xúc và trải nghiệm của người dùng khi tương tác với sản phẩm.',
                'See More': 'Xem thêm',
                
                // Project Section
                'My Project': 'Dự án của tôi',
                'What i will do for you': 'Những gì tôi sẽ làm cho bạn',
                
                // Skills Section
                'My Skill': 'Kỹ năng của tôi',
                'I show you about my skill': 'Tôi sẽ cho bạn thấy về kỹ năng của tôi',
                
                // Contact Section
                'Get in Touch': 'Liên lạc',
                'Contact Me': 'Liên hệ với tôi',
                'Contact me': 'Liên hệ',
                'Leave a message, I will reply as soon as possible.': 'Để lại tin nhắn, tôi sẽ trả lời sớm nhất có thể.',
                'Name': 'Tên',
                'Email': 'Email',
                'Message': 'Tin nhắn',
                'Send message': 'Gửi tin nhắn'
            }
        };
        
        this.init();
    }
    
    init() {
        // Set initial language display
        this.updateLanguageDisplay();
        
        // Apply saved language
        this.applyLanguage(this.currentLanguage);
        
        // Add event listener
        if (this.languageToggle) {
            this.languageToggle.addEventListener('click', () => {
                this.toggleLanguage();
            });
        }
    }
    
    toggleLanguage() {
        // Add loading effect
        this.languageToggle.style.transform = 'scale(0.95)';
        this.languageToggle.style.opacity = '0.7';
        
        // Switch language
        this.currentLanguage = this.currentLanguage === 'en' ? 'vi' : 'en';
        
        // Save to localStorage
        localStorage.setItem('language', this.currentLanguage);
        
        // Apply new language with animation
        setTimeout(() => {
            this.applyLanguage(this.currentLanguage);
            this.updateLanguageDisplay();
            
            // Reset button style
            this.languageToggle.style.transform = 'scale(1)';
            this.languageToggle.style.opacity = '1';
        }, 150);
    }
    
    updateLanguageDisplay() {
        if (this.currentLangDisplay) {
            this.currentLangDisplay.textContent = this.currentLanguage.toUpperCase();
        }
    }
    
    applyLanguage(language) {
        // Get all elements with data attributes
        const elements = document.querySelectorAll('[data-en], [data-vi]');
        
        elements.forEach(element => {
            const text = element.getAttribute(`data-${language}`);
            if (text) {
                // Add fade effect
                element.style.opacity = '0.7';
                element.style.transform = 'translateY(-5px)';
                
                setTimeout(() => {
                    // Update text content while preserving HTML structure
                    if (element.tagName === 'A' && element.innerHTML.includes('<i')) {
                        // For buttons with icons, preserve the icon
                        const iconMatch = element.innerHTML.match(/<i[^>]*><\/i>/);
                        if (iconMatch) {
                            element.innerHTML = text + ' ' + iconMatch[0];
                        } else {
                            element.textContent = text;
                        }
                    } else {
                        element.textContent = text;
                    }
                    
                    // Reset transform
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 100);
            }
        });
        
        // Update page title
        document.title = language === 'vi' ? 'Portfolio - Phong Nguyễn' : 'Portfolio - Phong Nguyen';
        
        // Update role animation text if it exists
        this.updateRoleAnimation(language);
    }
    
    updateRoleAnimation(language) {
        const roleLines = document.querySelectorAll('.role-line');
        if (roleLines.length > 0) {
            // Reset any running animations
            roleLines.forEach(line => {
                line.style.opacity = '0';
            });
            
            // Restart animation with new language
            setTimeout(() => {
                roleLines.forEach((line, index) => {
                    setTimeout(() => {
                        line.style.opacity = '1';
                    }, index * 500);
                });
            }, 200);
        }
    }
}

// Initialize Language Manager
document.addEventListener('DOMContentLoaded', function() {
    new LanguageManager();
});

// EmailJS Configuration and Contact Form Handler
(function() {
    // Initialize EmailJS with your public key
    // TODO: Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    emailjs.init("92AsVLEg1MfbINHaH");
})();

// Enhanced Contact Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const statusMessage = document.getElementById('status-message');
    const sendBtn = contactForm?.querySelector('.send-btn');
    const btnText = sendBtn?.querySelector('.btn-text');
    const btnLoading = sendBtn?.querySelector('.btn-loading');

    if (!contactForm) return;

    // Enhanced status message function
    function showStatusMessage(title, message, type) {
        const statusIcon = statusMessage.querySelector('.status-icon');
        const statusTitle = statusMessage.querySelector('.status-title');
        const statusText = statusMessage.querySelector('.status-text');
        const statusClose = statusMessage.querySelector('.status-close');
        
        statusTitle.textContent = title;
        statusText.textContent = message;
        statusMessage.className = `status-message ${type} show`;
        
        // Auto hide after 8 seconds for success/error messages
        if (type !== 'loading') {
            setTimeout(() => {
                hideStatusMessage();
            }, 8000);
        }
        
        // Close button functionality
        statusClose.addEventListener('click', hideStatusMessage);
    }

    function hideStatusMessage() {
        statusMessage.classList.remove('show');
    }

    // Enhanced form reset function
    function resetForm() {
        contactForm.reset();
        
        // Reset floating labels
        const floatingLabels = contactForm.querySelectorAll('.floating-label');
        floatingLabels.forEach(label => {
            label.classList.remove('focused');
        });
        
        // Reset button state
        setLoadingState(false);
        
        // Reset textarea height
        const textareas = contactForm.querySelectorAll('textarea');
        textareas.forEach(textarea => {
            textarea.style.height = 'auto';
        });
        
        // Remove focus from all form elements
        document.activeElement.blur();
    }

    // Enhanced loading state function
    function setLoadingState(isLoading) {
        if (isLoading) {
            sendBtn.classList.add('loading');
            sendBtn.disabled = true;
        } else {
            sendBtn.classList.remove('loading');
            sendBtn.disabled = false;
        }
    }

    // Form validation
    function validateForm() {
        const name = contactForm.querySelector('#user_name').value.trim();
        const email = contactForm.querySelector('#user_email').value.trim();
        const message = contactForm.querySelector('#message').value.trim();
        
        if (!name) {
            showStatusMessage('Validation Error', 'Please enter your name.', 'error');
            return false;
        }
        
        if (!email) {
            showStatusMessage('Validation Error', 'Please enter your email address.', 'error');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showStatusMessage('Validation Error', 'Please enter a valid email address.', 'error');
            return false;
        }
        
        if (!message) {
            showStatusMessage('Validation Error', 'Please enter your message.', 'error');
            return false;
        }
        
        if (message.length < 10) {
            showStatusMessage('Validation Error', 'Please enter a longer message (at least 10 characters).', 'error');
            return false;
        }
        
        return true;
    }

    // Enhanced form submission handler
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Validate form first
        if (!validateForm()) {
            return;
        }

        // Set loading state
        setLoadingState(true);
        showStatusMessage('Sending...', 'Please wait while we send your message.', 'loading');

        // Get form data
        const formData = new FormData(contactForm);
        const templateParams = {
            user_name: formData.get('user_name'),
            user_email: formData.get('user_email'),
            subject: formData.get('subject') || 'Portfolio Contact',
            message: formData.get('message'),
            to_email: 'phongdz76@gmail.com' // Your email
        };

        // Send email using EmailJS
        emailjs.send('service_85230dl', 'template_n5ipkow', templateParams)
            .then(function(response) {
                console.log('Email sent successfully:', response);
                showStatusMessage(
                    'Message Sent Successfully!', 
                    'Thank you for reaching out! I will get back to you within 24 hours.', 
                    'success'
                );
                
                // Add success animation
                sendBtn.style.transform = 'scale(1.05)';
                setTimeout(() => {
                    sendBtn.style.transform = '';
                }, 200);
                
                resetForm();
            })
            .catch(function(error) {
                console.error('Email sending failed:', error);
                showStatusMessage(
                    'Message Failed to Send', 
                    'Something went wrong. Please try again or contact me directly at phongdz76@gmail.com', 
                    'error'
                );
                setLoadingState(false);
            });
    });

    // Enhanced floating label functionality
    const floatingInputs = contactForm.querySelectorAll('.floating-label input, .floating-label textarea');
    
    floatingInputs.forEach(input => {
        // Focus effects
        input.addEventListener('focus', function() {
            this.closest('.floating-label').classList.add('focused');
            
            // Add ripple effect
            createInputRipple(this);
        });

        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.closest('.floating-label').classList.remove('focused');
            }
        });

        // Real-time validation feedback
        input.addEventListener('input', function() {
            const floatingLabel = this.closest('.floating-label');
            
            if (this.value.trim()) {
                floatingLabel.classList.add('focused');
                this.classList.remove('error');
                
                // Email validation
                if (this.type === 'email' && this.value) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (emailRegex.test(this.value)) {
                        this.classList.add('valid');
                        this.classList.remove('error');
                    } else {
                        this.classList.remove('valid');
                        this.classList.add('error');
                    }
                }
            } else {
                floatingLabel.classList.remove('focused');
                this.classList.remove('valid', 'error');
            }
        });

        // Check if input has value on page load
        if (input.value.trim()) {
            input.closest('.floating-label').classList.add('focused');
        }
    });

    // Auto-resize textarea
    const textarea = contactForm.querySelector('#message');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 200) + 'px';
        });
    }

    // Button ripple effect
    function createInputRipple(element) {
        const ripple = element.parentElement.querySelector('.input-border');
        if (ripple) {
            ripple.style.animation = 'none';
            ripple.offsetHeight; // Trigger reflow
            ripple.style.animation = 'borderPulse 0.6s ease-out';
        }
    }

    // Enhanced button click effect
    sendBtn.addEventListener('click', function(e) {
        const ripple = this.querySelector('.btn-ripple');
        if (ripple) {
            ripple.style.animation = 'none';
            ripple.offsetHeight; // Trigger reflow
            ripple.style.animation = 'buttonRipple 0.6s ease-out';
        }
    });

    // Keyboard navigation enhancement
    contactForm.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            const activeElement = document.activeElement;
            
            // Allow normal Enter behavior for textarea
            if (activeElement.tagName.toLowerCase() === 'textarea') {
                return;
            }
            
            // Submit form if on submit button
            if (activeElement === sendBtn) {
                e.preventDefault();
                contactForm.dispatchEvent(new Event('submit'));
                return;
            }
            
            // Move to next input field
            const inputs = Array.from(contactForm.querySelectorAll('input, textarea, button'));
            const currentIndex = inputs.indexOf(activeElement);
            if (currentIndex < inputs.length - 1) {
                e.preventDefault();
                inputs[currentIndex + 1].focus();
            }
        }
    });

    // Add CSS for additional animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes borderPulse {
            0% { width: 0; opacity: 1; }
            100% { width: 100%; opacity: 0.8; }
        }
        
        @keyframes buttonRipple {
            0% { width: 0; height: 0; opacity: 0.8; }
            100% { width: 300px; height: 300px; opacity: 0; }
        }
        
        .floating-label input.valid {
            border-color: #27ae60;
            box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
        }
        
        .floating-label input.error {
            border-color: #e74c3c;
            box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
        }
        
        .floating-label input.valid + label {
            color: #27ae60;
        }
        
        .floating-label input.error + label {
            color: #e74c3c;
        }
    `;
    document.head.appendChild(style);
});