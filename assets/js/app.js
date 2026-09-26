// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', initializeApp);

function initializeApp() {
    populateNavigation();
    populateHero();
    populateVisionMission();
    populateDevelopmentPlan();
    populateStudentPortals();
    populateEvents();
    populateInitiatives();
    populateResources();
    populateLinks();
    populateContact();
    populateFooter();
    setupEventListeners();
    console.log('✓ Website initialized successfully');
}

// ==================== NAVIGATION ====================
function populateNavigation() {
    const navMenu = document.getElementById('navMenu');
    navMenu.innerHTML = '';

    siteData.navigation.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = item.label;
        a.href = item.href;
        a.setAttribute('data-section', item.id);
        a.addEventListener('click', (e) => {
            e.preventDefault();
            handleNavClick(item);
        });
        li.appendChild(a);
        navMenu.appendChild(li);
    });
}

function handleNavClick(item) {
    closeHamburgerMenu();

    if (item.id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        const section = document.getElementById(item.id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// ==================== HAMBURGER MENU ====================
function setupEventListeners() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-container')) {
            closeHamburgerMenu();
        }
    });

    // Contact form
    const contactForm = document.getElementById('contactFormElement');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

function closeHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// ==================== HERO SECTION ====================
function populateHero() {
    document.getElementById('heroSchoolName').textContent = siteData.school.name;
    document.getElementById('heroSlogan').textContent = siteData.school.slogan;
}

// ==================== VISION & MISSION ====================
function populateVisionMission() {
    document.getElementById('visionText').textContent = siteData.vision;
    document.getElementById('missionText').textContent = siteData.mission;
}

// ==================== DEVELOPMENT PLAN ====================
function populateDevelopmentPlan() {
    const container = document.getElementById('developmentCardsContainer');
    container.innerHTML = '';

    siteData.developmentPlan.forEach((plan, index) => {
        const card = document.createElement('div');
        card.className = 'dev-card';
        card.style.borderRightColor = plan.color;
        card.innerHTML = `
            <div class="dev-card-icon">${plan.icon}</div>
            <h3>${plan.title}</h3>
            <button class="dev-card-button" onclick="openModal(${index})">عرض التفاصيل</button>
        `;
        container.appendChild(card);
    });
}

