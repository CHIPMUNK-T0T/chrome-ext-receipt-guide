export type SiteId = 'amazon' | 'rakuten' | 'yahoo'

export interface SiteConfig {
  id: SiteId
  name: string
  displayName: string
  orderHistoryUrl: string
  hostPatterns: string[]
  guideMessage: string
  guideMessageDetail: string
}

export interface ExtensionSettings {
  guideEnabled: boolean
  highlightEnabled: boolean
  downloadRenameEnabled: boolean
}
