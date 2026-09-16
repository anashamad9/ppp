import { createSign } from 'node:crypto'
import { NextResponse } from 'next/server'

const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const GOOGLE_SHEETS_SCOPE = 'https://www.googleapis.com/auth/spreadsheets'
const GOOGLE_SHEETS_API_BASE = 'https://sheets.googleapis.com/v4/spreadsheets'

type ContactSubmission = {
  language: 'en' | 'ar'
  intent: 'learn' | 'know'
  fullName: string
  companyName: string
  role: string
  roleElse: string
  employees: string
  email: string
  phoneCode: string
  phone: string
  country: string
  details: string
}

function getRequiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required env var: ${name}`)
  }
  return value
}

function encodeBase64Url(value: string | Buffer): string {
  return Buffer.from(value)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

function normalizePrivateKey(rawPrivateKey: string): string {
  let privateKey = rawPrivateKey.trim()
  if (
    (privateKey.startsWith('"') && privateKey.endsWith('"')) ||
    (privateKey.startsWith("'") && privateKey.endsWith("'"))
  ) {
    privateKey = privateKey.slice(1, -1)
  }

  return privateKey.replace(/\r/g, '').replace(/\\n/g, '\n')
}

function createJwt(serviceAccountEmail: string, rawPrivateKey: string): string {
  const now = Math.floor(Date.now() / 1000)
  const header = { alg: 'RS256', typ: 'JWT' }
  const payload = {
    iss: serviceAccountEmail,
    scope: GOOGLE_SHEETS_SCOPE,
    aud: GOOGLE_TOKEN_URL,
    iat: now,
    exp: now + 3600,
  }
  const unsignedToken = `${encodeBase64Url(JSON.stringify(header))}.${encodeBase64Url(JSON.stringify(payload))}`
  const privateKey = normalizePrivateKey(rawPrivateKey)
  const signer = createSign('RSA-SHA256')
  signer.update(unsignedToken)
  signer.end()
  const signature = signer.sign(privateKey)

  return `${unsignedToken}.${encodeBase64Url(signature)}`
}

async function getGoogleAccessToken(): Promise<string> {
  const serviceAccountEmail = getRequiredEnv('GOOGLE_SERVICE_ACCOUNT_EMAIL')
  const privateKey = getRequiredEnv('GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY')
  const assertion = createJwt(serviceAccountEmail, privateKey)

  const body = new URLSearchParams({
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion,
  })

  const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
    cache: 'no-store',
  })

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text()
    throw new Error(`Google token request failed (${tokenResponse.status}): ${errorText}`)
  }

  const tokenData = (await tokenResponse.json()) as { access_token?: string }
  if (!tokenData.access_token) {
    throw new Error('Google token response did not include access_token')
  }

  return tokenData.access_token
}

async function resolveSheetName(spreadsheetId: string, accessToken: string): Promise<string> {
  const explicitName = process.env.GOOGLE_SHEETS_SHEET_NAME?.trim()
  if (explicitName) {
    return explicitName
  }

  const metadataUrl = `${GOOGLE_SHEETS_API_BASE}/${spreadsheetId}?fields=sheets.properties.title`
  const metadataResponse = await fetch(metadataUrl, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  })

  if (!metadataResponse.ok) {
    const errorText = await metadataResponse.text()
    throw new Error(`Google Sheets metadata failed (${metadataResponse.status}): ${errorText}`)
  }

  const metadata = (await metadataResponse.json()) as {
    sheets?: Array<{ properties?: { title?: string } }>
  }
  const firstSheetName = metadata.sheets?.[0]?.properties?.title
  if (!firstSheetName) {
    throw new Error('Spreadsheet has no readable sheet tabs')
  }

  return firstSheetName
}

function validateSubmission(input: unknown): ContactSubmission {
  if (!input || typeof input !== 'object') {
    throw new Error('Invalid payload')
  }
  const data = input as Record<string, unknown>
  const requiredFields: Array<keyof ContactSubmission> = [
    'language',
    'intent',
    'fullName',
    'companyName',
    'role',
    'employees',
    'email',
    'phone',
    'country',
  ]

  for (const field of requiredFields) {
    const value = data[field]
    if (typeof value !== 'string' || value.trim().length === 0) {
      throw new Error(`Missing required field: ${field}`)
    }
  }

  const language = data.language as string
  const intent = data.intent as string
  if (language !== 'en' && language !== 'ar') {
    throw new Error('Invalid language')
  }
  if (intent !== 'learn' && intent !== 'know') {
    throw new Error('Invalid intent')
  }

  const submission: ContactSubmission = {
    language,
    intent,
    fullName: (data.fullName as string).trim(),
    companyName: (data.companyName as string).trim(),
    role: (data.role as string).trim(),
    roleElse: typeof data.roleElse === 'string' ? data.roleElse.trim() : '',
    employees: (data.employees as string).trim(),
    email: (data.email as string).trim(),
    phoneCode: typeof data.phoneCode === 'string' ? data.phoneCode.trim() : '',
    phone: (data.phone as string).trim(),
    country: (data.country as string).trim(),
    details: typeof data.details === 'string' ? data.details.trim() : '',
  }

  return submission
}

async function appendToSheet(submission: ContactSubmission, userAgent: string) {
  const spreadsheetId = getRequiredEnv('GOOGLE_SHEETS_SPREADSHEET_ID')
  const accessToken = await getGoogleAccessToken()
  const sheetName = await resolveSheetName(spreadsheetId, accessToken)
  const range = encodeURIComponent(`${sheetName}!A:Z`)
  const [phoneCountryCode = '', phoneDialCode = ''] = submission.phoneCode.split(':')

  const values = [
    [
      new Date().toISOString(),
      submission.language,
      submission.intent,
      submission.fullName,
      submission.companyName,
      submission.role,
      submission.roleElse,
      submission.employees,
      submission.email,
      phoneCountryCode,
      phoneDialCode,
      submission.phone,
      submission.country,
      submission.details,
      userAgent,
    ],
  ]

  const appendUrl = `${GOOGLE_SHEETS_API_BASE}/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`
  const appendResponse = await fetch(appendUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values }),
    cache: 'no-store',
  })

  if (!appendResponse.ok) {
    const errorText = await appendResponse.text()
    throw new Error(`Google Sheets append failed (${appendResponse.status}): ${errorText}`)
  }
}

function toUserSafeError(message: string): string {
  const normalized = message.toLowerCase()

  if (message.includes('Missing required env var')) {
    return 'Server env vars are missing. Check GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY, and GOOGLE_SHEETS_SPREADSHEET_ID in Vercel.'
  }
  if (
    normalized.includes('pem') ||
    normalized.includes('decoder routines') ||
    normalized.includes('no start line') ||
    normalized.includes('asn1') ||
    normalized.includes('bad base64 decode')
  ) {
    return 'Private key format is invalid. Copy GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY exactly from JSON private_key, keep BEGIN/END lines, and use \\n (not /n).'
  }
  if (message.includes('invalid_grant') || message.includes('Invalid JWT')) {
    return 'Google credentials look invalid. Re-check service account email/private key formatting (use \\n, not /n).'
  }
  if (message.includes('PERMISSION_DENIED') || message.includes('The caller does not have permission')) {
    return 'Google service account has no access to the sheet. Share the sheet with the service account email as Editor.'
  }
  if (message.includes('(404)')) {
    return 'Spreadsheet was not found. Re-check GOOGLE_SHEETS_SPREADSHEET_ID and confirm the sheet exists.'
  }
  if (message.includes('(403)')) {
    return 'Access denied by Google Sheets. Share the sheet with the service account email and make sure Google Sheets API is enabled in the same project.'
  }
  if (message.includes('(400)')) {
    return 'Google rejected the request. Check sheet tab name/range and service account configuration.'
  }
  if (message.includes('Unable to parse range')) {
    return 'Sheet tab name is invalid. Set GOOGLE_SHEETS_SHEET_NAME to an existing tab name.'
  }
  if (message.includes('Spreadsheet has no readable sheet tabs')) {
    return 'Could not find a readable sheet tab. Check sheet permissions and tab visibility.'
  }

  return 'Failed to save submission to Google Sheets.'
}

export async function POST(request: Request) {
  try {
    const payload = validateSubmission(await request.json())
    await appendToSheet(payload, request.headers.get('user-agent') || '')
    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Contact form submission failed:', message)
    return NextResponse.json(
      { ok: false, error: toUserSafeError(message) },
      { status: 500 },
    )
  }
}
