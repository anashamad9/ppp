import type { Metadata } from "next"
import type { Locale } from "@/i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import {
  PERSON_NAME_AR,
  PERSON_NAME_AR_STYLED,
  PERSON_NAME_EN,
  SITE_EMAIL,
} from "@/lib/site"
import { getRequestSiteUrl } from "@/lib/site-url.server"
import PortfolioClient from "../portfolio-client"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: langParam } = await params
  const lang = langParam as Locale
  const isArabic = lang === "ar"
  const siteUrl = await getRequestSiteUrl()
  const title = isArabic ? "أنس حمد | مهندس ذكاء اصطناعي ومنتجات تقنية" : "Anas Hamad | AI and Product Engineer"
  const description = isArabic
    ? "أنس حمد مهندس ذكاء اصطناعي ومنتجات تقنية يساعد الشركات الناشئة والمستقلين والأعمال على بناء مواقع، تطبيقات، منصات SaaS، لوحات تحكم، وأنظمة مخصصة."
    : "Anas Hamad is an AI and Product Engineer helping startups, freelancers, and businesses build websites, apps, SaaS platforms, dashboards, and custom systems."
  const canonical = `/${lang}/build`
  const image = "/anas-preview.png"

  return {
    title,
    description,
    keywords: isArabic
      ? ["أنس حمد", "مطور مواقع", "مطور منتجات تقنية", "تطوير مواقع", "تطوير تطبيقات", "SaaS", "لوحات تحكم"]
      : ["Anas Hamad", "Product Developer", "Website Developer", "Web Development", "App Development", "SaaS", "Dashboards"],
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical,
      languages: {
        en: "/en/build",
        ar: "/ar/build",
        "x-default": "/en/build",
      },
    },
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "Anas Hamad",
      locale: isArabic ? "ar_JO" : "en_US",
      images: [
        {
          url: `${siteUrl}${image}`,
          width: 1200,
          height: 630,
          alt: "Anas Hamad",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    icons: {
      icon: "/anas-logo.png",
      shortcut: "/anas-logo.png",
      apple: "/anas-logo.png",
    },
  }
}

