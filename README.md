# Portfolio Website - Phong Nguyen

A modern, responsive portfolio website showcasing frontend/backend development skills with multiple sections, dark mode, animations, multi-language support, and contact form integration.

## 🚀 Features

### Core Functionality
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between themes with smooth transitions and localStorage persistence
- **Multi-language Support**: English/Vietnamese language switcher
- **Contact Form**: EmailJS integration for direct email sending
- **Smooth Animations**: AOS, ScrollReveal, and custom CSS animations

### Sections
1. **Home**: Hero section with rotating text animation and social media links
2. **About**: Personal introduction with animated text blocks
3. **Services**: Web development, mobile app development, and UI/UX design services
4. **Projects**: Portfolio showcase with GitHub/Figma links
5. **Skills**: Categorized technical skills with hover effects
6. **Contact**: Interactive contact form with floating labels and particles

## 📁 Project Structure

```
Portfolio/
├── index.html              # Main HTML structure
├── main.js                 # Core JavaScript functionality
├── style.css               # Main CSS styles and variables
├── mediaqueries.css        # Responsive design breakpoints
├── images/                 # Images and assets
│   ├── profile photos
│   ├── project screenshots
│   └── ThanhPhong_CV.pdf
└── README.md
```

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup with accessibility considerations
- **CSS3**: Advanced styling with CSS Grid, Flexbox, and custom properties
- **JavaScript (ES6+)**: Modern JS features and DOM manipulation

### Libraries & Frameworks
- **AOS (Animate On Scroll)**: Scroll-triggered animations
- **ScrollReveal**: Progressive element reveals
- **EmailJS**: Client-side email service
- **BoxIcons**: Icon library
- **GSAP**: High-performance animations
- **Typed.js**: Typewriter effect
- **Swiper**: Touch slider

### Features Implementation
- **CSS Variables**: Dynamic theming system
- **Intersection Observer**: Performance-optimized scroll detection
- **Local Storage**: Theme and language preference persistence
- **Media Queries**: Comprehensive responsive breakpoints

## 🚀 Getting Started

### Prerequisites
- Modern web browser
- Local server (recommended) or direct file access

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/phongdz76/Portfolio.git
   cd Portfolio
   ```

2. **Run locally**
   
   **Option A: Using Live Server (VS Code)**
   - Install Live Server extension
   - Right-click on `index.html` → "Open with Live Server"
   
   **Option B: Using Python**
   ```bash
   python -m http.server 3000
   ```
   Then open http://localhost:3000
   
   **Option C: Direct file access**
   - Open `index.html` directly in browser
   - Note: Some features may require server environment

## ⚙️ Configuration

### EmailJS Setup
1. Open `main.js`
2. Replace the public key in `emailjs.init("YOUR_PUBLIC_KEY")`
3. Update service and template IDs in the `emailjs.send()` function:
   ```javascript
   emailjs.send('your_service_id', 'your_template_id', templateParams)
   ```

### Language Customization
- Content is managed through `data-en` and `data-vi` attributes in HTML
- Add new translations in the `LanguageManager` class in `main.js`
- Modify the `translations` object for additional content

### Theme Customization
- Edit CSS variables in `:root` section of `style.css`:
  ```css
  :root {
    --bg-color: #0a0a0a;
    --main-color: #667eea;
    --font-color: #f0f0f0;
    /* ... more variables */
  }
  ```
- Dark mode variables are in `body.dark-mode` selector

## 📱 Responsive Breakpoints

| Device | Breakpoint | Features |
|--------|------------|----------|
| Extra Small | ≤ 375px | Minimal layout, stacked elements |
| Mobile Small | ≤ 575px | Compact navigation, simplified animations |
| Mobile Large | 576px - 767px | Enhanced mobile experience |
| Tablet | 768px - 991px | Adjusted layouts, touch-friendly |
| Desktop | 992px - 1199px | Full feature set |
| Large Desktop | ≥ 1200px | Optimized spacing and typography |

## 🎨 Key Components

### Dark Mode System
```javascript
// main.js - Dark mode toggle with CSS variables
function updateCSSVariables(theme) {
    const root = document.documentElement;
    // Dynamic theme switching
}
```

### Language Manager
```javascript
// main.js - Multi-language support
class LanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.init();
    }
    // Language switching logic
}
```

### Contact Form Handler
```javascript
// main.js - EmailJS integration with validation
contactForm.addEventListener('submit', function(e) {
    // Form validation and email sending
});
```

### Animation System
- **AOS**: `data-aos` attributes for scroll animations
- **ScrollReveal**: Progressive element reveals
- **Custom CSS**: Keyframe animations for interactions

## 🔧 Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 60+ |
| Firefox | 55+ |
| Safari | 12+ |
| Edge | 79+ |

## 📊 Performance Features

- **Lazy Loading**: Images load on scroll
- **CSS Optimization**: Minimized repaints and reflows
- **JavaScript**: Event delegation and debounced scroll handlers
- **Media Queries**: Device-specific optimizations

## 🛡️ Security Considerations

- EmailJS public key is exposed (client-side limitation)
- Form validation on both client and server recommended
- Content Security Policy headers recommended for production

## 🚀 Deployment

### GitHub Pages
1. Push code to GitHub repository
2. Go to Settings → Pages
3. Select source branch (main/master)
4. Site will be available at `https://username.github.io/Portfolio`

### Netlify
1. Connect GitHub repository
2. Set build command: (none for static site)
3. Set publish directory: `/` (root)
4. Deploy automatically on push

### Vercel
1. Import GitHub repository
2. Configure as static site
3. Deploy with automatic HTTPS

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Name**: Phong Nguyen
- **Email**: nguyenhothanhphong5@gmail.com
- **Phone**: +84 931 429 277
- **Location**: Ho Chi Minh City, Vietnam

### Social Media
- [GitHub](https://github.com/phongdz76/)
- [Instagram](https://www.instagram.com/__tphong7684/)
- [YouTube](https://www.youtube.com/@PhongNguyen-ch9hv)
- [Facebook](https://www.facebook.com/profile.php?id=100058767700619)
- [Discord](https://discord.gg/6CFmCtTS)

## 🎯 Future Enhancements

- [ ] Blog section with dynamic content
- [ ] Project filtering and categories
- [ ] Advanced animations and micro-interactions
- [ ] Backend integration for contact form
- [ ] SEO optimization
- [ ] Progressive Web App (PWA) features
- [ ] Additional language support

---

**Built with ❤️ by Phong Nguyen
