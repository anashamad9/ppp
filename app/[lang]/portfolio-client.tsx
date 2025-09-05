// =============================================
// File: (your page) PortfolioClient.tsx  — UPDATED
// Replace your existing file content with this
// =============================================
"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import type { Locale } from "@/i18n-config"
import type { getDictionary } from "@/lib/dictionaries"
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  User as IdCard,
  Mail,
  Twitter,
  Trophy,
  BookOpen,
  ChevronDown,
  Linkedin,
  Bot,
  Phone,
} from "lucide-react"
import ContactModal from "@/components/contact-modal"
import BottomNav from "@/components/bottom-nav"

// Types
type Dictionary = Awaited<ReturnType<typeof getDictionary>>

export default function PortfolioClient({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center bg-background font-sans">
      {/* NEW: Bottom nav with square tiles */}
      <BottomNav lang={lang} onContactClick={() => setShowContactModal(true)} />

      <div className="w-full min-h-screen bg-background px-4 pt-16 sm:px-6 md:px-8 sm:py-8">
        <Card className="mb-8 w-full max-w-[500px] border-none bg-transparent shadow-none sm:mb-16 mx-auto">
          <CardContent className="flex flex-col gap-8 p-0 sm:gap-12 sm:p-4">
            <Header isLoaded={isLoaded} dict={dict} />
            <Description isLoaded={isLoaded} dict={dict} />
            <CTAButtons isLoaded={isLoaded} setShowModal={setShowContactModal} dict={dict} />
            <Experience isLoaded={isLoaded} experiences={dict.experiences} dict={dict} lang={lang} />
            <Education isLoaded={isLoaded} education={dict.education} dict={dict} lang={lang} />
            <CoreTechStack isLoaded={isLoaded} coreStack={coreStack} dict={dict} lang={lang} />
            <Achievements isLoaded={isLoaded} achievements={dict.achievements} dict={dict} lang={lang} />
            <Certifications isLoaded={isLoaded} certifications={dict.certifications} dict={dict} lang={lang} />
            <Projects isLoaded={isLoaded} projects={dict.projects} dict={dict} lang={lang} />
            <Articles isLoaded={isLoaded} articles={dict.articles} lang={lang} dict={dict} />
            <SocialLinks isLoaded={isLoaded} links={dict.socialLinks} dict={dict} lang={lang} />
          </CardContent>
        </Card>
      </div>

      <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} lang={lang} />
    </main>
  )
}

