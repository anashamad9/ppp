import type { Metadata } from 'next'
import Home from '../../../(marketing)/(home)/home-page'
import type { IconName } from 'tech-stack-icons'

const artProjectCards = [
  {
    badge: 'المشروع 1',
    title: 'عرض المكونات والبلوكات',
    subtitle: 'كل بلوك، كل تفصيلة، كل بكسل صُمّم بقصد. معرض حي لمعاييرنا في التصميم وحِرفية الواجهة الأمامية.',
    features: ['تصميم واجهات', 'مكتبة مكونات', 'حِرفة الواجهة الأمامية'],
    betweenParagraph:
      'هذا العرض هو غوص عميق في حِرفة تصميم الواجهات، ويضم مجموعة منتقاة من المكونات والبلوكات عالية الدقة المبنية بعناية وقصد. كل عنصر هنا صُمم من الصفر، ليدفع حدود تصميم الواجهات الحديثة من خلال اهتمام دقيق بالمسافات، والطباعة، والألوان، وأنماط التفاعل.\n\nمن عروض البيانات المعقدة إلى بلوكات التنقل الأنيقة، كل جزء يعكس هوسنا بالجودة والتزامنا ببناء أشياء تجمع بين الوظيفة والانطباع البصري القوي. هذا ليس مجرد معرض، بل عرض حي لطريقة تفكيرنا، وطريقة بنائنا، والمعيار الذي نلتزم به في كل مشروع نعمل عليه.',
    images: [
      { src: '/projects-art/project1/6yGQMdg66A5PNcRRKpbqodw9juQ.jpg', alt: 'Components and blocks showcase preview 1' },
      { src: '/projects-art/project1/fOwQcsUTL03N19m9uMGnXEeZGw.jpg', alt: 'Components and blocks showcase preview 2' },
      { src: '/projects-art/project1/image%20186.png', alt: 'Components and blocks showcase preview 3' },
      { src: '/projects-art/project1/image%20189.png', alt: 'Components and blocks showcase preview 4' },
      { src: '/projects-art/project1/image%20190.png', alt: 'Components and blocks showcase preview 5' },
      { src: '/projects-art/project1/xPQAg6mZ3uoqiG9z692CJ4ygV7k.jpg', alt: 'Components and blocks showcase preview 6' },
    ],
  },
  {
    badge: 'المشروع 2',
    title: 'صفحات حقيقية، عمل حقيقي',
    subtitle: 'صفحات صممناها وهندسناها لعملاء حقيقيين، مبنية على تقنيات حديثة قابلة للتوسع، عالية الأداء، ومصممة لتدوم.',
    features: ['تطوير متكامل', 'عملاء حقيقيون', 'جاهز للإنتاج'],
    betweenParagraph:
      'كل صفحة في هذا العرض جاءت من منتج حقيقي بنيناه من البداية للنهاية لعملاء حقيقيين، مدعومة بقرارات هندسية قوية وبنية تقنية مختارة بعناية. سواء كانت صفحة هبوط بزيارات عالية أو تطبيق ويب معقد متعدد الطبقات، كل ما تراه هنا صُمم ليؤدي بكفاءة، ويتوسع بثبات، ويتحمل متطلبات الاستخدام الواقعي منذ اليوم الأول.\n\nنحن نهتم بما يشغل التجربة بنفس قدر اهتمامنا بالتجربة نفسها. من الأطر وقواعد البيانات التي نختارها، إلى طريقة بناء الـ API وتحسين الأداء، كل قرار تقني مقصود. هذا هو شكل تطوير الويب الحديث عندما تهتم بما يراه المستخدم وما يعمل في الخلفية بنفس القدر.',
    images: [
      { src: '/projects-art/project2/Group%2096.png', alt: 'معاينة منصة الويب 1' },
      { src: '/projects-art/project2/image%2097.png', alt: 'معاينة منصة الويب 2' },
      { src: '/projects-art/project2/image%2099.png', alt: 'معاينة منصة الويب 3' },
      { src: '/projects-art/project2/image%20102.png', alt: 'معاينة منصة الويب 4' },
      { src: '/projects-art/project2/image%20105.png', alt: 'معاينة منصة الويب 5' },
    ],
  },
  {
    badge: 'المشروع 3',
    title: 'مصمم لمستخدمين حقيقيين',
    subtitle: 'صفحات إنتاجية مبنية لعملاء حقيقيين، حيث تلتقي التقنية القوية مع تجربة مستخدم سلسة تزيد التحويل وتحافظ على المستخدمين.',
    features: ['تطوير متكامل', 'مدفوع بتجربة المستخدم', 'عملاء حقيقيون'],
    betweenParagraph:
      'كل صفحة هنا بُنيت لمنتج حقيقي، وجمهور حقيقي، وأهداف عمل حقيقية. خلف كل واحدة منها بنية تقنية مقصودة تم اختيارها لتقديم السرعة، والاعتمادية، وقابلية التوسع. لكن ما يقود كل قرار، من المعمارية إلى بنية المكونات، هو إحساس المستخدم النهائي أثناء الاستخدام. الأداء هنا ليس مجرد رقم تقني، بل جزء أساسي من التجربة.\n\nنحن نؤمن أن التقنية الممتازة يجب أن تكون غير مرئية للمستخدم. كلما كان التحميل أسرع، والتفاعل أنعم، والتدفق أوضح، زادت احتمالية بقاء المستخدم وتفاعله وعودته. كل مشروع في هذا العرض هو نتيجة تعاون حقيقي بين الهندسة وتصميم التجربة، لأن أحدهما وحده لا يكفي.',
    images: [
      { src: '/projects-art/projects%203/GpsLNHSWcAAPPhz%201.png', alt: 'معاينة النظام المؤسسي 1' },
      { src: '/projects-art/projects%203/image%2093.png', alt: 'معاينة النظام المؤسسي 2' },
      { src: '/projects-art/projects%203/image%2097.png', alt: 'معاينة النظام المؤسسي 3' },
      { src: '/projects-art/projects%203/image%2098.png', alt: 'معاينة النظام المؤسسي 4' },
      { src: '/projects-art/projects%203/image%20104.png', alt: 'معاينة النظام المؤسسي 5' },
      { src: '/projects-art/projects%203/image%20192.png', alt: 'معاينة النظام المؤسسي 6' },
      { src: '/projects-art/projects%203/image%20195.png', alt: 'معاينة النظام المؤسسي 7' },
    ],
  },
]

