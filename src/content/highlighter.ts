import { containsReceiptKeyword, MAX_HIGHLIGHT_TEXT_LENGTH } from '../core/receiptKeywords'

const HIGHLIGHT_CLASS = 'ec-receipt-navigator-highlight'
const STYLE_ID = 'ec-receipt-navigator-styles'
const OBSERVER_DEBOUNCE_MS = 400

function injectStyles(): void {
  if (document.getElementById(STYLE_ID)) return

  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = `
    .${HIGHLIGHT_CLASS} {
      outline: 2px solid #ff6600 !important;
      outline-offset: 2px !important;
      background-color: rgba(255, 102, 0, 0.08) !important;
    }
  `
  document.head.appendChild(style)
}

export function highlightReceiptElements(): number {
  injectStyles()

  let count = 0
  const elements = document.querySelectorAll<HTMLAnchorElement | HTMLButtonElement>('a, button')
  elements.forEach((el) => {
    const text = el.textContent?.trim() ?? ''
    if (text.length <= MAX_HIGHLIGHT_TEXT_LENGTH && containsReceiptKeyword(text)) {
      el.classList.add(HIGHLIGHT_CLASS)
      count++
    }
  })
  return count
}

export function removeHighlights(): void {
  document.querySelectorAll(`.${HIGHLIGHT_CLASS}`).forEach((el) => {
    el.classList.remove(HIGHLIGHT_CLASS)
  })
}

// DOM変更を監視し、新しい要素が追加されたときに再ハイライトする（SPA対応）
export function observeAndHighlight(onCount?: (count: number) => void): () => void {
  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  const observer = new MutationObserver((mutations) => {
    const hasNewNodes = mutations.some((m) => m.addedNodes.length > 0)
    if (!hasNewNodes) return

    if (debounceTimer !== null) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      const count = highlightReceiptElements()
      onCount?.(count)
    }, OBSERVER_DEBOUNCE_MS)
  })

  observer.observe(document.body, { childList: true, subtree: true })

  return () => {
    if (debounceTimer !== null) clearTimeout(debounceTimer)
    observer.disconnect()
  }
}
