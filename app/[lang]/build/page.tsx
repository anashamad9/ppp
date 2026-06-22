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
  }
}

export default async function BuildPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: langParam } = await params
  const lang = langParam as Locale
  const siteUrl = await getRequestSiteUrl()
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
            title: "منتجات وتطبيقات ومواقع حديثة مبنية بعناية",
            description: "أبني منتجات وتطبيقات ومواقع حديثة تبدو متقنة ومفيدة وجاهزة للاستخدام في العالم الحقيقي.",
            badges: ["مواقع تسويقية", "صفحات علامة تجارية", "واجهة متجاوبة", "جاهز لـ SEO"],
            imageSrc: "/first-card/First image.png",
            imageAlt: "معاينة موقع ويب",
          },
          {
            tag: "لوحات تحكم",
            title: "تفاصيل صغيرة، تصميم نظيف، ونتائج أفضل",
            description: "أركّز على التفاصيل الصغيرة وأحافظ على نظافة التصميم حتى تبدو كل شاشة مقصودة وسهلة الاستخدام.",
            badges: ["لوحات تحكم", "تحليلات", "لوحات إدارة", "تقارير"],
            imageSrc: "/first-card/second image.jpg",
            imageAlt: "معاينة لوحة تحكم",
          },
          {
            tag: "تطبيقات",
            title: "تطبيقات ويب وموبايل مبنية للاستخدام الحقيقي",
            description: "من الفكرة إلى الإطلاق، أركز على بناء تطبيقات عملية قابلة للتوسع وسهلة الاستخدام للمستخدم النهائي.",
            badges: ["Web Apps", "Mobile UX", "MVPs", "Scalable Flows"],
            imageSrc: "/projects/project%204/onqoud%201.png",
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
            imageSrc: "/projects/project%204/onqoud%201.png",
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
          "خلال السنوات الماضية، عملت على منتجات في مجالات <u>الذكاء الاصطناعي</u>، <u>تحليل البيانات</u>، <u>الأتمتة</u>، و<u>ذكاء الأعمال</u>. أسلوبي يجمع بين <u>الخبرة التقنية</u> و<u>التفكير المنتجّي</u>، حتى يكون كل مشروع ليس فقط مبنياً بشكل ممتاز، بل أيضاً متوافقاً مع أهداف العمل واحتياجات المستخدمين. سواء كان المشروع <u>MVP لشركة ناشئة</u>، أو <u>لوحة تحكم لشركة</u>، أو <u>حل برمجي مخصص</u>، فأنا أركز على بناء منتجات عملية، قابلة للتوسع، وجاهزة للاستخدام في العالم الحقيقي.",
        ]
      : [
          "I'm a <u>Developer</u> and <u>Product Builder</u> who helps [icon:startup]<u>startups</u>, [icon:freelancer]<u>freelancers</u>, [icon:business]<u>businesses</u>, and [icon:entrepreneur]<u>entrepreneurs</u> turn ideas into <u>real digital products</u>. I design and develop <u>websites</u>, <u>web applications</u>, <u>mobile apps</u>, <u>SaaS platforms</u>, <u>dashboards</u>, and <u>custom business systems</u> that are built to solve real problems and create measurable value. From planning and user experience design to development, deployment, and scaling, I enjoy transforming complex requirements into simple, reliable, and easy-to-use solutions.",
          "Over the years, I have worked on products across <u>AI</u>, <u>data analytics</u>, <u>automation</u>, and <u>business intelligence</u>. My approach combines <u>technical expertise</u> with <u>product thinking</u>, ensuring that every project is not only well-built but also aligned with business goals and user needs. Whether it's a <u>startup MVP</u>, a <u>company dashboard</u>, or a <u>custom software solution</u>, I focus on building products that are practical, scalable, and ready for real-world use.",
        ]
  const projectsCard =
    lang === "ar"
      ? {
          projects: [
            {
              tag: "أتمت",
              title: "أتمت",
              description: "وكيل أتمتة ذكاء اصطناعي يعمل كمساعد ذكي يخفف المهام المتكررة ويزيد سرعة تنفيذ العمل اليومي.",
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
              description: "منصة وتطبيق لإنشاء المستندات القانونية بالذكاء الاصطناعي، مع تجربة واضحة وسريعة تساعد على إعداد العقود بشكل أسهل.",
              badges: ["AI Legal Docs", "App Development", "Automation", "Product Development"],
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
              description: "منصة تربط الأطباء مع مختبرات الأسنان بشكل أبسط وأكثر وضوحاً، وتساعد على تنظيم الطلبات والتواصل بين الطرفين.",
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
              description: "منصة ذكاء أعمال للمطاعم والمقاهي تساعد على فهم الأداء واتخاذ قرارات أفضل باستخدام بيانات واضحة ولوحات لحظية.",
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
              description: "منصة تربط الأطباء مع مختبرات الأسنان بشكل أبسط وأكثر وضوحاً، وتساعد على تنظيم الطلبات والتواصل بين الطرفين.",
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
              description: "منصة ذكاء أعمال للمطاعم والمقاهي تساعد على فهم الأداء واتخاذ قرارات أفضل باستخدام بيانات واضحة ولوحات لحظية.",
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
              description: "An AI automation coworker agent that handles repetitive work and helps teams move faster with less manual effort.",
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
              description: "A platform and app for generating AI-powered legal documents with a simple flow that makes contract creation faster and easier.",
              badges: ["AI Legal Docs", "App Development", "Automation", "Product Development"],
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
              description: "A platform that connects doctors with dental labs and makes requests, coordination, and communication much easier.",
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
              description: "A business intelligence platform for restaurants and cafes that helps teams understand performance and make better decisions with clear data and live dashboards.",
              badges: ["Website Development", "Product Development", "Real-time Dashboards", "Landing Page"],
              images: [
                { src: "/projects/project%204/onqoud%201.png", alt: "A screenshot from Onqoud and the business intelligence platform experience." },
                { src: "/projects/project%204/onqoud%202.png", alt: "Another Onqoud screen showing how data is presented in the product." },
                { src: "/projects/project%204/onqoud%203.png", alt: "Details from an internal page or dashboard inside Onqoud." },
                { src: "/projects/project%204/onqoud%204.png", alt: "A final Onqoud screenshot showing the project and user experience." },
              ],
            },
            {
              tag: "Landing pages",
              title: "Landing pages",
              description: "A platform that connects doctors with dental labs and makes requests, coordination, and communication much easier.",
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
              description: "A business intelligence platform for restaurants and cafes that helps teams understand performance and make better decisions with clear data and live dashboards.",
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
          primaryHref: "mailto:anashamad1909@gmail.com",
          secondaryLabel: "واتساب",
          secondaryHref: "https://wa.me/962790453103",
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
          primaryHref: "mailto:anashamad1909@gmail.com",
          secondaryLabel: "WhatsApp",
          secondaryHref: "https://wa.me/962790453103",
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
        showArticleFooter
      />
    </>
  )
}