function openModal(index) {
    const plan = siteData.developmentPlan[index];
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div class="modal-details">
            <h2>${plan.title}</h2>
            <h3>المجال</h3>
            <p>${plan.details.area}</p>

            <h3>النتيجة التطويرية</h3>
            <p>${plan.details.developmentalResult}</p>

            <h3>المبادرات</h3>
            <ul>
                ${plan.details.initiatives.map(ini => `<li>${ini}</li>`).join('')}
            </ul>

            <h3>الأنشطة</h3>
            <ul>
                ${plan.details.activities.map(act => `<li>${act}</li>`).join('')}
            </ul>

            <h3>المؤشرات</h3>
            <ul>
                ${plan.details.indicators.map(ind => `<li>${ind}</li>`).join('')}
            </ul>
        </div>
    `;

    document.getElementById('detailsModal').classList.add('active');
}

function closeModal() {
    document.getElementById('detailsModal').classList.remove('active');
}

// Close modal when clicking outside
document.addEventListener('click', (e) => {
    const modal = document.getElementById('detailsModal');
    if (e.target === modal) {
        closeModal();
    }
});

// ==================== STUDENT PORTALS ====================
function populateStudentPortals() {
    const container = document.getElementById('studentPortalsContainer');
    container.innerHTML = '';

    siteData.studentPortals.forEach(portal => {
        const card = document.createElement('div');
        card.className = 'portal-card';
        card.innerHTML = `
            <div class="portal-icon">${portal.icon}</div>
            <h3>${portal.title}</h3>
            <a href="${portal.link}" class="btn btn-primary" style="display: block; margin-top: 1rem;">الدخول</a>
        `;
        container.appendChild(card);
    });
}

// ==================== EVENTS ====================
function populateEvents() {
    const container = document.getElementById('eventsContainer');
    container.innerHTML = '';

    siteData.latestEvents.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
            <div class="event-image">${getEventEmoji(event.category)}</div>
            <div class="event-content">
                <span class="event-category">${event.category}</span>
                <p class="event-date">${formatDate(event.date)}</p>
                <h4>${event.title}</h4>
                <p>${event.description}</p>
                <button class="event-button">التفاصيل الكاملة</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function getEventEmoji(category) {
    const emojis = {
        'فعالية ثقافية': '🎭',
        'مسابقة أكاديمية': '🏆',
        'نشاط رياضي': '⚽',
        'معرض تعليمي': '🎨'
    };
    return emojis[category] || '📅';
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// ==================== INITIATIVES ====================
function populateInitiatives() {
    const container = document.getElementById('initiativesContainer');
    container.innerHTML = '';

    siteData.initiatives.forEach(initiative => {
        const card = document.createElement('div');
        card.className = 'initiative-card';
        card.innerHTML = `
            <div class="initiative-icon">${initiative.icon}</div>
            <h4>${initiative.name}</h4>
            <p>${initiative.description}</p>
        `;
        container.appendChild(card);
    });
}

// ==================== RESOURCES ====================
function populateResources() {
    const container = document.getElementById('resourcesContainer');
    container.innerHTML = '';

    siteData.educationalResources.forEach(resource => {
        const card = document.createElement('a');
        card.href = resource.link;
        card.className = 'resource-card';
        card.innerHTML = `
            <div class="resource-icon">${resource.icon}</div>
            <h4>${resource.title}</h4>
        `;
        container.appendChild(card);
    });
}

// ==================== IMPORTANT LINKS ====================
function populateLinks() {
    const container = document.getElementById('linksContainer');
    container.innerHTML = '';

    siteData.importantLinks.forEach(link => {
        const card = document.createElement('a');
        card.href = link.link;
        card.className = 'link-card';
        card.innerHTML = `
            <div class="link-icon">${link.icon}</div>
            <h4>${link.title}</h4>
        `;
        container.appendChild(card);
    });
}

// ==================== CONTACT SECTION ====================
function populateContact() {
    document.getElementById('schoolName').textContent = siteData.school.name;
    document.getElementById('directorate').textContent = siteData.school.directorate;
    document.getElementById('schoolNumber').textContent = siteData.school.nationalSchoolNumber;
    document.getElementById('academicYear').textContent = siteData.school.academicYear;
}

function handleFormSubmit(e) {
    e.preventDefault();
    alert('شكراً لك على تواصلك معنا. سيتم الرد على رسالتك قريباً.');
    e.target.reset();
}

// ==================== FOOTER ====================
function populateFooter() {
    document.getElementById('footerSchoolName').textContent = siteData.school.name;
    document.getElementById('footerDirectorate').textContent = siteData.school.directorate;
    document.getElementById('footerSchoolNumber').textContent = `الرمز المدرسي: ${siteData.school.nationalSchoolNumber}`;

    // Quick Links
    const quickLinksContainer = document.getElementById('footerQuickLinks');
    const importantLinks = ['about', 'development-plan', 'events', 'contact'];
    importantLinks.forEach(linkId => {
        const navItem = siteData.navigation.find(n => n.id === linkId);
        if (navItem) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = navItem.href;
            a.textContent = navItem.label;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                handleNavClick(navItem);
            });
            li.appendChild(a);
            quickLinksContainer.appendChild(li);
        }
    });

    // Educational Platforms
    const platformsContainer = document.getElementById('footerPlatforms');
    siteData.footer.educationalPlatforms.forEach(platform => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = platform.url;
        a.textContent = platform.name;
        li.appendChild(a);
        platformsContainer.appendChild(li);
    });

    // Social Links
    const socialContainer = document.getElementById('socialLinks');
    siteData.footer.socialLinks.forEach(social => {
        const a = document.createElement('a');
        a.href = social.url;
        a.title = social.platform;
        a.textContent = social.icon;
        socialContainer.appendChild(a);
    });
}

// ==================== UTILITY FUNCTIONS ====================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Scroll reveal effect for sections
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.75;
        if (isVisible) {
            section.style.opacity = '1';
        }
    });
});

// Initialize sections with opacity for reveal effect
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0.8';
});

console.log('✓ App.js loaded');
