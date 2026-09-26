import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import { ReactLenis } from 'lenis/react'
import App from './App'
import { theme } from './theme'
import '@fontsource/cormorant-infant/400.css'
import '@fontsource/cormorant-infant/600.css'
import '@fontsource/lato/300.css'
import '@fontsource/lato/700.css'
import 'lenis/dist/lenis.css'
import './index.css'

for (const [name, value] of Object.entries(theme.colors)) {
  document.documentElement.style.setProperty(`--palette-${name}`, value)
}
document.documentElement.style.setProperty('--site-text', theme.text)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={{ autoRaf: true, anchors: true, respectReducedMotion: true }}>
        <App />
      </ReactLenis>
    </MotionConfig>
  </StrictMode>,
)
