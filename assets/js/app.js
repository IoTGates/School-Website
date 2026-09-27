// ==================== APP CONTROLLER & SPA ROUTER ====================
// مدرسة أبي بكر الصديق الأساسية للبنين الثانية
// Single Page Application (SPA) Engine & Slider Controller
// Academic Year: 2026-2027

(function () {
    'use strict';

    const App = {
        currentRoute: '',
        historyStack: [],
        sliderInterval: null,
        currentSlideIndex: 0,
        sliderAutoPlayDelay: 5500,
        isSliderPaused: false,

        init() {
            this.populateTopBar();
            this.populateNavigation();
            this.initHeroSlider();
            this.populateQuickPortals();
            this.populateVisionMission();
            this.populateHomeStaff();
            this.populateDevelopmentPlanPreview();
            this.populateHomeEvents();
            this.populateHomeInitiatives();
            this.populateHomeImportantLinks();
            this.populateFooter();
            this.initPersonModal();
            this.setupEventListeners();
            this.setupRouter();

            console.log('✓ مدرسة أبي بكر الصديق الأساسية الثانية - تم تهيئة الموقع بنجاح');
        },

        // ==================== TOP BAR & VERIFIED SOCIAL ====================
        populateTopBar() {
            const container = document.getElementById('topBarSocial');
            if (!container || !siteData.socialLinks) return;
            container.innerHTML = '';

            const list = siteData.socialLinksList || Object.values(siteData.socialLinks);
            list.forEach(item => {
                const a = document.createElement('a');
                a.href = item.url;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.className = 'social-badge-link';
                a.setAttribute('aria-label', item.label);
                a.innerHTML = `<span class="social-icon" aria-hidden="true">${item.icon}</span> <span>${item.platform}</span>`;
                container.appendChild(a);
            });
        },

        // ==================== NAVIGATION ====================
        populateNavigation() {
            const navMenu = document.getElementById('navMenu');
            if (!navMenu || !siteData.navigation) return;
            navMenu.innerHTML = '';

            siteData.navigation.forEach(item => {
                const li = document.createElement('li');

                if (item.children && item.children.length > 0) {
                    li.className = 'nav-item-dropdown';

                    const triggerWrap = document.createElement('div');
                    triggerWrap.className = 'dropdown-trigger-wrap';

                    const parentLink = document.createElement('a');
                    parentLink.href = item.route;
                    parentLink.className = 'dropdown-trigger';
                    parentLink.setAttribute('data-route', item.route);
                    parentLink.innerHTML = `<span>${item.label}</span> <span class="dropdown-caret" aria-hidden="true">▾</span>`;
                    parentLink.addEventListener('click', () => {
                        this.closeHamburgerMenu();
                    });

                    const toggleBtn = document.createElement('button');
                    toggleBtn.className = 'dropdown-toggle-btn';
                    toggleBtn.setAttribute('type', 'button');
                    toggleBtn.setAttribute('aria-expanded', 'false');
                    toggleBtn.setAttribute('aria-label', `توسيع قائمة ${item.label}`);
                    toggleBtn.innerHTML = `<span class="dropdown-caret" aria-hidden="true">▾</span>`;

                    toggleBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const isOpen = li.classList.toggle('mobile-open');
                        toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
                    });

                    triggerWrap.appendChild(parentLink);
                    triggerWrap.appendChild(toggleBtn);
                    li.appendChild(triggerWrap);

                    const subUl = document.createElement('ul');
                    subUl.className = 'dropdown-menu';

                    item.children.forEach(sub => {
                        const subLi = document.createElement('li');
                        const subA = document.createElement('a');
                        subA.href = sub.route;
                        subA.textContent = sub.label;
                        subA.setAttribute('data-route', sub.route);
                        subA.addEventListener('click', () => {
                            this.closeHamburgerMenu();
                        });
                        subLi.appendChild(subA);
                        subUl.appendChild(subLi);
                    });

                    li.appendChild(subUl);
                } else {
                    const a = document.createElement('a');
                    a.textContent = item.label;
                    a.href = item.route;
                    a.setAttribute('data-route', item.route);
                    a.addEventListener('click', () => {
                        this.closeHamburgerMenu();
                    });
                    li.appendChild(a);
                }

                navMenu.appendChild(li);
            });

            // Append mobile drawer footer with secondary school metadata & social links
            const mobileFooterLi = document.createElement('li');
            mobileFooterLi.className = 'mobile-menu-footer-item';
            const fbUrl = siteData.socialLinks && siteData.socialLinks.facebook ? siteData.socialLinks.facebook.url : '#';
            const ytUrl = siteData.socialLinks && siteData.socialLinks.youtube ? siteData.socialLinks.youtube.url : '#';

            mobileFooterLi.innerHTML = `
                <div class="mobile-menu-footer">
                    <div class="mobile-meta-item">📍 ${siteData.school.directorate}</div>
                    <div class="mobile-meta-item">🔢 الرقم الوطني للمدرسة: ${siteData.school.nationalSchoolNumber}</div>
                    <div class="mobile-meta-item">📅 العام الدراسي: ${siteData.school.academicYear}</div>
                    <div class="mobile-menu-social">
                        <a href="${fbUrl}" target="_blank" rel="noopener noreferrer" class="mobile-social-badge fb-badge">
                            <span>f</span> فيسبوك المدرسة
                        </a>
                        <a href="${ytUrl}" target="_blank" rel="noopener noreferrer" class="mobile-social-badge yt-badge">
                            <span>▶</span> يوتيوب المدرسة
                        </a>
                    </div>
                </div>
            `;
            navMenu.appendChild(mobileFooterLi);
        },

        updateActiveNav(activeRoute) {
            const navLinks = document.querySelectorAll('#navMenu a');
            navLinks.forEach(link => {
                const route = link.getAttribute('data-route');
                if (route === activeRoute || (activeRoute && activeRoute.startsWith(route) && route !== '#home' && route !== '#')) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        },

        // ==================== HERO SLIDER (RESPONSIVE & TOUCH) ====================
        initHeroSlider() {
            const wrapper = document.getElementById('slidesWrapper');
            const dotsContainer = document.getElementById('sliderDots');
            const prevBtn = document.getElementById('sliderPrevBtn');
            const nextBtn = document.getElementById('sliderNextBtn');
            const sliderContainer = document.getElementById('heroSliderContainer');

            if (!wrapper || !siteData.heroSlides || siteData.heroSlides.length === 0) return;

            wrapper.innerHTML = '';
            if (dotsContainer) dotsContainer.innerHTML = '';

            siteData.heroSlides.forEach((slide, index) => {
                // Slide element
                const slideEl = document.createElement('div');
                slideEl.className = `hero-slide ${index === 0 ? 'active' : ''}`;
                slideEl.setAttribute('data-index', index);
                slideEl.innerHTML = `
                    <img src="${slide.image}" alt="${slide.alt}" class="slide-bg-img" loading="${index === 0 ? 'eager' : 'lazy'}">
                    <div class="slide-overlay"></div>
                    <div class="slide-content">
                        <span class="slide-badge">${slide.badge}</span>
                        <h1 class="slide-title">${slide.title}</h1>
                        <p class="slide-subtitle">${slide.subtitle}</p>
                        <div class="slide-actions">
                            <a href="${slide.primaryCta.route}" class="btn btn-primary">${slide.primaryCta.label}</a>
                            <a href="${slide.secondaryCta.route}" class="btn btn-outline">${slide.secondaryCta.label}</a>
                        </div>
                    </div>
                `;
                wrapper.appendChild(slideEl);

                // Dot element
                if (dotsContainer) {
                    const dot = document.createElement('button');
                    dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
                    dot.setAttribute('aria-label', `الانتقال إلى الشريحة ${index + 1}`);
                    dot.setAttribute('data-index', index);
                    dot.addEventListener('click', () => {
                        this.goToSlide(index);
                    });
                    dotsContainer.appendChild(dot);
                }
            });

            this.currentSlideIndex = 0;

            if (prevBtn) {
                prevBtn.addEventListener('click', () => this.prevSlide());
            }
            if (nextBtn) {
                nextBtn.addEventListener('click', () => this.nextSlide());
            }

            // Keyboard navigation
            if (sliderContainer) {
                sliderContainer.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowRight' || e.key === 'Right') {
                        this.prevSlide(); // In RTL, right is previous
                    } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
                        this.nextSlide(); // In RTL, left is next
                    }
                });

                // Pause on hover
                sliderContainer.addEventListener('mouseenter', () => {
                    this.isSliderPaused = true;
                });
                sliderContainer.addEventListener('mouseleave', () => {
                    this.isSliderPaused = false;
                });

                // Touch / Swipe handling for mobile
                let touchStartX = 0;
                let touchEndX = 0;

                sliderContainer.addEventListener('touchstart', (e) => {
                    touchStartX = e.changedTouches[0].screenX;
                }, { passive: true });

                sliderContainer.addEventListener('touchend', (e) => {
                    touchEndX = e.changedTouches[0].screenX;
                    const diff = touchStartX - touchEndX;
                    if (Math.abs(diff) > 40) {
                        if (diff > 0) {
                            // Swiped left (in RTL, forward)
                            this.nextSlide();
                        } else {
                            // Swiped right (in RTL, backward)
                            this.prevSlide();
                        }
                    }
                }, { passive: true });
            }

            this.startSliderAutoPlay();
        },

        startSliderAutoPlay() {
            if (this.sliderInterval) clearInterval(this.sliderInterval);
            this.sliderInterval = setInterval(() => {
                if (!this.isSliderPaused && document.getElementById('homeView') && !document.getElementById('homeView').classList.contains('hidden-view')) {
                    this.nextSlide();
                }
            }, this.sliderAutoPlayDelay);
        },

        goToSlide(index) {
            const slides = document.querySelectorAll('.hero-slide');
            const dots = document.querySelectorAll('.slider-dot');
            if (slides.length === 0) return;

            this.currentSlideIndex = (index + slides.length) % slides.length;

            slides.forEach((slide, idx) => {
                if (idx === this.currentSlideIndex) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });

            dots.forEach((dot, idx) => {
                if (idx === this.currentSlideIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        },

        nextSlide() {
            this.goToSlide(this.currentSlideIndex + 1);
        },

        prevSlide() {
            this.goToSlide(this.currentSlideIndex - 1);
        },

        // ==================== QUICK PORTALS ====================
        populateQuickPortals() {
            const container = document.getElementById('quickPortalsContainer');
            if (!container || !siteData.quickPortals) return;
            container.innerHTML = '';

            siteData.quickPortals.forEach(portal => {
                const card = document.createElement('a');
                card.href = portal.route;
                card.className = 'quick-portal-card';
                card.innerHTML = `
                    <div class="portal-icon" aria-hidden="true">${portal.icon}</div>
                    <h3 class="portal-title">${portal.title}</h3>
                    <p class="portal-desc">${portal.desc}</p>
                `;
                container.appendChild(card);
            });
        },

        // ==================== VISION & MISSION ====================
        populateVisionMission() {
            const visionText = document.getElementById('visionText');
            const missionText = document.getElementById('missionText');
            if (visionText) visionText.textContent = siteData.visionMission.vision;
            if (missionText) missionText.textContent = siteData.visionMission.mission;
        },

        // ==================== STAFF (HOMEPAGE) ====================
        populateHomeStaff() {
            const principalCard = document.getElementById('principalSpotlightCard');
            if (principalCard && siteData.staff && siteData.staff.principal) {
                const p = siteData.staff.principal;
                principalCard.innerHTML = `
                    <div class="principal-avatar" aria-hidden="true">${p.icon}</div>
                    <div class="principal-info">
                        <span class="principal-role-badge">${p.role}</span>
                        <h3 class="principal-name">${p.name}</h3>
                        <p class="principal-title-sub">${p.title}</p>
                        <p class="principal-bio">${p.bio}</p>
                        <div class="principal-actions-wrap" style="margin-top: 1rem;">
                            <a href="#school-structure" class="btn btn-primary btn-sm">هيكل الحوكمة والتطوير المدرسي ←</a>
                            <a href="#staff" class="btn btn-secondary btn-sm">الكادر المدرسي والهيئة التدريسية ←</a>
                        </div>
                    </div>
                `;
            }

            const coordinatorsContainer = document.getElementById('homeCoordinatorsContainer');
            if (coordinatorsContainer && siteData.developmentPlan) {
                coordinatorsContainer.innerHTML = '';
                siteData.developmentPlan.forEach(plan => {
                    const card = document.createElement('div');
                    card.className = 'coordinator-card';
                    card.style.borderTopColor = plan.color;
                    card.style.cursor = 'pointer';
                    card.addEventListener('click', (e) => {
                        if (!e.target.closest('a')) window.location.hash = plan.route;
                    });
                    card.innerHTML = `
                        <div class="coord-header">
                            <span class="coord-icon" aria-hidden="true">${plan.icon}</span>
                            <span class="coord-badge" style="background: ${plan.color}15; color: ${plan.color}">${plan.title}</span>
                        </div>
                        <h4>المنسق: ${plan.coordinator}</h4>
                        <div class="coord-role">أعضاء الفريق: ${plan.team.join('، ')}</div>
                        <p class="coord-resp">${plan.definition.substring(0, 110)}...</p>
                        <a href="${plan.route}" class="btn btn-secondary btn-sm" style="margin-top: auto;">تفاصيل المجال والأنشطة ←</a>
                    `;
                    coordinatorsContainer.appendChild(card);
                });
            }
        },

        // ==================== DEVELOPMENT PLAN PREVIEW (HOMEPAGE) ====================
        populateDevelopmentPlanPreview() {
            const container = document.getElementById('developmentCardsContainer');
            if (!container || !siteData.developmentPlan) return;
            container.innerHTML = '';

            siteData.developmentPlan.forEach(plan => {
                const card = document.createElement('div');
                card.className = 'dev-card';
                card.style.borderTopColor = plan.color;
                card.style.cursor = 'pointer';
                card.addEventListener('click', (e) => {
                    if (!e.target.closest('a')) window.location.hash = plan.route;
                });
                card.innerHTML = `
                    <div class="dev-card-icon" aria-hidden="true">${plan.icon}</div>
                    <h3>${plan.title}</h3>
                    <p class="dev-card-summary">${plan.definition}</p>
                    <div class="dev-card-footer">
                        <a href="${plan.route}" class="btn btn-secondary btn-block">عرض تفاصيل الخطة والمؤشرات ←</a>
                    </div>
                `;
                container.appendChild(card);
            });
        },

        // ==================== EVENTS PREVIEW (HOMEPAGE - MAX 3) ====================
        populateHomeEvents() {
            const container = document.getElementById('homeEventsContainer');
            if (!container || !siteData.events) return;
            container.innerHTML = '';

            const featuredEvents = siteData.events.slice(0, 3);
            featuredEvents.forEach(evt => {
                const card = document.createElement('div');
                card.className = 'event-card card';
                card.style.cursor = 'pointer';
                card.addEventListener('click', (e) => {
                    if (!e.target.closest('a')) window.location.hash = evt.route;
                });
                card.innerHTML = `
                    <div class="event-card-header">
                        <span class="event-badge">${evt.category}</span>
                        <span class="event-date">📅 ${evt.date}</span>
                    </div>
                    <div class="event-card-body">
                        <span class="event-icon" aria-hidden="true">${evt.icon}</span>
                        <h3>${evt.title}</h3>
                        <p>${evt.summary}</p>
                    </div>
                    <div class="event-card-footer">
                        <a href="${evt.route}" class="btn btn-outline-dark btn-block">تفاصيل الفعالية كاملة ←</a>
                    </div>
                `;
                container.appendChild(card);
            });
        },

        // ==================== INITIATIVES PREVIEW (HOMEPAGE - MAX 4) ====================
        populateHomeInitiatives() {
            const container = document.getElementById('homeInitiativesContainer');
            if (!container || !siteData.initiatives) return;
            container.innerHTML = '';

            const featuredInits = siteData.initiatives.slice(0, 4);
            featuredInits.forEach(init => {
                const card = document.createElement('div');
                card.className = 'initiative-card card';
                card.style.cursor = 'pointer';
                card.addEventListener('click', (e) => {
                    if (!e.target.closest('a')) window.location.hash = init.route;
                });
                card.innerHTML = `
                    <div class="init-header">
                        <span class="init-icon" aria-hidden="true">${init.icon}</span>
                        <span class="init-category">${init.category}</span>
                    </div>
                    <h3>${init.name}</h3>
                    <p>${init.briefDescription}</p>
                    <div class="init-footer">
                        <a href="${init.route}" class="btn btn-secondary btn-sm">اقرأ المزيد والتفاصيل ←</a>
                    </div>
                `;
                container.appendChild(card);
            });
        },

        // ==================== SELECTED IMPORTANT LINKS (HOMEPAGE - MAX 6) ====================
        populateHomeImportantLinks() {
            const container = document.getElementById('homeLinksContainer');
            if (!container || !siteData.importantLinksCategories) return;
            container.innerHTML = '';

            // Pick featured links from categories
            let featured = [];
            siteData.importantLinksCategories.forEach(cat => {
                cat.links.forEach(l => {
                    if (l.featuredOnHome && featured.length < 6) {
                        featured.push({ ...l, categoryName: cat.title });
                    }
                });
            });

            featured.forEach(link => {
                const isInternal = link.url.startsWith('#');
                const card = document.createElement('div');
                card.className = 'link-card card';
                card.style.cursor = 'pointer';
                card.addEventListener('click', (e) => {
                    if (!e.target.closest('a')) {
                        if (isInternal) {
                            window.location.hash = link.url;
                        } else {
                            window.open(link.url, '_blank', 'noopener,noreferrer');
                        }
                    }
                });
                card.innerHTML = `
                    <div class="link-card-top">
                        <span class="link-icon" aria-hidden="true">${link.icon}</span>
                        <span class="link-badge" style="background: var(--blue-light); color: var(--navy); font-weight: 600;">${link.categoryName || 'بوابة رسمية'}</span>
                    </div>
                    <h3>${link.title}</h3>
                    <p>${link.shortDesc}</p>
                    <div class="link-meta-source">
                        <small>المصدر: ${link.source}</small>
                    </div>
                    <div class="link-card-action">
                        <a href="${link.url}" ${isInternal ? '' : 'target="_blank" rel="noopener noreferrer"'} class="btn btn-secondary btn-block btn-sm">
                            ${isInternal ? 'عرض البوابة' : 'زيارة المنصة الرسمية ↗'}
                        </a>
                    </div>
                `;
                container.appendChild(card);
            });
        },

        // ==================== FOOTER ====================
        populateFooter() {
            const f = siteData.footer;
            if (!f) return;

            const schoolNameEl = document.getElementById('footerSchoolName');
            const copyrightName = document.getElementById('copyrightSchoolName');
            const schoolCodeEl = document.getElementById('footerSchoolCode');
            const yearEl = document.getElementById('footerYear');
            const aboutTextEl = document.getElementById('footerAboutText');

            if (schoolNameEl) schoolNameEl.textContent = f.schoolName;
            if (copyrightName) copyrightName.textContent = f.schoolName;
            if (schoolCodeEl) schoolCodeEl.textContent = `الرقم الوطني: ${f.nationalSchoolNumber}`;
            if (yearEl) yearEl.textContent = `العام الدراسي ${f.academicYear}`;
            if (aboutTextEl && f.aboutText) aboutTextEl.textContent = f.aboutText;

            // Column 1: عن المدرسة
            const aboutLinks = document.getElementById('footerAboutLinks');
            const aboutList = (f.columns && f.columns.about) || (f.columns && f.columns.school);
            if (aboutLinks && aboutList) {
                aboutLinks.innerHTML = '';
                aboutList.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="${item.route}">${item.label}</a>`;
                    aboutLinks.appendChild(li);
                });
            }

            // Column 2: صفحات المدرسة
            const schoolPagesLinks = document.getElementById('footerSchoolPagesLinks');
            const pagesList = (f.columns && f.columns.schoolPages) || (f.columns && f.columns.developmentPlan);
            if (schoolPagesLinks && pagesList) {
                schoolPagesLinks.innerHTML = '';
                pagesList.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="${item.route}">${item.label}</a>`;
                    schoolPagesLinks.appendChild(li);
                });
            }

            // Column 3: فصول وبوابات
            const portalsLinks = document.getElementById('footerPortalsLinks');
            const portalsList = (f.columns && f.columns.quickLinks) || (f.columns && f.columns.portals);
            if (portalsLinks && portalsList) {
                portalsLinks.innerHTML = '';
                portalsList.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="${item.route}">${item.label}</a>`;
                    portalsLinks.appendChild(li);
                });
            }

            // Column 4: قنوات التواصل المعتمدة
            const socialContainer = document.getElementById('footerSocialLinks');
            const socialList = (f.columns && f.columns.socialMedia) || siteData.socialLinksList || Object.values(siteData.socialLinks);
            if (socialContainer && socialList) {
                socialContainer.innerHTML = '';
                socialList.forEach(item => {
                    const a = document.createElement('a');
                    a.href = item.url;
                    a.target = '_blank';
                    a.rel = 'noopener noreferrer';
                    a.className = 'footer-verified-social-link';
                    a.innerHTML = `<span class="icon">${item.icon}</span> <span>${item.label}</span> <span>↗</span>`;
                    socialContainer.appendChild(a);
                });
            }
        },

        // ==================== PERSON DETAIL MODAL ====================
        initPersonModal() {
            const backdrop = document.getElementById('personModalBackdrop');
            const closeBtn = document.getElementById('personModalCloseBtn');

            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.closePersonModal());
            }

            if (backdrop) {
                backdrop.addEventListener('click', (e) => {
                    if (e.target === backdrop) {
                        this.closePersonModal();
                    }
                });
            }

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    const bd = document.getElementById('personModalBackdrop');
                    if (bd && bd.classList.contains('active')) {
                        this.closePersonModal();
                    }
                }
            });
        },

        lastFocusedElement: null,

        openPersonModal(personId, triggerEl) {
            const person = siteData.staffMembers && siteData.staffMembers[personId];
            if (!person) return;

            this.lastFocusedElement = triggerEl || document.activeElement;

            const modalBody = document.getElementById('personModalBody');
            const backdrop = document.getElementById('personModalBackdrop');
            const dialog = document.getElementById('personModalDialog');
            if (!modalBody || !backdrop) return;

            let areaObj = null;
            if (siteData.developmentAreas) {
                areaObj = siteData.developmentAreas.find(a => 
                    a.coordinatorId === personId || (a.memberIds && a.memberIds.includes(personId))
                );
            }
            const accentColor = areaObj ? areaObj.color : '#073B64';

            // Responsibilities (only where data exists)
            let responsibilitiesHtml = '';
            if (person.responsibilities && person.responsibilities.length > 0) {
                responsibilitiesHtml = `
                    <div class="modal-section">
                        <h4 class="modal-section-title">المسؤوليات والمهام:</h4>
                        <ul class="modal-responsibilities-list">
                            ${person.responsibilities.map(r => `<li><span class="bullet" style="color: ${accentColor};">✔</span> <span>${r}</span></li>`).join('')}
                        </ul>
                    </div>
                `;
            }

            // Committees / Working Teams (only where data exists)
            let committeesHtml = '';
            if (person.committees && person.committees.length > 0) {
                committeesHtml = `
                    <div class="modal-section">
                        <h4 class="modal-section-title">اللجان / فرق العمل:</h4>
                        <div class="modal-badges-wrap">
                            ${person.committees.map(c => `<span class="modal-badge-pill" style="border-color: ${accentColor}; color: ${accentColor};">${c}</span>`).join('')}
                        </div>
                    </div>
                `;
            }

            // Bio (only where data exists)
            let bioHtml = '';
            if (person.bio) {
                bioHtml = `
                    <div class="modal-section">
                        <h4 class="modal-section-title">نبذة تعريفية:</h4>
                        <p class="modal-bio-text" style="border-right-color: ${accentColor};">${person.bio}</p>
                    </div>
                `;
            }

            // Development Area
            let areaHtml = '';
            if (person.developmentArea) {
                areaHtml = `
                    <div class="modal-meta-row">
                        <span class="modal-meta-label">المجال:</span>
                        <span class="modal-meta-val" style="color: ${accentColor}; font-weight: 700;">${areaObj ? areaObj.icon + ' ' : ''}${person.developmentArea}</span>
                    </div>
                `;
            }

            // Subject (only if real data exists)
            let subjectHtml = '';
            if (person.subject) {
                subjectHtml = `
                    <div class="modal-meta-row">
                        <span class="modal-meta-label">المبحث / التخصص:</span>
                        <span class="modal-meta-val">${person.subject}</span>
                    </div>
                `;
            }

            // Direct route action
            let actionHtml = '';
            if (areaObj && areaObj.route) {
                actionHtml = `
                    <div class="modal-footer-actions">
                        <a href="${areaObj.route}" class="btn btn-primary btn-sm" onclick="App.closePersonModal()">عرض خطة مجال ${areaObj.title} ←</a>
                    </div>
                `;
            }

            modalBody.innerHTML = `
                <div class="modal-header-block" style="border-bottom-color: ${accentColor};">
                    <div class="modal-avatar" style="border-color: ${accentColor};">${person.icon || '👩‍🏫'}</div>
                    <div class="modal-header-info">
                        <span class="modal-role-badge" style="background: ${accentColor}18; color: ${accentColor}; border: 1px solid ${accentColor}40;">${person.role}</span>
                        <h3 class="modal-person-name" id="modalPersonName">${person.name}</h3>
                    </div>
                </div>
                <div class="modal-body-details">
                    ${areaHtml}
                    ${subjectHtml}
                    ${responsibilitiesHtml}
                    ${committeesHtml}
                    ${bioHtml}
                    ${actionHtml}
                </div>
            `;

            if (dialog) {
                dialog.style.borderTopColor = accentColor;
            }

            backdrop.classList.add('active');
            backdrop.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';

            const closeBtn = document.getElementById('personModalCloseBtn');
            if (closeBtn) {
                closeBtn.focus();
            }
        },

        closePersonModal() {
            const backdrop = document.getElementById('personModalBackdrop');
            if (!backdrop) return;
            backdrop.classList.remove('active');
            backdrop.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';

            if (this.lastFocusedElement && typeof this.lastFocusedElement.focus === 'function') {
                this.lastFocusedElement.focus();
            }
        },

        // ==================== EVENT LISTENERS ====================
        setupEventListeners() {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('navMenu');

            if (hamburger && navMenu) {
                hamburger.addEventListener('click', () => {
                    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
                    hamburger.setAttribute('aria-expanded', !isExpanded);
                    hamburger.classList.toggle('active');
                    navMenu.classList.toggle('active');
                });
            }

            document.addEventListener('click', (e) => {
                if (!e.target.closest('.nav-container')) {
                    this.closeHamburgerMenu();
                }
            });
        },

        closeHamburgerMenu() {
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('navMenu');
            if (hamburger) {
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        },

        // ==================== SPA ROUTING ENGINE ====================
        setupRouter() {
            window.addEventListener('hashchange', () => this.handleRoute());
            this.handleRoute();
        },

        goBack() {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.hash = '#home';
            }
        },

        handleRoute() {
            const rawHash = window.location.hash || '#home';
            const hash = rawHash.trim();

            if (this.historyStack[this.historyStack.length - 1] !== hash) {
                this.historyStack.push(hash);
            }
            this.currentRoute = hash;

            // Update main navbar active link
            this.updateActiveNav(hash);

            // Scroll to top upon route change
            window.scrollTo({ top: 0, behavior: 'smooth' });

            if (hash === '' || hash === '#' || hash === '#home') {
                this.showHomeView();
                return;
            }

            // Route mapping
            if (hash === '#school') {
                this.renderSchoolAboutView();
            } else if (hash === '#vision-mission') {
                this.renderVisionMissionView();
            } else if (hash === '#staff') {
                this.renderStaffView();
            } else if (hash === '#school-structure') {
                this.renderSchoolStructureView();
            } else if (hash === '#development-team') {
                this.renderDevelopmentTeamView();
            } else if (hash === '#development-plan') {
                this.renderDevelopmentPlanOverview();
            } else if (hash === '#development-learning') {
                this.renderDevelopmentAreaView('learning');
            } else if (hash === '#development-environment') {
                this.renderDevelopmentAreaView('environment');
            } else if (hash === '#development-community') {
                this.renderDevelopmentAreaView('community');
            } else if (hash === '#development-leadership') {
                this.renderDevelopmentAreaView('leadership');
            } else if (hash === '#grades') {
                this.renderGradesOverview();
            } else if (hash === '#grade-4') {
                this.renderGradeDetailView('grade-4');
            } else if (hash === '#grade-5') {
                this.renderGradeDetailView('grade-5');
            } else if (hash === '#support-programs') {
                this.renderSupportProgramsView();
            } else if (hash === '#events') {
                this.renderEventsListView();
            } else if (hash.startsWith('#event/')) {
                const eventId = hash.replace('#event/', '');
                this.renderEventDetailView(eventId);
            } else if (hash === '#initiatives') {
                this.renderInitiativesListView();
            } else if (hash.startsWith('#initiative/')) {
                const initId = hash.replace('#initiative/', '');
                this.renderInitiativeDetailView(initId);
            } else if (hash === '#achievements') {
                this.renderAchievementsView();
            } else if (hash.startsWith('#achievement/')) {
                const achId = hash.replace('#achievement/', '');
                this.renderAchievementDetailView(achId);
            } else if (hash === '#resources') {
                this.renderResourcesView();
            } else if (hash === '#links') {
                this.renderLinksView();
            } else if (hash === '#contact') {
                this.renderContactView();
            } else {
                this.showHomeView();
            }
        },

        showHomeView() {
            const homeView = document.getElementById('homeView');
            const internalView = document.getElementById('internalView');
            if (homeView) homeView.classList.remove('hidden-view');
            if (internalView) internalView.classList.add('hidden-view');
            this.updateActiveNav('#home');
        },

        showInternalView(breadcrumbs, contentHtml) {
            const homeView = document.getElementById('homeView');
            const internalView = document.getElementById('internalView');
            const breadcrumbList = document.getElementById('breadcrumbList');
            const contentArea = document.getElementById('internalContentArea');

            if (homeView) homeView.classList.add('hidden-view');
            if (internalView) internalView.classList.remove('hidden-view');

            if (breadcrumbList) {
                breadcrumbList.innerHTML = '';
                breadcrumbs.forEach((item, index) => {
                    const li = document.createElement('li');
                    const isLast = index === breadcrumbs.length - 1;
                    if (isLast) {
                        li.className = 'active';
                        li.textContent = item.label;
                    } else {
                        li.innerHTML = `<a href="${item.route}">${item.label}</a>`;
                    }
                    breadcrumbList.appendChild(li);
                });
            }

            if (contentArea) {
                contentArea.innerHTML = contentHtml;
                contentArea.focus();
            }
        },

        // ==================== INTERNAL VIEW RENDERERS ====================

        // 1. نبذة عن المدرسة (#school)
        renderSchoolAboutView() {
            const s = siteData.school;
            const details = s.aboutDetails;

            let pillarsHtml = '';
            details.pillars.forEach(p => {
                pillarsHtml += `
                    <div class="pillar-card card">
                        <div class="pillar-icon">${p.icon}</div>
                        <h3>${p.title}</h3>
                        <p>${p.desc}</p>
                    </div>
                `;
            });

            let statsHtml = '';
            details.statistics.forEach(st => {
                statsHtml += `
                    <div class="stat-card">
                        <div class="stat-value">${st.value}</div>
                        <div class="stat-label">${st.label}</div>
                    </div>
                `;
            });

            const html = `
                <div class="internal-page-header">
                    <span class="page-tag">مدرستنا</span>
                    <h1 class="page-title">نبذة عن مدرسة أبي بكر الصديق الأساسية الثانية</h1>
                    <p class="page-subtitle">${s.intro}</p>
                </div>

                <div class="overview-section card" style="margin-bottom: 2rem; padding: 2rem;">
                    <h2 class="section-title-sm">التعريف بالمدرسة ورسالتها التعليمية</h2>
                    <p class="lead-text" style="line-height: 1.9; font-size: 1.05rem; color: var(--dark);">${details.overview}</p>
                    <div class="stats-row" style="margin-top: 1.5rem;">${statsHtml}</div>
                </div>

                <div class="pillars-section" style="margin-bottom: 2.5rem;">
                    <h2 class="section-title-sm">الركائز التربوية الأساسية</h2>
                    <div class="pillars-grid">${pillarsHtml}</div>
                </div>

                <div class="quick-nav-boxes">
                    <a href="#vision-mission" class="box-link card">
                        <span class="icon">🌟</span>
                        <div><strong>رؤيتنا ورسالتنا</strong><p>المنطلقات والأهداف الاستراتيجية</p></div>
                    </a>
                    <a href="#school-structure" class="box-link card">
                        <span class="icon">🏛️</span>
                        <div><strong>هيكل الحوكمة والتطوير</strong><p>شجرة الهيكل التنظيمي المعتمد</p></div>
                    </a>
                    <a href="#development-plan" class="box-link card">
                        <span class="icon">📈</span>
                        <div><strong>الخطة التطويرية 2026-2027</strong><p>المجالات الأربعة ونتائج التقييم</p></div>
                    </a>
                </div>
            `;

            this.showInternalView([
                { label: 'الرئيسية', route: '#home' },
                { label: 'مدرستنا', route: '#school' },
                { label: 'نبذة عن المدرسة', route: '#school' }
            ], html);
        },

        // 2. رؤيتنا ورسالتنا (#vision-mission)
        renderVisionMissionView() {
            const vm = siteData.visionMission;

            let goalsHtml = '';
            vm.strategicGoals.forEach(g => {
                goalsHtml += `
                    <div class="goal-item-card card">
                        <span class="goal-icon">${g.icon}</span>
                        <div>
                            <h4>${g.title}</h4>
                            <p>${g.desc}</p>
                        </div>
                    </div>
                `;
            });

            const html = `
                <div class="internal-page-header">
                    <span class="page-tag">الهوية التربوية</span>
                    <h1 class="page-title">رؤيتنا ورسالتنا والأهداف الاستراتيجية</h1>
                    <p class="page-subtitle">خارطة طريق نحو صناعة التميز التعليمي والقيمي وتنمية المجتمع المدرسي</p>
                </div>

                <div class="vision-mission-cards-view" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                    <div class="card" style="border-top: 5px solid var(--purple); padding: 2rem;">
                        <span style="font-size: 2.5rem;">🌟</span>
                        <h2 style="color: var(--navy); margin: 0.8rem 0;">رؤية المدرسة</h2>
                        <p style="font-size: 1.1rem; line-height: 1.9; color: var(--dark);">${vm.vision}</p>
                    </div>
                    <div class="card" style="border-top: 5px solid var(--green); padding: 2rem;">
                        <span style="font-size: 2.5rem;">🎯</span>
                        <h2 style="color: var(--navy); margin: 0.8rem 0;">رسالة المدرسة</h2>
                        <p style="font-size: 1.1rem; line-height: 1.9; color: var(--dark);">${vm.mission}</p>
                    </div>
                </div>

                <div class="strategic-goals-section card" style="padding: 2rem; margin-bottom: 2rem;">
                    <h2 class="section-title-sm">الأهداف الاستراتيجية المدرسية</h2>
                    <div class="goals-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem; margin-top: 1.25rem;">
                        ${goalsHtml}
                    </div>
                </div>

                <div class="strategy-callout-box">
                    <div class="strategy-icon">📘</div>
                    <div>
                        <strong>مواءمة استراتيجية مع الخطة الإستراتيجية لوزارة التربية والتعليم (2026-2030):</strong>
                        <p>تتوافق رؤية ورسالة وأهداف المدرسة مع المحاور الوطنية الاستراتيجية الكبرى: جودة التعليم والتعلم، التحول الرقمي، التعليم الدامج، التنمية المهنية المستدامة، والمسؤولية والشراكة المجتمعية.</p>
                    </div>
                </div>
            `;

            this.showInternalView([
                { label: 'الرئيسية', route: '#home' },
                { label: 'مدرستنا', route: '#school' },
                { label: 'رؤيتنا ورسالتنا', route: '#vision-mission' }
            ], html);
        },

        // 3. الكادر المدرسي (#staff)
        renderStaffView() {
            const members = siteData.staffMembers;
            const areas = siteData.developmentAreas;
            const hierarchy = siteData.staffHierarchy;
            const principal = members[hierarchy.principalId];

            // 1. Senior Leadership cards
            let seniorHtml = '';
            hierarchy.seniorLeadership.forEach(item => {
                const p = members[item.id];
                if (p) {
                    seniorHtml += `
                        <div class="staff-person-card senior-card" role="button" tabindex="0" 
                             data-person-id="${p.id}" aria-label="عرض تفاصيل ${p.name} - ${p.role}">
                            <div class="person-card-avatar">${p.icon}</div>
                            <div class="person-card-info">
                                <span class="person-role-tag">${p.role}</span>
                                <h3 class="person-name">${p.name}</h3>
                            </div>
                            <span class="person-view-btn" aria-hidden="true">الملف 🔍</span>
                        </div>
                    `;
                }
            });

            // 2. 4 Development Areas
            let areasHtml = '';
            areas.forEach(area => {
                const coord = members[area.coordinatorId];
                const team = (area.memberIds || []).map(id => members[id]).filter(Boolean);

                areasHtml += `
                    <div class="staff-branch-card" id="branch-${area.id}" style="--area-color: ${area.color}; --area-bg: ${area.bgLight};">
                        <!-- Branch Summary / Toggle Header -->
                        <div class="staff-branch-header" role="button" tabindex="0" 
                             aria-expanded="false" aria-controls="branch-body-${area.id}"
                             data-branch-id="${area.id}">
                            <div class="branch-header-main">
                                <span class="branch-concept-icon" aria-hidden="true">${area.icon}</span>
                                <div>
                                    <span class="branch-badge">${area.badge}</span>
                                    <h3 class="branch-title">${area.title}</h3>
                                </div>
                            </div>
                            <div class="branch-header-meta">
                                <div class="branch-coord-preview">
                                    <small>المنسقة:</small> <strong>${coord ? coord.name : ''}</strong>
                                </div>
                                <span class="branch-expand-indicator" aria-hidden="true">
                                    <span class="expand-text">توسيع</span>
                                    <span class="expand-chevron">▾</span>
                                </span>
                            </div>
                        </div>

                        <!-- Expandable Branch Content -->
                        <div class="staff-branch-body" id="branch-body-${area.id}">
                            <div class="branch-body-inner">
                                <div class="branch-line-v"></div>

                                <!-- Coordinator Card -->
                                <div class="branch-node-coordinator">
                                    <span class="node-level-tag">منسقة المجال</span>
                                    <div class="staff-person-card coord-card" role="button" tabindex="0"
                                         data-person-id="${coord.id}" aria-label="عرض تفاصيل المنسقة ${coord.name}">
                                        <div class="person-card-avatar">${coord.icon || '👩‍🏫'}</div>
                                        <div class="person-card-info">
                                            <span class="person-role-tag" style="color: ${area.color};">${coord.role}</span>
                                            <h4 class="person-name">${coord.name}</h4>
                                        </div>
                                        <span class="person-view-btn" aria-hidden="true">الملف 🔍</span>
                                    </div>
                                </div>

                                <div class="branch-fork-connector"></div>

                                <!-- Team Members -->
                                <div class="branch-team-block">
                                    <span class="node-level-tag">فريق التنسيق التنفيذي</span>
                                    <div class="branch-members-grid">
                                        ${team.map(m => `
                                            <div class="staff-person-card member-card" role="button" tabindex="0"
                                                 data-person-id="${m.id}" aria-label="عرض تفاصيل ${m.name}">
                                                <div class="person-card-avatar">${m.icon || '👩‍🏫'}</div>
                                                <div class="person-card-info">
                                                    <span class="person-role-tag">${m.role}</span>
                                                    <h5 class="person-name">${m.name}</h5>
                                                </div>
                                                <span class="person-view-btn" aria-hidden="true">الملف 🔍</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>

                                <div class="branch-plan-link-wrap">
                                    <a href="${area.route}" class="btn btn-outline btn-sm">عرض خطة ${area.title} التفصيلية ←</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

            // 3. Departments Section ("الهيئة التدريسية والكادر المدرسي")
            let deptsHtml = '';
            (siteData.staff.departments || []).forEach(dept => {
                deptsHtml += `
                    <div class="dept-card card">
                        <div class="dept-header">
                            <span class="dept-icon">${dept.icon}</span>
                            <span class="dept-role">${dept.role}</span>
                        </div>
                        <h3>${dept.name}</h3>
                        <p class="dept-resp">${dept.responsibility}</p>
                    </div>
                `;
            });

            const html = `
                <div class="internal-page-header">
                    <span class="page-tag">أسرة المدرسة وفريق التطوير المدرسي</span>
                    <h1 class="page-title">الكادر المدرسي</h1>
                    <p class="page-subtitle">الهيكل التنظيمي التفاعلي لكادر المدرسة وفريق التطوير المدرسي للعام 2026-2027</p>
                </div>

                <!-- Cross-Link to Governance Structure -->
                <div class="structure-crosslink-banner card">
                    <div class="crosslink-info">
                        <span class="crosslink-icon">🏛️</span>
                        <div>
                            <strong>هيكل الحوكمة والتطوير المؤسسي:</strong>
                            <p>للاطلاع على التسلسل الإداري الشامل وآليات الحوكمة المعتمدة مع مديرية التربية والتعليم ومجلس الشبكة.</p>
                        </div>
                    </div>
                    <a href="#school-structure" class="btn btn-outline btn-sm">عرض هيكل الحوكمة والتطوير المدرسي ←</a>
                </div>

                <!-- Interactive Hierarchy Controls -->
                <div class="tree-controls-bar">
                    <p class="tree-controls-hint">
                        💡 <strong>دليل التفاعل:</strong> اضغط على أي مجال لتوسيعه أو طيه، واضغط على بطاقة أي شخص لعرض ملف المسؤوليات والمهام.
                    </p>
                    <div class="tree-actions-btns">
                        <button type="button" class="btn btn-sm btn-outline-dark" id="expandAllBranchesBtn">توسيع جميع المجالات</button>
                        <button type="button" class="btn btn-sm btn-outline-dark" id="collapseAllBranchesBtn">طي جميع المجالات</button>
                    </div>
                </div>

                <!-- Interactive Tree -->
                <div class="interactive-staff-tree" id="interactiveStaffTree">
                    <!-- 1. Senior Leadership -->
                    <div class="tree-section-wrapper senior-wrapper">
                        <span class="tree-level-label">الإدارة العليا والتوجيه التربوي</span>
                        <div class="senior-leadership-row">
                            ${seniorHtml}
                        </div>
                        <div class="tree-vertical-connector"></div>
                    </div>

                    <!-- 2. School Principal -->
                    <div class="tree-section-wrapper principal-wrapper">
                        <div class="principal-tree-node staff-person-card" role="button" tabindex="0"
                             data-person-id="${principal.id}" aria-label="عرض تفاصيل مديرة المدرسة ${principal.name}">
                            <div class="principal-node-badge">قيادة المدرسة ورئاسة فريق التطوير</div>
                            <div class="principal-node-avatar">${principal.icon}</div>
                            <h2 class="principal-node-name">${principal.name}</h2>
                            <p class="principal-node-role">${principal.role}</p>
                            <span class="person-view-btn">عرض الملف القيادي 🔍</span>
                        </div>
                        <div class="tree-vertical-connector"></div>
                    </div>

                    <!-- 3. Four Development Areas Branches -->
                    <div class="tree-section-wrapper branches-wrapper">
                        <div class="tree-distributor-line" aria-hidden="true"></div>
                        <div class="staff-branches-grid">
                            ${areasHtml}
                        </div>
                    </div>
                </div>

                <!-- 4. Teaching Faculty & School Staff Section -->
                <div class="general-faculty-section" style="margin-top: 3.5rem;">
                    <div class="sub-header-flex">
                        <div>
                            <span class="section-tag" style="background: rgba(7, 59, 100, 0.08); color: var(--navy);">المجالس والأقسام الأكاديمية</span>
                            <h2 class="section-title-sm">الهيئة التدريسية والكادر المدرسي</h2>
                            <p style="color: var(--dark-muted);">الكوادر المتخصصة والأقسام التعليمية والإرشادية لمرحلة الصفين الرابع والخامس الأساسيين</p>
                        </div>
                        <a href="#school-structure" class="btn btn-outline-dark btn-sm">عرض هيكل الحوكمة ←</a>
                    </div>

                    <div class="departments-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.25rem; margin-top: 1.25rem;">
                        ${deptsHtml}
                    </div>
                </div>

                <!-- Bottom Quick Nav -->
                <div class="quick-nav-boxes" style="margin-top: 2.5rem;">
                    <a href="#school-structure" class="box-link card">
                        <span class="icon">🏛️</span>
                        <div><strong>عرض هيكل الحوكمة</strong><p>مخطط الحوكمة والتنظيم الإداري الكامل</p></div>
                    </a>
                    <a href="#development-plan" class="box-link card">
                        <span class="icon">📈</span>
                        <div><strong>الخطة التطويرية 2026-2027</strong><p>نظرة تفصيلية على نتائج وإجراءات التطوير</p></div>
                    </a>
                </div>
            `;

            this.showInternalView([
                { label: 'الرئيسية', route: '#home' },
                { label: 'مدرستنا', route: '#school' },
                { label: 'الكادر المدرسي', route: '#staff' }
            ], html);

            // Bind branch toggles and person clicks
            this.bindStaffTreeEvents();
        },

        bindStaffTreeEvents() {
            // Branch card headers (accordion/collapse toggle)
            const branchHeaders = document.querySelectorAll('.staff-branch-header');
            branchHeaders.forEach(header => {
                const branchId = header.getAttribute('data-branch-id');
                const branchCard = document.getElementById(`branch-${branchId}`);

                const toggle = () => {
                    const isExpanded = header.getAttribute('aria-expanded') === 'true';
                    header.setAttribute('aria-expanded', !isExpanded);
                    if (branchCard) {
                        branchCard.classList.toggle('is-expanded', !isExpanded);
                        const expandText = header.querySelector('.expand-text');
                        if (expandText) {
                            expandText.textContent = !isExpanded ? 'طي' : 'توسيع';
                        }
                    }
                };

                header.addEventListener('click', toggle);
                header.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggle();
                    }
                });
            });

            // Expand all / Collapse all buttons
            const expandAllBtn = document.getElementById('expandAllBranchesBtn');
            const collapseAllBtn = document.getElementById('collapseAllBranchesBtn');

            if (expandAllBtn) {
                expandAllBtn.addEventListener('click', () => {
                    branchHeaders.forEach(h => {
                        const branchId = h.getAttribute('data-branch-id');
                        const branchCard = document.getElementById(`branch-${branchId}`);
                        h.setAttribute('aria-expanded', 'true');
                        if (branchCard) branchCard.classList.add('is-expanded');
                        const expandText = h.querySelector('.expand-text');
                        if (expandText) expandText.textContent = 'طي';
                    });
                });
            }

            if (collapseAllBtn) {
                collapseAllBtn.addEventListener('click', () => {
                    branchHeaders.forEach(h => {
                        const branchId = h.getAttribute('data-branch-id');
                        const branchCard = document.getElementById(`branch-${branchId}`);
                        h.setAttribute('aria-expanded', 'false');
                        if (branchCard) branchCard.classList.remove('is-expanded');
                        const expandText = h.querySelector('.expand-text');
                        if (expandText) expandText.textContent = 'توسيع';
                    });
                });
            }

            // Person cards click & keyboard Enter/Space
            const personCards = document.querySelectorAll('.staff-person-card');
            personCards.forEach(card => {
                const personId = card.getAttribute('data-person-id');
                if (!personId) return;

                const openModal = (e) => {
                    e.stopPropagation();
                    this.openPersonModal(personId, card);
                };

                card.addEventListener('click', openModal);
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openModal(e);
                    }
                });
            });
        },

        // 4. هيكل الحوكمة والتطوير المدرسي 2026-2027 (#school-structure)
        renderSchoolStructureView() {
            const h = siteData.schoolStructure.hierarchy;

            let branchesHtml = '';
            h.branches.forEach(b => {
                branchesHtml += `
                    <div class="branch-card" style="border-top-color: ${b.color};">
                        <div class="branch-header-top">
                            <span class="branch-icon" style="font-size: 1.8rem;">${b.icon}</span>
                            <h3 class="branch-area-title" style="color: ${b.color};">${b.areaTitle}</h3>
                        </div>
                        <div class="branch-coord-wrap">
                            <span class="branch-coord-label">${b.coordinator.title}</span>
                            <div class="branch-coord-name">${b.coordinator.name}</div>
                            <small style="color: var(--dark-muted); font-size: 0.78rem;">${b.coordinator.role}</small>
                        </div>
                        <div class="branch-team-box">
                            <div class="branch-team-title">فريق التنسيق:</div>
                            <ul class="branch-team-list">
                                ${b.team.map(m => `<li><span style="color: ${b.color};">●</span> ${m.name}</li>`).join('')}
                            </ul>
                        </div>
                        <div style="margin-top: 1rem;">
                            <a href="${b.route}" class="btn btn-secondary btn-sm btn-block">تفاصيل خطة المجال ←</a>
                        </div>
                    </div>
                `;
            });

            const html = `
                <div class="internal-page-header">
                    <span class="page-tag">التنظيم المؤسسي المعتمد</span>
                    <h1 class="page-title">${siteData.schoolStructure.title}</h1>
                    <p class="page-subtitle">${siteData.schoolStructure.subtitle}</p>
                </div>

                <!-- Cross-Link to Staff Hierarchy & Profiles -->
                <div class="structure-crosslink-banner card">
                    <div class="crosslink-info">
                        <span class="crosslink-icon">👥</span>
                        <div>
                            <strong>الكادر المدرسي والملفات التعريفية:</strong>
                            <p>لاستعراض الشجرة التفاعلية لكادر المدرسة وفريق التطوير، وتفاصيل بطاقات المنسقين والأعضاء.</p>
                        </div>
                    </div>
                    <a href="#staff" class="btn btn-primary btn-sm">عرض الكادر المدرسي والملفات التعريفية ←</a>
                </div>

                <div class="structure-intro-card card" style="margin-bottom: 2rem; padding: 1.5rem;">
                    <p style="font-size: 1.05rem; line-height: 1.8;">
                        تعتمد المدرسة هيكل حوكمة تربوي تشاركي يرتبط مباشرة بإدارة التعليم العام في مديرية التربية والتعليم للواء قصبة إربد ومجلس شبكة التطوير، ويقود تنفيذ الخطة التطويرية والإجرائية المعتمدة للأعوام 2025-2027 من خلال أربعة مجالات فنية متخصصة.
                    </p>
                </div>

                <!-- Desktop Tree Layout with Visual Connectors -->
                <div class="org-tree-wrapper">
                    <!-- Level 1: مدير التربية والتعليم -->
                    <div class="tree-level">
                        <div class="tree-node-card">
                            <div class="tree-node-icon">${h.educationDirector.icon}</div>
                            <div class="tree-node-title">${h.educationDirector.title}</div>
                            <div class="tree-node-name">${h.educationDirector.name}</div>
                            <div class="tree-node-role">${h.educationDirector.role}</div>
                        </div>
                        <div class="tree-connector-line"></div>
                    </div>

                    <!-- Level 2: رئيس مجلس الشبكة -->
                    <div class="tree-level">
                        <div class="tree-node-card">
                            <div class="tree-node-icon">${h.networkHead.icon}</div>
                            <div class="tree-node-title">${h.networkHead.title}</div>
                            <div class="tree-node-name">${h.networkHead.name}</div>
                            <div class="tree-node-role">${h.networkHead.role}</div>
                        </div>
                        <div class="tree-connector-line"></div>
                    </div>

                    <!-- Level 3: مستشار التطوير المدرسي -->
                    <div class="tree-level">
                        <div class="tree-node-card">
                            <div class="tree-node-icon">${h.schoolAdvisor.icon}</div>
                            <div class="tree-node-title">${h.schoolAdvisor.title}</div>
                            <div class="tree-node-name">${h.schoolAdvisor.name}</div>
                            <div class="tree-node-role">${h.schoolAdvisor.role}</div>
                        </div>
                        <div class="tree-connector-line"></div>
                    </div>

                    <!-- Level 4: مديرة المدرسة / رئيس فريق التطوير -->
                    <div class="tree-level">
                        <div class="tree-node-card principal-node">
                            <div class="tree-node-icon">${h.principal.icon}</div>
                            <div class="tree-node-title" style="color: var(--navy);">${h.principal.title}</div>
                            <div class="tree-node-name" style="color: var(--navy); font-size: 1.35rem;">${h.principal.name}</div>
                            <div class="tree-node-role">${h.principal.role}</div>
                        </div>
                    </div>

                    <!-- Level 5: 4 Branches -->
                    <div class="tree-branches-container">
                        <div class="tree-branches-bar"></div>
                        <div class="tree-branches-grid">
                            ${branchesHtml}
                        </div>
                    </div>
                </div>

                <div class="quick-nav-boxes" style="margin-top: 2rem;">
                    <a href="#staff" class="box-link card">
                        <span class="icon">👥</span>
                        <div><strong>عرض الكادر المدرسي</strong><p>شجرة الكادر التفاعلية والملفات التعريفية</p></div>
                    </a>
                    <a href="#development-team" class="box-link card">
                        <span class="icon">👥</span>
                        <div><strong>فريق تطوير المدرسة</strong><p>منسقو المجالات الأربعة وأعضاء الفرق</p></div>
                    </a>
                </div>

                <div class="strategy-callout-box" style="margin-top: 2rem;">
                    <div class="strategy-icon">📋</div>
                    <div>
                        <strong>المصدر والاعتماد الرسمي:</strong>
                        <p>وثيقة الخطة التطويرية والإجرائية للمدرسة لعام 2026/2027 (نموذج رقم 4 - خطة 2(2).docx) - مديرية التربية والتعليم للواء قصبة إربد.</p>
                    </div>
                </div>
            `;

            this.showInternalView([
                { label: 'الرئيسية', route: '#home' },
                { label: 'مدرستنا', route: '#school' },
                { label: 'هيكل الحوكمة والتطوير المدرسي', route: '#school-structure' }
            ], html);
        },

        // 5. فريق تطوير المدرسة (#development-team)
        renderDevelopmentTeamView() {
            const dt = siteData.staff.developmentTeam;

            let coordsHtml = '';
            dt.coordinatorsList.forEach(item => {
                coordsHtml += `
                    <div class="coord-team-item card" style="padding: 1.5rem; margin-bottom: 1rem;">
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.5rem;">
                            <h3 style="color: var(--navy); font-size: 1.15rem;">مجال ${item.area}</h3>
                            <span class="meta-pill" style="background: var(--blue-light); color: var(--blue); font-weight: 700;">منسق المجال: ${item.coordinator}</span>
                        </div>
                        <p><strong>أعضاء فريق التنسيق:</strong> ${item.team.join('، ')}</p>
                    </div>
                `;
            });

            const html = `
                <div class="internal-page-header">
                    <span class="page-tag">فريق القيادة والتنسيق</span>
                    <h1 class="page-title">${dt.title}</h1>
                    <p class="page-subtitle">${dt.description}</p>
                </div>

                <div class="team-meta-card card" style="padding: 2rem; margin-bottom: 2rem; background: var(--white);">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem;">
                        <div>
                            <span style="font-size: 0.82rem; color: var(--dark-muted); display: block;">رئيس الفريق:</span>
                            <strong style="font-size: 1.2rem; color: var(--navy);">${dt.leader}</strong>
                        </div>
                        <div>
                            <span style="font-size: 0.82rem; color: var(--dark-muted); display: block;">المستشار الفني:</span>
                            <strong style="font-size: 1.2rem; color: var(--blue);">${dt.advisor}</strong>
                        </div>
                        <div>
                            <span style="font-size: 0.82rem; color: var(--dark-muted); display: block;">دورية الاجتماعات:</span>
                            <strong style="font-size: 1.1rem; color: var(--green);">أسبوعية وشهرية منتظمة</strong>
                        </div>
                    </div>
                </div>

                <div class="coordinators-list-section" style="margin-bottom: 2.5rem;">
                    <h2 class="section-title-sm">منسقو المجالات وأعضاء فرق العمل</h2>
                    ${coordsHtml}
                </div>

                <div class="quick-nav-boxes">
                    <a href="#school-structure" class="box-link card">
                        <span class="icon">🏛️</span>
                        <div><strong>شجرة الحوكمة والتطوير</strong><p>مخطط الهيكل التنظيمي الكامل</p></div>
                    </a>
                    <a href="#development-plan" class="box-link card">
                        <span class="icon">📈</span>
                        <div><strong>الخطة التطويرية 2026-2027</strong><p>الأهداف والمؤشرات والأنشطة</p></div>
                    </a>
                </div>
            `;

            this.showInternalView([
                { label: 'الرئيسية', route: '#home' },
                { label: 'مدرستنا', route: '#school' },
                { label: 'فريق تطوير المدرسة', route: '#development-team' }
            ], html);
        },

        // 6. نظرة عامة على الخطة التطويرية (#development-plan)
        renderDevelopmentPlanOverview() {
            let cardsHtml = '';
            siteData.developmentPlan.forEach(plan => {
                cardsHtml += `
                    <div class="dev-card card" style="border-top-color: ${plan.color};">
                        <div class="dev-card-icon">${plan.icon}</div>
                        <h3>${plan.title}</h3>
                        <p class="dev-card-summary">${plan.definition}</p>
                        <div style="margin: 0.8rem 0; font-size: 0.85rem; color: var(--dark-muted);">
                            <strong>المنسق:</strong> ${plan.coordinator} | <strong>الفريق:</strong> ${plan.team.join('، ')}
                        </div>
                        <div class="dev-card-footer">
                            <a href="${plan.route}" class="btn btn-secondary btn-block">تفاصيل المجال والمؤشرات والأنشطة ←</a>
                        </div>
                    </div>
                `;
            });

            const html = `
                <div class="internal-page-header">
                    <span class="page-tag">التطوير المدرسي المستدام</span>
                    <h1 class="page-title">الخطة التطويرية لمدرسة أبي بكر الصديق الأساسية الثانية (2025-2027)</h1>
                    <p class="page-subtitle">خطة شاملة مبنية على نتائج المراجعة الذاتية الصادقة لواقع المدرسة ومجتمعات التركيز</p>
                </div>

                <div class="plan-intro-card card" style="padding: 2rem; margin-bottom: 2rem;">
                    <h2 class="section-title-sm">منهجية بناء الخطة التطويرية</h2>
                    <p style="font-size: 1.05rem; line-height: 1.9; color: var(--dark);">
                        تستند الخطة التطويرية للمدرسة للأعوام الدراسية (2025/2026 و2026/2027) إلى أسس سليمة ودقيقة في المراجعة الذاتية، بمشاركة الكادر التدريسي وأولياء الأمور والمجتمع المحلي، وبالتنسيق مع مستشار التطوير المدرسي ورئيس مجلس الشبكة ومديرية التربية والتعليم للواء قصبة إربد. تهدف الخطة إلى سد الفجوات المرصودة، ورفع جودة التعليم، وتوفير بيئة مدرسية آمنة ومحفزة.
                    </p>
                </div>

                <div class="plan-cards-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 2.5rem;">
                    ${cardsHtml}
                </div>

                <div class="strategy-callout-box">
                    <div class="strategy-icon">🎯</div>
                    <div>
                        <strong>مواءمة استراتيجية مع الخطة الوطنية للتعليم 2026-2030:</strong>
                        <p>تتكامل خطة المدرسة مع الاستراتيجيات الوطنية للتعليم: اتخاذ القرار المبني على البيانات، دعم التداخلات العلاجية، توفير البيئة الآمنة، والتحول نحو مجتمعات التعلم المهني والتطوير المؤسسي المستمر.</p>
                    </div>
                </div>
            `;

            this.showInternalView([
                { label: 'الرئيسية', route: '#home' },
                { label: 'الخطة التطويرية', route: '#development-plan' }
            ], html);
        },

        // 7. تفاصيل مجال الخطة التطويرية (Learning, Environment, Community, Leadership)
        renderDevelopmentAreaView(areaId) {
            const plan = siteData.developmentPlan.find(p => p.id === areaId);
            if (!plan) {
                this.renderDevelopmentPlanOverview();
                return;
            }

            // Recommendations with justifications
            let recsHtml = '';
            plan.recommendations.forEach((rec, idx) => {
                recsHtml += `
                    <div class="rec-item-card card" style="margin-bottom: 1.25rem; padding: 1.5rem; border-right: 4px solid ${plan.color};">
                        <div style="display: flex; gap: 0.5rem; align-items: flex-start;">
                            <span class="badge-mini" style="background: ${plan.color}; color: #fff; font-weight: 700; border-radius: 4px; padding: 0.2rem 0.5rem;">التوصية ${idx + 1}</span>
                            <h4 style="color: var(--navy); font-size: 1.05rem; margin-bottom: 0.5rem;">${rec.rec}</h4>
                        </div>
                        <div class="justification-box" style="margin-top: 0.75rem; background: #fafafa; border: 1px dashed var(--gray-300); padding: 0.85rem 1rem; border-radius: var(--radius-sm); font-size: 0.9rem; color: var(--dark-muted); line-height: 1.7;">
                            <strong style="color: var(--navy);">مسوغات التوصية ونتائج المراجعة الذاتية:</strong> ${rec.justification}
                        </div>
                    </div>
                `;
            });

            // Results, Activities & KPIs
            let resultsHtml = '';
            plan.results.forEach(res => {
                let actsHtml = '';
                res.activities.forEach((act, actIdx) => {
                    actsHtml += `
                        <div class="activity-card" style="background: #fbfdff; border: 1px solid var(--gray-200); border-radius: var(--radius-sm); padding: 1.2rem; margin-bottom: 1rem;">
                            <h5 style="color: var(--navy); font-size: 1rem; margin-bottom: 0.5rem;">النشاط (${actIdx + 1}): ${act.name}</h5>
                            <p style="font-size: 0.92rem; line-height: 1.7; margin-bottom: 0.6rem;"><strong>الإجراءات التنفيذية:</strong> ${act.procedures}</p>
                            <div style="display: flex; gap: 1rem; flex-wrap: wrap; font-size: 0.85rem; color: var(--dark-muted);">
                                <span><strong>مسؤولية التنفيذ:</strong> ${act.responsibilities}</span>
                                <span><strong>التوقيت:</strong> ${act.timing}</span>
                                <span><strong>مصدر الدعم:</strong> ${act.funding}</span>
                            </div>
                        </div>
                    `;
                });

                let kpisHtml = '';
                res.kpis.forEach(kpi => {
                    kpisHtml += `
                        <tr>
                            <td style="font-weight: 600;">${kpi.indicator}</td>
                            <td><span class="badge-mini" style="background: #fee2e2; color: #991b1b;">${kpi.baseline}</span></td>
                            <td><span class="badge-mini" style="background: #dcfce7; color: #166534;">${kpi.target}</span></td>
                            <td>${kpi.tools}</td>
                            <td>${kpi.timing}</td>
                        </tr>
                    `;
                });

                resultsHtml += `
                    <div class="result-block card" style="padding: 1.75rem; margin-bottom: 2rem;">
                        <h3 style="color: ${plan.color}; font-size: 1.2rem; margin-bottom: 1.2rem; border-bottom: 2px solid ${plan.color}20; padding-bottom: 0.5rem;">
                            ${res.title}
                        </h3>

                        <h4 style="color: var(--navy); font-size: 1.05rem; margin-bottom: 0.75rem;">الأنشطة والإجراءات:</h4>
                        ${actsHtml}

                        <h4 style="color: var(--navy); font-size: 1.05rem; margin: 1.25rem 0 0.75rem;">مؤشرات قياس الأداء (KPIs):</h4>
                        <div class="table-responsive">
                            <table class="data-table">
                                <thead>
                                    <tr>
                                        <th>المؤشر</th>
                                        <th>خط الأساس</th>
                                        <th>المستهدف</th>
                                        <th>أدوات ومصادر البيانات</th>
                                        <th>التوقيت</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${kpisHtml}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;
            });

            // Rubric Table
            let rubricRowsHtml = '';
            plan.rubric.forEach(rub => {
                rubricRowsHtml += `
                    <tr>
                        <td style="font-weight: 700; color: var(--navy);">${rub.outcome}</td>
                        <td>${rub.criterion}</td>
                        <td style="background: #fff1f2; font-size: 0.85rem;">${rub.weak}</td>
                        <td style="background: #fef2f2; font-size: 0.85rem;">${rub.low}</td>
                        <td style="background: #fefce8; font-size: 0.85rem;">${rub.acceptable}</td>
                        <td style="background: #f0fdf4; font-size: 0.85rem;">${rub.strong}</td>
                        <td style="background: #dcfce7; font-size: 0.85rem; font-weight: 600;">${rub.veryStrong}</td>
                    </tr>
                `;
            });

            // Related Initiatives
            let relatedInitsHtml = '';
            plan.relatedInitiatives.forEach(initId => {
                const init = siteData.initiatives.find(i => i.id === initId);
                if (init) {
                    relatedInitsHtml += `
                        <a href="${init.route}" class="related-init-chip card">
                            <span class="icon">${init.icon}</span>
                            <span>${init.name}</span>
                        </a>
                    `;
                }
            });

            const html = `
                <div class="internal-page-header">
                    <span class="page-tag" style="background: ${plan.color}20; color: ${plan.color}; font-weight: 700;">خطة التطوير 2026-2027</span>
                    <h1 class="page-title">مجال: ${plan.title}</h1>
                    <p class="page-subtitle">${plan.definition}</p>
                </div>

                <!-- Meta bar with Coordinator and Team -->
                <div class="area-meta-bar card" style="padding: 1.25rem; margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <span style="font-size: 0.85rem; color: var(--dark-muted);">منسق المجال:</span>
                        <strong style="color: var(--navy); font-size: 1.1rem; margin-right: 0.4rem;">${plan.coordinator}</strong>
                    </div>
                    <div>
                        <span style="font-size: 0.85rem; color: var(--dark-muted);">أعضاء فريق التنسيق:</span>
                        <strong style="color: var(--dark); font-size: 1.05rem; margin-right: 0.4rem;">${plan.team.join('، ')}</strong>
                    </div>
                    <a href="#school-structure" class="btn btn-outline-dark btn-sm">هيكل الحوكمة ←</a>
                </div>

                <!-- Strategic Indicator & Target Result -->
                <div class="indicator-highlight-card card" style="padding: 1.75rem; margin-bottom: 2rem; border-right: 5px solid ${plan.color};">
                    <h3 style="color: var(--navy); margin-bottom: 0.5rem;">رقم ونص المؤشر المعياري:</h3>
                    <p style="font-size: 1.05rem; color: var(--dark); line-height: 1.7; margin-bottom: 1rem;">${plan.indicatorText}</p>
                    <h4 style="color: ${plan.color}; margin-bottom: 0.3rem;">النتيجة التطويرية المستهدفة:</h4>
                    <p style="font-size: 1.1rem; font-weight: 700; color: var(--navy); line-height: 1.8;">${plan.developmentalResult}</p>
                </div>

                <!-- Recommendations & Justifications -->
                <div class="recs-section" style="margin-bottom: 2.5rem;">
                    <h2 class="section-title-sm">نتائج المراجعة الذاتية والتوصيات ومسوغاتها</h2>
                    ${recsHtml}
                </div>

                <!-- Action Plan: Activities, Procedures & KPIs -->
                <div class="action-plan-section" style="margin-bottom: 2.5rem;">
                    <h2 class="section-title-sm">الخطة الإجرائية والأنشطة ومؤشرات الأداء</h2>
                    ${resultsHtml}
                </div>

                <!-- Rubric (سلم التقدير اللفظي) -->
                <div class="rubric-section card" style="padding: 1.75rem; margin-bottom: 2.5rem;">
                    <h2 class="section-title-sm">سلم التقدير اللفظي لقياس الأثر</h2>
                    <div class="table-responsive">
                        <table class="data-table rubric-table">
                            <thead>
                                <tr>
                                    <th>النتاجات</th>
                                    <th>المؤشر النوعي / المعيار</th>
                                    <th>(1) ضعيف</th>
                                    <th>(2) متدنٍ</th>
                                    <th>(3) مقبول</th>
                                    <th>(4) قوي</th>
                                    <th>(5) قوي جداً</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${rubricRowsHtml}
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Strategic Alignment -->
                <div class="strategy-callout-box" style="margin-bottom: 2rem;">
                    <div class="strategy-icon">💡</div>
                    <div>
                        <strong>مواءمة استراتيجية وطنية:</strong>
                        <p>${plan.strategicAlignment}</p>
                    </div>
                </div>

                <!-- Related Initiatives -->
                <div class="related-inits-section" style="margin-bottom: 2rem;">
                    <h3 class="subsection-title">المبادرات والبرامج المرتبطة بهذا المجال:</h3>
                    <div class="chips-flex" style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                        ${relatedInitsHtml}
                    </div>
                </div>

                <div class="quick-nav-boxes">
                    <a href="#development-plan" class="box-link card">
                        <span class="icon">📈</span>
                        <div><strong>نظرة عامة على الخطة</strong><p>استعراض المجالات الأربعة</p></div>
                    </a>
                    <a href="#school-structure" class="box-link card">
                        <span class="icon">🏛️</span>
                        <div><strong>هيكل الحوكمة والتطوير</strong><p>فريق التطوير والمنسقين</p></div>
                    </a>
                </div>
            `;

            this.showInternalView([
                { label: 'الرئيسية', route: '#home' },
                { label: 'الخطة التطويرية', route: '#development-plan' },
                { label: plan.title, route: plan.route }
            ], html);
        },

        // 8. فصول الدراسة وبرامج الدعم (#grades)
        renderGradesOverview() {
            let gradesHtml = '';
            siteData.grades.forEach(g => {
                gradesHtml += `
                    <div class="grade-card card" style="padding: 1.75rem;">
                        <span class="grade-icon">${g.icon}</span>
                        <span class="badge-mini" style="background: var(--blue-light); color: var(--blue);">${g.badge}</span>
                        <h3 style="color: var(--navy); margin: 0.5rem 0;">${g.title}</h3>
                        <p style="color: var(--dark-muted); font-size: 0.9rem; margin-bottom: 1rem;">الفئة العمرية: ${g.ageGroup}</p>
                        <p style="line-height: 1.8; margin-bottom: 1.25rem;">${g.overview}</p>
                        <a href="${g.route}" class="btn btn-secondary btn-block">تفاصيل منهاج وأهداف ${g.title} ←</a>
                    </div>
                `;
            });

            let progHtml = '';
            siteData.supportPrograms.forEach(p => {
                progHtml += `
                    <div class="support-card card" style="padding: 1.5rem; border-top: 4px solid ${p.color};">
                        <div style="font-size: 2rem; margin-bottom: 0.5rem;">${p.icon}</div>
                        <span class="badge-mini" style="background: ${p.color}20; color: ${p.color}; font-weight: 700;">${p.badge}</span>
                        <h3 style="color: var(--navy); margin: 0.6rem 0;">${p.title}</h3>
                        <p style="font-size: 0.92rem; line-height: 1.7; margin-bottom: 1rem;">${p.desc}</p>
                        <a href="${p.route}" class="btn btn-outline-dark btn-sm btn-block">تفاصيل البرنامج ←</a>
                    </div>
                `;
            });

            const html = `
                <div class="internal-page-header">
                    <span class="page-tag">المرحلة الأساسية والدعم التعليمي</span>
                    <h1 class="page-title">فصول الدراسة وبرامج الدعم والرعاية التربوية</h1>
                    <p class="page-subtitle">المرحلة الأساسية المعتمدة في المدرسة (الصفان الرابع والخامس) وبرامج الدعم المكملة</p>
                </div>

                <div class="grades-block" style="margin-bottom: 3rem;">
                    <div class="sub-header-flex" style="margin-bottom: 1.5rem;">
                        <h2 class="section-title-sm">فصول الدراسة الأساسية الرسمية</h2>
                        <span style="color: var(--dark-muted); font-size: 0.9rem;">(المرحلة الأساسية: الرابع والخامس للبنين)</span>
                    </div>
                    <div class="grades-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
                        ${gradesHtml}
                    </div>
                </div>

                <div class="support-block" style="margin-bottom: 2.5rem;">
                    <div class="sub-header-flex" style="margin-bottom: 1.5rem;">
                        <h2 class="section-title-sm">برامج الدعم التعليمي والرعاية التربوية</h2>
                        <a href="#support-programs" class="btn btn-outline-dark btn-sm">عرض دليل برامج الدعم كاملاً ←</a>
                    </div>
                    <div class="support-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
                        ${progHtml}
                    </div>
                </div>
            `;

            this.showInternalView([
                { label: 'الرئيسية', route: '#home' },
                { label: 'فصول الدراسة وبرامج الدعم', route: '#grades' }
            ], html);
        },

        // 9. تفاصيل الصف (Grade 4 / Grade 5)
        renderGradeDetailView(gradeId) {
            const grade = siteData.grades.find(g => g.id === gradeId);
            if (!grade) {
                this.renderGradesOverview();
                return;
            }

            let currHtml = '';
            grade.curriculum.forEach(c => {
                currHtml += `
                    <div class="curr-card card" style="padding: 1.25rem;">
                        <h4 style="color: var(--navy); margin-bottom: 0.4rem;">${c.name}</h4>
                        <p style="font-size: 0.9rem; line-height: 1.7; color: var(--dark-muted);">${c.desc}</p>
                    </div>
                `;
            });

            const html = `
                <div class="internal-page-header">
                    <span class="page-tag">${grade.badge}</span>
                    <h1 class="page-title">${grade.title}</h1>
                    <p class="page-subtitle">${grade.overview}</p>
                </div>

                <div class="grade-overview-box card" style="padding: 1.75rem; margin-bottom: 2rem;">
                    <h2 class="section-title-sm">الأهداف التعليمية والمهارية المستهدفة</h2>
                    <ul style="padding-right: 1.5rem; line-height: 2; font-size: 1.05rem; color: var(--dark);">
                        ${grade.goals.map(g => `<li>${g}</li>`).join('')}
                    </ul>
                </div>

                <div class="curriculum-section" style="margin-bottom: 2.5rem;">
                    <h2 class="section-title-sm">المناهج والمباحث الدراسية المقررة</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.25rem;">
                        ${currHtml}
                    </div>
                </div>

                <div class="support-link-callout card" style="padding: 1.5rem; background: var(--blue-light); border-color: var(--blue); margin-bottom: 2rem;">
                    <h3 style="color: var(--navy); margin-bottom: 0.4rem;">برامج الدعم والرعاية المخصصة لطلبة ${grade.title}:</h3>
                    <p style="margin-bottom: 1rem; color: var(--dark);">توفر المدرسة لطلبة الصف خطط تداخلات علاجية لتأسيس المهارات، ورعاية للموهوبين، ونادي قراءة ومطالعة، وبرنامج صف الفرح للدعم النفسي.</p>
                    <a href="#support-programs" class="btn btn-secondary btn-sm">استعراض برامج الدعم والرعاية ←</a>
                </div>
            `;

            this.showInternalView([
                { label: 'الرئيسية', route: '#home' },
                { label: 'فصول الدراسة', route: '#grades' },
                { label: grade.title, route: grade.route }
            ], html);
        },

        // 10. برامج الدعم التعليمي (#support-programs)
        renderSupportProgramsView() {
            let cardsHtml = '';
            siteData.supportPrograms.forEach(prog => {
                cardsHtml += `
                    <div class="support-program-card card" style="padding: 2rem; margin-bottom: 1.5rem; border-right: 5px solid ${prog.color};">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.75rem;">
                            <div style="display: flex; align-items: center; gap: 0.75rem;">
                                <span style="font-size: 2.2rem;">${prog.icon}</span>
                                <div>
                                    <h3 style="color: var(--navy); font-size: 1.3rem;">${prog.title}</h3>
                                    <span class="badge-mini" style="background: ${prog.color}20; color: ${prog.color}; font-weight: 700;">${prog.badge}</span>
                                </div>
                            </div>
                            <a href="${prog.route}" class="btn btn-outline-dark btn-sm">التفاصيل الكاملة ←</a>
                        </div>
                        <p style="font-size: 1.05rem; line-height: 1.8; color: var(--dark); margin: 0.8rem 0;">${prog.desc}</p>
                        <div style="background: var(--light-bg); border-radius: var(--radius-sm); padding: 1rem; margin-top: 1rem;">
                            <strong style="color: var(--navy);">الفئة المستهدفة:</strong> ${prog.targetGroup}
                            <div style="margin-top: 0.5rem;">
                                <strong>أبرز الأنشطة:</strong>
                                <ul style="padding-right: 1.2rem; margin-top: 0.3rem;">
                                    ${prog.activities.map(a => `<li>${a}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
            });

            const html = `
                <div class="internal-page-header">
                    <span class="page-tag">الرعاية المتكاملة</span>
                    <h1 class="page-title">برامج الدعم التعليمي والرعاية التربوية والنفسية</h1>
                    <p class="page-subtitle">برامج نوعية لدعم التحصيل، ورعاية الفروق الفردية، وتنمية المواهب، وتوفير بيئة نفسية إيجابية</p>
                </div>

                <div class="support-list-wrapper">
                    ${cardsHtml}
                </div>

                <div class="strategy-callout-box" style="margin-top: 2rem;">
                    <div class="strategy-icon">🌟</div>
                    <div>
                        <strong>ملاحظة تصنيفية معتمدة:</strong>
                        <p>تؤكد المدرسة أن الفصول الدراسية الرسمية المعتمدة هي <strong>الصف الرابع الأساسي والصف الخامس الأساسي</strong>، في حين يُصنف برنامج <strong>"صف الفرح"</strong> كبرنامج دعم ورعاية تربوية ونفسية ونشاط هادف لخدمة الطلبة ولا يعد فصلاً دراسياً مستقلاً.</p>
                    </div>
                </div>
            `;

            this.showInternalView([
                { label: 'الرئيسية', route: '#home' },
                { label: 'فصول الدراسة', route: '#grades' },
                { label: 'برامج الدعم التعليمي', route: '#support-programs' }
            ], html);
        },

        // 11. الفعاليات (#events)
        renderEventsListView() {
            let eventsHtml = '';
            siteData.events.forEach(evt => {
                eventsHtml += `
                    <div class="event-card card">
                        <div class="event-card-header">
                            <span class="event-badge">${evt.category}</span>
                            <span class="event-date">📅 ${evt.date}</span>
                        </div>
                        <div class="event-card-body">
                            <span class="event-icon" aria-hidden="true">${evt.icon}</span>
                            <h3>${evt.title}</h3>
                            <p>${evt.summary}</p>
                            <div style="margin-top: 0.6rem; font-size: 0.85rem; color: var(--dark-muted);">
                                📍 ${evt.location}
                            </div>
                        </div>
                        <div class="event-card-footer">
                            <a href="${evt.route}" class="btn btn-secondary btn-block btn-sm">عرض التفاصيل والصور ←</a>
                        </div>
                    </div>
                `;
            });

            const html = `
                <div class="internal-page-header">
                    <span class="page-tag">الأنشطة المدرسية</span>
                    <h1 class="page-title">الفعاليات والأنشطة المدرسية 2026-2027</h1>
                    <p class="page-subtitle">سجل الفعاليات التربوية، الثقافية، الرياضية، والمجتمعية التي تنظمها المدرسة</p>
                </div>

                <div class="events-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                    ${eventsHtml}
                </div>
            `;

            this.showInternalView([
                { label: 'الرئيسية', route: '#home' },
                { label: 'الفعاليات', route: '#events' }
            ], html);
        },

        // 12. تفاصيل الفعالية (#event/:id)
        renderEventDetailView(eventId) {
            const evt = siteData.events.find(e => e.id === eventId);
            if (!evt) {
                this.renderEventsListView();
                return;
            }

            const html = `
                <div class="internal-page-header">
                    <span class="page-tag">${evt.category}</span>
                    <h1 class="page-title">${evt.title}</h1>
                    <p class="page-subtitle">📅 تاريخ الفعالية: ${evt.date} | 📍 المكان: ${evt.location}</p>
                </div>

                <div class="event-detail-card card" style="padding: 2rem; margin-bottom: 2rem;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">${evt.icon}</div>
                    <h2 class="section-title-sm">ملخص وتفاصيل الفعالية</h2>
                    <p style="font-size: 1.1rem; line-height: 1.9; color: var(--dark); margin-bottom: 1.5rem;">${evt.fullDetails}</p>

                    <div style="background: var(--light-bg); padding: 1.25rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem;">
                        <strong style="color: var(--navy); display: block; margin-bottom: 0.3rem;">المشاركون والفئات المستهدفة:</strong>
                        <p style="color: var(--dark);">${evt.participants}</p>
                    </div>

                    <h3 style="color: var(--navy); font-size: 1.1rem; margin-bottom: 0.5rem;">أبرز مخرجات ومحطات النشاط:</h3>
                    <ul style="padding-right: 1.5rem; line-height: 1.9; color: var(--dark);">
                        ${evt.highlights.map(h => `<li>${h}</li>`).join('')}
                    </ul>
                </div>

                <div class="action-buttons-wrap">
                    <a href="#events" class="btn btn-secondary">العودة لكافة الفعاليات ←</a>
                </div>
            `;

            this.showInternalView([
                { label: 'الرئيسية', route: '#home' },
                { label: 'الفعاليات', route: '#events' },
                { label: evt.title, route: evt.route }
            ], html);
        },

        // 13. المبادرات والبرامج (#initiatives)
        renderInitiativesListView() {
            let initsHtml = '';
            siteData.initiatives.forEach(init => {
                initsHtml += `
                    <div class="initiative-card card">
                        <div class="init-header">
                            <span class="init-icon">${init.icon}</span>
                            <span class="init-category">${init.category}</span>
                        </div>
                        <h3>${init.name}</h3>
                        <p>${init.briefDescription}</p>
                        <div class="init-footer">
                            <a href="${init.route}" class="btn btn-secondary btn-sm btn-block">تفاصيل المبادرة الكاملة ←</a>
                        </div>
                    </div>
                `;
            });

            const html = `
                <div class="internal-page-header">
                    <span class="page-tag">المشاريع الإبداعية</span>
                    <h1 class="page-title">المبادرات والبرامج المدرسية 2026-2027</h1>
                    <p class="page-subtitle">منظومة المبادرات السلوكية والأكاديمية والبيئية والمجتمعية المنبثقة من الخطة التطويرية</p>
                </div>

                <div class="initiatives-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                    ${initsHtml}
                </div>
            `;

            this.showInternalView([
                { label: 'الرئيسية', route: '#home' },
                { label: 'المبادرات والبرامج', route: '#initiatives' }
            ], html);
        },

        // 14. تفاصيل المبادرة (#initiative/:id)
        renderInitiativeDetailView(initId) {
            const init = siteData.initiatives.find(i => i.id === initId);
            if (!init) {
                this.renderInitiativesListView();
                return;
            }

            const area = siteData.developmentPlan.find(p => p.id === init.relatedAreaId);

            const html = `
                <div class="internal-page-header">
                    <span class="page-tag">${init.category}</span>
                    <h1 class="page-title">${init.name}</h1>
                    <p class="page-subtitle">${init.briefDescription}</p>
                </div>

                <div class="initiative-detail-card card" style="padding: 2rem; margin-bottom: 2rem;">
                    <div style="font-size: 3rem; margin-bottom: 0.8rem;">${init.icon}</div>
                    <h2 class="section-title-sm">الوصف التفصيلي للمبادرة</h2>
                    <p style="font-size: 1.1rem; line-height: 1.9; color: var(--dark); margin-bottom: 1.5rem;">${init.fullDescription}</p>

                    <div class="init-goals-block" style="background: var(--light-bg); border-radius: var(--radius-sm); padding: 1.5rem; margin-bottom: 1.5rem;">
                        <h3 style="color: var(--navy); font-size: 1.1rem; margin-bottom: 0.6rem;">أهداف المبادرة:</h3>
                        <ul style="padding-right: 1.5rem; line-height: 1.9; color: var(--dark);">
                            ${init.goals.map(g => `<li>${g}</li>`).join('')}
                        </ul>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.25rem;">
                        <div style="border: 1px solid var(--gray-200); padding: 1.2rem; border-radius: var(--radius-sm);">
                            <strong style="color: var(--navy); display: block; margin-bottom: 0.3rem;">الفئة المستهدفة:</strong>
                            <p style="color: var(--dark);">${init.targetAudience}</p>
                        </div>
                        <div style="border: 1px solid var(--gray-200); padding: 1.2rem; border-radius: var(--radius-sm);">
                            <strong style="color: var(--navy); display: block; margin-bottom: 0.3rem;">الأثر والنتائج المتوقعة:</strong>
                            <p style="color: var(--dark);">${init.outcomes}</p>
                        </div>
                    </div>
                </div>

                ${area ? `
                    <div class="strategy-callout-box" style="margin-bottom: 2rem;">
                        <div class="strategy-icon">${area.icon}</div>
                        <div>
                            <strong>المجال التطويري المرتبط:</strong>
                            <p>ترتبط هذه المبادرة مباشرة بمجال <strong>${area.title}</strong> في الخطة التطويرية للمدرسة 2026-2027.</p>
                            <a href="${area.route}" class="btn btn-outline-dark btn-sm" style="margin-top: 0.5rem;">عرض صفحة مجال ${area.title} ←</a>
                        </div>
                    </div>
                ` : ''}

                <div class="action-buttons-wrap">
                    <a href="#initiatives" class="btn btn-secondary">العودة لكافة المبادرات ←</a>
                </div>
            `;

            this.showInternalView([
                { label: 'الرئيسية', route: '#home' },
                { label: 'المبادرات والبرامج', route: '#initiatives' },
                { label: init.name, route: init.route }
            ], html);
        },

        // 15. الإنجازات (#achievements)
        renderAchievementsView() {
            let achHtml = '';
            siteData.achievements.forEach(ach => {
                achHtml += `
                    <div class="achievement-card card" style="padding: 1.75rem; margin-bottom: 1.5rem; display: flex; gap: 1.5rem; align-items: flex-start; flex-wrap: wrap;">
                        <div class="ach-icon" style="font-size: 3rem; background: var(--light-bg); border-radius: var(--radius-md); padding: 1rem; line-height: 1;">${ach.icon}</div>
                        <div style="flex: 1; min-width: 260px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                                <h3 style="color: var(--navy); font-size: 1.25rem;">${ach.title}</h3>
                                <span class="badge-mini" style="background: #fef3c7; color: #92400e; font-weight: 700;">${ach.date}</span>
                            </div>
                            <p style="font-size: 1.02rem; line-height: 1.8; color: var(--dark); margin-bottom: 0.8rem;">${ach.desc}</p>
                            <p style="font-size: 0.92rem; line-height: 1.7; color: var(--dark-muted);">${ach.details}</p>
                            <div style="margin-top: 0.8rem;">
                                <a href="#achievement/${ach.id}" class="text-link">قراءة التفاصيل والتوثيق ←</a>
                            </div>
                        </div>
                    </div>
                `;
            });

            const html = `
                <div class="internal-page-header">
                    <span class="page-tag">سجل التميز</span>
                    <h1 class="page-title">إنجازات مدرسة أبي بكر الصديق الأساسية الثانية</h1>
                    <p class="page-subtitle">شواهد التميز الأكاديمي، البيئي، والقيادي المتحققة بفضل تضافر جهود الكادر والطلبة وأولياء الأمور</p>
                </div>

                <div class="achievements-list">
                    ${achHtml}
                </div>
            `;

            this.showInternalView([
                { label: 'الرئيسية', route: '#home' },
                { label: 'الإنجازات', route: '#achievements' }
            ], html);
        },

        // 16. تفاصيل الإنجاز (#achievement/:id)
        renderAchievementDetailView(achId) {
            const ach = siteData.achievements.find(a => a.id === achId);
            if (!ach) {
                this.renderAchievementsView();
                return;
            }

            const html = `
                <div class="internal-page-header">
                    <span class="page-tag">سجل الإنجاز والتميز</span>
                    <h1 class="page-title">${ach.title}</h1>
                    <p class="page-subtitle">📅 العام الدراسي: ${ach.date}</p>
                </div>

                <div class="achievement-detail-card card" style="padding: 2rem; margin-bottom: 2rem;">
                    <div style="font-size: 3.5rem; margin-bottom: 1rem;">${ach.icon}</div>
                    <h2 class="section-title-sm">تفاصيل الإنجاز والمؤشرات المحققة</h2>
                    <p style="font-size: 1.15rem; line-height: 1.9; color: var(--dark); margin-bottom: 1.5rem;">${ach.desc}</p>
                    <div style="background: var(--light-bg); border-radius: var(--radius-sm); padding: 1.5rem; line-height: 1.9; font-size: 1.05rem; color: var(--dark);">
                        ${ach.details}
                    </div>
                </div>

                <div class="action-buttons-wrap">
                    <a href="#achievements" class="btn btn-secondary">العودة لكافة الإنجازات ←</a>
                </div>
            `;

            this.showInternalView([
                { label: 'الرئيسية', route: '#home' },
                { label: 'الإنجازات', route: '#achievements' },
                { label: ach.title, route: `#achievement/${ach.id}` }
            ], html);
        },

        // 17. الموارد التعليمية (#resources)
        renderResourcesView() {
            let resHtml = '';
            siteData.educationalResources.forEach(res => {
                const isInternal = res.type === 'internal';
                resHtml += `
                    <div class="resource-card card" style="padding: 1.75rem; cursor: pointer;" onclick="if (!event.target.closest('a')) { ${isInternal ? `window.location.hash = '${res.route}'` : `window.open('${res.url}', '_blank', 'noopener,noreferrer')`} }">
                        <span class="res-icon" style="font-size: 2.5rem; display: block; margin-bottom: 0.6rem;">${res.icon}</span>
                        <h3 style="color: var(--navy); margin-bottom: 0.5rem;">${res.title}</h3>
                        <p style="font-size: 0.95rem; line-height: 1.7; color: var(--dark-muted); margin-bottom: 1.25rem;">${res.desc}</p>
                        ${res.source ? `<div style="font-size: 0.82rem; color: var(--dark-muted); margin-bottom: 0.8rem;"><strong>المصدر:</strong> ${res.source}</div>` : ''}
                        <a href="${isInternal ? res.route : res.url}" ${isInternal ? '' : 'target="_blank" rel="noopener noreferrer"'} class="btn btn-secondary btn-block btn-sm">
                            ${isInternal ? 'عرض البوابة' : 'زيارة المنصة التعليمية ↗'}
                        </a>
                    </div>
                `;
            });

            const html = `
                <div class="internal-page-header">
                    <span class="page-tag">المعرفة والمصادر الرقمية</span>
                    <h1 class="page-title">الموارد التعليمية والمنصات الرسمية</h1>
                    <p class="page-subtitle">منصات وبوابات معتمدة لخدمة المعلمات والطلبة وأولياء الأمور في عمليتي التعلم والتعليم</p>
                </div>

                <div class="resources-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
                    ${resHtml}
                </div>
            `;

            this.showInternalView([
                { label: 'الرئيسية', route: '#home' },
                { label: 'الموارد التعليمية', route: '#resources' }
            ], html);
        },

        // 18. الروابط المهمة (Categorized with Audit Status) (#links)
        renderLinksView() {
            let categoriesHtml = '';

            siteData.importantLinksCategories.forEach(cat => {
                let linksListHtml = '';
                cat.links.forEach(link => {
                    const isInternal = link.url.startsWith('#');
                    linksListHtml += `
                        <div class="link-card-detailed card" style="padding: 1.5rem; display: flex; flex-direction: column;">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.5rem; margin-bottom: 0.6rem;">
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <span style="font-size: 1.8rem;">${link.icon}</span>
                                    <h4 style="color: var(--navy); font-size: 1.1rem;">${link.title}</h4>
                                </div>
                                <span class="badge-mini" style="background: var(--blue-light); color: var(--navy); font-weight: 600;">رابط معتمد</span>
                            </div>
                            <p style="font-size: 0.92rem; line-height: 1.7; color: var(--dark); margin-bottom: 0.8rem; flex: 1;">${link.shortDesc}</p>
                            <div style="font-size: 0.82rem; color: var(--dark-muted); margin-bottom: 1rem; border-top: 1px dashed var(--gray-200); padding-top: 0.5rem;">
                                <strong>الجهة / المصدر:</strong> ${link.source}
                            </div>
                            <a href="${link.url}" ${isInternal ? '' : 'target="_blank" rel="noopener noreferrer"'} class="btn btn-secondary btn-sm btn-block">
                                ${isInternal ? 'عرض البوابة الداخلية' : 'فتح الرابط المعتمد ↗'}
                            </a>
                        </div>
                    `;
                });

                categoriesHtml += `
                    <div class="links-category-section" style="margin-bottom: 2.5rem;">
                        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; border-bottom: 2px solid var(--navy)15; padding-bottom: 0.5rem;">
                            <span style="font-size: 1.8rem;">${cat.icon}</span>
                            <div>
                                <h3 style="color: var(--navy); font-size: 1.35rem; margin: 0;">${cat.title}</h3>
                                <small style="color: var(--dark-muted);">${cat.desc}</small>
                            </div>
                        </div>
                        <div class="links-subgrid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.25rem;">
                            ${linksListHtml}
                        </div>
                    </div>
                `;
            });

            const html = `
                <div class="internal-page-header">
                    <span class="page-tag">دليل البوابات والخدمات الموثقة</span>
                    <h1 class="page-title">دليل الروابط المهمة والخدمات المعتمدة</h1>
                    <p class="page-subtitle">روابط رسمية ومباشرة لخدمة الطلبة والمعلمات وأولياء الأمور والمجتمع المحلي</p>
                </div>

                <div class="card" style="padding: 1.25rem 1.5rem; margin-bottom: 2rem; background: var(--white); border-right: 4px solid var(--blue);">
                    <strong style="color: var(--navy); display: block; margin-bottom: 0.35rem;">دليل الخدمات والمنصات التعليمية المعتمدة:</strong>
                    <p style="font-size: 0.92rem; color: var(--dark-muted); margin: 0; line-height: 1.7;">
                        روابط رسمية ومباشرة تشمل منظومة وزارة التربية والتعليم، المبادرات الوطنية، وبوابات المدرسة الرسمية لتسهيل وصول الكادر التدريسي والطلبة وأولياء الأمور.
                    </p>
                </div>

                <div class="links-categories-wrapper">
                    ${categoriesHtml}
                </div>
            `;

            this.showInternalView([
                { label: 'الرئيسية', route: '#home' },
                { label: 'روابط مهمة', route: '#links' }
            ], html);
        },

        // 19. تواصل معنا (#contact)
        renderContactView() {
            const s = siteData.school;

            const html = `
                <div class="internal-page-header">
                    <span class="page-tag">قنوات الاتصال المباشر</span>
                    <h1 class="page-title">تواصل مع إدارة مدرسة أبي بكر الصديق الأساسية الثانية</h1>
                    <p class="page-subtitle">يسعدنا دائماً استقبال استفساراتكم وملاحظاتكم ومشاركتكم في بناء بيئة تعليمية أفضل</p>
                </div>

                <div class="contact-view-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem; margin-bottom: 2.5rem;">
                    <!-- Official School Info Card -->
                    <div class="contact-info-card card" style="padding: 2rem;">
                        <h2 class="section-title-sm">البيانات الرسمية للمدرسة</h2>
                        <div class="info-list" style="margin-top: 1.5rem;">
                            <div class="info-item">
                                <span class="info-icon">🏫</span>
                                <div>
                                    <strong>اسم المدرسة:</strong>
                                    <p>${s.name}</p>
                                </div>
                            </div>
                            <div class="info-item">
                                <span class="info-icon">📋</span>
                                <div>
                                    <strong>الجهة الإشرافية:</strong>
                                    <p>${s.directorate}</p>
                                </div>
                            </div>
                            <div class="info-item">
                                <span class="info-icon">🔢</span>
                                <div>
                                    <strong>الرقم الوطني للمدرسة:</strong>
                                    <p>${s.nationalSchoolNumber}</p>
                                </div>
                            </div>
                            <div class="info-item">
                                <span class="info-icon">📅</span>
                                <div>
                                    <strong>العام الدراسي:</strong>
                                    <p>${s.academicYear}</p>
                                </div>
                            </div>
                        </div>

                        <div class="verified-channels-box" style="margin-top: 2rem; border-top: 1px dashed var(--gray-200); padding-top: 1.25rem;">
                            <strong style="color: var(--navy); display: block; margin-bottom: 0.8rem;">الحسابات الرسمية المعتمدة:</strong>
                            <div style="display: flex; flex-direction: column; gap: 0.6rem;">
                                ${(siteData.socialLinksList || Object.values(siteData.socialLinks)).map(l => `
                                    <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="social-badge-link" style="background: var(--light-bg); color: var(--navy); border-color: var(--gray-300); padding: 0.5rem 0.8rem;">
                                        <span class="social-icon">${l.icon}</span> <span>${l.label} ↗</span>
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <!-- Direct Message Form -->
                    <div class="contact-form-card card" style="padding: 2rem;">
                        <h2 class="section-title-sm">أرسل رسالة أو استفساراً</h2>
                        <p style="font-size: 0.9rem; color: var(--dark-muted); margin-bottom: 1.5rem;">سيتم تحويل رسالتكم مباشرة لمتابعة الإدارة المدرسية أو المرشد التربوي.</p>
                        <form id="internalContactForm">
                            <div class="form-group" style="margin-bottom: 1rem;">
                                <label for="mFullName" style="display: block; font-weight: 700; margin-bottom: 0.3rem;">الاسم الكامل *</label>
                                <input type="text" id="mFullName" class="form-control" placeholder="أدخل اسمك الكريم" required style="width: 100%; padding: 0.65rem; border: 1px solid var(--gray-300); border-radius: var(--radius-sm); font-family: inherit;">
                            </div>
                            <div class="form-group" style="margin-bottom: 1rem;">
                                <label for="mRole" style="display: block; font-weight: 700; margin-bottom: 0.3rem;">الصفة *</label>
                                <select id="mRole" class="form-control" required style="width: 100%; padding: 0.65rem; border: 1px solid var(--gray-300); border-radius: var(--radius-sm); font-family: inherit;">
                                    <option value="ولي أمر">ولي أمر</option>
                                    <option value="طالب">طالب</option>
                                    <option value="معلمة / زائرة">معلمة / زائرة</option>
                                    <option value="مؤسسة مجتمعية">مؤسسة مجتمعية</option>
                                </select>
                            </div>
                            <div class="form-group" style="margin-bottom: 1rem;">
                                <label for="mSubject" style="display: block; font-weight: 700; margin-bottom: 0.3rem;">الموضوع أو الاستفسار *</label>
                                <input type="text" id="mSubject" class="form-control" placeholder="موضوع الرسالة" required style="width: 100%; padding: 0.65rem; border: 1px solid var(--gray-300); border-radius: var(--radius-sm); font-family: inherit;">
                            </div>
                            <div class="form-group" style="margin-bottom: 1.25rem;">
                                <label for="mMessage" style="display: block; font-weight: 700; margin-bottom: 0.3rem;">الرسالة بالتفصيل *</label>
                                <textarea id="mMessage" class="form-control" rows="4" placeholder="اكتب تفاصيل الرسالة هنا..." required style="width: 100%; padding: 0.65rem; border: 1px solid var(--gray-300); border-radius: var(--radius-sm); font-family: inherit;"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary btn-block">إرسال الرسالة إلى الإدارة المدرسية</button>
                        </form>
                        <div id="internalFormSuccess" class="form-success-message hidden" style="margin-top: 1rem; padding: 1rem; background: #dcfce7; color: #166534; border-radius: var(--radius-sm); border: 1px solid #bbf7d0;">
                            ✓ شكراً لتواصلكم! تم استلام رسالتكم وسيتم الرد والمتابعة من قبل إدارة المدرسة.
                        </div>
                    </div>
                </div>
            `;

            this.showInternalView([
                { label: 'الرئيسية', route: '#home' },
                { label: 'تواصل معنا', route: '#contact' }
            ], html);

            // Bind internal form submit handler
            const form = document.getElementById('internalContactForm');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const success = document.getElementById('internalFormSuccess');
                    if (success) {
                        success.classList.remove('hidden');
                        setTimeout(() => {
                            success.classList.add('hidden');
                        }, 5000);
                    }
                    form.reset();
                });
            }
        }
    };

    // Expose router & App to global scope for button callbacks (e.g. goBack, modal)
    window.App = App;
    window.appRouter = App;

    // Start App when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => App.init());
    } else {
        App.init();
    }
})();
