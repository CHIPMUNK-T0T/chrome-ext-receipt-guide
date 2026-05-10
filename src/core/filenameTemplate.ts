import { SiteId } from './types'
import { SITE_CONFIGS } from './sites'

const UNSAFE_FILENAME_CHARS = /[/\\:*?"<>|]/g

export function sanitizeFilename(name: string): string {
  return name.replace(UNSAFE_FILENAME_CHARS, '_')
}

export function buildDownloadPath(
  siteId: SiteId,
  originalFilename: string,
  date: Date = new Date()
): string {
  const siteName = SITE_CONFIGS[siteId].name
  const yyyy = date.getFullYear().toString()
  const MM = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  const sitePrefix = siteId.toLowerCase()
  const safeOriginal = sanitizeFilename(originalFilename)

  return `Receipts/${siteName}/${yyyy}-${MM}/${sitePrefix}_${yyyy}-${MM}-${dd}_${safeOriginal}`
}
