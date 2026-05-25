# Atmet-Skill: Turn Any Manual Workflow into a Working Automation Plan

Most business teams have the same problem - they know their process is broken, repetitive, and costing them hours every week, but they don't know where to start fixing it. They either overshoot with expensive software or undershoot with a patched-together spreadsheet that nobody trusts.

**Atmet-Skill** is a Claude/Codex-compatible AI skill I built to solve exactly that. It takes any manual workflow you describe and turns it into a structured, actionable, and safe automation plan - complete with implementation artifacts, QA checklists, and risk controls.

---

## What Is a Skill?

In the context of AI agents like Claude or Codex, a **skill** is a packaged set of instructions, templates, and reference documents that teaches the AI how to specialize in a specific domain. Instead of prompting from scratch every time, you install the skill once and the agent immediately knows how to think, what questions to ask, and what outputs to produce for that domain.

Atmet-Skill is a process automation specialist built on top of that concept.

---

## What Atmet-Skill Does

When you bring it a workflow problem, Atmet-Skill works through a structured discovery-to-delivery process:

1. **Understands the current process** - What happens today, who owns each step, what tools are involved.
2. **Identifies automation opportunities** - What can be automated, what should stay manual, and why.
3. **Recommends the right approach** - No-code, low-code, SQL, Python, API integration, or a hybrid, based on your team's actual capability and data volumes.
4. **Designs the automated workflow** - Trigger, inputs, logic, outputs, approval gates.
5. **Produces ready-to-use artifacts:**
   - Process brief
   - Workflow map
   - Automation plan
   - Technical requirements
   - Data mapping tables
   - Email and message templates
   - QA checklist
   - Rollout plan
   - Risk and controls checklist

---

## Who It Is For

- **Operations and finance teams** drowning in manual reporting, approvals, or data handoffs
- **Developers** building internal automations for their company
- **Consultants** who need to deliver structured automation assessments to clients
- **Cross-functional leads** managing onboarding, offboarding, or recurring compliance workflows

---

## The Automation Patterns It Knows

Atmet-Skill covers 12 core automation patterns out of the box:

| Pattern | When to Use |
|---|---|
| Scheduled Report Generation | Recurring KPI or finance reports |
| Email Reminder Workflow | Payment follow-ups, missing-data alerts |
| Approval Workflow | Payouts, invoices, client-facing actions |
| Data Validation Workflow | Source files with frequent errors |
| File Ingestion Workflow | Recurring CSV/XLSX imports |
| Dashboard Refresh Workflow | BI dashboards on batch refresh cycles |
| API Sync Workflow | Cross-system data synchronization |
| Exception Alerting Workflow | Rapid ops awareness of failures |
| Human-in-the-Loop Workflow | Automation with judgment or compliance needs |
| Fraud/Quality Monitoring | Anomaly detection and risk scoring |
| Finance Handoff Workflow | Validated data feeding invoicing or payout |
| Client Communication Workflow | Recurring client updates or issue notifications |

---

## How It Picks the Right Tool

One of the most common automation mistakes is choosing the wrong tool - either too powerful for the job or too fragile to scale. Atmet-Skill follows a clear decision framework:

- **Simple, spreadsheet-based process?** Suggest Apps Script or no-code automation.
- **High data volume or complex logic?** Recommend Python or SQL pipelines.
- **External systems involved?** Design an API or MCP integration approach.
- **Messages or notifications involved?** Draft the message first, auto-send only when explicitly safe and approved.
- **Payments, invoices, or approvals involved?** Add a mandatory review checkpoint.

It knows when to recommend Google Sheets, Zapier, Airtable, Python, BigQuery, GitHub Actions, Slack, or direct APIs - and critically, it knows when *not* to use each one.

---

## Safety First

Atmet-Skill was designed with a hard rule: **prefer human approval before taking any action that could cause harm.**

That means:
- Before sending messages to clients or external parties
- Before updating financial records or payment data
- Before deleting or overwriting any records
- Before changing permissions or access controls

Automation that moves fast and skips controls is not automation - it's a liability. Every plan Atmet-Skill produces includes a risk and controls checklist tailored to the specific workflow.

---

## Quick Start Guide

### Install via npm

```bash
npm install -g atmet-skill
atmet-skill install
```

Or without a global install:

```bash
npx atmet-skill install
```

### Install from source

```bash
git clone <repo-url>
cd atmet-skill
node install.js install
```

### Installation targets

When you run the installer, you can choose where the skill is placed:

| Option | Path | Best For |
|---|---|---|
| Codex user skills (global) | `~/.agents/skills/Atmet-Skill` | Available across all repos |
| Codex repo skills | `./.agents/skills/Atmet-Skill` | Scoped to one repo |
| Claude local skills | `~/.claude/skills/Atmet-Skill` | Claude-based agent setup |
| Custom path | Any path you choose | Advanced setups |

---

## Example Prompts to Try

Once installed, you can start with prompts like these:

```
Map our invoice reminder workflow and propose safe automation with approval gates.
```

```
Convert our weekly KPI reporting steps into a scheduled automation plan and QA checklist.
```

```
Design a supplier data validation workflow with exception handling and audit logging.
```

```
Create onboarding workflow implementation tasks with controls and rollout steps.
```

---

## Customize for Your Company

Every company has different tools, risk tolerances, and approval structures. Atmet-Skill includes a `company-profile-template.md` that you fill in with your specific context - tools in use, KPIs that matter, who approves what, and known risk areas. Once provided in a prompt, all recommendations adapt to your environment automatically.

---

## What Makes This Different

Most automation guides tell you *what* to automate. Atmet-Skill tells you *how* - with specific tooling recommendations, step-by-step workflow designs, and the safety controls that are usually an afterthought. It treats automation as an engineering discipline, not a shortcut.

It also makes a best-effort plan even when details are incomplete, listing its assumptions clearly so you can correct them rather than starting from a blank page.

---

## Repository

The full source, templates, scripts, and reference documents are available on GitHub. The package is also published to npm so you can install it directly without cloning.

```bash
atmet-skill help
atmet-skill validate
atmet-skill uninstall
```

No telemetry. No external API calls during install. No admin or sudo required.

---

Built for teams who want to automate the right things, the right way, with the safety controls that make it stick.
