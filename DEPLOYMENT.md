# 🎓 School Website Deployment Guide
## مدرسة أبي بكر الصديق الأساسية للبنين الثانية
### مديرية التربية والتعليم للواء قصبة إربد | الرقم الوطني: 114541 | العام الدراسي: 2026-2027

---

## 📌 Project Overview

This is a **presentation-ready, data-driven Arabic RTL school website** built with clean HTML5, CSS3, and Vanilla JavaScript. The website features full client-side SPA hash routing, an interactive staff hierarchy tree, a hero slider, comprehensive development plan views, and responsive layouts across all device form factors.

- **Institution**: مدرسة أبي بكر الصديق الأساسية للبنين الثانية
- **Directorate**: مديرية التربية والتعليم للواء قصبة إربد
- **National ID (الرقم الوطني)**: 114541
- **Academic Year**: 2026-2027
- **Live Production URL**: [https://abs2e-school.pages.dev](https://abs2e-school.pages.dev)
- **Source Repository**: [https://github.com/IoTGates/School-Website](https://github.com/IoTGates/School-Website)
- **Production Host**: Cloudflare Pages + GitHub CI/CD
- **Status**: ✅ PRODUCTION READY & DEPLOYED

---

## 🚀 Quick Start (Development & Local Testing)

### Option 1: Python HTTP Server (Recommended)
```bash
cd D:/GitHub2025/School-Website
python -m http.server 8080
```
Then open: **http://localhost:8080**

### Option 2: Node.js HTTP Server
```bash
cd D:/GitHub2025/School-Website
npx http-server -p 8080
```

### Option 3: VS Code Live Server
1. Install the "Live Server" extension in VS Code.
2. Right-click `index.html` → "Open with Live Server".

---

## 📁 Project Structure

```
School-Website/
├── index.html                 # Main SPA entry point and layout shell
├── assets/
│   ├── css/
│   │   └── style.css          # Design system, responsive RTL styles, theme variables
│   ├── js/
│   │   ├── data.js            # Canonical school dataset (single source of truth)
│   │   └── app.js             # SPA hash router, dynamic renderers, UI interactivity
│   └── images/
│       ├── school-logo.png    # Official school logo (PNG format)
│       ├── school-logo.jpg    # Official school logo (JPG format)
│       ├── slide-1.jpg        # Hero slider imagery - slide 1
│       └── slide-2.jpg        # Hero slider imagery - slide 2
├── DEPLOYMENT.md              # Deployment guide and operational reference
├── TASK_STATUS.md             # Project status, verification checkpoints, architecture
├── LINK_AUDIT.md              # Official verification classification of school links
└── README.md                  # Project overview and documentation
```

---

## 🏗️ Architecture & Technical Specifications

### Data-Driven Design & SPA Routing
- **Single Source of Truth**: All dynamic content is centralized in `assets/js/data.js` under `siteData`.
- **SPA Hash Router**: `assets/js/app.js` listens to `hashchange` and `DOMContentLoaded` to route between 24 distinct views without reloading the page.
- **Deep-Hash Navigation**: Direct bookmarking and navigation to deep routes (e.g., `#development-learning`, `#school-structure`, `#grade-4`).
- **Native Browser History**: Full Back and Forward browser navigation support (`window.history.back()`).
- **Decoupled Architecture**: Prepared for CMS integration later (`getSiteModelV3()`), allowing data replacement without altering UI structure.

### Assets & Zero External Dependencies
- **HTML**: Clean semantic markup.
- **CSS**: Pure vanilla CSS with custom properties (CSS variables), Flexbox, and CSS Grid.
- **JavaScript**: Pure Vanilla JS (ES6+), zero frameworks or external runtime dependencies.
- **Total Payload**: Lightweight footprint (~50KB uncompressed), sub-second load times.

---

## ✨ Core Features

### 1. Header & Navigation (10 Top-Level Items)
- **Top Bar**: Academic year (`العام الدراسي 2026-2027`), National ID (`114541`), Directorate badge, and direct verified social media links.
- **Navbar Brand**: Authentic school emblem + 2-line title layout (`مدرسة أبي بكر الصديق` / `الأساسية للبنين الثانية`).
- **Menu Items (10 Items)**:
  1. الرئيسية (`#home`)
  2. مدرستنا (`#school`)
  3. الخطة التطويرية (`#development-plan`)
  4. الصفوف (`#grades`)
  5. الفعاليات (`#events`)
  6. المبادرات (`#initiatives`)
  7. الإنجازات (`#achievements`)
  8. الموارد التعليمية (`#resources`)
  9. روابط مهمة (`#links`)
  10. تواصل معنا (`#contact`)
- All 10 menu items fit seamlessly on a single line at desktop resolutions (>=1200px).
- Smooth responsive drawer for tablet/mobile with sub-navigation menus.

### 2. Hero Section with Interactive Slider
- Dynamic multi-slide hero showcasing canonical school photos and messaging.
- Official school slogan: **"نتعلم • نبدع • ننتمي • نتميز"**.
- Automated slide cycling, manual controls, visual indicator dots, and primary call-to-action buttons.

### 3. Vision & Mission
- Official school vision and mission cards derived directly from school operational records.
- Strategic alignment with national educational development guidelines.

### 4. Interactive Staff Hierarchy & Governance Tree (`#staff` & `#school-structure`)
- Complete organizational hierarchy based on official records:
  - **Directorate Leadership**: مدير التربية والتعليم (د. رعد الخصاونة) → رئيس مجلس الشبكة (قاسم الداوود) → مستشار التطوير المدرسي (سوزان حماد)
  - **School Administration**: مديرة المدرسة / رئيس فريق التطوير (منيا ردايدة)
  - **Development Domain Teams**:
    1. **التعلم والتعليم**: منسق المجال ازدهار فودة | الأعضاء: رهام المومني، هبه عبدالقادر
    2. **بيئة الطلبة والمناخ والسياق الثقافي**: منسق المجال عبير السيد | الأعضاء: ثراء العيسى، هديل الجمال
    3. **المدرسة والمجتمع**: منسق المجال لبنى عبدالقادر | الأعضاء: بثينة الخليلي، ريما العبد الله
    4. **القيادة والإدارة**: منسق المجال منى القرعان | الأعضاء: ميرفت درباس، رانا الشناق
  - **Teaching Faculty**: Complete listing of teachers and staff across all subjects and grades.
- **Interactive Features**: Collapsible branches with smooth transitions, Expand All / Collapse All controls, individual staff detail dialogs with zero invented data, and a responsive mobile accordion view.

### 5. Development Plan 2026-2027 (4 Core Areas)
Interactive cards and dedicated deep routes for all four domains:
1. **التعلم والتعليم** (`#development-learning`) - Blue `#1087C9`
2. **بيئة الطلبة والمناخ والسياق الثقافي** (`#development-environment`) - Green `#15966B`
3. **المدرسة والمجتمع** (`#development-community`) - Gold `#F7B731`
4. **القيادة والإدارة** (`#development-leadership`) - Purple `#7656B3`
Each domain includes comprehensive KPIs, baselines, targets, diagnostic rubrics, and action steps.

### 6. Grade Portals & Academic Support
- **الصف الرابع الأساسي** (`#grade-4`): Curriculum, competencies, and learning outcomes.
- **الصف الخامس الأساسي** (`#grade-5`): Core subjects, analytical thinking, and student parliament.
- **برامج الدعم التعليمي** (`#support-programs`): صف الفرح، برنامج التدخلات العلاجية، رعاية الموهوبين، ونوادي القراءة.

### 7. School Initiatives & Achievements
- Dedicated views for 13 school initiatives (سنبلة، مملكة الأصدقاء، صف الفرح، مدرستي مكان آمن، كلمة طيبة، أتصرف صح، أصدقاء السلوك الإيجابي، وغيرها).
- Comprehensive achievement records documenting academic, environmental, and community milestones.

### 8. Official Social Channels & Institutional Links
- **Facebook**: `https://www.facebook.com/people/مدرسة-أبي-بكر-الصديق-الأساسية-الثانية-قصبة-إربد/61579680572587/`
- **YouTube**: `https://www.youtube.com/@abkrschool/playlists`
- **Important Links**: Institutional portals including OpenEMIS, Ministry of Education, Queen Rania Center, Siraj platform, and curriculum repositories.

---

## 🎨 Design System

### Color Palette
- **Navy (Primary Dark)**: `#073B64`
- **Blue (Primary)**: `#1087C9`
- **Green (Accent / Environment)**: `#15966B`
- **Yellow / Gold (Highlight / Community)**: `#F7B731`
- **Purple (Leadership / Admin)**: `#7656B3`
- **Light Background**: `#F4F8FC`
- **Card Background**: `#FFFFFF`
- **Dark Text**: `#1A202C`

### Typography & Layout
- **Font Stack**: Segoe UI, system-ui, -apple-system, sans-serif.
- **RTL**: Native `dir="rtl"` with appropriate bidirectional CSS layouts.
- **Card Effects**: Rounded borders (`8px`–`16px`), subtle shadows, smooth hover lifts (`translateY(-4px)`).

---

## 📱 Responsive Design Verification

The interface has been thoroughly audited and verified for responsive layout stability:
- **Desktop (>=1200px)**: 10 navigation items fit on one line without wrapping; full grid layouts.
- **Tablet (768px – 1199px)**: Clean breakpoint transition at 1199px switching to a structured drawer before any navigation clipping can occur.
- **Mobile (<768px)**: Fluid clamp font sizing for 2-line title, vertical staff accordion, full-width touch-friendly cards.
- **Horizontal Overflow**: Verified **0px overflow** across 1920px, 1440px, 1280px, 1024px, 768px, 430px, 390px, and 360px viewports.

---

## 🌐 Production Deployment

### Active Production: Cloudflare Pages + GitHub
The production site is connected directly to the GitHub repository:
1. **Repository**: `https://github.com/IoTGates/School-Website`
2. **Production URL**: `https://abs2e-school.pages.dev`
3. **Build Configuration**:
   - Framework preset: `None` (Static HTML)
   - Build command: `None`
   - Build output directory: `/` (Root)
4. **Continuous Deployment**: Every push to `main` triggers automated deployment on Cloudflare Pages edge network worldwide.

### Alternative Static Hosting Options
- **GitHub Pages**: Settings → Pages → Deploy from branch (`main` / root).
- **Netlify / Vercel**: Connect repository, deploy static root directory.
- **Self-Hosted (Nginx/Apache)**: Serve root folder with standard static file configuration.

---

## 🔄 CMS Integration Later

The architecture is deliberately designed to allow seamless CMS or Google Apps Script integration:
1. `siteData` in `assets/js/data.js` represents the exact schema expected by the application.
2. In future iterations, `siteData` can be populated dynamically via `fetch('/api/getSiteModelV3')` or a Google Apps Script web endpoint without touching any UI templates or CSS styles.

---

## 📋 Operational Checkpoint & Next Steps

1. ✅ **Static Frontend Production Ready**: Fully built, styled, and audited.
2. ✅ **Active Deployment**: Hosted live on Cloudflare Pages (`https://abs2e-school.pages.dev`).
3. ⏳ **Stakeholder Review**: Presentation to school leadership and educational directorate.
4. ⏳ **Custom Domain**: Connect official school domain if desired.
5. ⏳ **CMS Integration Later**: Connect Google Apps Script / Google Sheets backend for live data updates.

---

**Last Updated**: September 2026  
**License**: مدرسة أبي بكر الصديق الأساسية للبنين الثانية - جميع الحقوق محفوظة
