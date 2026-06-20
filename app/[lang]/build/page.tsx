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
            imageSrc: "/first-card/First image.png",
            imageAlt: "معاينة موقع ويب",
          },
          {
            tag: "لوحات تحكم",
            title: "لوحات تحكم تساعدك تشوف الصورة كاملة",
            description: "أبني لوحات معلومات ومنصات داخلية تنظّم البيانات والعمليات بشكل سهل وواضح لاتخاذ قرارات أفضل.",
            badges: ["Dashboards", "Analytics", "Admin Panels", "Reporting"],
            imageSrc: "/first-card/second image.jpg",
            imageAlt: "معاينة لوحة تحكم",
          },
          {
            tag: "تطبيقات",
            title: "تطبيقات ويب وموبايل مبنية للاستخدام الحقيقي",
            description: "من الفكرة إلى الإطلاق، أركز على بناء تطبيقات عملية قابلة للتوسع وسهلة الاستخدام للمستخدم النهائي.",
            badges: ["Web Apps", "Mobile UX", "MVPs", "Scalable Flows"],
            imageSrc: "/first-card/3rd image.png",
            imageAlt: "معاينة تطبيق رقمي",
          },
          {
            tag: "أنظمة",
            title: "أنظمة مخصصة تناسب طريقة عملك",
            description: "أحوّل الاحتياج التجاري إلى نظام واضح يربط بين العمليات والبيانات والأتمتة في مكان واحد.",
            badges: ["Internal Tools", "Automation", "Business Systems", "Custom Workflows"],
            imageSrc: "/first-card/4th image.avif",
            imageAlt: "معاينة نظام أعمال مخصص",
          },
          {
            tag: "منتج",
            title: "تفكير منتجي من أول خطوة إلى التوسّع",
            description: "أشتغل بعقلية Product Builder حتى يكون كل قرار في التصميم والتطوير مرتبطاً بالقيمة الفعلية للمستخدم والعمل.",
            badges: ["Product Strategy", "UX Thinking", "Launch Support", "Growth Ready"],
            imageSrc: "/first-card/5th image.png",
            imageAlt: "معاينة أعمال تطوير المنتجات",
          },
        ]
      : [
          {
            tag: "Website",
            title: "Modern products, apps, and websites built with care",
            description: "I build modern products, apps, and websites that feel polished, useful, and ready for real-world use.",
            badges: ["Marketing Sites", "Brand Pages", "Responsive UI", "SEO Ready"],
            imageSrc: "/first-card/First image.png",
            imageAlt: "Website showcase preview",
          },
          {
            tag: "Dashboards",
            title: "Small details, clean design, better results",
            description: "I focus on the small details and keep the design clean so every screen feels intentional and easy to use.",
            badges: ["Dashboards", "Analytics", "Admin Panels", "Reporting"],
            imageSrc: "/first-card/second image.jpg",
            imageAlt: "Dashboard showcase preview",
          },
          {
            tag: "Apps",
            title: "Modern design principles, strong UI and UX",
            description: "I follow modern design principles and build UI and UX that feel intuitive, polished, and enjoyable to use.",
            badges: ["Web Apps", "Mobile UX", "MVPs", "Scalable Flows"],
            imageSrc: "/first-card/3rd image.png",
            imageAlt: "App showcase preview",
          },
          {
            tag: "Systems",
            title: "From zero to launch, with support after",
            description: "From 0 to launch, I set up everything for you and stay with you after launch so things keep moving smoothly.",
            badges: ["Internal Tools", "Automation", "Business Systems", "Custom Workflows"],
            imageSrc: "/first-card/4th image.avif",
            imageAlt: "Custom system showcase preview",
          },
          {
            tag: "Product",
            title: "The right tech stack for speed and stability",
            description: "I use the best tech stack to keep your project working smoothly, fast, and with fewer bugs.",
            badges: ["Product Strategy", "UX Thinking", "Launch Support", "Growth Ready"],
            imageSrc: "/first-card/5th image.png",
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
              tag: "Onqoud",
              title: "Onqoud",
              description: "منصة ذكاء أعمال للمطاعم والمقاهي تساعد على فهم الأداء واتخاذ قرارات أفضل باستخدام بيانات واضحة ولوحات لحظية.",
              badges: ["Website Development", "Product Development", "Real-time Dashboards", "Landing Page"],
              images: [
                { src: "/poster-1.png", alt: "مشروع منصة SaaS" },
                { src: "/poster-1-og.jpg", alt: "واجهة منصة SaaS" },
                { src: "/anas-preview.png", alt: "تفاصيل تجربة منصة SaaS" },
              ],
            },
            {
              tag: "Atmet",
              title: "Atmet",
              description: "وكيل أتمتة ذكاء اصطناعي يعمل كمساعد ذكي يخفف المهام المتكررة ويزيد سرعة تنفيذ العمل اليومي.",
              badges: ["AI Automation", "Agent Design", "Workflow Systems", "Product Development"],
              images: [
                { src: "/poster-2.png", alt: "مشروع لوحة بيانات" },
                { src: "/poster-2-og.jpg", alt: "واجهة لوحة بيانات" },
                { src: "/memory-decay-curves.png", alt: "تصور بيانات داخل لوحة معلومات" },
              ],
            },
            {
              tag: "Dental Trek",
              title: "Dental Trek",
              description: "منصة تربط الأطباء مع مختبرات الأسنان بشكل أبسط وأكثر وضوحاً، وتساعد على تنظيم الطلبات والتواصل بين الطرفين.",
              badges: ["Platform Design", "Marketplace", "Healthcare UX", "Product Development"],
              images: [
                { src: "/poster-1-alt.png", alt: "مشروع صفحة تسويقية" },
                { src: "/poster-2-alt.png", alt: "قسم إضافي في صفحة تسويقية" },
                { src: "/anas-preview-alt.png", alt: "معاينة صفحة هبوط" },
              ],
            },
            {
              tag: "Contract Generator",
              title: "Contract Generator",
              description: "منصة وتطبيق لإنشاء المستندات القانونية بالذكاء الاصطناعي، مع تجربة واضحة وسريعة تساعد على إعداد العقود بشكل أسهل.",
              badges: ["AI Legal Docs", "App Development", "Automation", "Product Development"],
              images: [
                { src: "/poster-2-alt.png", alt: "مشروع نظام داخلي" },
                { src: "/images/business-card.png", alt: "واجهة نظام أعمال" },
                { src: "/memory-network-graph.png", alt: "تصور بصري داخل نظام بيانات" },
              ],
            },
          ],
        }
      : {
          projects: [
            {
              tag: "Onqoud",
              title: "Onqoud",
              description: "A business intelligence platform for restaurants and cafes that helps teams understand performance and make better decisions with clear data and live dashboards.",
              badges: ["Website Development", "Product Development", "Real-time Dashboards", "Landing Page"],
              images: [
                { src: "/poster-1.png", alt: "SaaS platform project" },
                { src: "/poster-1-og.jpg", alt: "SaaS platform interface" },
                { src: "/anas-preview.png", alt: "SaaS experience details" },
              ],
            },
            {
              tag: "Atmet",
              title: "Atmet",
              description: "An AI automation coworker agent that handles repetitive work and helps teams move faster with less manual effort.",
              badges: ["AI Automation", "Agent Design", "Workflow Systems", "Product Development"],
              images: [
                { src: "/poster-2.png", alt: "Dashboard project" },
                { src: "/poster-2-og.jpg", alt: "Dashboard interface" },
                { src: "/memory-decay-curves-en.png", alt: "Data visualization inside dashboard" },
              ],
            },
            {
              tag: "Dental Trek",
              title: "Dental Trek",
              description: "A platform that connects doctors with dental labs and makes requests, coordination, and communication much easier.",
              badges: ["Platform Design", "Marketplace", "Healthcare UX", "Product Development"],
              images: [
                { src: "/poster-1-alt.png", alt: "Marketing page project" },
                { src: "/poster-2-alt.png", alt: "Secondary marketing page section" },
                { src: "/anas-preview-alt.png", alt: "Landing page preview" },
              ],
            },
            {
              tag: "Contract Generator",
              title: "Contract Generator",
              description: "A platform and app for generating AI-powered legal documents with a simple flow that makes contract creation faster and easier.",
              badges: ["AI Legal Docs", "App Development", "Automation", "Product Development"],
              images: [
                { src: "/poster-2-alt.png", alt: "Internal system project" },
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
    image: absUrl("/anas-logo.png"),
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
