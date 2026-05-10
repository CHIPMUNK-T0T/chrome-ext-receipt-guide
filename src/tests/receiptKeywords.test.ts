import { describe, it, expect } from 'vitest'
import { containsReceiptKeyword, RECEIPT_KEYWORDS, MAX_HIGHLIGHT_TEXT_LENGTH } from '../core/receiptKeywords'

describe('containsReceiptKeyword', () => {
  it('「領収書」を含むテキストでtrueを返す', () => {
    expect(containsReceiptKeyword('領収書を表示する')).toBe(true)
  })

  it('「領収書等」を含むテキストでtrueを返す', () => {
    expect(containsReceiptKeyword('領収書等')).toBe(true)
  })

  it('「領収書・請求書」を含むテキストでtrueを返す', () => {
    expect(containsReceiptKeyword('領収書・請求書を発行')).toBe(true)
  })

  it('「購入明細書」を含むテキストでtrueを返す', () => {
    expect(containsReceiptKeyword('購入明細書を見る')).toBe(true)
  })

  it('「適格請求書」を含むテキストでtrueを返す', () => {
    expect(containsReceiptKeyword('適格請求書を発行する')).toBe(true)
  })

  it('「注文詳細」を含むテキストでtrueを返す', () => {
    expect(containsReceiptKeyword('注文詳細を見る')).toBe(true)
  })

  it('「明細」を含むテキストでtrueを返す', () => {
    expect(containsReceiptKeyword('明細を確認する')).toBe(true)
  })

  it('「注文履歴」はキーワードから削除されたのでfalseを返す', () => {
    expect(containsReceiptKeyword('注文履歴一覧')).toBe(false)
  })

  it('"注文履歴の見方" のようなヘルプリンクはfalseを返す', () => {
    expect(containsReceiptKeyword('注文履歴の見方')).toBe(false)
  })

  it('キーワードを含まないテキストでfalseを返す', () => {
    expect(containsReceiptKeyword('商品一覧')).toBe(false)
  })

  it('「カートに追加」はfalseを返す', () => {
    expect(containsReceiptKeyword('カートに追加する')).toBe(false)
  })

  it('空文字はfalseを返す', () => {
    expect(containsReceiptKeyword('')).toBe(false)
  })

  it('全キーワードが定義されている', () => {
    expect(RECEIPT_KEYWORDS).toContain('領収書')
    expect(RECEIPT_KEYWORDS).toContain('注文詳細')
    expect(RECEIPT_KEYWORDS).toContain('適格請求書')
  })

  it('「注文履歴」はキーワードリストに含まれない', () => {
    expect(RECEIPT_KEYWORDS).not.toContain('注文履歴')
  })

  it('MAX_HIGHLIGHT_TEXT_LENGTH が正の整数として定義されている', () => {
    expect(MAX_HIGHLIGHT_TEXT_LENGTH).toBeGreaterThan(0)
  })
})
