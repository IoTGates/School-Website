/**
 * مدرسة أبي بكر الصديق الأساسية للبنين الثانية
 * دليل منصة أجيال التعليمي (قاعدة بيانات الشروحات الرسمية والتصنيف الدقيق للجمهور)
 * مديرية التربية والتعليم للواء قصبة إربد | العام الدراسي: 2026-2027
 * المصدر الرسمي المعتمد: وزارة التربية والتعليم - المملكة الأردنية الهاشمية (@edugovjo)
 */

(function () {
    'use strict';

    /**
     * القائمة الرسمية لجميع الفيديوهات الـ 19 ذات الصلة بمنصة أجيال
     * مصنفة تصنيفاً دقيقاً حسب هوية المستخدم الفعلي المنفذ للإجراء المعروض
     */
    const allDiscoveredVideos = [
        // --- 14 فيديو معتمد رسمي ومصنف بدقة عالية (Verified) ---
        {
            videoId: "5BMAEgvMVZg",
            title: "عملية تسجيل طالب - منصة أجيال",
            duration: "2:35",
            audiences: ["student"],
            topicId: "login",
            source: "وزارة التربية والتعليم - الأردن",
            classificationEvidence: "دليل مرئي يوضح خطوات تسجيل وتفعيل حساب الطالب الشخصي على منصة أجيال بالرقم الوطني",
            reviewStatus: "verified"
        },
        {
            videoId: "QXrVS7EwUB8",
            title: "تسجيل معلم ومعلم إضافي - منصة أجيال",
            duration: "2:39",
            audiences: ["teacher"],
            topicId: "login",
            source: "وزارة التربية والتعليم - الأردن",
            classificationEvidence: "شرح إجراءات دخول وتفعيل حسابات المعلمين والمعلمين الإضافيين على المنصة",
            reviewStatus: "verified"
        },
        {
            videoId: "Qu3vt-R8IVo",
            title: "تسجيل مدير مدرسة - منصة أجيال",
            duration: "2:12",
            audiences: ["admin"],
            topicId: "login",
            source: "وزارة التربية والتعليم - الأردن",
            classificationEvidence: "إجراءات دخول وتفعيل حساب مدير المدرسة الإداري ذي الصلاحيات المؤسسية",
            reviewStatus: "verified"
        },
        {
            videoId: "DOhhyniDdqk",
            title: "تسجيل ولي أمر جديد",
            duration: "1:15",
            audiences: ["parent"],
            topicId: "login",
            source: "وزارة التربية والتعليم - الأردن",
            classificationEvidence: "شرح خطوات إنشاء وتسجيل حساب ولي أمر جديد لمتابعة الأبناء",
            reviewStatus: "verified"
        },
        {
            videoId: "obaB5k8iCBo",
            title: "متابعة خطة الدروس الأسبوعية للطالب",
            duration: "1:11",
            audiences: ["student"],
            topicId: "schedule",
            source: "وزارة التربية والتعليم - الأردن",
            classificationEvidence: "استعراض ومتابعة جدول الحصص والخطة الأسبوعية من واجهة حساب الطالب",
            reviewStatus: "verified"
        },
        {
            videoId: "kfk-lpSIsaI",
            title: "إرسال الملاحظات إلى مدير المدرسة من حساب ولي الأمر",
            duration: "1:34",
            audiences: ["parent"],
            topicId: "parent-followup",
            source: "وزارة التربية والتعليم - الأردن",
            classificationEvidence: "شرح آلية تواصل ولي الأمر الرسمية لإرسال الملاحظات والاستفسارات من حساب ولي الأمر",
            reviewStatus: "verified"
        },
        {
            videoId: "xEVa3PZTXXI",
            title: "إضافة مربي صف وتعديل سعة شعبة وتشعيب الطلبة",
            duration: "2:50",
            audiences: ["admin"],
            topicId: "classes-management",
            source: "وزارة التربية والتعليم - الأردن",
            classificationEvidence: "صلاحية إدارية بحساب الإدارة المدرسية لتعيين مربي الصفوف وتوزيع الطلبة على الشعب",
            reviewStatus: "verified"
        },
        {
            videoId: "RcGCl0orKqo",
            title: "إضافة العلاقات التدريسية من خلال حساب مدير مدرسة",
            duration: "2:09",
            audiences: ["admin"],
            topicId: "classes-management",
            source: "وزارة التربية والتعليم - الأردن",
            classificationEvidence: "صلاحية مدير المدرسة الإدارية لإسناد المباحث والشعب للمعلمين في النظام",
            reviewStatus: "verified"
        },
        {
            videoId: "E31tg_yH_Es",
            title: "إضافة مهام ومتابعة قائمة المهام",
            duration: "1:38",
            audiences: ["teacher"],
            topicId: "lessons-assignments-prep",
            source: "وزارة التربية والتعليم - الأردن",
            classificationEvidence: "شرح قيام المعلم بإنشاء المهام التعليمية ومتابعة قوائم إنجاز الواجبات",
            reviewStatus: "verified"
        },
        {
            videoId: "8lk7o43geXk",
            title: "إضافة ملاحظات المعلم ومنح الشارات",
            duration: "2:45",
            audiences: ["teacher"],
            topicId: "lessons-assignments-prep",
            source: "وزارة التربية والتعليم - الأردن",
            classificationEvidence: "شرح أدوات المعلم لتدوين الملاحظات التقييمية ومنح الشارات التحفيزية",
            reviewStatus: "verified"
        },
        {
            videoId: "554oly8PkdE",
            title: "إدارة الانضباط المدرسي والغياب لدى المدرسة",
            duration: "2:50",
            audiences: ["admin"],
            topicId: "grades-attendance-entry",
            source: "وزارة التربية والتعليم - الأردن",
            classificationEvidence: "صلاحية إدارية لمتابعة سجلات الحضور والغياب والانضباط على مستوى المدرسة بالكامل",
            reviewStatus: "verified"
        },
        {
            videoId: "SEWClHC4rZI",
            title: "ترفيع الطلبة ونقلهم من حساب مدير المدرسة - منصة أجيال",
            duration: "4:27",
            audiences: ["admin"],
            topicId: "admin-accounts-reports",
            source: "وزارة التربية والتعليم - الأردن",
            classificationEvidence: "إجراءات إدارية رسمية خاصة بمدير المدرسة لترفيع ونقل القيود الطلابية",
            reviewStatus: "verified"
        },
        {
            videoId: "9pcRPcj8OBc",
            title: "خدمة النقل - منصة أجيال",
            duration: "4:15",
            audiences: ["admin"],
            topicId: "admin-accounts-reports",
            source: "وزارة التربية والتعليم - الأردن",
            classificationEvidence: "إجراءات نظامية لإدارة طلبات نقل الطلبة بين المدارس والمديريات",
            reviewStatus: "verified"
        },
        {
            videoId: "Oj9achRh6H8",
            title: "عرض التقارير الخاصة بالطلبة من خلال حساب ضابط الجودة",
            duration: "2:22",
            audiences: ["admin"],
            topicId: "admin-accounts-reports",
            source: "وزارة التربية والتعليم - الأردن",
            classificationEvidence: "صلاحية إدارية وإشرافية وضبط جودة لاستخراج وتحليل تقارير الطلبة",
            reviewStatus: "verified"
        },

        // --- 5 فيديوهات قيد المراجعة والتحقق (Needs Review - لا تفعل حتى تدقيقها) ---
        {
            videoId: "eX7l-8LmZFQ",
            title: "تسجيل مدير مديرية - منصة أجيال",
            duration: "3:12",
            audiences: ["admin"],
            topicId: "login",
            source: "وزارة التربية والتعليم - الأردن",
            classificationEvidence: "حساب مدير تربية وتعليم (مستوى المديرية الميدانية خارج المدرسة) - قيد الدراسة",
            reviewStatus: "needs_review"
        },
        {
            videoId: "FTIEn9BfqDU",
            title: "تعبئة السجل الصحي للطلبة لمستخدم مربي الصف",
            duration: "2:50",
            audiences: ["teacher"],
            topicId: "grades-attendance-entry",
            source: "وزارة التربية والتعليم - الأردن",
            classificationEvidence: "مهمة خاصة بمربي الصف؛ نسخة مكررة قيد التحقق ومقارنتها بالإصدار الأحدث",
            reviewStatus: "needs_review"
        },
        {
            videoId: "txLj5PkF6bs",
            title: "تعبئة السجل الصحي للطلبة لمستخدم مربي الصف",
            duration: "2:50",
            audiences: ["teacher"],
            topicId: "grades-attendance-entry",
            source: "وزارة التربية والتعليم - الأردن",
            classificationEvidence: "تسجيل مطابق مكرر للفيديو FTIEn9BfqDU قيد المراجعة لإزالة التكرار",
            reviewStatus: "needs_review"
        },
        {
            videoId: "bHOIJrVvbVg",
            title: "مدير مدرسة",
            duration: "1:54",
            audiences: ["admin"],
            topicId: "admin-accounts-reports",
            source: "وزارة التربية والتعليم - الأردن",
            classificationEvidence: "شرح عام مختصر لحساب مدير المدرسة بحاجة لمراجعة الجودة ومقارنته بالفيديوهات التفصيلية",
            reviewStatus: "needs_review"
        },
        {
            videoId: "E_zEDma83cQ",
            title: "خطوات إعادة تعيين كلمة السر على منصة تسجيل طلبة الصف الأول",
            duration: "0:43",
            audiences: ["parent"],
            topicId: "account-recovery",
            source: "وزارة التربية والتعليم - الأردن",
            classificationEvidence: "خاص بنظام قبول الصف الأول الأساسي وليس بوابة أجيال العامة",
            reviewStatus: "needs_review"
        }
    ];

    /**
     * الـ 12 بطاقة تعليمية لدليل منصة أجيال
     * كل بطاقة تحتوي حصرياً على الفيديوهات المعتمدة المرتبطة بها
     * مع تصنيف جمهوري مستقل تماماً لكل فيديو
     */
    const ajyalGuides = [
        {
            id: "login",
            title: "تسجيل الدخول إلى منصة أجيال",
            category: "الحسابات والدخول",
            icon: "🔑",
            description: "شرح خطوات تسجيل الدخول إلى منصة أجيال الرسمية وتفعيل الحسابات لمختلف أفراد المجتمع المدرسي.",
            status: "verified",
            videos: [
                {
                    videoId: "5BMAEgvMVZg",
                    title: "عملية تسجيل طالب - منصة أجيال",
                    duration: "2:35",
                    audiences: ["student"],
                    source: "وزارة التربية والتعليم - الأردن",
                    classificationEvidence: "شرح إجراءات دخول وتفعيل حساب الطالب على منصة أجيال",
                    reviewStatus: "verified"
                },
                {
                    videoId: "QXrVS7EwUB8",
                    title: "تسجيل معلم ومعلم إضافي - منصة أجيال",
                    duration: "2:39",
                    audiences: ["teacher"],
                    source: "وزارة التربية والتعليم - الأردن",
                    classificationEvidence: "إجراءات دخول وتفعيل حسابات المعلمين والمعلمين الإضافيين على المنصة",
                    reviewStatus: "verified"
                },
                {
                    videoId: "Qu3vt-R8IVo",
                    title: "تسجيل مدير مدرسة - منصة أجيال",
                    duration: "2:12",
                    audiences: ["admin"],
                    source: "وزارة التربية والتعليم - الأردن",
                    classificationEvidence: "إجراءات دخول وتفعيل حساب مدير المدرسة الإداري ذي الصلاحيات المؤسسية",
                    reviewStatus: "verified"
                },
                {
                    videoId: "DOhhyniDdqk",
                    title: "تسجيل ولي أمر جديد",
                    duration: "1:15",
                    audiences: ["parent"],
                    source: "وزارة التربية والتعليم - الأردن",
                    classificationEvidence: "شرح خطوات إنشاء وتسجيل حساب ولي أمر جديد لمتابعة الأبناء",
                    reviewStatus: "verified"
                }
            ]
        },
        {
            id: "account-recovery",
            title: "استعادة بيانات الحساب",
            category: "الحسابات والدخول",
            icon: "🔄",
            description: "إرشادات استرجاع اسم المستخدم وكلمة المرور في حال نسيانها وتحديث بيانات الاتصال المرتبطة بالحساب.",
            status: "coming_soon",
            videos: []
        },
        {
            id: "schedule",
            title: "الجدول الدراسي",
            category: "التعليم والتعلم",
            icon: "📅",
            description: "استعراض جدول الحصص اليومية والأسبوعية وتوزيع المباحث ومتابعة الخطط الدراسية.",
            status: "verified",
            videos: [
                {
                    videoId: "obaB5k8iCBo",
                    title: "متابعة خطة الدروس الأسبوعية للطالب",
                    duration: "1:11",
                    audiences: ["student"],
                    source: "وزارة التربية والتعليم - الأردن",
                    classificationEvidence: "استعراض ومتابعة جدول الحصص والخطة الأسبوعية من واجهة حساب الطالب",
                    reviewStatus: "verified"
                }
            ]
        },
        {
            id: "assignments-courses",
            title: "الواجبات والمواد الدراسية",
            category: "التعليم والتعلم",
            icon: "📚",
            description: "الوصول إلى المواد التعليمية والمناهج المرفوعة، وتحميل أوراق العمل وحل الواجبات وتسليمها إلكترونياً.",
            status: "coming_soon",
            videos: []
        },
        {
            id: "online-exams",
            title: "الاختبارات الإلكترونية",
            category: "التقييم والاختبارات",
            icon: "📝",
            description: "طريقة تأدية الاختبارات الإلكترونية والتقييمات القصيرة عبر المنصة، ومتابعة الوقت المتبقي وتسليم الإجابات.",
            status: "coming_soon",
            videos: []
        },
        {
            id: "grades-evaluations",
            title: "العلامات والتقييمات",
            category: "التقييم والاختبارات",
            icon: "📊",
            description: "الاطلاع على نتائج التقييمات الشهرية والفصلية، وسجلات الأداء وتقارير التحصيل الأكاديمي.",
            status: "coming_soon",
            videos: []
        },
        {
            id: "parent-followup",
            title: "متابعة الأبناء لأولياء الأمور",
            category: "أولياء الأمور",
            icon: "👨‍👩‍👦",
            description: "دليل ولي الأمر لمتابعة سجل أبنائه وإرسال الملاحظات والاستفسارات إلى إدارة المدرسة.",
            status: "verified",
            videos: [
                {
                    videoId: "kfk-lpSIsaI",
                    title: "إرسال الملاحظات إلى مدير المدرسة من حساب ولي الأمر",
                    duration: "1:34",
                    audiences: ["parent"],
                    source: "وزارة التربية والتعليم - الأردن",
                    classificationEvidence: "شرح آلية تواصل ولي الأمر الرسمية لإرسال الملاحظات والاستفسارات من حساب ولي الأمر",
                    reviewStatus: "verified"
                }
            ]
        },
        {
            id: "teacher-communication",
            title: "التواصل مع المعلمين",
            category: "التواصل المدرسي",
            icon: "💬",
            description: "آلية إرسال واستقبال الرسائل والاستفسارات التعليمية والتربوية مع معلمات المدرسة وإدارتها.",
            status: "coming_soon",
            videos: []
        },
        {
            id: "classes-management",
            title: "إدارة الصفوف والمباحث",
            category: "المعلمون",
            icon: "👩‍🏫",
            description: "إرشادات تنظيم الشعب الصفية، وتعيين مربي الصفوف وتحديد العلاقات التدريسية والمباحث.",
            status: "verified",
            videos: [
                {
                    videoId: "xEVa3PZTXXI",
                    title: "إضافة مربي صف وتعديل سعة شعبة وتشعيب الطلبة",
                    duration: "2:50",
                    audiences: ["admin"],
                    source: "وزارة التربية والتعليم - الأردن",
                    classificationEvidence: "صلاحية إدارية بحساب الإدارة المدرسية لتعيين مربي الصفوف وتوزيع الطلبة على الشعب",
                    reviewStatus: "verified"
                },
                {
                    videoId: "RcGCl0orKqo",
                    title: "إضافة العلاقات التدريسية من خلال حساب مدير مدرسة",
                    duration: "2:09",
                    audiences: ["admin"],
                    source: "وزارة التربية والتعليم - الأردن",
                    classificationEvidence: "صلاحية مدير المدرسة الإدارية لإسناد المباحث والشعب للمعلمين في النظام",
                    reviewStatus: "verified"
                }
            ]
        },
        {
            id: "lessons-assignments-prep",
            title: "إعداد الدروس والواجبات",
            category: "المعلمون",
            icon: "💻",
            description: "خطوات إنشاء وإسناد المهام والواجبات التعليمية ومتابعة قوائم الإنجاز وتدوين الملاحظات.",
            status: "verified",
            videos: [
                {
                    videoId: "E31tg_yH_Es",
                    title: "إضافة مهام ومتابعة قائمة المهام",
                    duration: "1:38",
                    audiences: ["teacher"],
                    source: "وزارة التربية والتعليم - الأردن",
                    classificationEvidence: "شرح قيام المعلم بإنشاء المهام التعليمية ومتابعة قوائم إنجاز الواجبات",
                    reviewStatus: "verified"
                },
                {
                    videoId: "8lk7o43geXk",
                    title: "إضافة ملاحظات المعلم ومنح الشارات",
                    duration: "2:45",
                    audiences: ["teacher"],
                    source: "وزارة التربية والتعليم - الأردن",
                    classificationEvidence: "شرح أدوات المعلم لتدوين الملاحظات التقييمية ومنح الشارات التحفيزية",
                    reviewStatus: "verified"
                }
            ]
        },
        {
            id: "grades-attendance-entry",
            title: "رصد العلامات والحضور",
            category: "التقييم والرصد",
            icon: "📋",
            description: "آلية إدارة الانضباط المدرسي، ومتابعة سجلات الغياب والحضور اليومي للطلبة عبر النظام.",
            status: "verified",
            videos: [
                {
                    videoId: "554oly8PkdE",
                    title: "إدارة الانضباط المدرسي والغياب لدى المدرسة",
                    duration: "2:50",
                    audiences: ["admin"],
                    source: "وزارة التربية والتعليم - الأردن",
                    classificationEvidence: "صلاحية إدارية لمتابعة سجلات الحضور والغياب والانضباط على مستوى المدرسة بالكامل",
                    reviewStatus: "verified"
                }
            ]
        },
        {
            id: "admin-accounts-reports",
            title: "إدارة الحسابات والجداول والتقارير",
            category: "الإدارة المدرسية",
            icon: "⚙️",
            description: "دليل الإدارة المدرسية لترفيع ونقل الطلبة، واستعراض التقارير واستخراج البيانات الرسمية.",
            status: "verified",
            videos: [
                {
                    videoId: "SEWClHC4rZI",
                    title: "ترفيع الطلبة ونقلهم من حساب مدير المدرسة - منصة أجيال",
                    duration: "4:27",
                    audiences: ["admin"],
                    source: "وزارة التربية والتعليم - الأردن",
                    classificationEvidence: "إجراءات إدارية رسمية خاصة بمدير المدرسة لترفيع ونقل القيود الطلابية",
                    reviewStatus: "verified"
                },
                {
                    videoId: "9pcRPcj8OBc",
                    title: "خدمة النقل - منصة أجيال",
                    duration: "4:15",
                    audiences: ["admin"],
                    source: "وزارة التربية والتعليم - الأردن",
                    classificationEvidence: "إجراءات نظامية لإدارة طلبات نقل الطلبة بين المدارس والمديريات",
                    reviewStatus: "verified"
                },
                {
                    videoId: "Oj9achRh6H8",
                    title: "عرض التقارير الخاصة بالطلبة من خلال حساب ضابط الجودة",
                    duration: "2:22",
                    audiences: ["admin"],
                    source: "وزارة التربية والتعليم - الأردن",
                    classificationEvidence: "صلاحية إدارية وإشرافية وضبط جودة لاستخراج وتحليل تقارير الطلبة",
                    reviewStatus: "verified"
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
        allDiscoveredVideos: allDiscoveredVideos,
        classificationSummary: {
            studentVideoIds: ["5BMAEgvMVZg", "obaB5k8iCBo"],
            parentVideoIds: ["DOhhyniDdqk", "kfk-lpSIsaI"],
            teacherVideoIds: ["QXrVS7EwUB8", "E31tg_yH_Es", "8lk7o43geXk"],
            adminVideoIds: ["Qu3vt-R8IVo", "xEVa3PZTXXI", "RcGCl0orKqo", "554oly8PkdE", "SEWClHC4rZI", "9pcRPcj8OBc", "Oj9achRh6H8"],
            ambiguousVideoIds: ["eX7l-8LmZFQ", "FTIEn9BfqDU", "txLj5PkF6bs", "bHOIJrVvbVg", "E_zEDma83cQ"]
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
            settings: ajyalSettings,
            allDiscoveredVideos: allDiscoveredVideos
        };
    }
})();
