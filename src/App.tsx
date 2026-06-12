import { useEffect, useRef } from 'react'
import HomeScreen from './screens/HomeScreen'

function App() {
  const pullRef = useRef<HTMLDivElement | null>(null)
  const pullTextRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onTouchBlockZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault()
    }

    const opts: AddEventListenerOptions = { passive: false }
    window.addEventListener('touchstart', onTouchBlockZoom, opts)
    window.addEventListener('touchmove', onTouchBlockZoom, opts)

    const pullEl = pullRef.current
    const pullTextEl = pullTextRef.current
    if (!pullEl || !pullTextEl) {
      return () => {
        window.removeEventListener('touchstart', onTouchBlockZoom, opts)
        window.removeEventListener('touchmove', onTouchBlockZoom, opts)
      }
    }

    let tracking = false
    let startX = 0
    let startY = 0
    let activeTouchId: number | null = null
    let armed = false
    let dragging = false

    const threshold = 150
    const maxDrag = 240

    const setPullState = (state: 'idle' | 'pull' | 'armed' | 'loading') => {
      pullEl.dataset.state = state
      if (state === 'idle') pullTextEl.textContent = 'Puxe para atualizar'
      if (state === 'pull') pullTextEl.textContent = 'Puxe para atualizar'
      if (state === 'armed') pullTextEl.textContent = 'Solte para atualizar'
      if (state === 'loading') pullTextEl.textContent = 'Atualizando…'
    }

    const setPullTranslate = (dragPx: number, withTransition: boolean) => {
      const clamped = Math.max(0, Math.min(maxDrag, dragPx))
      const y = -64 + clamped
      pullEl.style.transition = withTransition ? 'transform 220ms ease, opacity 220ms ease' : 'none'
      pullEl.style.opacity = clamped > 0 ? '1' : '0'
      pullEl.style.transform = `translate(-50%, ${y}px)`
    }

    const resetPull = (withTransition: boolean) => {
      armed = false
      dragging = false
      tracking = false
      activeTouchId = null
      setPullState('idle')
      setPullTranslate(0, withTransition)
    }

    resetPull(false)

    const findActiveTouch = (touches: TouchList) => {
      if (activeTouchId === null) return null
      for (let i = 0; i < touches.length; i += 1) {
        const t = touches.item(i)
        if (t && t.identifier === activeTouchId) return t
      }
      return null
    }

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return
      if (window.scrollY > 0) return
      const t = e.touches.item(0)
      if (!t) return
      tracking = true
      armed = false
      dragging = false
      activeTouchId = t.identifier
      startX = t.clientX
      startY = t.clientY
      setPullState('pull')
      setPullTranslate(0, false)
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!tracking) return
      if (e.touches.length !== 1) return
      if (window.scrollY > 0) {
        resetPull(true)
        return
      }

      const t = findActiveTouch(e.touches)
      if (!t) return

      const dx = t.clientX - startX
      const dy = t.clientY - startY

      if (dy <= 0) {
        resetPull(true)
        return
      }

      if (Math.abs(dx) > dy * 0.9) {
        resetPull(true)
        return
      }

      dragging = true
      e.preventDefault()

      const resisted = dy * 0.55 + Math.min(30, Math.max(0, dy - 160) * 0.08)
      const dist = Math.min(maxDrag, resisted)

      setPullTranslate(dist, false)

      if (dist >= threshold && !armed) {
        armed = true
        setPullState('armed')
      } else if (dist < threshold && armed) {
        armed = false
        setPullState('pull')
      }
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (!tracking) return
      if (!dragging) {
        resetPull(true)
        return
      }

      if (armed && e.touches.length === 0) {
        setPullState('loading')
        setPullTranslate(threshold, true)
        window.setTimeout(() => {
          window.location.reload()
        }, 80)
        return
      }

      resetPull(true)
    }

    window.addEventListener('touchstart', onTouchStart, opts)
    window.addEventListener('touchmove', onTouchMove, opts)
    window.addEventListener('touchend', onTouchEnd, opts)
    window.addEventListener('touchcancel', onTouchEnd, opts)

    return () => {
      window.removeEventListener('touchstart', onTouchBlockZoom, opts)
      window.removeEventListener('touchmove', onTouchBlockZoom, opts)
      window.removeEventListener('touchstart', onTouchStart, opts)
      window.removeEventListener('touchmove', onTouchMove, opts)
      window.removeEventListener('touchend', onTouchEnd, opts)
      window.removeEventListener('touchcancel', onTouchEnd, opts)
    }
  }, [])

  return (
    <div className="app-viewport w-full">
      <div className="pull-refresh" ref={pullRef} aria-hidden="true">
        <div className="pull-refresh-inner">
          <div className="pull-refresh-spinner" />
          <div className="pull-refresh-text" ref={pullTextRef} />
        </div>
      </div>
      <HomeScreen />
    </div>
  )
}

export default App
