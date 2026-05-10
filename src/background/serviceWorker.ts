import { detectSiteFromUrl } from '../core/sites'
import { buildDownloadPath } from '../core/filenameTemplate'
import { loadSettings } from '../core/storage'

chrome.runtime.onMessage.addListener((message: { type: string; count: number }, sender) => {
  if (message.type !== 'SET_BADGE') return
  const tabId = sender.tab?.id
  if (tabId == null) return
  const text = message.count > 0 ? String(message.count) : ''
  chrome.action.setBadgeText({ text, tabId })
  chrome.action.setBadgeBackgroundColor({ color: '#ff6600', tabId })
})

type FilenameListener = (
  downloadItem: chrome.downloads.DownloadItem,
  suggest: (suggestion?: chrome.downloads.DownloadFilenameSuggestion) => void
) => boolean | void

const handleDeterminingFilename: FilenameListener = (downloadItem, suggest) => {
  if (!downloadItem.filename.toLowerCase().endsWith('.pdf')) {
    suggest()
    return
  }

  const referrer = downloadItem.referrer
  if (!referrer) {
    suggest()
    return
  }

  const siteId = detectSiteFromUrl(referrer)
  if (!siteId) {
    suggest()
    return
  }

  void loadSettings().then((settings) => {
    if (!settings.downloadRenameEnabled) {
      suggest()
      return
    }
    const newPath = buildDownloadPath(siteId, downloadItem.filename, new Date())
    suggest({ filename: newPath, conflictAction: 'uniquify' })
  })

  // Chrome の非同期 suggest を使うために true を返す
  return true
}

chrome.downloads.onDeterminingFilename.addListener(
  handleDeterminingFilename as Parameters<
    typeof chrome.downloads.onDeterminingFilename.addListener
  >[0]
)
