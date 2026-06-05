type GuardOptions = {
  blockContextMenu?: boolean
  blockDevtoolsShortcuts?: boolean
  blockCopyPaste?: boolean
}

const defaultOptions: Required<GuardOptions> = {
  blockContextMenu: true,
  blockDevtoolsShortcuts: true,
  blockCopyPaste: true,
}

function isBlockedShortcut(e: KeyboardEvent) {
  if (e.key === 'F12') return true

  const key = e.key.toLowerCase()
  if (e.ctrlKey && key === 'u') return true
  if (e.ctrlKey && e.shiftKey && (key === 'i' || key === 'j' || key === 'c')) return true

  return false
}

export function installSecurityGuards(options: GuardOptions = {}) {
  const finalOptions = { ...defaultOptions, ...options }
  const w = window as unknown as { __vms_security_guards_installed?: boolean }

  if (w.__vms_security_guards_installed) return
  w.__vms_security_guards_installed = true

  if (finalOptions.blockContextMenu) {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })
  }

  if (finalOptions.blockDevtoolsShortcuts) {
    document.addEventListener('keydown', (e) => {
      if (!isBlockedShortcut(e)) return
      e.preventDefault()
      e.stopPropagation()
    })
  }

  if (finalOptions.blockCopyPaste) {
    const block = (e: Event) => {
      e.preventDefault()
    }

    document.addEventListener('copy', block)
    document.addEventListener('cut', block)
    document.addEventListener('paste', block)
    document.addEventListener('selectstart', block)
    document.addEventListener('dragstart', block)
  }
}
