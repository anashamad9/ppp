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
          {
            tag: "تطوير المواقع والتطبيقات",
            title: "مواقع وتطبيقات سريعة وموثوقة",
            description: "أبني مواقع وتطبيقات سريعة وموثوقة ومصممة حول الطريقة التي يستخدمها الناس فعلاً.",
            badges: ["Websites", "Apps", "Reliable Builds", "User-Focused UX"],
            imageSrc: "/first-card/5th image.png",
            imageAlt: "معاينة تطوير المواقع والتطبيقات",
          },
        ]
      : [
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
          {
            tag: "Website & App Development",
            title: "Fast, reliable websites and applications",
            description: "Fast, reliable websites and applications designed around how people actually use them.",
            badges: ["Websites", "Apps", "Reliable Builds", "User-Focused UX"],
            imageSrc: "/first-card/5th image.png",
            imageAlt: "Website and app development showcase preview",
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
        projectsCard={projectsCard}
        testimonialCta={testimonialCta}
      />
    </>
  )
}
