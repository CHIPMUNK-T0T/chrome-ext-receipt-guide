import { getCurrentSiteId } from './siteDetector'
import { showGuideBar, updateGuideBarCount } from './guideBar'
import { highlightReceiptElements, observeAndHighlight } from './highlighter'
import { SITE_CONFIGS } from '../core/sites'
import { loadSettings } from '../core/storage'

function reportBadgeCount(count: number): void {
  chrome.runtime.sendMessage({ type: 'SET_BADGE', count }).catch(() => {
    // popup closed or background not ready — ignore
  })
}

async function initialize(): Promise<void> {
  const siteId = getCurrentSiteId()
  if (!siteId) return

  const settings = await loadSettings()
  const site = SITE_CONFIGS[siteId]

  if (settings.guideEnabled) {
    showGuideBar(site)
  }

  if (settings.highlightEnabled) {
    const count = highlightReceiptElements()
    if (settings.guideEnabled) updateGuideBarCount(count)
    reportBadgeCount(count)

    observeAndHighlight((newCount) => {
      if (settings.guideEnabled) updateGuideBarCount(newCount)
      reportBadgeCount(newCount)
    })
  }
}

void initialize()
