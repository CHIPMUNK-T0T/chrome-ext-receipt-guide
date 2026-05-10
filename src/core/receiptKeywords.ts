export const RECEIPT_KEYWORDS = [
  '領収書',
  '領収書等',
  '領収書・請求書',
  '購入明細書',
  '適格請求書',
  '注文詳細',
  '明細',
] as const

export type ReceiptKeyword = (typeof RECEIPT_KEYWORDS)[number]

// ヘルプリンクや段落テキストを除外するための最大文字数
export const MAX_HIGHLIGHT_TEXT_LENGTH = 30

export function containsReceiptKeyword(text: string): boolean {
  return RECEIPT_KEYWORDS.some((keyword) => text.includes(keyword))
}
