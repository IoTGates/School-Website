/**
 * مدرسة أبي بكر الصديق الأساسية للبنين الثانية
 * دليل منصة أجيال التعليمي (قاعدة بيانات الشروحات الرسمية)
 * مديرية التربية والتعليم للواء قصبة إربد | العام الدراسي: 2026-2027
 * المصدر الرسمي المعتمد: وزارة التربية والتعليم - المملكة الأردنية الهاشمية (@edugovjo)
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
            description: "شرح خطوات تسجيل الدخول إلى منصة أجيال الرسمية وتفعيل الحسابات لمختلف أفراد المجتمع المدرسي.",
            youtubeVideoId: "5BMAEgvMVZg",
            duration: "2:35",
            status: "verified",
            videos: [
                {
                    videoId: "5BMAEgvMVZg",
                    title: "عملية تسجيل طالب - منصة أجيال",
                    duration: "2:35",
                    source: "وزارة التربية والتعليم - الأردن",
                    target: "الطلاب"
                },
                {
                    videoId: "QXrVS7EwUB8",
                    title: "تسجيل معلم ومعلم إضافي - منصة أجيال",
                    duration: "2:39",
                    source: "وزارة التربية والتعليم - الأردن",
                    target: "المعلمون"
                },
                {
                    videoId: "Qu3vt-R8IVo",
                    title: "تسجيل مدير مدرسة - منصة أجيال",
                    duration: "2:12",
                    source: "وزارة التربية والتعليم - الأردن",
                    target: "الإدارة المدرسية"
                },
                {
                    videoId: "DOhhyniDdqk",
                    title: "تسجيل ولي أمر جديد",
                    duration: "1:15",
                    source: "وزارة التربية والتعليم - الأردن",
                    target: "أولياء الأمور"
                }
            ]
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
            status: "coming_soon",
            videos: []
        },
        {
            id: "schedule",
            title: "الجدول الدراسي",
            category: "التعليم والتعلم",
            icon: "📅",
            audiences: ["students", "parents", "teachers"],
            audiencesLabels: ["الطلاب", "أولياء الأمور", "المعلمون"],
            description: "استعراض جدول الحصص اليومية والأسبوعية وتوزيع المباحث ومتابعة الخطط الدراسية.",
            youtubeVideoId: "obaB5k8iCBo",
            duration: "1:11",
            status: "verified",
            videos: [
                {
                    videoId: "obaB5k8iCBo",
                    title: "متابعة خطة الدروس الأسبوعية للطالب",
                    duration: "1:11",
                    source: "وزارة التربية والتعليم - الأردن",
                    target: "الطلاب وأولياء الأمور"
                }
            ]
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
            status: "coming_soon",
            videos: []
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
            status: "coming_soon",
            videos: []
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
            status: "coming_soon",
            videos: []
        },
        {
            id: "parent-followup",
            title: "متابعة الأبناء لأولياء الأمور",
            category: "أولياء الأمور",
            icon: "👨‍👩‍👦",
            audiences: ["parents"],
            audiencesLabels: ["أولياء الأمور"],
            description: "دليل ولي الأمر لمتابعة سجل أبنائه وإرسال الملاحظات والاستفسارات إلى إدارة المدرسة.",
            youtubeVideoId: "kfk-lpSIsaI",
            duration: "1:34",
            status: "verified",
            videos: [
                {
                    videoId: "kfk-lpSIsaI",
                    title: "إرسال الملاحظات إلى مدير المدرسة من حساب ولي الأمر",
                    duration: "1:34",
                    source: "وزارة التربية والتعليم - الأردن",
                    target: "أولياء الأمور"
                }
            ]
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
            status: "coming_soon",
            videos: []
        },
        {
            id: "classes-management",
            title: "إدارة الصفوف والمباحث",
            category: "المعلمون",
            icon: "👩‍🏫",
            audiences: ["teachers", "school-admin"],
            audiencesLabels: ["المعلمون", "الإدارة المدرسية"],
            description: "إرشادات تنظيم الشعب الصفية، وتعيين مربي الصفوف وتحديد العلاقات التدريسية والمباحث.",
            youtubeVideoId: "xEVa3PZTXXI",
            duration: "2:50",
            status: "verified",
            videos: [
                {
                    videoId: "xEVa3PZTXXI",
                    title: "إضافة مربي صف وتعديل سعة شعبة وتشعيب الطلبة",
                    duration: "2:50",
                    source: "وزارة التربية والتعليم - الأردن",
                    target: "الإدارة المدرسية والمعلمون"
                },
                {
                    videoId: "RcGCl0orKqo",
                    title: "إضافة العلاقات التدريسية من خلال حساب مدير مدرسة",
                    duration: "2:09",
                    source: "وزارة التربية والتعليم - الأردن",
                    target: "الإدارة المدرسية"
                }
            ]
        },
        {
            id: "lessons-assignments-prep",
            title: "إعداد الدروس والواجبات",
            category: "المعلمون",
            icon: "💻",
            audiences: ["teachers"],
            audiencesLabels: ["المعلمون"],
            description: "خطوات إنشاء وإسناد المهام والواجبات التعليمية ومتابعة قوائم الإنجاز وتدوين الملاحظات.",
            youtubeVideoId: "E31tg_yH_Es",
            duration: "1:38",
            status: "verified",
            videos: [
                {
                    videoId: "E31tg_yH_Es",
                    title: "إضافة مهام ومتابعة قائمة المهام",
                    duration: "1:38",
                    source: "وزارة التربية والتعليم - الأردن",
                    target: "المعلمون"
                },
                {
                    videoId: "8lk7o43geXk",
                    title: "إضافة ملاحظات المعلم ومنح الشارات",
                    duration: "2:45",
                    source: "وزارة التربية والتعليم - الأردن",
                    target: "المعلمون"
                }
            ]
        },
        {
            id: "grades-attendance-entry",
            title: "رصد العلامات والحضور",
            category: "التقييم والرصد",
            icon: "📋",
            audiences: ["teachers", "school-admin"],
            audiencesLabels: ["المعلمون", "الإدارة المدرسية"],
            description: "آلية إدارة الانضباط المدرسي، ومتابعة سجلات الغياب والحضور اليومي للطلبة عبر النظام.",
            youtubeVideoId: "554oly8PkdE",
            duration: "2:50",
            status: "verified",
            videos: [
                {
                    videoId: "554oly8PkdE",
                    title: "إدارة الانضباط المدرسي والغياب لدى المدرسة",
                    duration: "2:50",
                    source: "وزارة التربية والتعليم - الأردن",
                    target: "المعلمون والإدارة المدرسية"
                }
            ]
        },
        {
            id: "admin-accounts-reports",
            title: "إدارة الحسابات والجداول والتقارير",
            category: "الإدارة المدرسية",
            icon: "⚙️",
            audiences: ["school-admin"],
            audiencesLabels: ["الإدارة المدرسية"],
            description: "دليل الإدارة المدرسية لترفيع ونقل الطلبة، واستعراض التقارير واستخراج البيانات الرسمية.",
            youtubeVideoId: "SEWClHC4rZI",
            duration: "4:27",
            status: "verified",
            videos: [
                {
                    videoId: "SEWClHC4rZI",
                    title: "ترفيع الطلبة ونقلهم من حساب مدير المدرسة - منصة أجيال",
                    duration: "4:27",
                    source: "وزارة التربية والتعليم - الأردن",
                    target: "الإدارة المدرسية"
                },
                {
                    videoId: "9pcRPcj8OBc",
                    title: "خدمة النقل - منصة أجيال",
                    duration: "4:15",
                    source: "وزارة التربية والتعليم - الأردن",
                    target: "الإدارة المدرسية"
                },
                {
                    videoId: "Oj9achRh6H8",
                    title: "عرض التقارير الخاصة بالطلبة من خلال حساب ضابط الجودة",
                    duration: "2:22",
                    source: "وزارة التربية والتعليم - الأردن",
                    target: "الإدارة وضباط الجودة"
                }
            ]
        }
    ];

    const ajyalSettings = {
        officialPlaylistUrl: "https://www.youtube.com/playlist?list=PLZzPNcIWVeaM",
        playlistId: "PLZzPNcIWVeaM",
        schoolChannelUrl: "https://www.youtube.com/@abkrschool/playlists",
        ministrySourceChannel: "https://www.youtube.com/@edugovjo",
        ministryChannelName: "وزارة التربية والتعليم - الأردن",
        platformName: "منصة أجيال التعليمية",
        syncPlan: {
            authStatus: "UNAUTHORIZED_WRITE", // Environment is read-only for school YouTube playlist
            pendingAdditions: [
                { videoId: "5BMAEgvMVZg", title: "عملية تسجيل طالب - منصة أجيال", duration: "2:35" },
                { videoId: "QXrVS7EwUB8", title: "تسجيل معلم ومعلم إضافي - منصة أجيال", duration: "2:39" },
                { videoId: "Qu3vt-R8IVo", title: "تسجيل مدير مدرسة - منصة أجيال", duration: "2:12" },
                { videoId: "DOhhyniDdqk", title: "تسجيل ولي أمر جديد", duration: "1:15" },
                { videoId: "obaB5k8iCBo", title: "متابعة خطة الدروس الأسبوعية للطالب", duration: "1:11" },
                { videoId: "kfk-lpSIsaI", title: "إرسال الملاحظات إلى مدير المدرسة من حساب ولي الأمر", duration: "1:34" },
                { videoId: "xEVa3PZTXXI", title: "إضافة مربي صف وتعديل سعة شعبة وتشعيب الطلبة", duration: "2:50" },
                { videoId: "RcGCl0orKqo", title: "إضافة العلاقات التدريسية من خلال حساب مدير مدرسة", duration: "2:09" },
                { videoId: "E31tg_yH_Es", title: "إضافة مهام ومتابعة قائمة المهام", duration: "1:38" },
                { videoId: "8lk7o43geXk", title: "إضافة ملاحظات المعلم ومنح الشارات", duration: "2:45" },
                { videoId: "554oly8PkdE", title: "إدارة الانضباط المدرسي والغياب لدى المدرسة", duration: "2:50" },
                { videoId: "SEWClHC4rZI", title: "ترفيع الطلبة ونقلهم من حساب مدير المدرسة - منصة أجيال", duration: "4:27" },
                { videoId: "9pcRPcj8OBc", title: "خدمة النقل - منصة أجيال", duration: "4:15" },
                { videoId: "Oj9achRh6H8", title: "عرض التقارير الخاصة بالطلبة من خلال حساب ضابط الجودة", duration: "2:22" }
            ]
        }
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