export default async function BuildPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langParam } = await params
  const lang = langParam as Locale
  const siteUrl = await getRequestSiteUrl()
  const dict = await getDictionary(lang)
  const role = lang === "ar" ? "مهندس ذكاء اصطناعي ومنتجات تقنية" : "AI and Product Engineer"
  const topTags =
    lang === "ar"
      ? [
          "تطوير المواقع",
          "وكلاء ذكاء اصطناعي",
          "تصميم المنتجات",
          "الأتمتة",
          "نماذج تعلم آلي",
          "تطوير التطبيقات",
          "تطوير المنتجات",
          "أنظمة متكاملة",
          "شات بوتات ذكية",
          "صفحات هبوط",
        ]
      : [
          "Website Development",
          "AI Agents",
          "Product Design",
          "Automations",
          "ML Models",
          "App Development",
          "Product Development",
          "Full Systems",
          "AI Chatbots",
          "Landing Pages",
        ]
  const showcaseSlides =
    lang === "ar"
      ? [
          {
            tag: "تطوير المواقع والتطبيقات",
            title: "مواقع وتطبيقات سريعة وموثوقة",
            description: "أبني مواقع وتطبيقات سريعة وموثوقة ومصممة حول الطريقة التي يستخدمها الناس فعلاً.",
            badges: ["Websites", "Apps", "Reliable Builds", "User-Focused UX"],
            imageSrc: "/first-card/5th image.png",
            imageAlt: "معاينة تطوير المواقع والتطبيقات",
          },
          {
            tag: "وكلاء ذكاء اصطناعي",
            title: "وكلاء مخصصون يتولون المهام الحقيقية",
            description: "أبني وكلاء ذكاء اصطناعي مخصصين يتصلون بأدواتك، ينفذون الأعمال الفعلية، ويعملون بدون متابعة مستمرة.",
            badges: ["AI Agents", "Tool Integrations", "Task Execution", "Autonomous Workflows"],
            imageSrc: "/first-card/First image.png",
            imageAlt: "معاينة وكلاء ذكاء اصطناعي",
          },
          {
            tag: "نماذج اللغة والتعلم الآلي",
            title: "نماذج مبنية ومضبوطة لحالتك الفعلية",
            description: "أطوّر نماذج لغة وتعلم آلي، وأقوم ببنائها وضبطها ونشرها بما يناسب حالة الاستخدام الخاصة بك.",
            badges: ["LLMs", "ML Models", "Fine-Tuning", "Deployment"],
            imageSrc: "/first-card/4th image.avif",
            imageAlt: "معاينة نماذج لغة وتعلم آلي",
          },
          {
            tag: "الأتمتة",
            title: "مسارات عمل تعمل من تلقاء نفسها",
            description: "أبني أتمتة تتولى سير العمل بشكل مستقل لتقليل العمل اليدوي، وتوفير الوقت، وخفض التكاليف.",
            badges: ["Automation", "Workflows", "Time Saving", "Cost Reduction"],
            imageSrc: "/projects/project%204/onqoud%201.png",
            imageAlt: "معاينة أنظمة أتمتة",
          },
          {
            tag: "هندسة منتجات الذكاء الاصطناعي",
            title: "منتجات ذكاء اصطناعي كاملة من الفكرة إلى الإطلاق",
            description: "أصمم وأطوّر منتجات ذكاء اصطناعي كاملة من الفكرة حتى الإطلاق، بشكل جاهز للتوسع مع عملك.",
            badges: ["AI Products", "From Idea to Launch", "Scalable Systems", "Product Engineering"],
            imageSrc: "/first-card/second image.jpg",
            imageAlt: "معاينة هندسة منتجات الذكاء الاصطناعي",
          },
        ]
      : [
          {
            tag: "Website & App Development",
            title: "Fast, reliable websites and applications",
            description: "Fast, reliable websites and applications designed around how people actually use them.",
            badges: ["Websites", "Apps", "Reliable Builds", "User-Focused UX"],
            imageSrc: "/first-card/5th image.png",
            imageAlt: "Website and app development showcase preview",
          },
          {
            tag: "AI Agents",
            title: "Custom agents that handle real tasks",
            description: "Custom agents that handle real tasks, connect to your tools, and work without constant supervision.",
            badges: ["AI Agents", "Tool Integrations", "Task Execution", "Autonomous Workflows"],
            imageSrc: "/first-card/First image.png",
            imageAlt: "AI agents showcase preview",
          },
          {
            tag: "LLMs & ML Models",
            title: "Models built for your specific use case",
            description: "Language and machine learning models built, fine tuned, and deployed for your specific use case.",
            badges: ["LLMs", "ML Models", "Fine-Tuning", "Deployment"],
            imageSrc: "/first-card/4th image.avif",
            imageAlt: "LLMs and ML models showcase preview",
          },
          {
            tag: "Automations",
            title: "Workflows that run on their own",
            description: "Workflows that run on their own, cutting manual work, saving time, and reducing costs.",
            badges: ["Automation", "Workflows", "Time Saving", "Cost Reduction"],
            imageSrc: "/projects/project%204/onqoud%201.png",
            imageAlt: "Automation showcase preview",
          },
          {
            tag: "AI Products Engineering",
            title: "Full AI products from idea to launch",
            description: "Full AI products built from idea to launch, ready to scale with your business.",
            badges: ["AI Products", "From Idea to Launch", "Scalable Systems", "Product Engineering"],
            imageSrc: "/first-card/second image.jpg",
            imageAlt: "AI products engineering showcase preview",
          },
        ]
  const description =
    lang === "ar"
      ? [
          "أنا <u>مهندس ذكاء اصطناعي ومنتجات تقنية</u> أبني تقنيات تساعد <u>الشركات الناشئة</u>، <u>الأفراد</u>، و<u>الأعمال</u> على <u>أتمتة أعمالهم</u>، <u>خفض التكاليف</u>، و<u>توفير الوقت</u>. أصمم وأطوّر <u>وكلاء ذكاء اصطناعي</u>، <u>أنظمة أتمتة</u>، و<u>منتجات ذكية</u> تتولى المهام الحقيقية حتى يركّز الناس على ما يهم فعلاً. من <u>التخطيط</u> و<u>تجربة المستخدم</u> إلى <u>التطوير</u> و<u>النشر</u> و<u>التوسّع</u>، أستمتع بتحويل المتطلبات المعقدة إلى حلول بسيطة وموثوقة تعمل بشكل مستقل.",
          "أبني باستخدام <u>أحدث التقنيات</u>، مع الجمع بين <u>الهندسة الحقيقية</u> و<u>التفكير المنتجّي القوي</u> لصناعة منتجات ذكية وقوية. سواء كان المشروع <u>وكيل ذكاء اصطناعي</u>، أو <u>نظام أتمتة مخصص</u>، أو <u>منصة SaaS كاملة</u>، أحرص أن يكون كل منتج مبنياً بشكل جيد، مفيداً، ومتوافقاً مع أهداف العمل الحقيقية. تركيزي بسيط: بناء تقنيات <u>عملية</u>، <u>قابلة للتوسع</u>، و<u>جاهزة للعالم الحقيقي</u>.",
        ]
      : [
          "I'm an <u>AI and Product Engineer</u> who builds technologies that help <u>startups</u>, <u>individuals</u>, and <u>businesses</u> <u>automate their work</u>, <u>cut costs</u>, and <u>save time</u>. I design and develop <u>AI agents</u>, <u>automation systems</u>, and <u>intelligent products</u> that handle real tasks so people can focus on what actually matters. From <u>planning</u> and <u>user experience</u> to <u>development</u>, <u>deployment</u>, and <u>scaling</u>, I enjoy turning complex requirements into simple, reliable solutions that run on their own.",
          "I build with the <u>latest technologies</u>, combining <u>real engineering</u> with <u>strong product thinking</u> to create powerful, intelligent products. Whether it's an <u>AI agent</u>, a <u>custom automation system</u>, or a <u>full SaaS platform</u>, I make sure every product is well built, useful, and aligned with real business goals. My focus is simple: building technologies that are <u>practical</u>, <u>scalable</u>, and <u>ready for the real world</u>.",
        ]
  const impactCards =
    lang === "ar"
      ? [
          {
            metric: "95%",
            label: "وقت أقل",
            title: "أتمتة وفّرت أكثر من 4 ساعات يومياً",
            description: "حوّلت مهمة يومية كانت تستغرق حوالي 5 ساعات إلى مسار آلي ينتهي خلال 15 دقيقة فقط، مع تقليل العمل اليدوي والأخطاء المتكررة.",
          },
          {
            metric: "24/7",
            label: "ردود ذكية",
            title: "شات بوت مبني على مخزون العميل",
            description: "بنيت نموذج شات بوت يستخدم بيانات المخزون الفعلية للمتجر للرد على العملاء بدقة، وتم ربطه بأنظمة العميل لتقديم إجابات عملية ومحدثة.",
          },
          {
            metric: "End-to-end",
            label: "وكلاء",
            title: "منصة لبناء وكلاء أعمال مخصصين",
            description: "طوّرت منصة وكلاء تتيح للمستخدمين بناء وكلائهم المخصصين وربطهم بالأدوات والأنظمة لأتمتة سير عمل كامل داخل البزنس.",
          },
        ]
      : [
          {
            metric: "95%",
            label: "less time",
            title: "Automation that saved 4+ hours every day",
            description: "Automated a daily client task that used to take around 5 hours and brought it down to about 15 minutes, reducing manual work and repeat errors.",
          },
          {
            metric: "24/7",
            label: "smart replies",
            title: "Inventory-aware LLM chatbot",
            description: "Built an LLM chatbot that answers customers using live store inventory context, then integrated it with the client's internal systems for practical, up-to-date responses.",
          },
          {
            metric: "End-to-end",
            label: "agents",
            title: "Agent platform for full business workflows",
            description: "Built an agent platform that lets users create custom agents, connect them to tools and systems, and automate complete business workflows from one place.",
          },
        ]
  const projectsCard =
    lang === "ar"
      ? {
          projects: [
            {
              tag: "أتمت",
              title: "أتمت",
              description: "الكثير من فرق العمل تضيع وقتها بين أدوات متعددة ومهام متكررة تحتاج متابعة يومية. في أتمت، صممت وبنيت منصة وكيل ذكاء اصطناعي تجمع المحادثات، التطبيقات، المهارات، وسير العمل في تجربة واحدة. ركزت على تحويل الأتمتة من أوامر منفصلة إلى وكلاء قابلين لإعادة الاستخدام يمكنهم تنفيذ مهام حقيقية. النتيجة كانت منتجاً عملياً يساعد الفرق على تقليل العمل اليدوي وبناء أتمتة كاملة من مكان واحد.",
              badges: ["AI Automation", "Agent Design", "Workflow Systems", "Product Development"],
              images: [
                { src: "/projects/Project%201/Atmet%201.png", alt: "لقطة من واجهة مشروع Atmet وتجربة المنتج." },
                { src: "/projects/Project%201/Atmet%202.png", alt: "تفاصيل إضافية من تجربة Atmet وشكل الصفحات الداخلية." },
                { src: "/projects/Project%201/Atmet%203.png", alt: "عرض لتدفق العمل داخل المشروع وطريقة تنظيم العناصر." },
                { src: "/projects/Project%201/Atmet%204.png", alt: "لقطة نهائية توضّح أسلوب العرض والتصميم في Atmet." },
              ],
            },
            {
              tag: "مكونات تفصيلية",
              title: "مكونات تفصيلية",
              description: "المشكلة لم تكن في بناء شاشة واحدة جميلة، بل في جعل الواجهة قابلة للتوسع بدون أن تفقد اتساقها. بنيت نظام مكونات يوضح كيف تتصرف العناصر في الحالات المختلفة، من الرسائل والأزرار إلى التدفقات الصغيرة داخل المنتج. ركزت على التباعد، التسلسل البصري، وحالات التفاعل حتى تكون المكونات جاهزة للاستخدام داخل أكثر من شاشة. النتيجة كانت مكتبة واجهات أكثر وضوحاً تقلل قرارات التصميم المتكررة وتسرّع بناء الصفحات الجديدة.",
              badges: ["UI Components", "Product Design", "Design Systems", "Interaction Details"],
              images: [
                { src: "/projects/project%202/com1.png", alt: "مجموعة مكونات تفصيلية توضّح شكل العناصر داخل المنتج." },
                { src: "/projects/project%202/com2.png", alt: "لقطة لمكوّنات واجهة مستخدم مركّزة على التفاصيل الصغيرة." },
                { src: "/projects/project%202/com3.png", alt: "عرض إضافي للمكوّنات وكيفية ترتيبها داخل الشاشة." },
                { src: "/projects/project%202/Com4.png", alt: "لقطة نهائية للمكوّنات مع شكلها داخل النظام." },
              ],
            },
            {
              tag: "دنتال تريك",
              title: "دنتال تريك",
              description: "التواصل بين أطباء الأسنان والمختبرات غالباً يتشتت بين الرسائل، الصور، وتحديثات الطلبات. صممت تجربة منصة تنظّم الطلبات وتسهّل التنسيق بين الطرفين من أول إرسال الحالة حتى المتابعة. بنيت التدفق حول وضوح الحالة، تفاصيل الطلب، وسهولة الرجوع للمعلومات المهمة. الهدف كان تقليل سوء الفهم وتسريع دورة الطلب بين الطبيب والمختبر.",
              badges: ["Platform Design", "Marketplace", "Healthcare UX", "Product Development"],
              images: [
                { src: "/projects/Project%203/dental%201.png", alt: "لقطة من منصة Dental Trek وتجربة ربط الأطباء بالمختبرات." },
                { src: "/projects/Project%203/dental%202.png", alt: "واجهة إضافية توضّح تنظيم الطلبات والتواصل داخل المنصة." },
                { src: "/projects/Project%203/dental%203.png", alt: "عرض لشاشة أخرى من Dental Trek وتجربة الاستخدام." },
                { src: "/projects/Project%203/dental%204.png", alt: "لقطة نهائية توضّح شكل المنصة وتفاصيلها." },
              ],
            },
            {
              tag: "عنقود",
              title: "عنقود",
              description: "المطاعم والمقاهي تحتاج قرارات أسرع من تقارير يدوية متأخرة أو بيانات موزعة بين أنظمة مختلفة. عملت على منصة ذكاء أعمال تعرض الأداء من خلال لوحات لحظية وبيانات واضحة تساعد الفرق على فهم المبيعات، السلوك، والعمليات. شمل العمل أتمتة خطوط البيانات وبناء أكثر من 50 تقريراً ديناميكياً لدعم التحليل اليومي. ساعدت المنصة على تحسين مؤشرات الأداء بنسبة تصل إلى 30% وخفض التكاليف التشغيلية بنسبة 25%.",
              badges: ["Website Development", "Product Development", "Real-time Dashboards", "Landing Page"],
              images: [
                { src: "/projects/project%204/onqoud%201.png", alt: "لقطة من مشروع Onqoud وتجربة منصة ذكاء الأعمال." },
                { src: "/projects/project%204/onqoud%202.png", alt: "واجهة إضافية توضّح طريقة عرض البيانات داخل Onqoud." },
                { src: "/projects/project%204/onqoud%203.png", alt: "تفاصيل من لوحة أو صفحة داخل مشروع Onqoud." },
                { src: "/projects/project%204/onqoud%204.png", alt: "لقطة نهائية توضّح شكل المشروع وتجربة الاستخدام." },
              ],
            },
            {
              tag: "صفحات الهبوط",
              title: "صفحات الهبوط",
              description: "صفحات الهبوط تحتاج أن تشرح المنتج بسرعة وتدفع الزائر لاتخاذ خطوة واضحة بدون ازدحام بصري. بنيت مجموعة من 4 اتجاهات لصفحات هبوط تركّز على وضوح الرسالة، ترتيب الأقسام، وسرعة الوصول إلى الدعوة الأساسية. تعاملت مع كل صفحة كمسار تحويل صغير يبدأ من المشكلة وينتهي بالفعل المطلوب. النتيجة كانت صفحات أسهل في القراءة وأقوى في عرض قيمة المنتج خلال الثواني الأولى.",
              badges: ["Platform Design", "Marketplace", "Healthcare UX", "Product Development"],
              images: [
                { src: "/projects/project%205/Landing%201.png", alt: "لقطة من صفحة هبوط تعرض بداية التجربة البصرية." },
                { src: "/projects/project%205/Landing%202.png", alt: "قسم آخر من صفحة هبوط يوضّح أسلوب العرض والتنظيم." },
                { src: "/projects/project%205/Landing%203.png", alt: "تفاصيل إضافية من صفحة هبوط وتصميم المحتوى." },
                { src: "/projects/project%205/Landing%204.png", alt: "لقطة نهائية من صفحات الهبوط وشكلها العام." },
              ],
            },
            {
              tag: "أخرى",
              title: "أخرى",
              description: "هذه مجموعة من تجارب ومنتجات صغيرة بنيتها لاختبار أفكار مختلفة بسرعة. ركزت فيها على تحويل الفكرة إلى واجهة قابلة للاستخدام، ثم تحسين التدفق بناءً على ما يحتاجه المستخدم فعلاً. شملت الأعمال نماذج لواجهات منتجات، لوحات تحكم، وتجارب تفاعلية يمكن تطويرها لاحقاً إلى منتجات كاملة. القيمة هنا كانت في سرعة الاستكشاف وبناء نماذج واضحة بدلاً من ترك الأفكار في مرحلة التصور.",
              badges: ["Website Development", "Product Development", "Real-time Dashboards", "Landing Page"],
              images: [
                { src: "/projects/project%206/other%201.png", alt: "لقطة من مشروع إضافي ضمن الأعمال المتنوعة." },
                { src: "/projects/project%206/other%202.png", alt: "واجهة ثانية من مجموعة المشاريع الأخرى." },
                { src: "/projects/project%206/other.%203.png", alt: "لقطة إضافية من مشروع آخر وتفاصيله البصرية." },
              ],
            },
          ],
        }
      : {
          projects: [
            {
              tag: "Atmet",
              title: "Atmet",
              description: "Teams lose time when repetitive work is spread across chats, apps, and disconnected tools. For Atmet, I designed and built an AI agent platform that brings chats, apps, skills, and workflows into one product experience. The approach was to move automation from one-off prompts into reusable agents that can perform real business tasks. The result is a practical platform for building full workflow automation from one place with far less manual follow-up.",
              badges: ["AI Automation", "Agent Design", "Workflow Systems", "Product Development"],
              images: [
                { src: "/projects/Project%201/Atmet%201.png", alt: "A screenshot from the Atmet interface and product experience." },
                { src: "/projects/Project%201/Atmet%202.png", alt: "More detail from the Atmet experience and internal pages." },
                { src: "/projects/Project%201/Atmet%203.png", alt: "A view of the workflow and layout structure inside the project." },
                { src: "/projects/Project%201/Atmet%204.png", alt: "A final view showing the visual direction and product layout in Atmet." },
              ],
            },
            {
              tag: "Detailed components",
              title: "Detailed components",
              description: "The challenge was not making one screen look good, but making the interface scalable and consistent across many product states. I built a detailed component system covering structure, spacing, visual hierarchy, and interaction behavior for reusable product elements. The work turned small UI decisions into repeatable patterns that can be used across multiple screens. The outcome is a clearer component library that speeds up future page building and reduces repeated design decisions.",
              badges: ["UI Components", "Product Design", "Design Systems", "Interaction Details"],
              images: [
                { src: "/projects/project%202/com1.png", alt: "Detailed components showing how interface elements are built inside the product." },
                { src: "/projects/project%202/com2.png", alt: "A closer look at UI components focused on small interaction details." },
                { src: "/projects/project%202/com3.png", alt: "Another component view showing structure and spacing inside the screen." },
                { src: "/projects/project%202/Com4.png", alt: "A final component screenshot showing how the system pieces fit together." },
              ],
            },
            {
              tag: "Dental Trek",
              title: "Dental Trek",
              description: "Dental lab requests often get messy when doctors, labs, files, and status updates are handled across separate channels. I designed a platform flow that organizes requests, case details, and communication between doctors and dental labs. The approach focused on status clarity, easier handoff, and keeping important information attached to each request. The result is a cleaner coordination experience that reduces confusion and helps both sides move cases forward faster.",
              badges: ["Platform Design", "Marketplace", "Healthcare UX", "Product Development"],
              images: [
                { src: "/projects/Project%203/dental%201.png", alt: "A screenshot from Dental Trek and the doctor-to-lab platform experience." },
                { src: "/projects/Project%203/dental%202.png", alt: "Another Dental Trek screen showing request organization and communication." },
                { src: "/projects/Project%203/dental%203.png", alt: "A supporting view from Dental Trek and its user experience." },
                { src: "/projects/Project%203/dental%204.png", alt: "A final Dental Trek screenshot showing the platform details." },
              ],
            },
            {
              tag: "Onqoud",
              title: "Onqoud",
              description: "Restaurants and cafes need faster decisions than manual reports or scattered operational data can provide. I worked on a business intelligence platform that turns restaurant performance data into clear dashboards and daily insights. The build included automated data pipelines and 50+ dynamic Python reports for recurring analysis. The platform helped improve performance metrics by up to 30% and reduce operational costs by 25%.",
              badges: ["Website Development", "Product Development", "Real-time Dashboards", "Landing Page"],
              images: [
                { src: "/projects/project%204/onqoud%201.png", alt: "A screenshot from Onqoud and the business intelligence platform experience." },
                { src: "/projects/project%204/onqoud%202.png", alt: "Another Onqoud screen showing how data is presented in the product." },
                { src: "/projects/project%204/onqoud%203.png", alt: "Details from an internal page or dashboard inside Onqoud." },
                { src: "/projects/project%204/onqoud%204.png", alt: "A final Onqoud screenshot showing the project and user experience." },
              ],
            },
            {
              tag: "Landing Pages",
              title: "Landing Pages",
              description: "A landing page has a few seconds to explain the product, build trust, and move the visitor toward one clear action. I built a set of 4 landing page directions focused on stronger messaging, cleaner section hierarchy, and sharper calls to action. Each page was treated as a conversion path: problem, value, proof, then action. The result is a more readable and persuasive presentation of the product from the first viewport.",
              badges: ["Platform Design", "Marketplace", "Healthcare UX", "Product Development"],
              images: [
                { src: "/projects/project%205/Landing%201.png", alt: "A landing page screenshot showing the first visual direction." },
                { src: "/projects/project%205/Landing%202.png", alt: "Another landing page section showing layout and presentation." },
                { src: "/projects/project%205/Landing%203.png", alt: "More detail from a landing page and its content design." },
                { src: "/projects/project%205/Landing%204.png", alt: "A final landing page screenshot showing the overall page style." },
              ],
            },
            {
              tag: "Other",
              title: "Other",
              description: "This collection includes smaller product experiments and interface explorations built to test ideas quickly. I focused on turning rough concepts into usable flows, then refining the structure around what a real user would need next. The work includes dashboard concepts, product interfaces, and interaction patterns that can grow into full products. The value was speed: making ideas concrete enough to evaluate, improve, and continue building.",
              badges: ["Website Development", "Product Development", "Real-time Dashboards", "Landing Page"],
              images: [
                { src: "/projects/project%206/other%201.png", alt: "A screenshot from another project in the broader portfolio." },
                { src: "/projects/project%206/other%202.png", alt: "A second screen from the other project collection." },
                { src: "/projects/project%206/other.%203.png", alt: "An additional screenshot showing another visual direction." },
              ],
            },
          ],
        }
  const testimonialCta =
    lang === "ar"
      ? {
          quoteTag: "رأي عميل",
          quote: "الحق يقال، أكتر اشي لفت نظري بالعمل معهم هو انهم سمعوا بالزبط شو بحتاج، وأعطوني نصائح لمصلحتي وتسليم المشروع كان بالموعد المحدد. شكراً كتيييير لطولة باله وصبره لأنس علي، والأجمل من ذلك خدمة الرد السريع وحل المشكلات والمتابعة مع العميل بعد تسليم المشروع.",
          author: "رندا متولي",
          role: "أكاديمية رندا",
          avatarSrc: "/484632640_978221624285463_7620032291749332988_n.jpg",
          avatarAlt: "رندا متولي",
          ctaTitle: "إذا عندك فكرة أو مشروع، خلّينا نبنيه بشكل صح",
          primaryLabel: "تواصل معي",
          primaryHref: `mailto:${SITE_EMAIL}`,
          secondaryLabel: "واتساب",
          secondaryHref: "https://wa.me/962795874662",
        }
      : {
          quoteTag: "Client Feedback",
          quote: "To be fair, what stood out most about working with them was that they listened exactly to what I needed, gave me advice that was truly in my best interest, and delivered the project on time. Thank you so much to Anas for his patience and understanding with me. Even better was the fast response service, problem solving, and follow-up with the client after project delivery.",
          author: "Randa Mitwalli",
          role: "Randa Academy",
          avatarSrc: "/484632640_978221624285463_7620032291749332988_n.jpg",
          avatarAlt: "Randa Mitwalli",
          ctaTitle: "If you have an idea or product in mind, let's build it properly",
          primaryLabel: "Contact Me",
          primaryHref: `mailto:${SITE_EMAIL}`,
          secondaryLabel: "WhatsApp",
          secondaryHref: "https://wa.me/962795874662",
        }

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON_NAME_EN,
    alternateName: [PERSON_NAME_AR, PERSON_NAME_AR_STYLED, dict.header.name],
    url: `${siteUrl}/${lang}/build`,
    image: `${siteUrl}/anas-logo.png`,
    jobTitle: role,
    sameAs: [
      "https://www.linkedin.com/in/anas-hamad1909",
      "https://github.com/anashamad9",
      "https://x.com/its_anas9",
      "https://huggingface.co/anashamad",
    ],
    email: SITE_EMAIL,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <PortfolioClient
        dict={dict}
        lang={lang}
        headerRole={role}
        hideExperience
        topTags={topTags}
        description={description}
        secondaryActionLabel={lang === "ar" ? "الأعمال" : "Portfolio"}
        secondaryActionTargetId="#projects"
        secondaryActionIcon="eye"
        showcaseSlides={showcaseSlides}
        impactCards={impactCards}
        compactTechStackCard
        projectsCard={projectsCard}
        testimonialCta={testimonialCta}
      />
    </>
  )
}
