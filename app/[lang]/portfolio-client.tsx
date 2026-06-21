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
  BriefcaseBusiness,
  Building2,
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
  Eye,
  CalendarDays,
  Rocket,
  Users,
} from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { SiWhatsapp } from "@icons-pack/react-simple-icons"

// Types
type Dictionary = Awaited<ReturnType<typeof getDictionary>>
type CoreStackCategory = {
  category: string
  items: Array<{
    name: string
    logo: string
    url: string
  }>
}
type ShowcaseCard = {
  tag: string
  title: string
  description: string
  badges: string[]
  imageSrc: string
  imageAlt: string
}
type ProjectImage = {
  src: string
  alt: string
}
type ProjectItem = {
  tag: string
  title: string
  description: string
  badges: string[]
  images: ProjectImage[]
}
type ProjectsCard = {
  projects: ProjectItem[]
}
type TestimonialCtaCard = {
  quoteTag: string
  quote: string
  author: string
  role: string
  avatarSrc: string
  avatarAlt: string
  ctaTitle: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel: string
  secondaryHref: string
}

export default function PortfolioClient({
  dict,
  lang,
  headerRole,
  hideExperience = false,
  topTags,
  description,
  secondaryActionLabel,
  secondaryActionTargetId,
  secondaryActionIcon = "book",
  showcaseSlides,
  projectsCard,
  testimonialCta,
}: {
  dict: Dictionary
  lang: Locale
  headerRole?: string
  hideExperience?: boolean
  topTags?: string[]
  description?: string[]
  secondaryActionLabel?: string
  secondaryActionTargetId?: string
  secondaryActionIcon?: "book" | "eye"
  showcaseSlides?: ShowcaseCard[]
  projectsCard?: ProjectsCard
  testimonialCta?: TestimonialCtaCard
}) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <main className="flex flex-col items-center bg-background pb-8 font-sans">
      <div className="w-full bg-background px-4 pt-8 sm:px-6 sm:pt-10 md:px-8 md:pt-12">
        <Card className="mx-auto w-full max-w-[720px] border-none bg-transparent shadow-none">
          <CardContent className="flex flex-col gap-8 p-0 sm:gap-12 sm:p-4">
            <Header isLoaded={isLoaded} dict={dict} lang={lang} headerRole={headerRole} topTags={topTags} />
            <Description isLoaded={isLoaded} dict={dict} description={description} />
            <CTAButtons
              isLoaded={isLoaded}
              dict={dict}
              lang={lang}
              secondaryActionLabel={secondaryActionLabel}
              secondaryActionTargetId={secondaryActionTargetId}
              secondaryActionIcon={secondaryActionIcon}
            />
            {!hideExperience && <Experience isLoaded={isLoaded} experiences={dict.experiences} dict={dict} lang={lang} />}
            {showcaseSlides?.length ? <BuildShowcaseCard isLoaded={isLoaded} showcaseSlides={showcaseSlides} lang={lang} /> : null}
            <CoreTechStack isLoaded={isLoaded} coreStack={coreStack} dict={dict} lang={lang} />
            {projectsCard ? <ProjectsShowcaseCard isLoaded={isLoaded} projectsCard={projectsCard} lang={lang} /> : null}
            <Articles isLoaded={isLoaded} articles={dict.articles} lang={lang} dict={dict} />
            {testimonialCta ? <TestimonialCtaSection isLoaded={isLoaded} testimonialCta={testimonialCta} lang={lang} /> : null}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

/* ---------- Tech stack data (with logos + links) ---------- */
const coreStack: CoreStackCategory[] = [
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
  {
    category: "Product & Development",
    items: [
      { name: "Next.js",       logo: "https://cdn.simpleicons.org/nextdotjs",     url: "https://nextjs.org/" },
      { name: "React",         logo: "https://cdn.simpleicons.org/react",          url: "https://react.dev/" },
      { name: "Flask",         logo: "https://cdn.simpleicons.org/flask",          url: "https://flask.palletsprojects.com/" },
      { name: "Node.js",       logo: "https://cdn.simpleicons.org/nodedotjs",      url: "https://nodejs.org/" },
      { name: "Figma",         logo: "https://cdn.simpleicons.org/figma",          url: "https://www.figma.com/" },
      { name: "Supabase",      logo: "https://cdn.simpleicons.org/supabase",       url: "https://supabase.com/" },
    ],
  },
]

