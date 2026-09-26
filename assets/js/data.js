// School Website Content Data - Single Source of Truth
const siteData = {
  school: {
    name: "مدرسة أبي بكر الصديق الأساسية للبنين الثانية",
    slogan: "نتعلم • نبدع • ننتمي • نتميز",
    directorate: "مديرية التربية والتعليم لمحافظة إربد - المديرية الأولى",
    nationalSchoolNumber: "114541",
    academicYear: "2026-2027",
    image: "assets/images/school-header.jpg"
  },

  navigation: [
    { id: "home", label: "الرئيسية", href: "#" },
    { id: "about", label: "مدرستنا", href: "#about" },
    { id: "development-plan", label: "الخطة التطويرية", href: "#development-plan" },
    { id: "grades", label: "الصفوف", href: "#grades" },
    { id: "events", label: "الفعاليات", href: "#events" },
    { id: "initiatives", label: "المبادرات", href: "#initiatives" },
    { id: "achievements", label: "الإنجازات", href: "#achievements" },
    { id: "resources", label: "الموارد التعليمية", href: "#resources" },
    { id: "links", label: "روابط مهمة", href: "#links" },
    { id: "contact", label: "تواصل معنا", href: "#contact" }
  ],

  vision: "مدرسة فاعلة ومتميزة معززة لجودة التعليم ومهارات الطلبة، والارتقاء بأداء الكادر التعليمي والإداري، وشراكة فاعلة مع أولياء الأمور والمجتمع المحلي؛ وصولًا إلى بيئة تعليمية آمنة ومحفزة للإبداع والتميز.",

  mission: "بيئة تعليمية جاذبة، تعلم نوعي، انتماء وطني، تفاعل إيجابي مع المجتمع المحلي، التزام بالقيم، وتمكين للطلبة والمعلمين نحو الإبداع والتميز.",

  developmentPlan: [
    {
      id: "learning-teaching",
      title: "التعلم والتعليم",
      icon: "📚",
      color: "#1087C9",
      details: {
        area: "التعلم والتعليم",
        developmentalResult: "تحسين جودة التعليم والتعلم من خلال استراتيجيات حديثة وفعّالة",
        initiatives: [
          "تطبيق استراتيجيات التعلم النشط",
          "توظيف التقنيات التعليمية الحديثة",
          "تطوير المناهج الدراسية"
        ],
        activities: [
          "ورش عمل تدريبية للمعلمين",
          "حلقات نقاش مع الطلبة",
          "مشاريع تطبيقية ميدانية"
        ],
        indicators: [
          "نسبة النجاح في الامتحانات",
          "مستوى تحصيل الطلبة",
          "جودة الأداء التعليمي"
        ]
      }
    },
    {
      id: "student-environment",
      title: "بيئة الطلبة والمناخ والسياق الثقافي",
      icon: "🌱",
      color: "#15966B",
      details: {
        area: "بيئة الطلبة والمناخ والسياق الثقافي",
        developmentalResult: "توفير بيئة تعليمية آمنة وداعمة للإبداع والتميز",
        initiatives: [
          "تحسين البنية التحتية المدرسية",
          "برامج دعم نفسي واجتماعي",
          "أنشطة ثقافية وفنية متنوعة"
        ],
        activities: [
          "تطوير ساحات اللعب والفراغات المدرسية",
          "برامج الإرشاد والتوجيه",
          "فعاليات ثقافية وفنية شهرية"
        ],
        indicators: [
          "نسبة الرضا لدى الطلبة والأهالي",
          "السلوك الإيجابي للطلبة",
          "المشاركة في الأنشطة"
        ]
      }
    },
    {
      id: "school-community",
      title: "المدرسة والمجتمع",
      icon: "🤝",
      color: "#F7B731",
      details: {
        area: "المدرسة والمجتمع",
        developmentalResult: "بناء شراكة فعّالة ومستدامة مع الأسر والمجتمع المحلي",
        initiatives: [
          "برامج التواصل مع أولياء الأمور",
          "مشاريع خدمة المجتمع",
          "شراكات مع المؤسسات المحلية"
        ],
        activities: [
          "لقاءات دورية مع الأهالي",
          "حملات توعية مجتمعية",
          "مشاريع تطوعية للطلبة"
        ],
        indicators: [
          "درجة التفاعل والمشاركة",
          "عدد الشراكات المنفذة",
          "رضا الأهالي والمجتمع"
        ]
      }
    },
    {
      id: "leadership-management",
      title: "القيادة والإدارة",
      icon: "🎯",
      color: "#7656B3",
      details: {
        area: "القيادة والإدارة",
        developmentalResult: "تطوير قيادة مدرسية فعّالة وقادرة على التخطيط والتنفيذ",
        initiatives: [
          "تطوير مهارات القيادة التربوية",
          "تحسين العمليات الإدارية",
          "نشر ثقافة التميز والابتكار"
        ],
        activities: [
          "برامج تدريبية للقيادة التربوية",
          "تطوير نظم إدارية حديثة",
          "ورش عمل للابتكار والإبداع"
        ],
        indicators: [
          "الكفاءة الإدارية والتنظيمية",
          "تحقيق الأهداف الاستراتيجية",
          "مستوى الابتكار والتطوير"
        ]
      }
    }
  ],

  latestEvents: [
    {
      id: "event-1",
      title: "الأسبوع الثقافي",
      date: "2026-09-15",
      category: "فعالية ثقافية",
      image: "assets/images/event-1.jpg",
      description: "احتفالية ثقافية شاملة تضم عروضاً فنية وأنشطة تفاعلية للطلبة والمجتمع المحلي."
    },
    {
      id: "event-2",
      title: "مسابقة التفوق العلمي",
      date: "2026-09-22",
      category: "مسابقة أكاديمية",
      image: "assets/images/event-2.jpg",
      description: "مسابقة شاملة في مختلف المواد الدراسية لتحفيز الطلبة على التميز الأكاديمي."
    },
    {
      id: "event-3",
      title: "يوم الرياضة المدرسية",
      date: "2026-09-29",
      category: "نشاط رياضي",
      image: "assets/images/event-3.jpg",
      description: "فعالية رياضية شاملة تشمل مسابقات وألعاب جماعية لجميع الصفوف."
    },
    {
      id: "event-4",
      title: "عرض المشاريع الطلابية",
      date: "2026-10-06",
      category: "معرض تعليمي",
      image: "assets/images/event-4.jpg",
      description: "عرض مشاريع الطلبة التعليمية والعملية من مختلف الصفوف والمواد الدراسية."
    }
  ],

  initiatives: [
    {
      id: "sambalah",
      name: "سنبلة",
      description: "مبادرة لدعم الطلبة المتفوقين وتطوير مهاراتهم القيادية والأكاديمية",
      icon: "🌾"
    },
    {
      id: "friendship-kingdom",
      name: "مملكة الأصدقاء",
      description: "برنامج تعزيز الصداقات الإيجابية والتعاون بين الطلبة",
      icon: "👫"
    },
    {
      id: "joy-class",
      name: "صف الفرح",
      description: "فصل دراسي متخصص لدعم الطلبة ذوي الاحتياجات الخاصة",
      icon: "😊"
    },
    {
      id: "safe-school",
      name: "مدرستي مكان آمن",
      description: "مبادرة شاملة لضمان سلامة وأمان جميع أفراد المجتمع المدرسي",
      icon: "🛡️"
    },
    {
      id: "kind-word",
      name: "كلمة طيبة",
      description: "برنامج لنشر الكلام الطيب والإيجابي بين الطلبة والكادر التعليمي",
      icon: "💬"
    },
    {
      id: "right-behavior",
      name: "أتصرف صح",
      description: "برنامج تعليمي لتعزيز السلوكيات الإيجابية والصحيحة",
      icon: "✔️"
    },
    {
      id: "positive-behavior-friends",
      name: "أصدقاء السلوك الإيجابي",
      description: "مجموعة من الطلبة القدوة يشاركون في نشر ثقافة السلوك الإيجابي",
      icon: "⭐"
    }
  ],

  studentPortals: [
    {
      id: "grade-4",
      title: "الصف الرابع",
      icon: "📖",
      link: "#grades"
    },
    {
      id: "grade-5",
      title: "الصف الخامس",
      icon: "📚",
      link: "#grades"
    },
    {
      id: "joy-class-portal",
      title: "صف الفرح",
      icon: "🎨",
      link: "#grades"
    },
    {
      id: "interactive-walls",
      title: "الجدران التفاعلية",
      icon: "🖼️",
      link: "#resources"
    }
  ],

  educationalResources: [
    {
      id: "grade-4-books",
      title: "كتب الصف الرابع",
      icon: "📕",
      link: "#"
    },
    {
      id: "grade-5-books",
      title: "كتب الصف الخامس",
      icon: "📗",
      link: "#"
    },
    {
      id: "youtube",
      title: "قناتنا على YouTube",
      icon: "▶️",
      link: "#"
    },
    {
      id: "google-drive",
      title: "Google Drive",
      icon: "☁️",
      link: "#"
    },
    {
      id: "siraj",
      title: "منصة سراج التعليمية",
      icon: "💡",
      link: "#"
    }
  ],

  importantLinks: [
    {
      id: "moe",
      title: "وزارة التربية والتعليم",
      icon: "🏛️",
      link: "#"
    },
    {
      id: "education-directorate",
      title: "مديرية التربية والتعليم",
      icon: "📋",
      link: "#"
    },
    {
      id: "student-support",
      title: "دعم الطلبة",
      icon: "🤲",
      link: "#"
    },
    {
      id: "parent-portal",
      title: "بوابة أولياء الأمور",
      icon: "👨‍👩‍👧",
      link: "#"
    }
  ],

  footer: {
    socialLinks: [
      { platform: "facebook", url: "#", icon: "f" },
      { platform: "youtube", url: "#", icon: "▶️" }
    ],
    educationalPlatforms: [
      { name: "منصة سراج", url: "#" },
      { name: "بوابة التعليم الإلكترونية", url: "#" }
    ],
    legacyWebsite: "الموقع القديم",
    contact: {
      phone: "للاستفسار والتواصل",
      email: "school@example.com"
    }
  }
};
