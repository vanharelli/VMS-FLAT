import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/core.css'
import './styles/animations_led.css'
import App from './App.tsx'
import { installSecurityGuards } from './logic/securityGuards'

installSecurityGuards()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