/* ---------- Tech stack data ---------- */
/* ---------- Tech stack data (with logos + links) ---------- */
const coreStack = [
  {
    category: "Coding",
    items: [
      { name: "Python",        logo: "https://cdn.simpleicons.org/python",        url: "https://www.python.org/" },
      { name: "TensorFlow",    logo: "https://cdn.simpleicons.org/tensorflow",    url: "https://www.tensorflow.org/" },
      { name: "PyTorch",       logo: "https://cdn.simpleicons.org/pytorch",       url: "https://pytorch.org/" },
      { name: "SQL (MySQL)",   logo: "https://cdn.simpleicons.org/mysql",         url: "https://www.mysql.com/" },
      { name: "Scikit-learn",  logo: "https://cdn.simpleicons.org/scikitlearn",   url: "https://scikit-learn.org/" },
      { name: "Keras",         logo: "https://cdn.simpleicons.org/keras",         url: "https://keras.io/" },
      { name: "NumPy",         logo: "https://cdn.simpleicons.org/numpy",         url: "https://numpy.org/" },
      { name: "Pandas",        logo: "https://cdn.simpleicons.org/pandas",        url: "https://pandas.pydata.org/" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Tableau",       logo: "https://logos-world.net/wp-content/uploads/2021/10/Tableau-Symbol.png",       url: "https://www.tableau.com/" },
      { name: "Power BI",      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/New_Power_BI_Logo.svg/2048px-New_Power_BI_Logo.svg.png",       url: "https://powerbi.microsoft.com/" },
      { name: "Excel",         logo: "https://mailmeteor.com/logos/assets/PNG/Microsoft_Office_Excel_Logo_512px.png",url: "https://www.microsoft.com/microsoft-365/excel" },
      { name: "Jupyter",       logo: "https://cdn.simpleicons.org/jupyter",       url: "https://jupyter.org/" },
    ],
  },
  {
    category: "Deployment",
    items: [
      { name: "GitHub",        logo: "https://cdn.simpleicons.org/github",        url: "https://github.com/" },
      { name: "AWS",           logo: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/aws-color.png",     url: "https://aws.amazon.com/" },
      { name: "Hugging Face",  logo: "https://cdn.simpleicons.org/huggingface",   url: "https://huggingface.co/" },
      { name: "Oracle",        logo: "https://images.icon-icons.com/2699/PNG/512/oracle_logo_icon_168918.png",        url: "https://www.oracle.com/" },
    ],
  },
]


/* ---------- Sections (unchanged below this line) ---------- */
function Header({ isLoaded, dict }: { isLoaded: boolean; dict: Dictionary }) {
  return (
    <header
      className={`flex items-center gap-4 transition-all duration-500 ease-out ${
        isLoaded ? "translate-y-0 opacity-100 blur-none" : "translate-y-2 opacity-0 blur-[4px]"
      }`}
      style={{ transitionDelay: "100ms" }}
    >
      <div className="flex-shrink-0">
        <Image
          src="https://media.licdn.com/dms/image/v2/D4D03AQFcWMsi0rSkeg/profile-displayphoto-shrink_200_200/B4DZbdzBS3GwAY-/0/1747477862106?e=1759968000&v=beta&t=ma4QMe01qxwXubZu3VIMzA6Io-zSNW7JOoVpzbPzDIo"
          alt={dict.header.name}
          width={80}
          height={80}
          className="rounded-full border-2 border-border"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{dict.header.name}</h1>
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-muted-foreground">{dict.header.role}</p>
          <span className="font-extralight text-xs text-muted-foreground/70">• {dict.header.location}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {dict.topTechStack.map((tech) => (
            <span
              key={tech}
              className="cursor-default rounded-md border bg-secondary px-2 py-0.5 text-xs text-secondary-foreground transition-all duration-200 hover:scale-105 hover:bg-secondary/80"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </header>
  )
}

function Description({ isLoaded, dict }: { isLoaded: boolean; dict: Dictionary }) {
  return (
    <div
      className={`flex flex-col gap-4 transition-all duration-500 ease-out ${
        isLoaded ? "translate-y-0 opacity-100 blur-none" : "translate-y-2 opacity-0 blur-[4px]"
      }`}
      style={{ transitionDelay: "200ms" }}
    >
      <div className="flex flex-col gap-4 sm:gap-5">
        {dict.description.map((paragraph, index) => (
          <p key={index} className="text-sm leading-relaxed text-foreground" dangerouslySetInnerHTML={{ __html: paragraph }} />
        ))}
      </div>
    </div>
  )
}

function CTAButtons({
  isLoaded,
  setShowModal,
  dict,
}: {
  isLoaded: boolean
  setShowModal: (show: boolean) => void
  dict: Dictionary
}) {
  return (
    <div
      className={`flex flex-col items-start gap-3 transition-all duration-500 ease-out sm:flex-row sm:items-center sm:gap-2.5 ${
        isLoaded ? "translate-y-0 opacity-100 blur-none" : "translate-y-2 opacity-0 blur-[4px]"
      }`}
      style={{ transitionDelay: "300ms" }}
    >
      <Button
        variant="default"
        onClick={() => setShowModal(true)}
        className="inline-flex h-[34px] w-full items-center justify-center gap-2.5 rounded-[99px] bg-primary ps-4 pe-3 py-0 text-primary-foreground hover:bg-primary/90 sm:w-auto"
      >
        <span className="text-[13px] font-medium leading-5 text-primary-foreground">{dict.cta.contact}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" className="text-primary-foreground">
          <title>chevron-right</title>
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
            <polyline points="4.25 10.25 8.5 6 4.25 1.75"></polyline>
          </g>
        </svg>
      </Button>
      <a href="https://drive.google.com/uc?export=download&id=1HtFK1I2LFlT8RdGiS-9T3Ev92WVDLul-" download target="_blank" rel="noopener noreferrer">
        <Button variant="outline" className="h-[34px] w-full rounded-[99px] bg-transparent sm:w-auto">
          <span className="text-[13px] leading-5">{dict.cta.resume}</span>
        </Button>
      </a>
    </div>
  )
}

function Experience({
  isLoaded,
  experiences,
  dict,
  lang,
}: {
  isLoaded: boolean
  experiences: Dictionary["experiences"]
  dict: Dictionary
  lang: Locale
}) {
  const [expandedJobs, setExpandedJobs] = useState<Set<string>>(new Set())

  const toggleJobExpansion = (jobKey: string) => {
    const s = new Set(expandedJobs)
    s.has(jobKey) ? s.delete(jobKey) : s.add(jobKey)
    setExpandedJobs(s)
  }

  return (
    <div
      className={`flex flex-col gap-4 transition-all duration-500 ease-out ${
        isLoaded ? "translate-y-0 opacity-100 blur-none" : "translate-y-2 opacity-0 blur-[4px]"
      }`}
      style={{ transitionDelay: "400ms" }}
    >
      <h2 className={`text-sm text-muted-foreground ${lang === "ar" ? "" : "uppercase"}`}>{dict.sections.experience}</h2>
      <div className="flex flex-col gap-4">
        {experiences.map((exp) => {
          const jobKey = exp.role + exp.company
          const isExpanded = expandedJobs.has(jobKey)
          const shouldTruncate = exp.description.length > 120
          const displayDescription = shouldTruncate && !isExpanded ? exp.description.substring(0, 120) + "..." : exp.description
          return (
            <div key={jobKey} className="flex flex-col gap-y-[-2]">
              <div className="flex items-baseline justify-between">
                <div className="flex items-baseline gap-1">
  <span className="text-sm font-medium text-foreground">{exp.role}</span>
<span className="text-xs text-muted-foreground">
  {lang === "ar" ? "في" : "at"}
</span>
  {/* ✅ Inline logo + company name */}
  <span className="flex items-center gap-1">
    <Image
      src={exp.logo}   // <-- new field you’ll add in dict.experiences
      alt={exp.company}
      width={14}
      height={14}
      className="inline-block rounded-sm"
    />
    <span className="text-sm font-medium text-foreground">{exp.company}</span>
  </span>
</div>

                <span className="text-sm text-muted-foreground">{exp.period}</span>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm text-muted-foreground">{displayDescription}</p>
                {shouldTruncate && (
                  <div className="flex justify-center">
                    <button onClick={() => toggleJobExpansion(jobKey)} className="rounded p-1 transition-colors hover:bg-secondary/50">
                      <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Education({
  isLoaded,
  education,
  dict,
  lang,
}: {
  isLoaded: boolean
  education: Dictionary["education"]
  dict: Dictionary
  lang: Locale
}) {
  return (
    <div
      className={`flex flex-col gap-6 transition-all duration-500 ease-out ${
        isLoaded ? "translate-y-0 opacity-100 blur-none" : "translate-y-2 opacity-0 blur-[4px]"
      }`}
      style={{ transitionDelay: "500ms" }}
    >
      <h2 className={`text-sm text-muted-foreground ${lang === "ar" ? "" : "uppercase"}`}>{dict.sections.education}</h2>
      <div className="flex flex-col gap-6">
        {education.map((edu) => (
          <div key={edu.institution} className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-foreground">{edu.institution}</span>
              <span className="text-sm text-muted-foreground">{edu.period}</span>
            </div>
            <p className="text-sm font-medium text-foreground/80">{edu.degree}</p>
            <p className="text-sm text-muted-foreground">{edu.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function CoreTechStack({
  isLoaded,
  coreStack,
  dict,
  lang,
}: {
  isLoaded: boolean
  coreStack: typeof coreStack
  dict: Dictionary
  lang: Locale
}) {
  return (
    <section
      className={`flex flex-col gap-4 transition-all duration-500 ease-out ${
        isLoaded ? "translate-y-0 opacity-100 blur-none" : "translate-y-2 opacity-0 blur-[4px]"
      }`}
      style={{ transitionDelay: "550ms" }}
    >
      <div className="flex items-center justify-between">
        <h2 className={`text-sm text-muted-foreground ${lang === "ar" ? "" : "uppercase"}`}>
          {dict.sections.tech_stack}
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {coreStack.map((cat) => (
          <div
            key={cat.category}
            className="rounded-2xl border border-border/60 bg-background/50 px-3 py-3 backdrop-blur-md"
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-xs font-medium tracking-wider text-foreground/90 uppercase">
                  {cat.category}
                </span>
              </div>
              <span className="text-[11px] text-muted-foreground/70">{cat.items.length}</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {cat.items.map((it) => (
                <a
                  key={it.name}
                  href={it.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-neutral-100/70 px-2.5 py-1.5 text-[12px] text-foreground/90 transition-all hover:-translate-y-[1px] hover:bg-neutral-100 dark:bg-neutral-900/40 dark:hover:bg-neutral-900"
                  title={it.name}
                >
                  {/* Tiny inline logo */}
                  {/* If you haven’t allowed external images yet, see note below */}
                  <Image
                    src={it.logo}
                    alt={it.name}
                    width={14}
                    height={14}
                    className="inline-block"
                    unoptimized
                  />
                  <span className="font-medium">{it.name}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    width="14"
                    height="14"
                    className="opacity-0 transition-opacity group-hover:opacity-80"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M12.5 3h4a.5.5 0 0 1 .5.5v4a.5.5 0 1 1-1 0V4.707l-8.146 8.147a.5.5 0 0 1-.708-.708L15.293 4H12.5a.5.5 0 1 1 0-1Zm-9 2A1.5 1.5 0 0 0 2 6.5v9A1.5 1.5 0 0 0 3.5 17h9a1.5 1.5 0 0 0 1.5-1.5V11a.5.5 0 0 0-1 0v4.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5H8a.5.5 0 0 0 0-1H3.5Z"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}


function Achievements({
  isLoaded,
  achievements,
  dict,
  lang,
}: {
  isLoaded: boolean
  achievements: Dictionary["achievements"]
  dict: Dictionary
  lang: Locale
}) {
  return (
    <div
      className={`flex flex-col gap-6 transition-all duration-500 ease-out ${
        isLoaded ? "translate-y-0 opacity-100 blur-none" : "translate-y-2 opacity-0 blur-[4px]"
      }`}
      style={{ transitionDelay: "600ms" }}
    >
      <h2 className={`text-sm text-muted-foreground ${lang === "ar" ? "" : "uppercase"}`}>{dict.sections.achievements}</h2>
      <div className="flex flex-col gap-6">
        {achievements.map((achievement) => (
          <div key={achievement.title} className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-foreground">{achievement.title}</span>
              <span className="text-sm text-muted-foreground">{achievement.period}</span>
            </div>
            <p className="text-sm font-medium text-foreground/80">{achievement.issuer}</p>
            <p className="text-sm text-muted-foreground">{achievement.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Certifications({
  isLoaded,
  certifications,
  dict,
  lang,
}: {
  isLoaded: boolean
  certifications: Dictionary["certifications"]
  dict: Dictionary
  lang: Locale
}) {
  return (
    <div
      className={`flex flex-col gap-6 transition-all duration-500 ease-out ${
        isLoaded ? "translate-y-0 opacity-100 blur-none" : "translate-y-2 opacity-0 blur-[4px]"
      }`}
      style={{ transitionDelay: "650ms" }}
    >
      <h2 className={`text-sm text-muted-foreground ${lang === "ar" ? "" : "uppercase"}`}>{dict.sections.certifications}</h2>
      <div className="flex flex-col gap-6">
        {certifications.map((cert) => (
          <div key={cert.title} className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-foreground">{cert.title}</span>
              <span className="text-sm text-muted-foreground">{cert.period}</span>
            </div>
            <p className="text-sm font-medium text-foreground/80">{cert.issuer}</p>
            <p className="text-sm text-muted-foreground">{cert.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Projects({
  isLoaded,
  projects,
  dict,
  lang,
}: {
  isLoaded: boolean
  projects: Dictionary["projects"]
  dict: Dictionary
  lang: Locale
}) {
  return (
    <div
      className={`flex flex-col gap-6 transition-all duration-500 ease-out ${
        isLoaded ? "translate-y-0 opacity-100 blur-none" : "translate-y-2 opacity-0 blur-[4px]"
      }`}
      style={{ transitionDelay: "700ms" }}
    >
      <h2 className={`text-sm text-muted-foreground ${lang === "ar" ? "" : "uppercase"}`}>{dict.sections.projects}</h2>
      <div className="flex flex-col gap-6">
        {projects.map((project) => (
          <div key={project.title} className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium text-foreground">{project.title}</h3>
                <span className="text-xs text-muted-foreground">{project.period}</span>
              </div>
              <div className="flex gap-2">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{project.description}</p>
            {!!project.tech?.length && (
              <div className="flex flex-wrap gap-1">
                {project.tech.map((tech) => (
                  <span key={tech} className="cursor-default rounded-md border bg-secondary px-2 py-0.5 text-xs text-secondary-foreground transition-all duration-200 hover:scale-105 hover:bg-secondary/80">
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function Articles({
  isLoaded,
  articles,
  lang,
  dict,
}: {
  isLoaded: boolean
  articles: Dictionary["articles"]
  lang: Locale
  dict: Dictionary
}) {
  const enabledArticles = articles.filter((article) => article.enabled)

  return (
    <div
      className={`flex flex-col gap-6 transition-all duration-500 ease-out ${
        isLoaded ? "translate-y-0 opacity-100 blur-none" : "translate-y-2 opacity-0 blur-[4px]"
      }`}
      style={{ transitionDelay: "750ms" }}
    >
      <h2 className={`text-sm text-muted-foreground ${lang === "ar" ? "" : "uppercase"}`}>{dict.sections.articles}</h2>
      <div className="flex flex-col gap-6">
        {enabledArticles.slice(0, 5).map((article) => (
          <div key={article.id} className="cursor-pointer rounded-lg px-2 py-4 transition-colors hover:bg-secondary/20">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium text-foreground">{article.topic}</h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
              <Link href={`/${lang}/articles`} className="text-muted-foreground transition-colors hover:text-foreground">
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">{article.content ? article.content.substring(0, 120) + "..." : "Click to read more..."}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SocialLinks({
  isLoaded,
  links,
  dict,
  lang,
}: {
  isLoaded: boolean
  links: Dictionary["socialLinks"]
  dict: Dictionary
  lang: Locale
}) {
  const getIcon = (label: string) => {
    switch (label) {
      case "Email":
      case "البريد الإلكتروني":
        return <Mail className="h-4 w-4" />
      case "Phone":
      case "الهاتف":
        return <Phone className="h-4 w-4" />
      case "X":
        return <Twitter className="h-4 w-4" />
      case "LinkedIn":
      case "لينكد إن":
        return <Linkedin className="h-4 w-4" />
      case "GitHub":
        return <Github className="h-4 w-4" />
      case "Hugging Face":
        return <Bot className="h-4 w-4" />
      case "Kaggle":
        return <Trophy className="h-4 w-4" />
      default:
        return <ArrowUpRight className="h-4 w-4" />
    }
  }

  return (
    <div
      className={`flex flex-col gap-6 transition-all duration-500 ease-out ${
        isLoaded ? "translate-y-0 opacity-100 blur-none" : "translate-y-2 opacity-0 blur-[4px]"
      }`}
      style={{ transitionDelay: "800ms" }}
    >
      <h2 className={`text-sm text-muted-foreground ${lang === "ar" ? "" : "uppercase"}`}>{dict.sections.social}</h2>
      <div className="flex flex-col gap-3">
        {links.map((link) => (
          <div key={link.label} className="group">
            <a
              href={link.href}
              className="group flex w-full items-center justify-between rounded-lg p-2 text-sm text-foreground transition-colors hover:bg-accent/10 hover:text-muted-foreground"
              rel="noopener noreferrer"
              target={link.label === "Email" || link.label === "البريد الإلكتروني" || link.label === "Phone" || link.label === "الهاتف" ? "_self" : "_blank"}
            >
              <div className="flex items-center gap-2">
                {getIcon(link.label)}
                <span>{link.display || link.username || link.label}</span>
              </div>
              <div className="mx-4 flex-1 border-b border-dotted border-muted-foreground/30"></div>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
