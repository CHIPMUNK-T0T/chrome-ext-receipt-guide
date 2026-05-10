import { describe, it, expect } from 'vitest'
import { detectSiteFromUrl } from '../core/sites'

describe('detectSiteFromUrl', () => {
  it('Amazon.co.jp の注文履歴URLを検出できる', () => {
    expect(detectSiteFromUrl('https://www.amazon.co.jp/gp/css/order-history')).toBe('amazon')
  })

  it('Amazon.co.jp の商品ページURLを検出できる', () => {
    expect(detectSiteFromUrl('https://www.amazon.co.jp/dp/B08N5WRWNW')).toBe('amazon')
  })

  it('楽天市場の購入履歴URLを検出できる', () => {
    expect(detectSiteFromUrl('https://order.my.rakuten.co.jp/')).toBe('rakuten')
  })

  it('Yahoo!ショッピングの注文履歴URLを検出できる', () => {
    expect(
      detectSiteFromUrl('https://odhistory.shopping.yahoo.co.jp/cgi-bin/history-list')
    ).toBe('yahoo')
  })

  it('対象外のURLはnullを返す', () => {
    expect(detectSiteFromUrl('https://www.google.com/')).toBeNull()
  })

  it('不正なURLはnullを返す', () => {
    expect(detectSiteFromUrl('not-a-url')).toBeNull()
  })

  it('空文字はnullを返す', () => {
    expect(detectSiteFromUrl('')).toBeNull()
  })
})
