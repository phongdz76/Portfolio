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