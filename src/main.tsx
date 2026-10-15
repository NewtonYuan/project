import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'motion/react'
import { ReactLenis } from 'lenis/react'
import App from './App'
import { theme } from './theme'
import '@fontsource/cormorant-infant/500.css'
import '@fontsource/cormorant-infant/700.css'
import '@fontsource/lato/400.css'
import '@fontsource/lato/700.css'
import 'lenis/dist/lenis.css'
import './index.css'

for (const [name, value] of Object.entries(theme.colors)) {
  document.documentElement.style.setProperty(`--palette-${name}`, value)
}
document.documentElement.style.setProperty('--site-text', theme.text)

const isMobileTouchViewport = window.innerWidth <= 1024 && window.matchMedia('(pointer: coarse)').matches

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <ReactLenis root options={{
        autoRaf: true,
        anchors: true,
        respectReducedMotion: true,
        smoothWheel: true,
        syncTouch: false,
        lerp: 0.085,
        wheelMultiplier: 0.72,
        touchMultiplier: isMobileTouchViewport ? 0.8 : 1,
      }}>
        <App />
      </ReactLenis>
    </MotionConfig>
  </StrictMode>,
)