const artTechStackIcons: IconName[] = [
  'python',
  'nextjs',
  'react',
  'tailwindcss',
  'nodejs',
  'github',
  'django',
  'flask',
  'supabase',
  'postgresql',
]

const artClientAvatars = [
  { src: '/new%20clients/Ehab%20Mousa.jpg', fallback: 'EM', name: 'Ehab Mousa' },
  { src: '/new%20clients/Randa%20mitwalli.webp', fallback: 'RA', name: 'Randa' },
  { src: '/new%20clients/Yazan%20Al%20billeh.jpeg', fallback: 'YA', name: 'Yazan Albilleh' },
]

const artIntroParagraphs = [
  'نحن أكثر من مجرد مختبر لتقنيات الذكاء الاصطناعي. نحن فريق من البنّائين والمفكرين والمصممين الشغوفين، نؤمن أن التقنية المتقدمة يجب أن تبدو مبهرة بقدر كفاءتها. من الأنظمة الذكية إلى المنتجات الرقمية القوية، نصنع حلولًا تدفع حدود الممكن في مشهد تقني سريع التطور.',
  'تخصصنا هو بناء تطبيقات ومواقع حديثة لا تعمل بشكل ممتاز فقط، بل تنبض بالحياة. نحن مهووسون بتصميم متجدد واستشرافي يجذب الانتباه ويحافظ على عودة المستخدمين. كل بكسل، وكل تفاعل، وكل سطر كود يأتي بقصد، لأننا نؤمن أن التقنية العظيمة تستحق تجربة عظيمة توازيها.',
]

const siteName = 'أتمت تيكنولوجيس'
const title = 'أتمت تيكنولوجيس: التطبيقات والمواقع | أتمت تيكنولوجيس'
const description =
  'صفحة أتمت تيكنولوجيس للتطبيقات والمواقع، لتصميم وتطوير منتجات رقمية مخصصة بنتائج عملية قابلة للقياس.'
const shareImage = '/art arabic.png'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/ar/our-work/apps-websites',
    languages: {
      en: '/our-work/apps-websites',
      ar: '/ar/our-work/apps-websites',
      'x-default': '/our-work/apps-websites',
    },
  },
  openGraph: {
    type: 'website',
    url: '/ar/our-work/apps-websites',
    siteName,
    title,
    description,
    images: [
      {
        url: shareImage,
        width: 3624,
        height: 1345,
        alt: 'أتمت تيكنولوجيس - التطبيقات والمواقع',
      },
    ],
    locale: 'ar_JO',
    alternateLocale: ['en_US'],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [shareImage],
  },
}

export default function ArabicAppsWebsitesPage() {
  return (
    <Home
      initialLanguage="ar"
      showHeroImage={false}
      showTestimonials={false}
      showTopNav={false}
      brandTitleOverride="أتمت تيكنولوجيس"
      brandSubtitleOverride="التطبيقات ومواقع الويب"
      showClientAvatarStrip={true}
      clientAvatarItems={artClientAvatars}
      logoPrimarySrc="/Atmet%20Technologies%20logo.png"
      logoSecondarySrc="/Atmet%20technogloes%20white.png"
      stackShowcaseContentTop={true}
      showServicesButton={false}
      techStackIcons={artTechStackIcons}
      heroHeadingOverride="نحن لا نبني تقنيات ذكاء اصطناعي فقط، بل نبني تطبيقات موبايل، وتطبيقات ويب، ومواقع، وأنظمة كبيرة وفق أحدث مبادئ التصميم وأفضل البنى التقنية."
      introParagraphsOverride={artIntroParagraphs}
      showcaseProjectCardsOverride={artProjectCards}
      ctaHeadlineOverride="جاهز لبناء مشروعك؟"
      ctaDescriptionOverride="نصمم ونبني تطبيقات موبايل، وتطبيقات ويب، ومواقع، وأنظمة قابلة للتوسع تناسب أهدافك، بتنفيذ واضح ونتائج قابلة للقياس."
    />
  )
}
