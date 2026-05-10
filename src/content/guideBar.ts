import { SiteConfig } from '../core/types'
import { isOrderDetailPage } from '../core/sites'

const GUIDE_BAR_ID = 'ec-receipt-navigator-guide-bar'
const GUIDE_BAR_COUNT_ID = 'ec-receipt-navigator-count'

export function showGuideBar(site: SiteConfig): void {
  if (document.getElementById(GUIDE_BAR_ID)) return

  const isDetail = isOrderDetailPage(site.id, window.location.href)
  const message = isDetail ? site.guideMessageDetail : site.guideMessage

  const bar = document.createElement('div')
  bar.id = GUIDE_BAR_ID
  Object.assign(bar.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    zIndex: '2147483647',
    backgroundColor: '#1a73e8',
    color: 'white',
    padding: '10px 16px',
    fontSize: '13px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    lineHeight: '1.5',
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    boxSizing: 'border-box',
  })

  const left = document.createElement('div')
  left.style.display = 'flex'
  left.style.alignItems = 'center'
  left.style.gap = '12px'
  left.style.minWidth = '0'

  const messageSpan = document.createElement('span')
  messageSpan.textContent = message
  messageSpan.style.overflow = 'hidden'
  messageSpan.style.textOverflow = 'ellipsis'
  messageSpan.style.whiteSpace = 'nowrap'

  const countBadge = document.createElement('span')
  countBadge.id = GUIDE_BAR_COUNT_ID
  countBadge.style.cssText = [
    'display:none',
    'background:rgba(255,255,255,0.25)',
    'borderRadius:12px',
    'padding:2px 8px',
    'fontSize:12px',
    'whiteSpace:nowrap',
    'flexShrink:0',
  ].join(';')

  left.appendChild(messageSpan)
  left.appendChild(countBadge)

  const closeBtn = document.createElement('button')
  closeBtn.textContent = '✕'
  closeBtn.setAttribute('aria-label', '閉じる')
  Object.assign(closeBtn.style, {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '0',
    flexShrink: '0',
    lineHeight: '1',
  })
  closeBtn.addEventListener('click', () => bar.remove())

  bar.appendChild(left)
  bar.appendChild(closeBtn)

  if (document.body) {
    document.body.prepend(bar)
  }
}

export function updateGuideBarCount(count: number): void {
  const badge = document.getElementById(GUIDE_BAR_COUNT_ID)
  if (!badge) return
  if (count > 0) {
    badge.textContent = `領収書リンク ${count} 件`
    badge.style.display = 'inline'
  } else {
    badge.style.display = 'none'
  }
}

export function hideGuideBar(): void {
  document.getElementById(GUIDE_BAR_ID)?.remove()
}
