// =============================================
// File: (your page) PortfolioClient.tsx  — UPDATED
// Replace your existing file content with this
// =============================================
"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { CopyButton } from "@/components/ui/copy-button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Image from "next/image"
import Link from "next/link"
import type { Locale } from "@/i18n-config"
import type { getDictionary } from "@/lib/dictionaries"
import { cn } from "@/lib/utils"
import {
  ArrowUpRight,
  BadgeCheck,
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
  Award,
  Code,
  Globe,
} from "lucide-react"
import ContactModal from "@/components/contact-modal"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

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
      <div className="w-full min-h-screen bg-background px-4 pt-16 sm:px-6 md:px-8 sm:py-8">
        <Card className="mb-8 w-full max-w-[500px] border-none bg-transparent shadow-none sm:mb-16 mx-auto">
          <CardContent className="flex flex-col gap-8 p-0 sm:gap-12 sm:p-4">
            <Header isLoaded={isLoaded} dict={dict} />
            <Description isLoaded={isLoaded} dict={dict} />
            <CTAButtons isLoaded={isLoaded} setShowModal={setShowContactModal} dict={dict} lang={lang} />
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
      { name: "Tableau",       logo: "https://img.icons8.com/?size=96&id=9Kvi1p1F0tUo&format=png",       url: "https://www.tableau.com/" },
      { name: "Power BI",      logo: "https://img.icons8.com/?size=96&id=Ny0t2MYrJ70p&format=png",       url: "https://powerbi.microsoft.com/" },
      { name: "Excel",         logo: "https://img.icons8.com/?size=96&id=117561&format=png",url: "https://www.microsoft.com/microsoft-365/excel" },
      { name: "Jupyter",       logo: "https://cdn.simpleicons.org/jupyter",       url: "https://jupyter.org/" },
    ],
  },
  {
    category: "Deployment",
    items: [
      { name: "GitHub",        logo: "https://cdn.simpleicons.org/github",        url: "https://github.com/" },
      { name: "AWS",           logo: "https://img.icons8.com/?size=128&id=wU62u24brJ44&format=png",     url: "https://aws.amazon.com/" },
      { name: "Hugging Face",  logo: "https://cdn.simpleicons.org/huggingface",   url: "https://huggingface.co/" },
      { name: "Oracle",        logo: "https://img.icons8.com/?size=96&id=39913&format=png",        url: "https://www.oracle.com/" },
    ],
  },
]

