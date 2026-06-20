import type { Metadata } from "next"
import type { Locale } from "@/i18n-config"
import { getDictionary } from "@/lib/dictionaries"
import {
  absUrl,
  PERSON_NAME_AR,
  PERSON_NAME_AR_STYLED,
  PERSON_NAME_EN,
  SITE_EMAIL,
  SITE_URL,
} from "@/lib/site"
import PortfolioClient from "../portfolio-client"

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: langParam } = await params
  const lang = langParam as Locale
  const isArabic = lang === "ar"
  const title = isArabic ? "أنس حمد | مطور منتجات تقنية ومواقع" : "Anas Hamad | Product & Website Developer"
  const description = isArabic
    ? "أنس حمد مطور منتجات تقنية ومواقع يساعد الشركات الناشئة والمستقلين والأعمال على بناء مواقع، تطبيقات، منصات SaaS، لوحات تحكم، وأنظمة مخصصة."
    : "Anas Hamad is a product and website developer helping startups, freelancers, and businesses build websites, apps, SaaS platforms, dashboards, and custom systems."
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
          url: `${SITE_URL}${image}`,
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
  }
}

export default async function BuildPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langParam } = await params
  const lang = langParam as Locale
  const dict = await getDictionary(lang)
  const role = lang === "ar" ? "مطور منتجات تقنية ومواقع" : "Product & Website Developer"
  const topTags =
    lang === "ar"
      ? [
          "تطوير المواقع",
          "تصميم المنتجات",
          "تطوير التطبيقات",
          "تطوير المنتجات",
          "أنظمة متكاملة",
          "شات بوتات ذكية",
          "صفحات هبوط",
        ]
      : [
          "Website Development",
          "Product Design",
          "App development",
          "Product Development",
          "Full Systems",
          "AI Chatbots",
          "Landing pages",
        ]
  const showcaseSlides =
    lang === "ar"
      ? [
          {
            tag: "موقع",
            title: "مواقع سريعة وواضحة تركّز على التحويل",
            description: "أصمم وأطوّر مواقع تعكس الهوية بشكل أنيق وتحوّل الزائر إلى عميل بخبرة استخدام مرتبة وأداء سريع.",
            badges: ["Marketing Sites", "Brand Pages", "Responsive UI", "SEO Ready"],
            imageSrc: "/anas-preview.png",
            imageAlt: "معاينة موقع ويب",
          },
          {
            tag: "لوحات تحكم",
            title: "لوحات تحكم تساعدك تشوف الصورة كاملة",
            description: "أبني لوحات معلومات ومنصات داخلية تنظّم البيانات والعمليات بشكل سهل وواضح لاتخاذ قرارات أفضل.",
            badges: ["Dashboards", "Analytics", "Admin Panels", "Reporting"],
            imageSrc: "/poster-1-og.jpg",
            imageAlt: "معاينة لوحة تحكم",
          },
          {
            tag: "تطبيقات",
            title: "تطبيقات ويب وموبايل مبنية للاستخدام الحقيقي",
            description: "من الفكرة إلى الإطلاق، أركز على بناء تطبيقات عملية قابلة للتوسع وسهلة الاستخدام للمستخدم النهائي.",
            badges: ["Web Apps", "Mobile UX", "MVPs", "Scalable Flows"],
            imageSrc: "/poster-2-og.jpg",
            imageAlt: "معاينة تطبيق رقمي",
          },
          {
            tag: "أنظمة",
            title: "أنظمة مخصصة تناسب طريقة عملك",
            description: "أحوّل الاحتياج التجاري إلى نظام واضح يربط بين العمليات والبيانات والأتمتة في مكان واحد.",
            badges: ["Internal Tools", "Automation", "Business Systems", "Custom Workflows"],
            imageSrc: "/images/business-card.png",
            imageAlt: "معاينة نظام أعمال مخصص",
          },
          {
            tag: "منتج",
            title: "تفكير منتجي من أول خطوة إلى التوسّع",
            description: "أشتغل بعقلية Product Builder حتى يكون كل قرار في التصميم والتطوير مرتبطاً بالقيمة الفعلية للمستخدم والعمل.",
            badges: ["Product Strategy", "UX Thinking", "Launch Support", "Growth Ready"],
            imageSrc: "/Anas Preview.png",
            imageAlt: "معاينة أعمال تطوير المنتجات",
          },
        ]
      : [
          {
            tag: "Website",
            title: "Fast, clear websites built to convert",
            description: "I design and develop websites that feel polished, perform well, and help turn visitors into real customers.",
            badges: ["Marketing Sites", "Brand Pages", "Responsive UI", "SEO Ready"],
            imageSrc: "/anas-preview.png",
            imageAlt: "Website showcase preview",
          },
          {
            tag: "Dashboards",
            title: "Dashboards that make decision-making easier",
            description: "I build internal platforms and dashboards that organize data, surface insight, and simplify daily operations.",
            badges: ["Dashboards", "Analytics", "Admin Panels", "Reporting"],
            imageSrc: "/poster-1-og.jpg",
            imageAlt: "Dashboard showcase preview",
          },
          {
            tag: "Apps",
            title: "Web and mobile products designed for real use",
            description: "From early MVPs to polished platforms, I focus on building useful digital products that are simple, scalable, and ready to ship.",
            badges: ["Web Apps", "Mobile UX", "MVPs", "Scalable Flows"],
            imageSrc: "/poster-2-og.jpg",
            imageAlt: "App showcase preview",
          },
          {
            tag: "Systems",
            title: "Custom systems shaped around your workflow",
            description: "I turn operational needs into structured systems that connect data, automation, and execution in one practical product.",
            badges: ["Internal Tools", "Automation", "Business Systems", "Custom Workflows"],
            imageSrc: "/images/business-card.png",
            imageAlt: "Custom system showcase preview",
          },
          {
            tag: "Product",
            title: "Product thinking from planning to scale",
            description: "I work with a product mindset so every design and development decision stays aligned with user value and business outcomes.",
            badges: ["Product Strategy", "UX Thinking", "Launch Support", "Growth Ready"],
            imageSrc: "/Anas Preview.png",
            imageAlt: "Product development showcase preview",
          },
        ]
  const description =
    lang === "ar"
      ? [
          "أنا <u>مطوّر برمجيات</u> و<u>مطور منتجات تقنية</u> أساعد [icon:startup]<u>الشركات الناشئة</u>، [icon:freelancer]<u>المستقلين</u>، [icon:business]<u>الأعمال</u>، و[icon:entrepreneur]<u>روّاد الأعمال</u> على تحويل الأفكار إلى <u>منتجات رقمية حقيقية</u>. أصمم وأطوّر <u>المواقع الإلكترونية</u>، <u>تطبيقات الويب</u>، <u>تطبيقات الموبايل</u>، <u>منصات SaaS</u>، <u>لوحات التحكم</u>، و<u>الأنظمة التجارية المخصصة</u> المبنية لحل مشاكل فعلية وصناعة قيمة قابلة للقياس. من التخطيط وتصميم تجربة المستخدم إلى التطوير والإطلاق والتوسّع، أستمتع بتحويل المتطلبات المعقدة إلى حلول بسيطة وموثوقة وسهلة الاستخدام.",
          "خلال السنوات الماضية، عملت على منتجات في مجالات <u>الذكاء الاصطناعي</u>، <u>تحليل البيانات</u>، <u>الأتمتة</u>، و<u>ذكاء الأعمال</u>. وبصفتي مؤسس <u>Onqoud</u>، بنيت منصة تساعد المطاعم على اتخاذ قرارات أفضل باستخدام البيانات والتحليلات التنبؤية. أسلوبي يجمع بين <u>الخبرة التقنية</u> و<u>التفكير المنتجّي</u>، حتى يكون كل مشروع ليس فقط مبنياً بشكل ممتاز، بل أيضاً متوافقاً مع أهداف العمل واحتياجات المستخدمين. سواء كان المشروع <u>MVP لشركة ناشئة</u>، أو <u>لوحة تحكم لشركة</u>، أو <u>حل برمجي مخصص</u>، فأنا أركز على بناء منتجات عملية، قابلة للتوسع، وجاهزة للاستخدام في العالم الحقيقي.",
        ]
      : [
          "I'm a <u>Developer</u> and <u>Product Builder</u> who helps [icon:startup]<u>startups</u>, [icon:freelancer]<u>freelancers</u>, [icon:business]<u>businesses</u>, and [icon:entrepreneur]<u>entrepreneurs</u> turn ideas into <u>real digital products</u>. I design and develop <u>websites</u>, <u>web applications</u>, <u>mobile apps</u>, <u>SaaS platforms</u>, <u>dashboards</u>, and <u>custom business systems</u> that are built to solve real problems and create measurable value. From planning and user experience design to development, deployment, and scaling, I enjoy transforming complex requirements into simple, reliable, and easy-to-use solutions.",
          "Over the years, I have worked on products across <u>AI</u>, <u>data analytics</u>, <u>automation</u>, and <u>business intelligence</u>. As the founder of <u>Onqoud</u>, I built a platform that helps restaurants make better decisions using data and predictive analytics. My approach combines <u>technical expertise</u> with <u>product thinking</u>, ensuring that every project is not only well-built but also aligned with business goals and user needs. Whether it's a <u>startup MVP</u>, a <u>company dashboard</u>, or a <u>custom software solution</u>, I focus on building products that are practical, scalable, and ready for real-world use.",
        ]
  const projectsCard =
    lang === "ar"
      ? {
          projects: [
            {
              tag: "منصة SaaS",
              title: "منصة SaaS مرتبة من أول دخول حتى الاستخدام اليومي",
              description: "هذا النوع من المشاريع أتعامل معه كمنتج متكامل: توضيح القيمة، تنظيم الرحلة، وبناء واجهات تساعد المستخدم يفهم النظام ويتبناه بسرعة.",
              badges: ["Product UI", "User Flows", "SaaS", "Scalable Structure"],
              images: [
                { src: "/poster-1.png", alt: "مشروع منصة SaaS" },
                { src: "/poster-1-og.jpg", alt: "واجهة منصة SaaS" },
                { src: "/anas-preview.png", alt: "تفاصيل تجربة منصة SaaS" },
              ],
            },
            {
              tag: "لوحات التحكم",
              title: "لوحات تحكم تحول البيانات إلى قرارات واضحة",
              description: "أركز هنا على تبسيط الأرقام والمؤشرات وتحويلها إلى واجهات واضحة بصرياً حتى تكون المتابعة اليومية أسرع واتخاذ القرار أسهل.",
              badges: ["Dashboards", "Analytics", "Data UX", "Admin Experience"],
              images: [
                { src: "/poster-2.png", alt: "مشروع لوحة بيانات" },
                { src: "/poster-2-og.jpg", alt: "واجهة لوحة بيانات" },
                { src: "/memory-decay-curves.png", alt: "تصور بيانات داخل لوحة معلومات" },
              ],
            },
            {
              tag: "الصفحات التسويقية",
              title: "صفحات تسويقية توصل الفكرة بسرعة وتزيد التحويل",
              description: "هذه المشاريع تهدف إلى تقديم المنتج أو الخدمة بشكل واضح ومقنع، مع اهتمام كبير بالرسائل، الترتيب، وتجربة التصفح على كل الأجهزة.",
              badges: ["Landing Pages", "Messaging", "Conversion", "Responsive UI"],
              images: [
                { src: "/Poster 1.png", alt: "مشروع صفحة تسويقية" },
                { src: "/poster 2.png", alt: "قسم إضافي في صفحة تسويقية" },
                { src: "/Anas Preview.png", alt: "معاينة صفحة هبوط" },
              ],
            },
            {
              tag: "الأنظمة الداخلية",
              title: "أنظمة داخلية مخصصة تقلل التعقيد التشغيلي",
              description: "أبني أنظمة مخصصة حسب طريقة عمل الفريق، تربط بين البيانات والمهام والأتمتة حتى تقلل الجهد اليدوي وتزيد الوضوح في التشغيل.",
              badges: ["Internal Tools", "Automation", "Business Systems", "Custom Workflows"],
              images: [
                { src: "/poster 2.png", alt: "مشروع نظام داخلي" },
                { src: "/images/business-card.png", alt: "واجهة نظام أعمال" },
                { src: "/memory-network-graph.png", alt: "تصور بصري داخل نظام بيانات" },
              ],
            },
          ],
        }
      : {
          projects: [
            {
              tag: "SaaS Platform",
              title: "A SaaS platform shaped for clarity and long-term use",
              description: "For this kind of project, I treat the whole experience like a real product: clarify the value, organize the journey, and make adoption feel natural.",
              badges: ["Product UI", "User Flows", "SaaS", "Scalable Structure"],
              images: [
                { src: "/poster-1.png", alt: "SaaS platform project" },
                { src: "/poster-1-og.jpg", alt: "SaaS platform interface" },
                { src: "/anas-preview.png", alt: "SaaS experience details" },
              ],
            },
            {
              tag: "Dashboards",
              title: "Dashboards that turn complexity into direction",
              description: "Here the goal is to simplify metrics and reporting into interfaces that help teams monitor performance and make decisions faster.",
              badges: ["Dashboards", "Analytics", "Data UX", "Admin Experience"],
              images: [
                { src: "/poster-2.png", alt: "Dashboard project" },
                { src: "/poster-2-og.jpg", alt: "Dashboard interface" },
                { src: "/memory-decay-curves-en.png", alt: "Data visualization inside dashboard" },
              ],
            },
            {
              tag: "Marketing Pages",
              title: "Marketing pages that explain the product fast",
              description: "These projects focus on communicating the offer clearly, supporting launches, and improving conversion through structure and messaging.",
              badges: ["Landing Pages", "Messaging", "Conversion", "Responsive UI"],
              images: [
                { src: "/Poster 1.png", alt: "Marketing page project" },
                { src: "/poster 2.png", alt: "Secondary marketing page section" },
                { src: "/Anas Preview.png", alt: "Landing page preview" },
              ],
            },
            {
              tag: "Internal Systems",
              title: "Internal systems that reduce operational friction",
              description: "I build custom internal tools around the way teams actually work, connecting workflows, data, and automation in a practical system.",
              badges: ["Internal Tools", "Automation", "Business Systems", "Custom Workflows"],
              images: [
                { src: "/poster 2.png", alt: "Internal system project" },
                { src: "/images/business-card.png", alt: "Business system interface" },
                { src: "/memory-network-graph-en.png", alt: "Visual data system graphic" },
              ],
            },
          ],
        }
  const testimonialCta =
    lang === "ar"
      ? {
          quoteTag: "رأي عميل",
          quote: "اشتغل أنس معنا بعقلية منتج حقيقية. لم يكتفِ بالتنفيذ، بل ساعدنا نحسّن الفكرة نفسها ونطلق بشكل أوضح وأسرع.",
          author: "عميل سابق",
          role: "مؤسس شركة ناشئة",
          avatarSrc: "/images/profile.jpeg",
          avatarAlt: "صورة العميل",
          ctaTitle: "إذا عندك فكرة أو مشروع، خلّينا نبنيه بشكل صح",
          primaryLabel: "تواصل معي",
          primaryHref: "mailto:anashamad1909@gmail.com",
          secondaryLabel: "واتساب",
          secondaryHref: "https://wa.me/962790453103",
        }
      : {
          quoteTag: "Client Feedback",
          quote: "Anas worked with real product thinking. He did not just execute, he helped improve the idea itself and made the launch clearer and faster.",
          author: "Past Client",
          role: "Startup Founder",
          avatarSrc: "/images/profile.jpeg",
          avatarAlt: "Client avatar",
          ctaTitle: "If you have an idea or product in mind, let's build it properly",
          primaryLabel: "Contact Me",
          primaryHref: "mailto:anashamad1909@gmail.com",
          secondaryLabel: "WhatsApp",
          secondaryHref: "https://wa.me/962790453103",
        }

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSON_NAME_EN,
    alternateName: [PERSON_NAME_AR, PERSON_NAME_AR_STYLED, dict.header.name],
    url: absUrl(`/${lang}/build`),
    image: absUrl("/anas logo.png"),
    jobTitle: role,
    sameAs: [
      "https://www.linkedin.com/in/anas-hamad1909/",
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
        projectsCard={projectsCard}
        testimonialCta={testimonialCta}
      />
    </>
  )
}
