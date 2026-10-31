# PPP personal website

Use npm for this repository. Preserve the site's monochrome design with blue
article headers, and its Arabic and English support. The separate
`Baz-Intelligence-website/` directory is not
the PPP personal website.

## Creating or editing articles

- Register each new article in the appropriate `dictionaries/en.json` and/or
  `dictionaries/ar.json` article list. Use a unique numeric `id` and the existing
  metadata fields: `enabled`, `topic`, `date`, `readTime`, and `content`.
- For a Markdown article, use `public/articles/{id}-{lang}.md`, with a `# Title`.
  The loader discovers that filename automatically. JSON `content` may be an
  empty string when the Markdown file supplies the body. Existing articles may
  use legacy filenames registered in `lib/dictionaries.ts`.
- Write a concise one-line `description:` in Markdown frontmatter when useful.
  Without one, the first prose paragraph supplies the description automatically.
- Headers and shared-link previews are automatic for every enabled article:
  `/{lang}/articles/{id}/header.svg` and the matching `header.png`. Do not create
  individual cover images or set `coverImage`, `ogImage`, or `coverAlt` overrides.
- Keep the shared header in `lib/article-header.server.ts`: full-background
  white dithering on a blue background that is denser on the left and fades
  toward the right, white title and description only, with no author, dates,
  article numbers, logos, or other labels. Keep article-image corners subtle.
  Keep these same colors in light mode, dark mode, and sharing previews.
- Keep Open Graph, Twitter, and Article structured data connected to the
  generated PNG; on-site headers and related cards use the generated SVG.
- Run `npm run build` after article changes. The build discovers enabled
  articles and generates both image formats without a separate generation step.
