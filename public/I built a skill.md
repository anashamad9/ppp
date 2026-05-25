# Atmet-Skill

`atmet-skill` is a reusable Codex/Claude-compatible skill project for turning manual workflows into practical automation plans, implementation artifacts, and safe rollout checklists.

## What This Skill Does

- Discovers and maps current manual workflows.
- Identifies what should be automated vs kept manual.
- Recommends implementation approaches and tools.
- Produces documentation, QA checklists, and risk controls.
- Provides reusable templates for delivery and team alignment.

## Who It Is For

- Developers building internal automations.
- Consultants improving client operations.
- Operations, finance, reporting, and cross-functional teams.

## When To Use It

Use it for workflow/process automation tasks such as:
- Reporting workflows
- Approval workflows
- Data validation workflows
- Onboarding/offboarding workflows
- Internal handoff workflows

Do not use it for unrelated general coding tasks.

## What It Can Generate

- Process briefs
- Workflow maps
- Automation plans
- Technical requirements
- Data mapping tables
- Message/email drafts
- QA checklists
- Rollout plans
- Risk/control checklists

## Install

### Option A: Install from npm (published package)

```bash
npm install -g atmet-skill
atmet-skill install
```

Or run without global install:

```bash
npx atmet-skill install
```

### Option B: Install from local repo clone (developer setup)

```bash
git clone <YOUR_REPO_URL>
cd atmet-skill
node install.js install
```

### Option C: Manual copy

Copy `skills/Atmet-Skill` into your agent skills directory.

## Install Target Choices (Important)

When you run `atmet-skill install`, you will see 4 choices:

1. `Codex user skills (global)`
- Installs to `~/.agents/skills/Atmet-Skill`
- Available across repos on this machine

2. `Codex repo skills (current repo only)`
- Installs to `./.agents/skills/Atmet-Skill`
- Best when Codex is configured to locate skills in repo

3. `Claude local skills (global for Claude)`
- Installs to `~/.claude/skills/Atmet-Skill`

4. `Custom path`
- Installs to any path you choose

## CLI Commands

```bash
atmet-skill install
atmet-skill uninstall
atmet-skill validate
atmet-skill help
```

## Usage With Codex

1. Install the skill (user-level or repo-level).
2. Start a new Codex session.
3. Ask process automation prompts, for example:

```text
Analyze our monthly reporting workflow and produce an automation plan with QA controls.
```

If Codex says it only scans repo skills, install using option `2` (repo skills).

## Usage With Claude

1. Install/copy `Atmet-Skill` into Claude’s skills path.
2. Ensure `SKILL.md` and `references/` are present.
3. Prompt with workflow/process automation requests.

## Customize For A Company

1. Start with `skills/Atmet-Skill/references/company-profile-template.md`.
2. Fill in tools, KPIs, approvals, and risk areas.
3. Include that profile in prompts.

Optional example profile:
- `skills/Atmet-Skill/references/example-company-profile-regional-services.md`

## Uninstall

```bash
atmet-skill uninstall
```

Safety behavior:
- Interactive confirmation required
- Only removes folder named `Atmet-Skill`

## Security And Privacy Notes

- Installer/uninstaller use local file operations only.
- No telemetry.
- No external API calls.
- No sudo/admin required.
- Review generated automation outputs before production use.

## Validation

```bash
npm run validate
npm test
```

## Automated Releases (GitHub + npm)

This repo uses Changesets + GitHub Actions for automated versioning and npm publishing.

### One-time setup

1. In npm, create an Automation token.
2. In GitHub repo settings, add Actions secret:
- `NPM_TOKEN` = npm automation token
3. Use `main` (or `master`) as release branch.

### Developer release flow

1. Make code/doc changes.
2. Create changeset:

```bash
npm install
npm run changeset
```

3. Commit `.changeset/*.md` with your PR.
4. Merge PR to `main` (or `master`).
5. GitHub Action auto-runs:
- `changeset version`
- commits version/changelog updates
- publishes to npm

No manual release PR merge is required in this setup.

## Example Prompts

- "Map our invoice reminder workflow and propose safe automation with approval gates."
- "Convert our weekly KPI reporting steps into a scheduled automation plan and QA checklist."
- "Design a supplier data validation workflow with exception handling and audit logging."
- "Create onboarding workflow implementation tasks with controls and rollout steps."

## Repository Structure

```text
atmet-skill/
  README.md
  LICENSE
  package.json
  install.js
  uninstall.js
  .gitignore
  .codex-plugin/
    plugin.json
  .changeset/
    config.json
  .github/
    workflows/
      ci.yml
      release.yml
  skills/
    Atmet-Skill/
      SKILL.md
      references/
      scripts/
      assets/
  tests/
```

Plugin note: `.codex-plugin/plugin.json` points to `../skills/` relative to the manifest. Adjust if your marketplace/package layout differs.
