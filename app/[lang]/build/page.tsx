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
  const image = isArabic ? "/Arabic%20Anas%20Hamad.png" : "/English%20Anas%20Hamad.png"
  const avatarImage = "/Anas%20Hamad.png"

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
        "x-default": "/ar/build",
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
      icon: avatarImage,
      shortcut: avatarImage,
      apple: avatarImage,
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
  const buildTechStack = [
    {
      category: "Build Stack",
      items: [
        { name: "Python", logo: "https://cdn.simpleicons.org/python", url: "https://www.python.org/" },
        { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs", url: "https://nextjs.org/" },
        { name: "Figma", logo: "https://cdn.simpleicons.org/figma", url: "https://www.figma.com/" },
        { name: "Supabase", logo: "https://cdn.simpleicons.org/supabase", url: "https://supabase.com/" },
        { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs", url: "https://nodejs.org/" },
        { name: "GitHub", logo: "https://cdn.simpleicons.org/github", url: "https://github.com/" },
        { name: "GitLab", logo: "https://cdn.simpleicons.org/gitlab", url: "https://gitlab.com/" },
        { name: "Flask", logo: "https://cdn.simpleicons.org/flask", url: "https://flask.palletsprojects.com/" },
        { name: "React", logo: "https://cdn.simpleicons.org/react", url: "https://react.dev/" },
        { name: "PyTorch", logo: "https://cdn.simpleicons.org/pytorch", url: "https://pytorch.org/" },
        { name: "Hugging Face", logo: "https://cdn.simpleicons.org/huggingface", url: "https://huggingface.co/" },
        { name: "Tailwind", logo: "https://cdn.simpleicons.org/tailwindcss", url: "https://tailwindcss.com/" },
        { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript", url: "https://www.typescriptlang.org/" },
        { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql", url: "https://www.postgresql.org/" },
        { name: "Docker", logo: "https://cdn.simpleicons.org/docker", url: "https://www.docker.com/" },
        { name: "OpenAI", logo: "/openai-mark.svg", url: "https://openai.com/" },
        { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi", url: "https://fastapi.tiangolo.com/" },
        { name: "LangChain", logo: "https://cdn.simpleicons.org/langchain", url: "https://www.langchain.com/" },
      ],
    },
  ]
  const showcaseSlides =
    lang === "ar"
      ? [
          {
            tag: "كل ما يحتاجه المنتج",
            title: "من الفكرة الأولى إلى الذكاء الذي يقف خلفها.",
            description: "لا أتعامل مع التصميم والتطوير والذكاء الاصطناعي كخدمات منفصلة تُجمع في نهاية المشروع. أبني المنتج كتجربة واحدة متكاملة: من فهم المشكلة وتصميم طريقة استخدامها، إلى تطوير بنيته وبناء الأنظمة الذكية التي تمنحه قدراته الحقيقية.",
            badges: ["استراتيجية المنتج", "تصميم تجربة المستخدم", "التطوير", "أنظمة الذكاء الاصطناعي"],
            imageSrc: "/first-card/5th image.png",
            imageAlt: "معاينة لتجربة منتج رقمية متكاملة",
          },
          {
            tag: "التفكير في المنتج",
            title: "نبدأ بما يجب أن يحققه المنتج، لا بما يمكن للتقنية أن تفعله.",
            description: "أفهم المشكلة، والمستخدم، وسياق العمل، ثم أحدد المزايا والمسارات التي تستحق أن تُبنى. لأن أفضل المنتجات لا تبدأ بقائمة طويلة من الخصائص، بل برؤية واضحة لما يجب أن يصبح أبسط أو أسرع أو أكثر فائدة.",
            badges: ["تحديد المشكلة", "احتياجات المستخدم", "نطاق المزايا", "خارطة طريق المنتج"],
            imageSrc: "/first-card/second image.jpg",
            imageAlt: "معاينة توضح التفكير في المنتج وتخطيط التجربة",
          },
          {
            tag: "تصميم التجربة والواجهات",
            title: "تجربة واضحة، حتى عندما تكون التقنية خلفها معقدة.",
            description: "أصمم تدفقات وواجهات تجعل استخدام المنتج طبيعياً ومفهوماً، سواء كان موقعاً، تطبيقاً، لوحة تحكم، أو منتجاً يعتمد على المحادثة والذكاء الاصطناعي. التحدي ليس فقط أن تعمل التقنية، بل أن يعرف المستخدم كيف يستفيد منها دون أن يشعر بتعقيدها.",
            badges: ["مسارات تجربة المستخدم", "تصميم الواجهات", "لوحات التحكم", "تجربة المحادثة"],
            imageSrc: "/projects/project%202/com1.png",
            imageAlt: "معاينة لتصميم التجربة والواجهات",
          },
          {
            tag: "تطوير المنتجات الرقمية",
            title: "منتج حقيقي، لا مجرد نموذج تجريبي.",
            description: "أحوّل الفكرة والتصميم إلى مواقع، تطبيقات، ومنصات متكاملة: سريعة، موثوقة، وقابلة للتوسع. مع اهتمام بالبنية، والأداء، والتكاملات، والتفاصيل التي تجعل المنتج جاهزاً للاستخدام الفعلي والنمو.",
            badges: ["تطبيقات الويب", "المنصات", "التكاملات", "بنية قابلة للتوسع"],
            imageSrc: "/projects/Project%201/Atmet%201.png",
            imageAlt: "معاينة لتطوير منتج رقمي قابل للتوسع",
          },
          {
            tag: "هندسة منتجات الذكاء الاصطناعي",
            title: "لا أضيف الذكاء الاصطناعي إلى المنتج، بل أصمم كيف يصبح جزءاً منه.",
            description: "أبني منتجات وتجارب تعتمد على النماذج اللغوية الكبيرة مثل المساعدين الذكيين، ومنتجات المحادثة، وأنظمة البحث والاسترجاع، والأدوات التي تفهم المحتوى وتولده أو تحلله. ويشمل عملي اختيار النموذج المناسب، وتصميم المحادثة، وبناء السياق والذاكرة، وربط النموذج ببيانات المنتج وأدواته، ثم تحسين دقة المخرجات وسرعتها وتكلفتها.",
            badges: ["النماذج اللغوية", "الاسترجاع المعزز", "الذاكرة", "تكامل النماذج"],
            imageSrc: "/first-card/4th image.avif",
            imageAlt: "معاينة لهندسة منتجات الذكاء الاصطناعي",
          },
          {
            tag: "وكلاء الذكاء الاصطناعي والأتمتة",
            title: "أنظمة لا تكتفي بالإجابة، بل تنفذ العمل.",
            description: "أصمم وكلاء ذكاء اصطناعي يستطيعون استخدام الأدوات، واتخاذ خطوات متعددة، والتعامل مع البيانات والأنظمة المختلفة لإنجاز مهام حقيقية. سواء كان الهدف أتمتة العمليات الداخلية، معالجة الطلبات، تحليل البيانات، خدمة العملاء، أو ربط عدة أنظمة في مسار عمل واحد، أبني الأتمتة بحيث تكون مفهومة، قابلة للمراقبة، وموثوقة في الاستخدام اليومي.",
            badges: ["وكلاء الذكاء الاصطناعي", "الأتمتة", "استخدام الأدوات", "أنظمة سير العمل"],
            imageSrc: "/first-card/second image.jpg",
            imageAlt: "معاينة لوكلاء الذكاء الاصطناعي وأنظمة الأتمتة",
          },
        ]
      : [
          {
            tag: "Everything a product needs",
            title: "From the first idea to the intelligence behind it.",
            description: "I do not treat design, development, and AI as separate services that get assembled at the end of a project. I build the product as one complete experience: from understanding the problem and designing how it should be used, to developing its structure and building the intelligent systems that give it real capabilities.",
            badges: ["Product Strategy", "UX Design", "Development", "AI Systems"],
            imageSrc: "/first-card/5th image.png",
            imageAlt: "Integrated digital product experience preview",
          },
          {
            tag: "Product thinking",
            title: "We start with what the product needs to achieve, not what the technology can do.",
            description: "I understand the problem, the user, and the business context, then define the features and paths that are actually worth building. The best products do not start with a long list of capabilities. They start with a clear view of what should become simpler, faster, or more useful.",
            badges: ["Problem Framing", "User Needs", "Feature Scope", "Product Roadmap"],
            imageSrc: "/first-card/second image.jpg",
            imageAlt: "Product thinking and experience planning preview",
          },
          {
            tag: "UX and interface design",
            title: "A clear experience, even when the technology behind it is complex.",
            description: "I design flows and interfaces that make the product feel natural and understandable, whether it is a website, an application, a dashboard, or a product built around conversation and AI. The challenge is not only making the technology work, but making sure users know how to benefit from it without feeling its complexity.",
            badges: ["UX Flows", "Interface Design", "Dashboards", "Conversation UX"],
            imageSrc: "/projects/project%202/com1.png",
            imageAlt: "UX and interface design preview",
          },
          {
            tag: "Digital product development",
            title: "A real product, not just a prototype.",
            description: "I turn ideas and designs into websites, applications, and complete platforms that are fast, reliable, and scalable. I care about architecture, performance, integrations, and the details that make a product ready for real use and long-term growth.",
            badges: ["Web Apps", "Platforms", "Integrations", "Scalable Architecture"],
            imageSrc: "/projects/Project%201/Atmet%201.png",
            imageAlt: "Scalable digital product development preview",
          },
          {
            tag: "AI Products Engineering",
            title: "I do not add AI to a product. I design how it becomes part of it.",
            description: "I build products and experiences powered by large language models, including intelligent assistants, conversational products, retrieval and search systems, and tools that understand, generate, or analyze content. My work includes choosing the right model, designing the conversation, building context and memory, connecting the model to product data and tools, then improving output accuracy, speed, and cost.",
            badges: ["LLMs", "RAG", "Memory", "Model Integration"],
            imageSrc: "/first-card/4th image.avif",
            imageAlt: "AI product engineering preview",
          },
          {
            tag: "AI agents and automation",
            title: "Systems that do not just answer, but execute the work.",
            description: "I design AI agents that can use tools, take multiple steps, and work with data and different systems to complete real tasks. Whether the goal is automating internal operations, processing requests, analyzing data, supporting customers, or connecting several systems into one workflow, I build automation that is understandable, observable, and reliable in daily use.",
            badges: ["AI Agents", "Automation", "Tool Use", "Workflow Systems"],
            imageSrc: "/first-card/second image.jpg",
            imageAlt: "AI agents and automation systems preview",
          },
        ]
  const description =
    lang === "ar"
      ? [
          "أؤمن أن <u>صناعة البرمجيات</u> لا تتعلق فقط ببناء شيء يعمل، بل بصناعة تجربة واضحة، متوازنة، ومصممة بوعي. فالمنتج الجيد لا يُقاس بعدد المزايا التي يحتويها، ولا بمدى تعقيد التقنية المستخدمة فيه، بل بقدرته على حل المشكلة ببساطة، وتقديم <u>قيمة حقيقية</u> لمن يستخدمه.",
          "هذا المستوى من الجودة ليس شيئًا يسهل وصفه أو اختزاله في أرقام ومؤشرات. لكنه يظهر في التفاصيل الصغيرة؛ في وضوح الخطوات، وسهولة الاستخدام، وسرعة الوصول إلى ما يحتاجه المستخدم. ويجعلك تشعر بأن كل قرار اتُخذ بعناية، وأن من بنى هذا المنتج كان يحترم وقتك، وتركيزك، واحتياجاتك.",
          "لهذا لا أبدأ المشروع من الواجهة أو الكود، بل من فهم الفكرة، والمستخدم، والهدف الذي يجب أن يحققه المنتج. أعمل مع الشركات ورواد الأعمال وأصحاب الأفكار لتحويل احتياجاتهم إلى <u>مواقع</u>، <u>تطبيقات</u>، ومنتجات رقمية تجمع بين تجربة استخدام واضحة، وتصميم متوازن، وتطوير موثوق، وبنية قادرة على النمو مع تطور المشروع.",
          "<u>من الفكرة والاستراتيجية، إلى التصميم والتطوير والإطلاق.</u>",
        ]
      : [
          "I believe <u>software development</u> is not only about building something that works. It is about creating an experience that is clear, balanced, and designed with intention. A good product is not measured by the number of features it has, or by how complex the technology behind it is, but by its ability to solve a problem simply and deliver <u>real value</u> to the people who use it.",
          "This level of quality is not easy to describe or reduce to numbers and metrics. But it shows up in the small details: clear steps, ease of use, and how quickly users can reach what they need. It makes you feel that every decision was made carefully, and that the person who built the product respected your time, focus, and needs.",
          "That is why I do not start a project from the interface or the code. I start by understanding the idea, the user, and the goal the product needs to achieve. I work with companies, founders, and people with ideas to turn their needs into <u>websites</u>, <u>applications</u>, and digital products that combine clear user experience, balanced design, reliable development, and a structure that can grow as the project evolves.",
          "<u>From idea and strategy, to design, development, and launch.</u>",
        ]
  const impactCards =
    lang === "ar"
      ? [
          {
            metric: "+20",
            label: "منتجات رقمية",
            title: "تصميم وتطوير منتجات متكاملة",
            description: "صممت وطورت منتجات متكاملة تشمل التجربة، والواجهة، والبنية التقنية التي تعمل خلفها.",
          },
          {
            metric: "80%",
            label: "استجابة ذاتية",
            title: "مساعدون يجيبون دون تدخل بشري",
            description: "مساعدون يعتمدون على النماذج اللغوية وبيانات المنتج لتقديم إجابات دقيقة دون تدخل بشري.",
          },
          {
            metric: "95%",
            label: "أتمتة",
            title: "أتمتة وفّرت أكثر من أربع ساعات يومياً",
            description: "تحويل عملية تشغيلية متكررة إلى نظام مؤتمت وفّر أكثر من أربع ساعات يومياً لأحد العملاء.",
          },
        ]
      : [
          {
            metric: "+20",
            label: "digital products",
            title: "Designed and developed complete products",
            description: "Designed and developed complete products covering the experience, the interface, and the technical structure behind them.",
          },
          {
            metric: "80%",
            label: "self-service response",
            title: "Assistants that answer without human intervention",
            description: "Assistants powered by language models and product data to provide accurate answers without human intervention.",
          },
          {
            metric: "95%",
            label: "automation",
            title: "Automation that saved more than four hours a day",
            description: "Turned a repetitive operational process into an automated system that saved one client more than four hours every day.",
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
              badges: ["أتمتة الذكاء الاصطناعي", "تصميم الوكلاء", "أنظمة سير العمل", "تطوير المنتجات"],
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
              badges: ["مكونات الواجهة", "تصميم المنتجات", "أنظمة التصميم", "تفاصيل التفاعل"],
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
              badges: ["تصميم المنصات", "سوق إلكتروني", "تجربة الرعاية الصحية", "تطوير المنتجات"],
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
              badges: ["تطوير المواقع", "تطوير المنتجات", "لوحات تحكم لحظية", "صفحة هبوط"],
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
              badges: ["تصميم المنصات", "سوق إلكتروني", "تجربة الرعاية الصحية", "تطوير المنتجات"],
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
              badges: ["تطوير المواقع", "تطوير المنتجات", "لوحات تحكم لحظية", "صفحة هبوط"],
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
    image: `${siteUrl}/Anas%20Hamad.png`,
    jobTitle: role,
    sameAs: [
      "https://x.com/buildanas?s=11&t=xHJPYPOInZK-SWRzKy7yWA",
      "https://www.instagram.com/buildanas?igsh=MW9lc2ltaWI3dTc0ZQ%3D%3D&utm_source=qr",
      "https://www.linkedin.com/in/anas-hamad1909",
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
        avatarSrc="/Anas%20Hamad.png"
        hideExperience
        topTags={topTags}
        description={description}
        secondaryActionLabel={lang === "ar" ? "الأعمال" : "Portfolio"}
        secondaryActionTargetId="#projects"
        secondaryActionIcon="eye"
        showcaseSlides={showcaseSlides}
        impactCards={impactCards}
        techStack={buildTechStack}
        compactTechStackCard
        projectsCard={projectsCard}
        testimonialCta={testimonialCta}
      />
    </>
  )
}