/* ---------- Sections (unchanged below this line) ---------- */
function Header({
  isLoaded,
  dict,
  lang,
  headerRole,
  topTags,
}: {
  isLoaded: boolean
  dict: Dictionary
  lang: Locale
  headerRole?: string
  topTags?: string[]
}) {
  return (
    <header
      className={`flex w-full flex-col gap-3 transition-all duration-500 ease-out ${
        isLoaded ? "translate-y-0 opacity-100 blur-none" : "translate-y-2 opacity-0 blur-[4px]"
      }`}
      style={{ transitionDelay: "100ms" }}
    >
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="group h-20 w-20 shrink-0 [perspective:800px]">
          <div className="relative h-full w-full rounded-full transition-transform duration-300 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
            <Image
              src="/anas-hamad.jpeg"
              alt={dict.header.name}
              width={80}
              height={80}
              className="absolute inset-0 rounded-full border-2 border-border [backface-visibility:hidden]"
            />
            <Image
              src="/anas-logo.png"
              alt="Anas logo"
              width={80}
              height={80}
              className="absolute inset-0 rounded-full border-2 border-border [backface-visibility:hidden] [transform:rotateY(180deg)]"
            />
          </div>
        </div>
        <div className="flex min-w-0 flex-col items-start gap-0">
          <div className="flex min-w-0 flex-wrap items-center gap-1.5">
            <h1 className={cn("min-w-0 text-lg font-semibold tracking-tight text-foreground sm:text-2xl", lang === "ar" && "font-thmanyah-serif-text")}>
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
          <p className="text-sm font-medium leading-tight text-muted-foreground sm:text-base">{headerRole ?? dict.header.role}</p>
          <span className="text-xs leading-none text-muted-foreground/70 sm:text-sm">{dict.header.location}</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {(topTags ?? dict.topTechStack).map((tech) => (
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

function Description({
  isLoaded,
  dict,
  description,
}: {
  isLoaded: boolean
  dict: Dictionary
  description?: string[]
}) {
  const renderParagraph = (paragraph: string) => {
    const parts = paragraph.split(/(\[icon:[^\]]+\]|<u>.*?<\/u>)/g).filter(Boolean)

    return parts.map((part, index) => {
      const iconMatch = part.match(/^\[icon:([^\]]+)\]$/)
      if (iconMatch) {
        const iconName = iconMatch[1]
        const iconMap = {
          startup: Rocket,
          freelancer: Users,
          business: Building2,
          entrepreneur: BriefcaseBusiness,
        } as const
        const Icon = iconMap[iconName as keyof typeof iconMap]

        return Icon ? <Icon key={`${iconName}-${index}`} className="mx-1 inline h-4 w-4 align-[-2px]" /> : null
      }

      const underlineMatch = part.match(/^<u>(.*?)<\/u>$/)
      if (underlineMatch) {
        return (
          <u key={`u-${index}`}>
            {underlineMatch[1]}
          </u>
        )
      }

      return <span key={`t-${index}`}>{part}</span>
    })
  }

  return (
    <div
      className={`flex flex-col gap-4 transition-all duration-500 ease-out ${
        isLoaded ? "translate-y-0 opacity-100 blur-none" : "translate-y-2 opacity-0 blur-[4px]"
      }`}
      style={{ transitionDelay: "200ms" }}
    >
      <div className="flex flex-col gap-4 sm:gap-5">
        {(description ?? dict.description).map((paragraph, index) => (
          <p key={index} className="text-sm leading-relaxed text-foreground">
            {renderParagraph(paragraph)}
          </p>
        ))}
      </div>
    </div>
  )
}

function CTAButtons({
  isLoaded,
  dict,
  lang,
  secondaryActionLabel,
  secondaryActionTargetId,
  secondaryActionIcon,
}: {
  isLoaded: boolean
  dict: Dictionary
  lang: Locale
  secondaryActionLabel?: string
  secondaryActionTargetId?: string
  secondaryActionIcon?: "book" | "eye"
}) {
  const [showContacts, setShowContacts] = useState(false)
  const contactLabel = lang === "ar" ? "تواصل معي" : "Say hi"
  const contactLinks = dict.socialLinks.filter((link) => link.href?.startsWith("mailto") || link.href?.startsWith("tel"))
  const emailLink = contactLinks.find((link) => link.href?.startsWith("mailto"))
  const phoneLink = contactLinks.find((link) => link.href?.startsWith("tel"))
  const whatsappNumber = phoneLink?.href?.replace("tel:", "").replace(/\D/g, "") ?? ""
  const whatsappHref = whatsappNumber ? `https://wa.me/${whatsappNumber}` : "#"
  const hasContactOptions = Boolean(emailLink || phoneLink)
  const meetingHref = emailLink
    ? `${emailLink.href}${emailLink.href.includes("?") ? "&" : "?"}subject=${encodeURIComponent(
        lang === "ar" ? "حجز اجتماع" : "Book a Meeting",
      )}`
    : "#"
  const actionLabel = secondaryActionLabel ?? dict.nav.articles
  const ActionIcon = secondaryActionIcon === "eye" ? Eye : BookOpen

  return (
    <div
      dir="ltr"
      className={cn(
        "flex w-full flex-col gap-2 transition-all duration-500 ease-out -mt-4 sm:-mt-5",
        lang === "ar" ? "items-end" : "items-start",
        isLoaded ? "translate-y-0 opacity-100 blur-none" : "translate-y-2 opacity-0 blur-[4px]",
      )}
      style={{ transitionDelay: "300ms" }}
    >
      <div className={cn("flex w-full items-center gap-2.5", lang === "ar" ? "flex-row-reverse justify-start" : "flex-row justify-start")}>
        <Button
          type="button"
          variant="default"
          onClick={() => hasContactOptions && setShowContacts((prev) => !prev)}
          aria-expanded={showContacts}
          aria-controls="contact-options"
          className="inline-flex h-[32px] w-auto items-center justify-center gap-1.5 rounded-[99px] bg-primary px-3 py-1 text-[13px] font-medium leading-5 text-primary-foreground hover:bg-primary/90"
        >
          <span className="text-[13px] font-medium leading-5 text-primary-foreground">{contactLabel}</span>
        </Button>
        <Button
          variant="outline"
          className="h-[32px] w-auto rounded-[99px] border-0 bg-muted px-3 py-1 hover:bg-muted/80"
          onClick={() => {
            const target = document.querySelector(secondaryActionTargetId ?? "#articles")
            if (target) {
              target.scrollIntoView({ behavior: "smooth", block: "start" })
            }
          }}
          type="button"
        >
          <span className="flex items-center gap-1.5">
            <span className="text-[13px] font-normal leading-5">{actionLabel}</span>
            <ActionIcon className="h-3.5 w-3.5" />
          </span>
        </Button>
      </div>
      {hasContactOptions && (
        <div
          id="contact-options"
          className={cn(
            "flex w-full flex-wrap items-center gap-2 transition-all duration-200",
            lang === "ar" ? "flex-row-reverse justify-start self-end" : "flex-row justify-start self-start",
            showContacts ? "max-h-32 opacity-100" : "pointer-events-none max-h-0 overflow-hidden opacity-0",
          )}
        >
          {emailLink && (
            <Button
              asChild
              className="h-[32px] w-auto rounded-[99px] bg-[#165dfb] px-3 py-1 text-[13px] font-medium text-white hover:bg-[#165dfb]/90"
            >
              <a href={meetingHref} aria-label={lang === "ar" ? "احجز اجتماع" : "Book a Meeting"}>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5" />
                  <span>{lang === "ar" ? "احجز اجتماع" : "Book a Meeting"}</span>
                </span>
              </a>
            </Button>
          )}
          {emailLink && (
            <Button
              asChild
              variant="outline"
              className="h-[32px] w-auto rounded-[99px] border-0 bg-black px-3 py-1 text-[13px] font-medium text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
            >
              <a href={emailLink.href} aria-label={lang === "ar" ? "إرسال بريد" : "Send Email"}>
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  <span>{lang === "ar" ? "إرسال بريد" : "Send Email"}</span>
                </span>
              </a>
            </Button>
          )}
          {phoneLink && (
            <Button
              asChild
              variant="outline"
              className="h-[32px] w-auto rounded-[99px] border-0 bg-[#25D366] px-3 py-1 text-[13px] font-medium text-white hover:bg-[#25D366]/90"
            >
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={lang === "ar" ? "واتساب" : "WhatsApp"}
                className="text-white"
              >
                <span className="inline-flex items-center gap-1.5">
                  <SiWhatsapp className="h-3.5 w-3.5" />
                  <span>{lang === "ar" ? "واتساب" : "WhatsApp"}</span>
                </span>
              </a>
            </Button>
          )}
        </div>
      )}
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
   - Stack categories in one horizontal line
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
  coreStack: CoreStackCategory[]
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

      <div className="w-full">
        <div className="grid w-full grid-cols-4 items-start gap-2">
          {coreStack.map((cat) => (
            <div
              key={cat.category}
              className="h-full min-w-0 px-2 py-1"
            >
              <div className="mb-2">
                <span className="text-[10px] tracking-wide text-muted-foreground/80 uppercase sm:text-[11px]">
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
                      className="group flex items-center gap-1.5 text-[11px] text-foreground/90 sm:text-[12px]"
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

function BuildShowcaseCard({
  isLoaded,
  showcaseSlides,
  lang,
}: {
  isLoaded: boolean
  showcaseSlides: ShowcaseCard[]
  lang: Locale
}) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % showcaseSlides.length)
    }, 7000)

    return () => window.clearInterval(intervalId)
  }, [showcaseSlides.length])

  const activeSlide = showcaseSlides[activeIndex]

  return (
    <section
      className={`transition-all duration-500 ease-out ${
        isLoaded ? "translate-y-0 opacity-100 blur-none" : "translate-y-2 opacity-0 blur-[4px]"
      }`}
      style={{ transitionDelay: "600ms" }}
    >
      <div className="overflow-hidden rounded-2xl bg-muted">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr]">
          <div className="flex min-h-[340px] flex-col p-5 sm:min-h-[390px] sm:p-7">
            <Badge
              variant="secondary"
              className="mb-4 w-fit rounded-full border-0 bg-background/80 px-2.5 py-1 text-[11px] font-medium text-foreground shadow-none"
            >
              {activeSlide.tag}
            </Badge>
            <div
              key={`content-${activeIndex}`}
              className="max-w-xl space-y-3 animate-in fade-in-0 slide-in-from-bottom-1 duration-500"
            >
              <h3 className={cn("text-lg font-semibold tracking-tight text-foreground sm:text-2xl", lang === "ar" && "font-thmanyah-serif-text")}>
                {activeSlide.title}
              </h3>
              <p className="text-sm leading-relaxed text-foreground">{activeSlide.description}</p>
            </div>
            <div className="flex-1" />
            <div className="mt-6 flex flex-wrap gap-2">
              {activeSlide.badges.map((badge) => (
                <span
                  key={badge}
                  className="cursor-default rounded-md bg-background px-2 py-0.5 text-xs text-foreground transition-all duration-200 hover:scale-105 hover:bg-background/80"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
          <div className="relative min-h-[260px] overflow-hidden border-t border-background/60 md:min-h-full md:border-s">
            {showcaseSlides.map((slide, index) => (
              <div
                key={`${slide.imageSrc}-${index}`}
                className={cn(
                  "absolute inset-0 transition-all duration-700 ease-out",
                  index === activeIndex ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-2 opacity-0",
                )}
              >
                <Image
                  src={slide.imageSrc}
                  alt={slide.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 35vw, 100vw"
                />
              </div>
            ))}
            <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black/35 via-black/10 to-transparent p-4">
              <div className="flex items-center gap-1.5">
              {showcaseSlides.map((slide, index) => (
                <button
                  key={`${slide.title}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show slide ${index + 1}`}
                  className={cn(
                    "h-2 rounded-full bg-white/55 transition-all duration-300 hover:bg-white",
                    index === activeIndex ? "w-8" : "w-2.5",
                  )}
                />
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectsShowcaseCard({
  isLoaded,
  projectsCard,
  lang,
}: {
  isLoaded: boolean
  projectsCard: ProjectsCard
  lang: Locale
}) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const activeProject = projectsCard.projects[activeProjectIndex]

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveImageIndex((current) => (current + 1) % activeProject.images.length)
    }, 7000)

    return () => window.clearInterval(intervalId)
  }, [activeProject.images.length])

  useEffect(() => {
    setActiveImageIndex(0)
  }, [activeProjectIndex])

  return (
    <section
      id="projects"
      className={`scroll-mt-24 transition-all duration-500 ease-out ${
        isLoaded ? "translate-y-0 opacity-100 blur-none" : "translate-y-2 opacity-0 blur-[4px]"
      }`}
      style={{ transitionDelay: "650ms" }}
    >
      <div className="overflow-hidden rounded-2xl bg-muted">
        <div className="flex flex-col">
          <div className="space-y-4 p-5 sm:p-7">
            <div
              key={`project-content-${activeProjectIndex}`}
              className="space-y-3 animate-in fade-in-0 slide-in-from-bottom-1 duration-500"
            >
              <h3 className={cn("max-w-2xl text-xl font-semibold tracking-tight text-foreground sm:text-2xl", lang === "ar" && "font-thmanyah-serif-text")}>
                {activeProject.title}
              </h3>
              <p className="max-w-2xl text-sm leading-relaxed text-foreground">{activeProject.description}</p>
              <div className="flex flex-wrap gap-2">
                {activeProject.badges.map((badge) => (
                  <span
                    key={badge}
                    className="cursor-default rounded-md bg-background px-2 py-0.5 text-xs text-foreground transition-all duration-200 hover:scale-105 hover:bg-background/80"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative min-h-[340px] overflow-hidden border-t border-background/60 sm:min-h-[420px]">
            {activeProject.images.map((image, index) => (
              <div
                key={`${image.src}-${index}`}
                className={cn(
                  "absolute inset-0 transition-all duration-700 ease-out",
                  index === activeImageIndex ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>
            ))}
            <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black/35 via-black/10 to-transparent p-4">
              <div className="flex items-center gap-1.5">
                {activeProject.images.map((image, index) => (
                  <button
                    key={`${image.src}-${index}`}
                    type="button"
                    onClick={() => setActiveImageIndex(index)}
                    aria-label={`Show image ${index + 1}`}
                    className={cn(
                      "h-2 rounded-full bg-white/55 transition-all duration-300 hover:bg-white",
                      index === activeImageIndex ? "w-8" : "w-2.5",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {projectsCard.projects
          .filter((_, index) => index !== activeProjectIndex)
          .slice(0, 3)
          .map((project) => (
            <button
              key={`${project.title}-card`}
              type="button"
              onClick={() => setActiveProjectIndex(projectsCard.projects.findIndex((item) => item.title === project.title))}
              className={cn(
                "group relative min-h-[140px] overflow-hidden rounded-xl bg-muted transition-all duration-200 hover:scale-[1.01]",
                lang === "ar" ? "text-right" : "text-left",
              )}
            >
              <Image
                src={project.images[0].src}
                alt={project.images[0].alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 640px) 25vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/35" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <span className="inline-flex rounded-md bg-black/70 px-2 py-0.5 text-xs text-white">{project.tag}</span>
              </div>
            </button>
          ))}
      </div>
    </section>
  )
}

function TestimonialCtaSection({
  isLoaded,
  testimonialCta,
  lang,
}: {
  isLoaded: boolean
  testimonialCta: TestimonialCtaCard
  lang: Locale
}) {
  return (
    <section
      className={`transition-all duration-500 ease-out ${
        isLoaded ? "translate-y-0 opacity-100 blur-none" : "translate-y-2 opacity-0 blur-[4px]"
      }`}
      style={{ transitionDelay: "700ms" }}
    >
      <div className="overflow-hidden rounded-2xl bg-[#1063ff]">
        <div className="flex flex-col gap-6 p-5 sm:p-7">
          <div className="space-y-4">
            <Badge
              variant="secondary"
              className="w-fit rounded-full border-0 bg-black/15 px-2.5 py-1 text-[11px] font-normal text-white shadow-none"
            >
              {testimonialCta.quoteTag}
            </Badge>
            <p className={cn("max-w-2xl text-xl font-normal leading-relaxed text-white sm:text-2xl", lang === "ar" && "font-thmanyah-serif-text")}>
              “{testimonialCta.quote}”
            </p>
            <div className="flex items-center gap-3">
              <Image
                src={testimonialCta.avatarSrc}
                alt={testimonialCta.avatarAlt}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover ring-1 ring-white/25"
              />
              <div className="space-y-0.5">
                <p className="text-sm font-normal text-white">{testimonialCta.author}</p>
                <p className="text-sm text-white/75">{testimonialCta.role}</p>
              </div>
            </div>
          </div>

          <div className="pt-14 sm:pt-20">
            <div className="flex flex-col gap-3 xl:flex-row xl:flex-wrap xl:items-end xl:justify-start xl:gap-3">
              <h3 className={cn("order-1 max-w-2xl text-xl font-normal tracking-tight text-white sm:text-2xl", lang === "ar" && "font-thmanyah-serif-text")}>
                {testimonialCta.ctaTitle}
              </h3>
              <div className="order-2 flex shrink-0 flex-row gap-2.5">
                <Button asChild className="h-[32px] rounded-[99px] px-3 py-1 text-[13px] font-medium">
                  <a href={testimonialCta.primaryHref}>{testimonialCta.primaryLabel}</a>
                </Button>
              <Button asChild variant="outline" className="h-[32px] rounded-[99px] border-0 bg-white px-3 py-1 text-[13px] font-medium text-black hover:bg-white/90 hover:text-black">
                  <a href={testimonialCta.secondaryHref} className="text-black">
                    {testimonialCta.secondaryLabel}
                  </a>
                </Button>
              </div>
            </div>
          </div>
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
