import React, { useEffect, useState } from 'react'
import { ExtensionSettings } from '../core/types'
import { loadSettings, saveSettings } from '../core/storage'
import { buildDownloadPath } from '../core/filenameTemplate'

interface SettingRowProps {
  label: string
  description: string
  checked: boolean
  onChange: (value: boolean) => void
}

function SettingRow({ label, description, checked, onChange }: SettingRowProps) {
  return (
    <label
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '12px 0',
        borderBottom: '1px solid #eee',
        cursor: 'pointer',
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ marginTop: '2px', flexShrink: 0 }}
      />
      <div>
        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#1a1a1a' }}>{label}</div>
        <div style={{ fontSize: '12px', color: '#666', marginTop: '2px', lineHeight: 1.4 }}>
          {description}
        </div>
      </div>
    </label>
  )
}

export default function Options() {
  const [settings, setSettings] = useState<ExtensionSettings>({
    guideEnabled: true,
    highlightEnabled: true,
    downloadRenameEnabled: true,
  })
  const [savedMessage, setSavedMessage] = useState('')

  useEffect(() => {
    void loadSettings().then(setSettings)
  }, [])

  const handleChange = (key: keyof ExtensionSettings, value: boolean): void => {
    const updated = { ...settings, [key]: value }
    setSettings(updated)
    void saveSettings(updated).then(() => {
      setSavedMessage('設定を保存しました')
      setTimeout(() => setSavedMessage(''), 2000)
    })
  }

  return (
    <div
      style={{
        maxWidth: '480px',
        margin: '0 auto',
        padding: '24px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '20px', marginTop: 0, marginBottom: '4px', color: '#1a1a1a' }}>
        設定
      </h1>
      <p style={{ fontSize: '13px', color: '#666', marginBottom: '24px' }}>
        ECサイト領収書ナビゲーターの動作設定
      </p>

      <div>
        <SettingRow
          label="ガイドバーを表示する"
          description="対象ECサイト上部に、領収書取得手順の案内を表示します"
          checked={settings.guideEnabled}
          onChange={(v) => handleChange('guideEnabled', v)}
        />
        <SettingRow
          label="領収書関連要素をハイライトする"
          description="「領収書」「注文詳細」などのリンク・ボタンをオレンジ色の枠で目立たせます"
          checked={settings.highlightEnabled}
          onChange={(v) => handleChange('highlightEnabled', v)}
        />
        <SettingRow
          label="ダウンロードファイル名を整理する"
          description="対象ECサイトからPDFをダウンロードするとき、Receipts/{サイト名}/{年月}/ の形式でファイル名を提案します"
          checked={settings.downloadRenameEnabled}
          onChange={(v) => handleChange('downloadRenameEnabled', v)}
        />
        {settings.downloadRenameEnabled && (
          <div
            style={{
              margin: '4px 0 8px 28px',
              padding: '8px 12px',
              backgroundColor: '#f8f9fa',
              borderRadius: '4px',
              fontSize: '12px',
              color: '#555',
              fontFamily: 'monospace',
            }}
          >
            例: {buildDownloadPath('amazon', 'invoice.pdf', new Date())}
          </div>
        )}
      </div>

      {savedMessage && (
        <p
          style={{
            color: '#1a73e8',
            fontSize: '13px',
            marginTop: '16px',
            padding: '8px 12px',
            backgroundColor: '#e8f0fe',
            borderRadius: '4px',
          }}
        >
          ✓ {savedMessage}
        </p>
      )}
    </div>
  )
}