/* ---------- Sections (unchanged below this line) ---------- */
function Header({ isLoaded, dict }: { isLoaded: boolean; dict: Dictionary }) {
  return (
    <header
      className={`flex w-full flex-col gap-3 transition-all duration-500 ease-out ${
        isLoaded ? "translate-y-0 opacity-100 blur-none" : "translate-y-2 opacity-0 blur-[4px]"
      }`}
      style={{ transitionDelay: "100ms" }}
    >
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
        <Image
          src="https://media.licdn.com/dms/image/v2/D4D03AQFcWMsi0rSkeg/profile-displayphoto-shrink_200_200/B4DZbdzBS3GwAY-/0/1747477862106?e=1759968000&v=beta&t=ma4QMe01qxwXubZu3VIMzA6Io-zSNW7JOoVpzbPzDIo"
          alt={dict.header.name}
          width={80}
          height={80}
          className="rounded-full border-2 border-border"
        />
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">{dict.header.name}</h1>
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 rounded-full border-transparent bg-[#165dfb] px-1.5 py-[2px] text-[9px] font-medium text-white shadow-sm hover:bg-[#165dfb]"
                  >
                    <BadgeCheck className="h-2.5 w-2.5 text-white" />
                    <span>{dict.header.verified}</span>
                  </Badge>
                </TooltipTrigger>
                <TooltipContent side="top" align="center" className="text-xs">
                  <p>{dict.header.verifiedTooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-sm font-medium text-muted-foreground">{dict.header.role}</p>
          <span className="text-xs text-muted-foreground/70 sm:text-sm">{dict.header.location}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {dict.topTechStack.map((tech) => (
          <span
            key={tech}
            className="cursor-default rounded-md border bg-secondary px-2 py-0.5 text-xs text-secondary-foreground transition-all duration-200 hover:scale-105 hover:bg-secondary/80"
          >
            {tech}
          </span>
        ))}
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
  lang,
}: {
  isLoaded: boolean
  setShowModal: (show: boolean) => void
  dict: Dictionary
  lang: Locale
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className="text-primary-foreground"
          style={{ transform: lang === "ar" ? "scaleX(-1)" : undefined }}
        >
          <title>chevron-right</title>
          <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
            <polyline points="4.25 10.25 8.5 6 4.25 1.75"></polyline>
          </g>
        </svg>
      </Button>
      <Button
        variant="outline"
        className="h-[34px] w-full rounded-[99px] bg-transparent sm:w-auto"
        onClick={() => {
          const target = document.querySelector("#articles")
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        }}
        type="button"
      >
        <span className="flex items-center gap-2">
          <span className="text-[13px] leading-5">{dict.nav.articles}</span>
          <BookOpen className="h-3.5 w-3.5" />
        </span>
      </Button>
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
                  <HoverCard openDelay={40} closeDelay={120}>
                    <HoverCardTrigger asChild>
                      <button
                        type="button"
                        className="group flex items-center gap-1 rounded-sm px-1 py-0.5 text-left transition-colors hover:bg-secondary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <Image
                          src={exp.logo}
                          alt={exp.company}
                          width={14}
                          height={14}
                          className="inline-block rounded-sm"
                        />
                        <span className="text-sm font-medium text-foreground">{exp.company}</span>
                      </button>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-72 space-y-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={exp.logo}
                          alt={exp.company}
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-md object-contain"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-foreground">{exp.company}</span>
                          <span className="text-xs text-muted-foreground">{exp.period}</span>
                        </div>
                      </div>
                      <p className="text-xs leading-relaxed text-muted-foreground">{exp.description}</p>
                    </HoverCardContent>
                  </HoverCard>

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

/* ------------------- Redesigned Tech Stack -------------------
   - 3 parts in one horizontal line (Coding | Tools | Deployment)
   - Minimal rows: logo (transparent SVG) + name only
   - No boxes/badges around items
   - Light stroke line between parts
   - On small screens, keeps one-line layout via horizontal scroll
-------------------------------------------------------------- */
/* ------------------- Redesigned Tech Stack (FIXED RTL dividers + min width) ------------------- */
/* ------------------- Redesigned Tech Stack (Hover black bg for text) ------------------- */
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

      <div className="w-full overflow-x-auto">
        <div className="grid min-w-[80px] grid-cols-3 items-stretch">
          {coreStack.map((cat, idx) => (
            <div
              key={cat.category}
              className={cn(
                "h-full px-4 py-1",
                idx > 0 && "border-s border-border/60"
              )}
            >
              <div className="mb-2">
                <span className="text-[11px] tracking-wide text-muted-foreground/80 uppercase">
                  {cat.category}
                </span>
              </div>

              <ul className="space-y-1.5">
                {cat.items.map((it) => (
                  <li key={it.name} className="leading-none">
                    <a
                      href={it.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-[12px] text-foreground/90"
                      title={it.name}
                    >
                      <Image
                        src={it.logo}
                        alt={it.name}
                        width={16}
                        height={16}
                        className="h-4 w-4 object-contain"
                        unoptimized
                      />
                      <span
                        className="px-0 transition-all duration-300 group-hover:bg-black group-hover:text-white group-hover:rounded-none dark:group-hover:bg-white dark:group-hover:text-black"
                      >
                        {it.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
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
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div
      id="articles"
      className={`flex flex-col gap-6 transition-all duration-500 ease-out ${
        isLoaded ? "translate-y-0 opacity-100 blur-none" : "translate-y-2 opacity-0 blur-[4px]"
      }`}
      style={{ transitionDelay: "750ms" }}
    >
      <h2 className={`text-sm text-muted-foreground ${lang === "ar" ? "" : "uppercase"}`}>{dict.sections.articles}</h2>
      <div className="flex flex-col gap-0">
        {enabledArticles.slice(0, 5).map((article) => {
          const isHovered = hoveredId === article.id
          const isDimmed = hoveredId !== null && !isHovered

          return (
            <Link
              key={article.id}
              href={`/${lang}/articles/${article.id}`}
              className={cn(
                "group flex items-center justify-between px-1.5 py-1 text-sm transition-colors",
                "text-muted-foreground",
                isDimmed && "opacity-40"
              )}
              onMouseEnter={() => setHoveredId(article.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(article.id)}
              onBlur={() => setHoveredId(null)}
            >
              <span className="flex-1 truncate font-medium transition-colors group-hover:text-primary">
                {article.topic}
              </span>
              <span className="ml-4 shrink-0 text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
                {article.date}
              </span>
            </Link>
          )
        })}
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
      case "Portfolio":
      case "Website":
        return <Globe className="h-4 w-4" />
      case "Dev":
      case "Code":
        return <Code className="h-4 w-4" />
      case "Awards":
        return <Award className="h-4 w-4" />
      default:
        return <ArrowUpRight className="h-4 w-4" />
    }
  }

  const contactLabels = ["Email", "البريد الإلكتروني", "Phone", "الهاتف"]
  const contactLinks = links.filter((link) => contactLabels.includes(link.label))
  const socialLinks = links.filter((link) => !contactLabels.includes(link.label))

  const contactHeading = lang === "ar" ? "التواصل المباشر" : "Direct contact"
  const socialHeading = lang === "ar" ? "الحسابات الاجتماعية" : "Social profiles"

  const wrapperClass = cn(
    "flex flex-col gap-6 transition-all duration-500 ease-out",
    isLoaded ? "translate-y-0 opacity-100 blur-none" : "translate-y-2 opacity-0 blur-[4px]"
  )

  return (
    <>
      {!!contactLinks.length && (
        <div className={wrapperClass} style={{ transitionDelay: "800ms" }}>
          <h2 className={`text-sm text-muted-foreground ${lang === "ar" ? "" : "uppercase"}`}>
            {contactHeading}
          </h2>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              {contactLinks.map((link) => {
                const value = link.display || link.value || link.username || link.href
                const actionLabel =
                  link.label === "Email" || link.label === "البريد الإلكتروني"
                    ? lang === "ar" ? "إرسال بريد" : "Send email"
                    : lang === "ar" ? "اتصال هاتفي" : "Call"
                const copyLabel = lang === "ar" ? "نسخ" : "Copy"

                const actionIcon = getIcon(link.label)

                return (
                  <div key={link.label} className="group flex w-full items-center justify-between px-2 py-1.5 text-sm text-foreground">
                    <div className="flex items-center gap-1.5">
                      {actionIcon}
                      <span>{value}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={link.href}
                        target="_self"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
                        aria-label={actionLabel}
                        rel="noopener noreferrer"
                      >
                        {actionIcon}
                      </a>
                      <CopyButton
                        content={value ?? ""}
                        aria-label={copyLabel}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-background text-foreground hover:bg-accent"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {!!socialLinks.length && (
        <div className={wrapperClass} style={{ transitionDelay: "850ms" }}>
          <h2 className={`text-sm text-muted-foreground ${lang === "ar" ? "" : "uppercase"}`}>
            {socialHeading}
          </h2>
          <div className="flex flex-col gap-2.5">
            {socialLinks.map((link) => {
              const rawValue = link.display || link.username || link.label
              let formatted = rawValue

              if (lang === "ar" && rawValue) {
                const LRE = "\u202A"
                const PDF = "\u202C"
                if (rawValue.startsWith("@")) {
                  const handle = rawValue.replace(/^@/, "")
                  formatted = `${LRE}@${handle}${PDF}`
                } else if (rawValue.endsWith("@")) {
                  const handle = rawValue.slice(0, -1)
                  formatted = `${LRE}@${handle}${PDF}`
                }
              }

              return (
                <div key={link.label} className="group">
                  <a
                    href={link.href}
                    className="group flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm text-foreground transition-colors hover:text-muted-foreground"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <div className="flex items-center gap-2">
                      {getIcon(link.label)}
                      <span>{formatted}</span>
                    </div>
                    <div className="mx-4 flex-1 border-b border-dotted border-muted-foreground/30"></div>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
