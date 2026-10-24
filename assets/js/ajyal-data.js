/**
 * مدرسة أبي بكر الصديق الأساسية للبنين الثانية
 * دليل منصة أجيال التعليمي (قاعدة بيانات الشروحات الرسمية)
 * مديرية التربية والتعليم للواء قصبة إربد | العام الدراسي: 2026-2027
 */

(function () {
    'use strict';

    const ajyalGuides = [
        {
            id: "login",
            title: "تسجيل الدخول إلى منصة أجيال",
            category: "الحسابات والدخول",
            icon: "🔑",
            audiences: ["students", "parents", "teachers", "school-admin"],
            audiencesLabels: ["الطلاب", "أولياء الأمور", "المعلمون", "الإدارة المدرسية"],
            description: "شرح خطوات تسجيل الدخول إلى منصة أجيال الرسمية باستخدام الرقم الوطني وكلمة المرور المعتمدة لجميع أفراد المجتمع المدرسي.",
            youtubeVideoId: null,
            duration: "قريبًا",
            status: "coming_soon"
        },
        {
            id: "account-recovery",
            title: "استعادة بيانات الحساب",
            category: "الحسابات والدخول",
            icon: "🔄",
            audiences: ["students", "parents", "teachers"],
            audiencesLabels: ["الطلاب", "أولياء الأمور", "المعلمون"],
            description: "إرشادات استرجاع اسم المستخدم وكلمة المرور في حال نسيانها وتحديث بيانات الاتصال المرتبطة بالحساب.",
            youtubeVideoId: null,
            duration: "قريبًا",
            status: "coming_soon"
        },
        {
            id: "schedule",
            title: "الجدول الدراسي",
            category: "التعليم والتعلم",
            icon: "📅",
            audiences: ["students", "parents", "teachers"],
            audiencesLabels: ["الطلاب", "أولياء الأمور", "المعلمون"],
            description: "استعراض جدول الحصص اليومية والأسبوعية وتوزيع المباحث ومواعيد الحصص والأنشطة المدرسية.",
            youtubeVideoId: null,
            duration: "قريبًا",
            status: "coming_soon"
        },
        {
            id: "assignments-courses",
            title: "الواجبات والمواد الدراسية",
            category: "التعليم والتعلم",
            icon: "📚",
            audiences: ["students", "parents"],
            audiencesLabels: ["الطلاب", "أولياء الأمور"],
            description: "الوصول إلى المواد التعليمية والمناهج المرفوعة، وتحميل أوراق العمل وحل الواجبات وتسليمها إلكترونياً.",
            youtubeVideoId: null,
            duration: "قريبًا",
            status: "coming_soon"
        },
        {
            id: "online-exams",
            title: "الاختبارات الإلكترونية",
            category: "التقييم والاختبارات",
            icon: "📝",
            audiences: ["students", "parents"],
            audiencesLabels: ["الطلاب", "أولياء الأمور"],
            description: "طريقة تأدية الاختبارات الإلكترونية والتقييمات القصيرة عبر المنصة، ومتابعة الوقت المتبقي وتسليم الإجابات.",
            youtubeVideoId: null,
            duration: "قريبًا",
            status: "coming_soon"
        },
        {
            id: "grades-evaluations",
            title: "العلامات والتقييمات",
            category: "التقييم والاختبارات",
            icon: "📊",
            audiences: ["students", "parents"],
            audiencesLabels: ["الطلاب", "أولياء الأمور"],
            description: "الاطلاع على نتائج التقييمات الشهرية والفصلية، وسجلات الأداء وتقارير التحصيل الأكاديمي.",
            youtubeVideoId: null,
            duration: "قريبًا",
            status: "coming_soon"
        },
        {
            id: "parent-followup",
            title: "متابعة الأبناء لأولياء الأمور",
            category: "أولياء الأمور",
            icon: "👨‍👩‍👦",
            audiences: ["parents"],
            audiencesLabels: ["أولياء الأمور"],
            description: "دليل ولي الأمر لمتابعة سجل الحضور والغياب اليومي للابن، وملاحظات المعلمات والواجبات المنجزة.",
            youtubeVideoId: null,
            duration: "قريبًا",
            status: "coming_soon"
        },
        {
            id: "teacher-communication",
            title: "التواصل مع المعلمين",
            category: "التواصل المدرسي",
            icon: "💬",
            audiences: ["parents", "students"],
            audiencesLabels: ["أولياء الأمور", "الطلاب"],
            description: "آلية إرسال واستقبال الرسائل والاستفسارات التعليمية والتربوية مع معلمات المدرسة وإدارتها.",
            youtubeVideoId: null,
            duration: "قريبًا",
            status: "coming_soon"
        },
        {
            id: "classes-management",
            title: "إدارة الصفوف والمباحث",
            category: "المعلمون",
            icon: "👩‍🏫",
            audiences: ["teachers"],
            audiencesLabels: ["المعلمون"],
            description: "إرشادات تنظيم الشعب الصفية والمباحث الدراسية، وتقسيم المجموعات الطلابية وفق الخطط الصفية.",
            youtubeVideoId: null,
            duration: "قريبًا",
            status: "coming_soon"
        },
        {
            id: "lessons-assignments-prep",
            title: "إعداد الدروس والواجبات",
            category: "المعلمون",
            icon: "💻",
            audiences: ["teachers"],
            audiencesLabels: ["المعلمون"],
            description: "خطوات إنشاء الدروس التفاعلية، ورفع المحتوى الإثرائي والمرفقات وتعيين الواجبات المنزلية ومواعيد استلامها.",
            youtubeVideoId: null,
            duration: "قريبًا",
            status: "coming_soon"
        },
        {
            id: "grades-attendance-entry",
            title: "رصد العلامات والحضور",
            category: "التقييم والرصد",
            icon: "📋",
            audiences: ["teachers", "school-admin"],
            audiencesLabels: ["المعلمون", "الإدارة المدرسية"],
            description: "آلية إدخال علامات الفترات والتقييمات التكوينية والختامية، وتثبيت الحضور والغياب اليومي للطلبة.",
            youtubeVideoId: null,
            duration: "قريبًا",
            status: "coming_soon"
        },
        {
            id: "admin-accounts-reports",
            title: "إدارة الحسابات والجداول والتقارير",
            category: "الإدارة المدرسية",
            icon: "⚙️",
            audiences: ["school-admin"],
            audiencesLabels: ["الإدارة المدرسية"],
            description: "دليل الإدارة المدرسية لتوليد حسابات الطلبة والمعلمين، اعتماد التوزيعات والجداول واستخراج التقارير الرسمية.",
            youtubeVideoId: null,
            duration: "قريبًا",
            status: "coming_soon"
        }
    ];

    const ajyalSettings = {
        officialPlaylistUrl: "https://www.youtube.com/playlist?list=PLZzPNcIWVeaM",
        playlistId: "PLZzPNcIWVeaM",
        schoolChannelUrl: "https://www.youtube.com/@abkrschool/playlists",
        platformName: "منصة أجيال التعليمية"
    };

    if (typeof window !== 'undefined') {
        window.ajyalGuidesData = ajyalGuides;
        window.ajyalConfig = ajyalSettings;
        window.ajyalGuidesData.config = ajyalSettings;
    }
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {
            guides: ajyalGuides,
            settings: ajyalSettings
        };
    }
})();

