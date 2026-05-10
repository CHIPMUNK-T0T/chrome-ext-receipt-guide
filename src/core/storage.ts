import { ExtensionSettings } from './types'

const SETTINGS_KEY = 'extensionSettings'

export const DEFAULT_SETTINGS: ExtensionSettings = {
  guideEnabled: true,
  highlightEnabled: true,
  downloadRenameEnabled: true,
}

export async function loadSettings(): Promise<ExtensionSettings> {
  return new Promise((resolve) => {
    chrome.storage.local.get(SETTINGS_KEY, (result) => {
      const saved = result[SETTINGS_KEY] as Partial<ExtensionSettings> | undefined
      resolve({ ...DEFAULT_SETTINGS, ...saved })
    })
  })
}

export async function saveSettings(settings: Partial<ExtensionSettings>): Promise<void> {
  const current = await loadSettings()
  return new Promise((resolve) => {
    chrome.storage.local.set({ [SETTINGS_KEY]: { ...current, ...settings } }, resolve)
  })
}
