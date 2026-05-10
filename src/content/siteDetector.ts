import { SiteId } from '../core/types'
import { detectSiteFromUrl } from '../core/sites'

export function getCurrentSiteId(): SiteId | null {
  return detectSiteFromUrl(window.location.href)
}
