import "server-only"
import path from "node:path"
import { Resvg } from "@resvg/resvg-js"
import type { Locale } from "@/i18n-config"
import { getArticleDescription } from "@/lib/article-preview"

export const ARTICLE_IMAGE_WIDTH = 1200
export const ARTICLE_IMAGE_HEIGHT = 630

const font = {
  loadSystemFonts: false,
  fontFiles: [
    path.join(process.cwd(), "lib/fonts/Inter.ttf"),
    path.join(process.cwd(), "lib/fonts/IBMPlexSansArabic-Regular.ttf"),
    path.join(process.cwd(), "lib/fonts/IBMPlexSansArabic-SemiBold.ttf"),
  ],
}

const escapeXml = (value: string) => value.replace(/[<>&"']/g, (character) => ({
  "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;",
}[character]!))

type HeaderArticle = {
  topic: string
  content?: string
  description?: string
}

export function createArticleHeader(article: HeaderArticle, lang: Locale) {
  const isArabic = lang === "ar"
  const family = isArabic ? "IBM Plex Sans Arabic" : "Inter"
  const description = getArticleDescription(article)
  const measurements = new Map<string, number>()

  function text(value: string, size: number, weight = 400, x = 0, y = 100, alignRight = isArabic) {
    // resvg needs an explicit Unicode paragraph direction for mixed Arabic and
    // Latin runs; the SVG direction attribute alone does not set its bidi base.
    const directedValue = isArabic ? `\u202B${value}\u202C` : value
    return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" direction="${isArabic ? "rtl" : "ltr"}" text-anchor="${alignRight ? "end" : "start"}">${escapeXml(directedValue)}</text>`
  }

  function measure(value: string, size: number, weight: number) {
    const key = `${size}:${weight}:${value}`
    if (!measurements.has(key)) {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="4000" height="200">${text(value, size, weight, 1000)}</svg>`
      measurements.set(key, new Resvg(svg, { font }).getBBox()?.width || 0)
    }
    return measurements.get(key)!
  }

  function wrap(value: string, size: number, weight: number, width: number) {
    const lines: string[] = []
    let line = ""
    const unbroken = isArabic
      ? value.replace(/[A-Za-z][A-Za-z0-9]*(?: +[A-Za-z][A-Za-z0-9]*)+/g, (phrase) => phrase.replace(/ /g, "\u00a0"))
      : value
    for (const word of unbroken.split(/[ \t\r\n]+/)) {
      const candidate = line ? `${line} ${word}` : word
      if (measure(candidate, size, weight) <= width) {
        line = candidate
        continue
      }
      if (line) {
        lines.push(line)
        line = ""
      }
      if (measure(word, size, weight) <= width) {
        line = word
        continue
      }
      // Break exceptionally long words/URLs too, without splitting surrogate pairs.
      for (const character of word) {
        if (line && measure(line + character, size, weight) > width) {
          lines.push(line)
          line = ""
        }
        line += character
      }
    }
    if (line) lines.push(line)
    return lines
  }

  let titleSize = isArabic ? 62 : 60
  let titleLines = wrap(article.topic, titleSize, 600, 1020)
  while (titleLines.length > 3 && titleSize > 24) {
    titleSize -= 2
    titleLines = wrap(article.topic, titleSize, 600, 1020)
  }
  const titleLeading = titleSize * 1.28
  const descriptionLines = wrap(description, 26, 400, 1000)
  if (descriptionLines.length > 3) {
    descriptionLines.length = 3
    let last = descriptionLines[2]
    while (measure(`${last}…`, 26, 400) > 1000) last = last.slice(0, -1)
    descriptionLines[2] = `${last.trimEnd()}…`
  }

  const descriptionLeading = 39
  const textHeight = titleSize + (titleLines.length - 1) * titleLeading
    + 42 + (descriptionLines.length - 1) * descriptionLeading
  const titleTop = (ARTICLE_IMAGE_HEIGHT - textHeight) / 2 + titleSize * 0.78
  const titleBottom = titleTop + (titleLines.length - 1) * titleLeading

  // A full-width ordered-dither strip repeats vertically. Its dot density
  // falls smoothly from left to right, using white pixels on blue.
  const bayer = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]]
  const quadrants = [[0, 2], [3, 1]]
  const cellSize = 4
  const columns = ARTICLE_IMAGE_WIDTH / cellSize
  let dither = ""
  for (let row = 0; row < 8; row++) {
    for (let column = 0; column < columns; column++) {
      const density = 0.85 * Math.pow(1 - column / (columns - 1), 1.8)
      const threshold = (4 * bayer[row % 4][column % 4]
        + quadrants[Math.floor(row / 4)][Math.floor((column % 8) / 4)] + 0.5) / 64
      if (threshold < density) {
        dither += `<rect x="${column * cellSize}" y="${row * cellSize}" width="1.5" height="1.5"/>`
      }
    }
  }

  const x = isArabic ? 1120 : 80
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${ARTICLE_IMAGE_WIDTH}" height="${ARTICLE_IMAGE_HEIGHT}" viewBox="0 0 ${ARTICLE_IMAGE_WIDTH} ${ARTICLE_IMAGE_HEIGHT}">
    <defs><pattern id="dither" width="${ARTICLE_IMAGE_WIDTH}" height="32" patternUnits="userSpaceOnUse"><g fill="#fff">${dither}</g></pattern></defs>
    <rect width="1200" height="630" fill="#2563eb"/>
    <rect width="1200" height="630" fill="url(#dither)"/>
    <g fill="#fff">
      ${titleLines.map((line, index) => text(line, titleSize, 600, x, titleTop + index * titleLeading)).join("")}
      ${descriptionLines.map((line, index) => text(line, 26, 400, x, titleBottom + 54 + index * descriptionLeading)).join("")}
    </g>
  </svg>`

  const renderer = new Resvg(svg, { font })
  // Outline the text so the SVG needs no external fonts and Arabic shaping is
  // identical in browsers, downloaded images, and the PNG used by link previews.
  const outlined = renderer.toString().replace("<svg ", '<svg role="img" aria-labelledby="title description" ')
    .replace(/(<svg[^>]*>)/, (root) => `${root}<title id="title">${escapeXml(article.topic)}</title><desc id="description">${escapeXml(description)}</desc>`)
  return { svg: outlined, png: () => new Resvg(outlined, { font: { loadSystemFonts: false } }).render().asPng() }
}
