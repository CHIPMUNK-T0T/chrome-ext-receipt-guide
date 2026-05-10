import { describe, it, expect } from 'vitest'
import { buildDownloadPath, sanitizeFilename } from '../core/filenameTemplate'

describe('sanitizeFilename', () => {
  it('スラッシュをアンダースコアに置換する', () => {
    expect(sanitizeFilename('file/name.pdf')).toBe('file_name.pdf')
  })

  it('バックスラッシュをアンダースコアに置換する', () => {
    expect(sanitizeFilename('file\\name.pdf')).toBe('file_name.pdf')
  })

  it('コロンをアンダースコアに置換する', () => {
    expect(sanitizeFilename('file:name.pdf')).toBe('file_name.pdf')
  })

  it('アスタリスクをアンダースコアに置換する', () => {
    expect(sanitizeFilename('file*name.pdf')).toBe('file_name.pdf')
  })

  it('疑問符をアンダースコアに置換する', () => {
    expect(sanitizeFilename('file?name.pdf')).toBe('file_name.pdf')
  })

  it('不等号をアンダースコアに置換する', () => {
    expect(sanitizeFilename('file<name>.pdf')).toBe('file_name_.pdf')
  })

  it('パイプをアンダースコアに置換する', () => {
    expect(sanitizeFilename('file|name.pdf')).toBe('file_name.pdf')
  })

  it('通常のファイル名はそのまま返す', () => {
    expect(sanitizeFilename('receipt.pdf')).toBe('receipt.pdf')
  })

  it('日本語ファイル名はそのまま返す', () => {
    expect(sanitizeFilename('領収書.pdf')).toBe('領収書.pdf')
  })
})

describe('buildDownloadPath', () => {
  const fixedDate = new Date(2026, 4, 10) // 2026-05-10

  it('Amazonのパスを正しく生成できる', () => {
    expect(buildDownloadPath('amazon', 'receipt.pdf', fixedDate)).toBe(
      'Receipts/Amazon/2026-05/amazon_2026-05-10_receipt.pdf'
    )
  })

  it('楽天市場のパスを正しく生成できる', () => {
    expect(buildDownloadPath('rakuten', 'receipt.pdf', fixedDate)).toBe(
      'Receipts/Rakuten/2026-05/rakuten_2026-05-10_receipt.pdf'
    )
  })

  it('Yahoo!ショッピングのパスを正しく生成できる', () => {
    expect(buildDownloadPath('yahoo', 'receipt.pdf', fixedDate)).toBe(
      'Receipts/Yahoo/2026-05/yahoo_2026-05-10_receipt.pdf'
    )
  })

  it('ファイル名の危険文字をサニタイズする', () => {
    expect(buildDownloadPath('amazon', 'recei:pt.pdf', fixedDate)).toBe(
      'Receipts/Amazon/2026-05/amazon_2026-05-10_recei_pt.pdf'
    )
  })

  it('月と日を2桁でゼロパディングする', () => {
    const jan1 = new Date(2026, 0, 1) // 2026-01-01
    expect(buildDownloadPath('amazon', 'receipt.pdf', jan1)).toBe(
      'Receipts/Amazon/2026-01/amazon_2026-01-01_receipt.pdf'
    )
  })
})
