// =============================================
// File: (your page) PortfolioClient.tsx  - UPDATED
// Replace your existing file content with this
// =============================================
"use client"

import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
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
  Award,
  Code,
  Globe,
} from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { SiWhatsapp } from "@icons-pack/react-simple-icons"

// Types
type Dictionary = Awaited<ReturnType<typeof getDictionary>>

export default function PortfolioClient({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className="flex flex-col items-center bg-background pb-8 font-sans">
      <div className="w-full bg-background px-4 pt-8 sm:px-6 sm:pt-10 md:px-8 md:pt-12">
        <Card className="mx-auto w-full max-w-[720px] border-none bg-transparent shadow-none">
          <CardContent className="flex flex-col gap-8 p-0 sm:gap-12 sm:p-4">
            <Header isLoaded={isLoaded} dict={dict} lang={lang} />
            <Description isLoaded={isLoaded} dict={dict} />
            <CTAButtons isLoaded={isLoaded} dict={dict} lang={lang} />
            <Experience isLoaded={isLoaded} experiences={dict.experiences} dict={dict} lang={lang} />
            <CoreTechStack isLoaded={isLoaded} coreStack={coreStack} dict={dict} lang={lang} />
            <Articles isLoaded={isLoaded} articles={dict.articles} lang={lang} dict={dict} />
          </CardContent>
        </Card>
      </div>
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
function Header({ isLoaded, dict, lang }: { isLoaded: boolean; dict: Dictionary; lang: Locale }) {
  return (
    <header
      className={`flex w-full flex-col gap-3 transition-all duration-500 ease-out ${
        isLoaded ? "translate-y-0 opacity-100 blur-none" : "translate-y-2 opacity-0 blur-[4px]"
      }`}
      style={{ transitionDelay: "100ms" }}
    >
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="group h-20 w-20 [perspective:800px]">
          <div className="relative h-full w-full rounded-full transition-transform duration-300 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
            <Image
              src="/Anas Hamad.jpeg"
              alt={dict.header.name}
              width={80}
              height={80}
              className="absolute inset-0 rounded-full border-2 border-border [backface-visibility:hidden]"
            />
            <Image
              src="/anas logo.png"
              alt="Anas logo"
              width={80}
              height={80}
              className="absolute inset-0 rounded-full border-2 border-border [backface-visibility:hidden] [transform:rotateY(180deg)]"
            />
          </div>
        </div>
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center gap-2">
            <h1 className={cn("text-xl font-semibold tracking-tight text-foreground sm:text-2xl", lang === "ar" && "font-thmanyah-serif-text")}>
              {dict.header.name}
            </h1>
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
            className="cursor-default rounded-md bg-muted px-2 py-0.5 text-xs text-foreground transition-all duration-200 hover:scale-105 hover:bg-muted/80"
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
  dict,
  lang,
}: {
  isLoaded: boolean
  dict: Dictionary
  lang: Locale
}) {
  const [showContacts, setShowContacts] = useState(false)
  const contactLabel = lang === "ar" ? "تواصل معي" : "Say hi"
  const contactLinks = dict.socialLinks.filter((link) => link.href?.startsWith("mailto") || link.href?.startsWith("tel"))
  const emailLink = contactLinks.find((link) => link.href?.startsWith("mailto"))
  const phoneLink = contactLinks.find((link) => link.href?.startsWith("tel"))
  const whatsappNumber = phoneLink?.href?.replace("tel:", "").replace(/\D/g, "") ?? ""
  const whatsappHref = whatsappNumber ? `https://wa.me/${whatsappNumber}` : "#"
  const hasContactOptions = Boolean(emailLink || phoneLink)

  return (
    <div
      className={`flex flex-row items-center gap-2.5 transition-all duration-500 ease-out -mt-4 sm:-mt-5 ${
        isLoaded ? "translate-y-0 opacity-100 blur-none" : "translate-y-2 opacity-0 blur-[4px]"
      }`}
      style={{ transitionDelay: "300ms" }}
    >
      <div className="relative flex flex-none flex-col items-center gap-2">
        <Button
          type="button"
          variant="default"
          onClick={() => hasContactOptions && setShowContacts((prev) => !prev)}
          aria-expanded={showContacts}
          aria-controls="contact-options"
          className="inline-flex h-[32px] w-auto items-center justify-center gap-1.5 self-start rounded-[99px] bg-primary px-3 py-1 text-[13px] font-medium leading-5 text-primary-foreground hover:bg-primary/90"
        >
          <span className="text-[13px] font-medium leading-5 text-primary-foreground">{contactLabel}</span>
        </Button>

        {hasContactOptions && (
          <div
            id="contact-options"
            className={`absolute left-1/2 top-full mt-2 flex -translate-x-1/2 items-center gap-2 transition-all duration-200 ${
              showContacts ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-1"
            }`}
          >
            {emailLink && (
              <Button
                asChild
                variant="outline"
                className="h-[28px] w-auto items-center justify-start gap-1 self-start rounded-[99px] bg-transparent px-2.5 py-1 text-[12px] font-medium"
              >
                <a href={emailLink.href} aria-label={emailLink.display ?? emailLink.value ?? emailLink.label ?? "Email"}>
                  <span className="inline-flex items-center justify-center">
                    <Mail className="h-3.5 w-3.5" />
                    <span className="sr-only">{emailLink.display ?? emailLink.value ?? emailLink.label ?? "Email"}</span>
                  </span>
                </a>
              </Button>
            )}
            {phoneLink && (
              <Button
                asChild
                variant="outline"
                className="h-[28px] w-auto items-center justify-start gap-1 self-start rounded-[99px] bg-transparent px-2.5 py-1 text-[12px] font-medium"
              >
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={lang === "ar" ? "واتساب" : "WhatsApp"}
                >
                  <span className="inline-flex items-center justify-center">
                    <SiWhatsapp className="h-3.5 w-3.5 text-[#25D366]" />
                    <span className="sr-only">{lang === "ar" ? "واتساب" : "WhatsApp"}</span>
                  </span>
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
      <Button
        variant="outline"
        className="h-[32px] w-auto self-start rounded-[99px] border-0 bg-muted px-3 py-1 hover:bg-muted/80"
        onClick={() => {
          const target = document.querySelector("#articles")
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        }}
        type="button"
      >
        <span className="flex items-center gap-1.5">
          <span className="text-[13px] font-normal leading-5">{dict.nav.articles}</span>
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
  const [hoveredJobKey, setHoveredJobKey] = useState<string | null>(null)

  const toggleJobExpansion = (jobKey: string) => {
    const s = new Set(expandedJobs)
    s.has(jobKey) ? s.delete(jobKey) : s.add(jobKey)
    setExpandedJobs(s)
  }

  return (
    <div
      className={`relative z-20 flex flex-col gap-4 transition-all duration-500 ease-out ${
        isLoaded ? "translate-y-0 opacity-100 blur-none" : "translate-y-2 opacity-0 blur-[4px]"
      }`}
      style={{ transitionDelay: "400ms" }}
    >
      <h2 className={`text-sm text-muted-foreground ${lang === "ar" ? "" : "uppercase"}`}>{dict.sections.experience}</h2>
      <div className="flex flex-col gap-1">
        {experiences.map((exp) => {
          const jobKey = exp.role + exp.company
          const isExpanded = expandedJobs.has(jobKey)
          const isHovered = hoveredJobKey === jobKey
          const isDimmed = hoveredJobKey !== null && !isHovered
          const companySummary = (exp as { companySummary?: string }).companySummary ?? exp.description
          return (
            <div
              key={jobKey}
              className={cn("flex flex-col gap-y-0 transition-opacity", isDimmed && "opacity-40")}
              onMouseEnter={() => setHoveredJobKey(jobKey)}
              onMouseLeave={() => setHoveredJobKey(null)}
            >
              <div
                className="flex cursor-pointer items-baseline justify-between rounded-md px-1 py-0.5"
                onClick={() => toggleJobExpansion(jobKey)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    toggleJobExpansion(jobKey)
                  }
                }}
                aria-expanded={isExpanded}
              >
                <div className="flex items-baseline gap-1">
                  <span className="text-sm font-medium text-foreground">{exp.role}</span>
                  <span className="text-xs text-muted-foreground">
                    {lang === "ar" ? "في" : "at"}
                  </span>
                  <HoverCard openDelay={40} closeDelay={120}>
                    <HoverCardTrigger asChild>
                      <button
                        type="button"
                        onClick={(e) => e.stopPropagation()}
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
                    <HoverCardContent className="z-[9999] w-72 space-y-3">
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
                      <p className="text-xs leading-relaxed text-muted-foreground">{companySummary}</p>
                    </HoverCardContent>
                  </HoverCard>

                </div>

                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">{exp.period}</span>
                  <button
                    onClick={() => toggleJobExpansion(jobKey)}
                    onClickCapture={(e) => e.stopPropagation()}
                    className="rounded p-1 transition-colors hover:bg-secondary/50"
                    aria-label={isExpanded ? "Collapse description" : "Expand description"}
                  >
                    <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                  </button>
                </div>
              </div>
              {isExpanded && <p className="text-sm text-muted-foreground">{exp.description}</p>}
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
          {coreStack.map((cat) => (
            <div
              key={cat.category}
              className="h-full px-4 py-1"
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
