import { SiteConfig, SiteId } from './types'

export const SITE_CONFIGS: Record<SiteId, SiteConfig> = {
  amazon: {
    id: 'amazon',
    name: 'Amazon',
    displayName: 'Amazon.co.jp',
    orderHistoryUrl: 'https://www.amazon.co.jp/gp/css/order-history',
    hostPatterns: ['www.amazon.co.jp'],
    guideMessage: '① 対象の注文を探す → ② 「領収書等」をクリック → ③ 領収書または購入明細書を表示',
    guideMessageDetail: '① 「領収書等」または「購入明細書」ボタンをクリック → ② PDFを表示・保存',
  },
  rakuten: {
    id: 'rakuten',
    name: 'Rakuten',
    displayName: '楽天市場',
    orderHistoryUrl: 'https://order.my.rakuten.co.jp/',
    hostPatterns: ['order.my.rakuten.co.jp', 'my.rakuten.co.jp'],
    guideMessage: '① 対象の注文を探す → ② 「注文詳細」をクリック → ③ 「領収書・請求書」から発行',
    guideMessageDetail: '① 「領収書・請求書」ボタンをクリック → ② PDFを表示・保存',
  },
  yahoo: {
    id: 'yahoo',
    name: 'Yahoo',
    displayName: 'Yahoo!ショッピング',
    orderHistoryUrl: 'https://odhistory.shopping.yahoo.co.jp/cgi-bin/history-list',
    hostPatterns: ['odhistory.shopping.yahoo.co.jp', 'shopping.yahoo.co.jp'],
    guideMessage: '① 対象の注文を探す → ② 注文詳細を開く → ③ 「領収書発行」をクリック',
    guideMessageDetail: '① 「領収書発行」または「明細」ボタンをクリック → ② PDFを表示・保存',
  },
}

export const ALL_SITES: SiteConfig[] = Object.values(SITE_CONFIGS)

const ORDER_DETAIL_PATTERNS: Record<SiteId, RegExp> = {
  amazon: /\/(gp\/product|gp\/css\/summary|dp\/|your-account\/order-details)/,
  // 楽天: order.my.rakuten.co.jp の注文詳細は /?act=order_detail か /orderdetail
  rakuten: /[?&]act=order_detail|\/orderdetail/,
  yahoo: /\/order-detail|\/cgi-bin\/detail/,
}

export function isOrderDetailPage(siteId: SiteId, url: string): boolean {
  try {
    const pathname = new URL(url).pathname
    return ORDER_DETAIL_PATTERNS[siteId].test(pathname)
  } catch {
    return false
  }
}

export function detectSiteFromUrl(url: string): SiteId | null {
  try {
    const hostname = new URL(url).hostname
    for (const site of ALL_SITES) {
      if (
        site.hostPatterns.some(
          (pattern) => hostname === pattern || hostname.endsWith(`.${pattern}`)
        )
      ) {
        return site.id
      }
    }
    return null
  } catch {
    return null
  }
}
