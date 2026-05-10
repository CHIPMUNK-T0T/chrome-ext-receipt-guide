import React, { useEffect, useState } from 'react'
import { ALL_SITES, detectSiteFromUrl } from '../core/sites'
import { SiteConfig, SiteId } from '../core/types'

const FONT =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

function openOrderHistory(site: SiteConfig): void {
  chrome.tabs.create({ url: site.orderHistoryUrl })
}

function openOptions(): void {
  chrome.runtime.openOptionsPage()
}

export default function Popup() {
  const [currentSiteId, setCurrentSiteId] = useState<SiteId | null>(null)

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const url = tabs[0]?.url
      if (url) setCurrentSiteId(detectSiteFromUrl(url))
    })
  }, [])

  const currentSite = currentSiteId ? ALL_SITES.find((s) => s.id === currentSiteId) : null

  return (
    <div
      style={{
        width: 280,
        padding: '16px',
        fontFamily: FONT,
        boxSizing: 'border-box',
      }}
    >
      <h1
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          marginTop: 0,
          marginBottom: '8px',
          color: '#1a1a1a',
        }}
      >
        ECサイト領収書ナビゲーター
      </h1>

      {currentSite ? (
        <>
          <p style={{ fontSize: '12px', color: '#1a73e8', margin: '0 0 12px', lineHeight: 1.5 }}>
            現在 {currentSite.displayName} を開いています
          </p>
          <button
            onClick={() => openOrderHistory(currentSite)}
            style={primaryButtonStyle('#1a73e8')}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1558b0'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1a73e8'
            }}
          >
            {currentSite.displayName} の注文履歴を開く
          </button>
          <div style={{ borderTop: '1px solid #eee', margin: '12px 0' }} />
          <p style={{ fontSize: '11px', color: '#999', margin: '0 0 8px' }}>
            他のサイトを開く
          </p>
        </>
      ) : (
        <p style={{ fontSize: '12px', color: '#666', margin: '0 0 16px', lineHeight: 1.5 }}>
          領収書を取得するECサイトを選択してください
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {ALL_SITES.filter((s) => s.id !== currentSiteId).map((site) => (
          <button
            key={site.id}
            onClick={() => openOrderHistory(site)}
            style={primaryButtonStyle('#0066cc')}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = '#0052a3'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = '#0066cc'
            }}
          >
            {site.displayName}
          </button>
        ))}
      </div>

      <p style={{ fontSize: '11px', color: '#999', margin: '12px 0 0', lineHeight: 1.4 }}>
        ※ 事前に各ECサイトへのログインが必要です
      </p>
      <p style={{ fontSize: '11px', color: '#999', margin: '4px 0 0', lineHeight: 1.4 }}>
        ※ 注文履歴ページを新しいタブで開きます
      </p>

      <div style={{ borderTop: '1px solid #eee', marginTop: '12px', paddingTop: '10px' }}>
        <button
          onClick={openOptions}
          style={{
            background: 'none',
            border: 'none',
            color: '#666',
            cursor: 'pointer',
            fontSize: '12px',
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          ⚙ 設定
        </button>
      </div>
    </div>
  )
}

function primaryButtonStyle(bg: string): React.CSSProperties {
  return {
    padding: '10px 16px',
    backgroundColor: bg,
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background-color 0.15s',
    width: '100%',
  }
}
