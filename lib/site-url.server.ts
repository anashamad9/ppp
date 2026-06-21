import { headers } from "next/headers"
import { SITE_URL } from "@/lib/site"

export async function getRequestSiteUrl() {
  const headerList = await headers()
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host")

  if (!host) {
    return SITE_URL
  }

  const protocol =
    headerList.get("x-forwarded-proto") ??
    (host.includes("localhost") || host.startsWith("127.0.0.1") ? "http" : "https")

  return `${protocol}://${host}`
}
