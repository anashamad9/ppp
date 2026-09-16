import type { Metadata } from "next";
import Home from "../(marketing)/(home)/home-page";

const siteName = "Atmet Technologies";
const siteTitle = "Atmet Technologies";
const siteDescription =
  "Atmet Technologies is an AI Research & Technologies Lab that designs, trains, and deploys advanced AI systems for startups, businesses, and teams.";
const previewImage = "/Preview Eng.png";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  alternates: {
    canonical: "https://atmet.pro",
    languages: {
      en: "https://atmet.pro",
      ar: "/ar",
      "x-default": "https://atmet.pro",
    },
  },
  openGraph: {
    type: "website",
    url: "https://atmet.pro",
    siteName,
    title: siteTitle,
    description: siteDescription,
    locale: "en_US",
    alternateLocale: ["ar_JO"],
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "Atmet Technologies English preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [previewImage],
  },
};

export default function AtmetAIPage() {
  return (
    <Home
      initialLanguage="en"
      showHeroBrandBlock={false}
      showHeroIntegrationStrip={false}
      topNavLogoOverride="Atmet"
      topNavLogoLightSrc="/Atmet%20light%20mode.svg"
      topNavLogoDarkSrc="/Atmet%20dark%20mode.svg"
      topNavHomeHref="/"
      topNavItems={[
        { label: "Features", href: "#features" },
        { label: "Usecases", href: "#usecases" },
        { label: "Integrations", href: "#integrations" },
        { label: "Atmet technologies", href: "https://technologies.atmet.pro/home" },
      ]}
      heroHeadingOverride="Your Business AI Brain."
      heroDescriptionOverride="Atmet connects to the tools your team already uses and let you own and run your agents for all of your departments."
      heroHeadingClassName="text-2xl leading-8 font-medium sm:text-3xl sm:leading-9"
      heroDescriptionPlacement="below"
      heroPrimaryButtonLabel="Join Waitlist"
      heroPrimaryButtonHref="https://app.atmetai.com"
      heroSecondaryButtonLabel="Custom Agent"
      heroSecondaryButtonHref="https://technologies.atmet.pro/home"
      heroButtonsPlacement="afterHeading"
      showIntroSection={false}
      showValueCards={false}
      showShowcaseSection={false}
      contentMaxWidthClass="max-w-5xl"
      imageBoxSection={{
        title: "Own your AI Agent.",
        description:
          "Meta-harnesses, persistent memory, and the infrastructure for agents that actually know your business.",
        rotatingTitles: [
          "Connect your apps.",
          "Train the model knowledge base.",
          "Build and run agents for any type of work.",
        ],
        items: [
          {
            title: "Connect your apps",
            description:
              "Bring your tools, files, CRM, chat, and internal systems into one connected agent workspace.",
          },
          {
            title: "Train the knowledge base",
            description:
              "Teach the model your company knowledge, processes, permissions, and decisions so it understands how you work.",
          },
          {
            title: "Run agents for work",
            description:
              "Build agents for finance, support, sales, operations, engineering, marketing, and any workflow your team repeats.",
          },
        ],
      }}
      bentoSection={{
        title: "Control the agent workspace.",
        description:
          "Choose models, add skills, manage users, connect servers, and keep agents improving around your business.",
        items: [
          {
            title: "Choose any model or connect yours",
            description:
              "Run with leading models, bring your own, or assign the best model for each workflow.",
          },
          {
            title: "Use skills for any task",
            description:
              "Give agents reusable skills for research, documents, reporting, operations, and internal work.",
          },
          {
            title: "Add and control users",
            description:
              "Invite teams, manage workspace access, and control what each user or department can do.",
          },
          {
            title: "Keep your model training",
            description:
              "Update knowledge, retrain behavior, and keep the model aligned as your processes change.",
          },
          {
            title: "Connect any MCP server",
            description:
              "Attach external tools and internal systems through MCP so agents can work with real context.",
          },
          {
            title: "Schedule tasks and set triggers",
            description:
              "Run agents on a schedule, trigger them from events, or start workflows when data changes.",
          },
          {
            title: "Auto self-learning",
            description:
              "Capture outcomes, feedback, and repeated corrections so agents improve over time.",
          },
        ],
      }}
      useCasesSection={{
        title: "Use cases across the business.",
        description:
          "Start with one workflow, prove the value, then expand the same agent foundation across teams.",
        useCases: [
          {
            title: "Finance approvals",
            description:
              "Review requests, check policy, prepare summaries, and route exceptions to the right approver.",
          },
          {
            title: "Customer support triage",
            description:
              "Classify tickets, pull customer context, draft replies, and escalate sensitive cases.",
          },
          {
            title: "Sales follow-ups",
            description:
              "Read notes, prepare next steps, update CRM fields, and remind the team when a deal needs attention.",
          },
          {
            title: "Operations reporting",
            description:
              "Collect updates from tools and teams, find gaps, and produce a clear daily operating summary.",
          },
          {
            title: "Document review",
            description:
              "Scan files against internal rules, flag missing details, and prepare review notes.",
          },
          {
            title: "Internal knowledge search",
            description:
              "Answer from company files, decisions, policies, and previous work with traceable sources.",
          },
          {
            title: "CRM updates",
            description:
              "Turn calls, emails, and notes into clean CRM records without manual copy-paste.",
          },
          {
            title: "Procurement checks",
            description:
              "Compare vendors, validate requests, check budgets, and prepare approval packets.",
          },
          {
            title: "Marketing production",
            description:
              "Generate drafts, organize campaigns, keep brand rules visible, and prepare assets for review.",
          },
          {
            title: "Engineering handoffs",
            description:
              "Summarize requirements, connect tickets to context, and keep status updates consistent.",
          },
        ],
      }}
      integrationsSection={{
        title: "Connect your current stack.",
        description:
          "Agents can read, update, and coordinate work across the systems your team already uses.",
      }}
      ctaBoxSection={{
        title: "Ready to own your AI agent?",
        description:
          "Start with one high-value workflow and build the agent foundation around your real business knowledge, tools, and approvals.",
        primaryLabel: "Talk to Founders",
        primaryHref: "/contact",
        secondaryLabel: "Visit Atmet technologies",
        secondaryHref: "/home",
      }}
    />
  );
}
