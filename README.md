# Simple Portfolio

## Local development

Use npm (`npm ci`, then `npm run dev`), matching the CI workflow. Avoid mixing npm and pnpm installs in the same `node_modules` folder.

`.next` contains generated build output and caches and can be removed when reclaiming disk space. The next development session or build recreates it.

Keep original design assets in the local, ignored `source-assets/` folder and serve resized, compressed copies from `public/`. Back up originals separately; they are not included in Git or deployments.

## Article headers and sharing previews

Every published article automatically gets a consistent header at
`/{lang}/articles/{id}/header.svg` and a matching 1200 × 630 PNG at `header.png`.
Article pages and related cards use the SVG; Open Graph, Twitter, and structured
data use the PNG. Both are generated at build time from the same layout, with
bundled Inter / IBM Plex Sans Arabic fonts converted to vector paths for stable
rendering. Headers keep the same colors in light mode, dark mode, and sharing
previews. Each header contains only the white title and description on a blue
background with white dithering that is denser on the left and gradually fades
toward the right.

The header uses the article topic and the first prose paragraph. Add a one-line
`description:` to the article's Markdown frontmatter to override that excerpt;
the same description is used in page metadata. Old `coverImage` and `ogImage`
fields no longer select blog headers or sharing previews.

To publish a new article, add its metadata (`id`, `enabled`, `topic`, `date`,
`readTime`, and `content`) to the relevant `dictionaries/{lang}.json` article list.
Put the Markdown body in `public/articles/{id}-{lang}.md` (`content` can be an
empty string when using Markdown). This filename is discovered automatically;
existing legacy articles keep their historical paths. Include a `# Title` and
optionally a frontmatter `description:`. The normal development/build process
automatically generates both header formats and connects the article's sharing
metadata. No per-article image files, image generation commands, or changes to
the header template or image routes are needed.

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/anashamad9s-projects/v0-simple-portfolio)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/ApU99AShkZi)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Your project is live at:

**[https://vercel.com/anashamad9s-projects/v0-simple-portfolio](https://vercel.com/anashamad9s-projects/v0-simple-portfolio)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/ApU99AShkZi](https://v0.dev/chat/projects/ApU99AShkZi)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
