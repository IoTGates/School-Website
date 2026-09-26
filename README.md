# مدرسة النور - School Website
# Noor School Website

A professional, modern school website built with pure HTML, CSS, and JavaScript. Fully responsive and optimized for mobile-first viewing with complete Arabic RTL support.

## Features

✨ **Professional Design**
- Clean, modern interface
- Mobile-first responsive design
- Optimized for all screen sizes (480px, 768px, and up)

🌍 **Arabic RTL Support**
- Full right-to-left (RTL) text direction
- Native HTML RTL implementation
- Beautiful Arabic typography

📱 **Responsive Layout**
- Mobile-friendly hamburger menu
- Grid-based layout with CSS Flexbox and Grid
- Adaptive navigation for all devices

✅ **Key Sections**
- **Navigation:** Sticky header with smooth scrolling
- **Hero Section:** Eye-catching banner with CTA
- **About:** School mission, vision, and statistics
- **Features:** Service cards showcasing offerings
- **Contact:** Contact information and inquiry form
- **Footer:** Links and social media

🎨 **Interactive Features**
- Smooth scroll navigation
- Hamburger menu toggle (mobile)
- Contact form with validation
- Hover effects and animations

## Technology Stack

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with Grid and Flexbox
- **JavaScript** - Vanilla JS for interactivity
- **No Dependencies** - Pure HTML/CSS/JS implementation

## Getting Started

### Quick Start (Local Development)

1. **Navigate to project directory:**
   ```bash
   cd School-Website
   ```

2. **Start a local web server:**
   ```bash
   # Using Python 3
   python -m http.server 8080
   
   # Or using Python 2
   python -m SimpleHTTPServer 8080
   
   # Or using Node.js
   npx http-server -p 8080
   ```

3. **Open in browser:**
   - Navigate to `http://localhost:8080`
   - Website will load with full responsiveness

### File Structure

```
School-Website/
├── index.html      # Main HTML file with structure
├── styles.css      # All styling (responsive, RTL)
├── script.js       # JavaScript for interactivity
└── README.md       # Documentation
```

## Responsive Breakpoints

- **Desktop:** 1200px and up
- **Tablet:** 768px - 1199px
- **Mobile:** 480px - 767px
- **Small Mobile:** Below 480px

## Browser Compatibility

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Features Breakdown

### Navigation
- Sticky header that remains visible on scroll
- Smooth scroll to sections
- Mobile hamburger menu with toggle functionality

### Hero Section
- Full-height banner with gradient background
- Call-to-action button
- Responsive text sizing

### About Section
- School mission and vision
- Statistics display
- Grid-based stat cards

### Features Section
- 4-column card grid (responsive)
- Icon and description for each service
- Hover effects on cards

### Contact Section
- Contact information display
- Contact form with fields for name, email, message
- Form validation

### Footer
- Copyright information
- Social media links

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary: #1e40af;        /* Primary blue */
    --primary-dark: #1e3a8a;   /* Darker blue */
    --accent: #f59e0b;         /* Accent orange */
    --text-dark: #1f2937;      /* Dark text */
    --text-light: #6b7280;     /* Light text */
    --bg-light: #f9fafb;       /* Light background */
}
```

### Content
Edit `index.html` to update:
- School name and descriptions
- Section content
- Contact information
- Social media links

### Typography
Modify font families and sizes in `styles.css` under the body and heading selectors.

## Performance

- No external dependencies or CDN resources
- Fast loading times (all assets local)
- Optimized CSS and JavaScript
- Minimal file size

## RTL Implementation

The website uses native HTML RTL support:
```html
<html lang="ar" dir="rtl">
```

All CSS is implemented with RTL in mind:
- Flexbox and Grid handle direction automatically
- Text alignment adjusted for RTL
- Margin and padding work correctly in RTL context

## Testing

The website has been tested for:
- ✓ HTML validation
- ✓ CSS rendering
- ✓ JavaScript functionality
- ✓ Mobile responsiveness
- ✓ Arabic content display
- ✓ RTL text direction
- ✓ Cross-browser compatibility

## License

Copyright © 2026 School Website. All rights reserved.

## Contact

For inquiries or support, please use the contact form on the website or email: info@noor-school.edu.sa

---

**Note:** This is a professional school website template. Update the school name, contact information, and content to match your institution.
