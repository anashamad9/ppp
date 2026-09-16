import type { Metadata } from 'next'
import Home from '../../../(marketing)/(home)/home-page'
import type { IconName } from 'tech-stack-icons'

const artProjectCards = [
  {
    badge: 'Showcase 1',
    title: 'Components & Blocks Showcase',
    subtitle: 'Every block, every detail, every pixel, crafted intentionally. A living gallery of our design standards and frontend craft.',
    features: ['UI Design', 'Component Library', 'Frontend Craft'],
    betweenParagraph:
      "This showcase is a deep dive into the craft of UI design, featuring a curated collection of highly detailed components and blocks built with precision and intention. Every element here was designed from the ground up, pushing the limits of modern interface design through careful attention to spacing, typography, color, and interaction patterns.\n\nFrom complex data displays to sleek navigational blocks, each piece reflects our obsession with quality and our commitment to building things that are both functional and visually striking. This is not just a gallery, it is a living demonstration of how we think, how we build, and the standard we hold ourselves to across every project we touch.",
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
    badge: 'Showcase 2',
    title: 'Real Pages, Real Work',
    subtitle: 'Pages we designed and engineered for real clients, powered by modern tech stacks built to scale, perform, and last.',
    features: ['Full Stack', 'Client Work', 'Production Ready'],
    betweenParagraph:
      "Each page in this showcase comes from a real product we built end to end for real clients, backed by solid engineering decisions and a carefully chosen technology stack. Whether it is a high traffic landing page or a complex multi layered web application, everything here was architected to perform, scale, and handle the demands of real world usage from day one.\n\nWe obsess over what powers the experience just as much as the experience itself. From the frameworks and databases we choose to the way we structure APIs and optimize performance, every technical decision is intentional. This is what modern web development looks like when you care about both what users see and what runs underneath it.",
    images: [
      { src: '/projects-art/project2/Group%2096.png', alt: 'Web platform project preview 1' },
      { src: '/projects-art/project2/image%2097.png', alt: 'Web platform project preview 2' },
      { src: '/projects-art/project2/image%2099.png', alt: 'Web platform project preview 3' },
      { src: '/projects-art/project2/image%20102.png', alt: 'Web platform project preview 4' },
      { src: '/projects-art/project2/image%20105.png', alt: 'Web platform project preview 5' },
    ],
  },
  {
    badge: 'Showcase 3',
    title: 'Crafted for Real Users',
    subtitle: 'Production pages built for real clients, where powerful technology meets seamless user experiences that actually convert and retain.',
    features: ['Full Stack', 'UX Driven', 'Client Work'],
    betweenParagraph:
      'Every page here was built for a real product, a real audience, and real business goals. Behind each one sits a deliberate technology stack chosen to deliver speed, reliability, and scale. But what drives every decision, from architecture to component structure, is how the end user will actually feel using it. Performance is not just a technical metric here, it is a core part of the experience.\n\nWe believe great technology should be invisible to the user. The faster the load, the smoother the interaction, and the more intuitive the flow, the more likely users are to stay, engage, and come back. Every project in this showcase is a result of engineering and experience design working hand in hand, because one without the other is never enough.',
    images: [
      { src: '/projects-art/projects%203/GpsLNHSWcAAPPhz%201.png', alt: 'Enterprise system project preview 1' },
      { src: '/projects-art/projects%203/image%2093.png', alt: 'Enterprise system project preview 2' },
      { src: '/projects-art/projects%203/image%2097.png', alt: 'Enterprise system project preview 3' },
      { src: '/projects-art/projects%203/image%2098.png', alt: 'Enterprise system project preview 4' },
      { src: '/projects-art/projects%203/image%20104.png', alt: 'Enterprise system project preview 5' },
      { src: '/projects-art/projects%203/image%20192.png', alt: 'Enterprise system project preview 6' },
      { src: '/projects-art/projects%203/image%20195.png', alt: 'Enterprise system project preview 7' },
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
  "We are more than just an AI Research & Technologies Lab. We are a team of passionate builders, thinkers, and designers who believe that cutting-edge technology should look just as impressive as it performs. From intelligent systems to powerful digital products, we craft solutions that push the boundaries of what is possible in today's fast-moving tech landscape.",
  "Our specialty lies in building modern applications and websites that do not just function beautifully but feel alive. We are obsessed with trendy, forward-thinking design that captures attention and keeps users coming back. Every pixel, every interaction, and every line of code is intentional because we believe great technology deserves a great experience to match.",
]

const siteName = 'Atmet Technologies'
const title = 'Atmet Technologies: Apps & Websites | Atmet Technologies'
const description =
  'Atmet Technologies for Apps & Websites builds tailored digital products with practical execution and measurable outcomes.'
const shareImage = '/art eng.png'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: '/our-work/apps-websites',
    languages: {
      en: '/our-work/apps-websites',
      ar: '/ar/our-work/apps-websites',
      'x-default': '/our-work/apps-websites',
    },
  },
  openGraph: {
    type: 'website',
    url: '/our-work/apps-websites',
    siteName,
    title,
    description,
    images: [
      {
        url: shareImage,
        width: 3624,
        height: 1345,
        alt: 'Atmet Technologies - Apps & Websites',
      },
    ],
    locale: 'en_US',
    alternateLocale: ['ar_JO'],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [shareImage],
  },
}

export default function EnglishAppsWebsitesPage() {
  return (
    <Home
      initialLanguage="en"
      showHeroImage={false}
      showTestimonials={false}
      brandTitleOverride="Atmet Technologies"
      brandSubtitleOverride="Apps & Web apps"
      showClientAvatarStrip={true}
      clientAvatarItems={artClientAvatars}
      logoPrimarySrc="/Atmet%20Technologies%20logo.png"
      logoSecondarySrc="/Atmet%20technogloes%20white.png"
      stackShowcaseContentTop={true}
      showServicesButton={false}
      techStackIcons={artTechStackIcons}
      heroHeadingOverride="Our core is AI technologies, and on top of that we build modern mobile apps, web apps, and large scale systems with sharp design and a solid technology stack."
      introParagraphsOverride={artIntroParagraphs}
      showcaseProjectCardsOverride={artProjectCards}
      ctaHeadlineOverride="Ready to build your project?"
      ctaDescriptionOverride="We design and ship modern mobile apps, web apps, websites, and scalable systems tailored to your goals, with clear execution and measurable outcomes."
    />
  )
}
