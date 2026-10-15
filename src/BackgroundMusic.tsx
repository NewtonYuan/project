import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

export type BackgroundMusicHandle = { start: () => void }

const preferenceKey = 'wedding-music-muted'

function savedMutePreference() {
  try { return localStorage.getItem(preferenceKey) === 'true' }
  catch { return false }
}

function saveMutePreference(muted: boolean) {
  try { localStorage.setItem(preferenceKey, String(muted)) }
  catch { /* Music still works when browser storage is unavailable. */ }
}

const BackgroundMusic = forwardRef<BackgroundMusicHandle, { visible: boolean }>(function BackgroundMusic({ visible }, ref) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [muted, setMuted] = useState(savedMutePreference)
  const [playing, setPlaying] = useState(false)
  const audible = playing && !muted

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = 0.25
  }, [])

  function play() {
    const audio = audioRef.current
    if (audio) void audio.play().catch(() => setPlaying(false))
  }

  // Called directly by the invitation click so browsers permit audio playback.
  useImperativeHandle(ref, () => ({ start: play }), [])

  function toggleMusic() {
    const audio = audioRef.current
    if (!audio) return
    const nextMuted = !audio.paused && !audio.muted
    audio.muted = nextMuted
    setMuted(nextMuted)
    saveMutePreference(nextMuted)
    if (!nextMuted) play()
  }

  return <>
    <audio
      ref={audioRef}
      src="/audio/love-is-a-choice.mp3"
      loop
      preload="none"
      muted={muted}
      onPlaying={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      onError={() => setPlaying(false)}
      onVolumeChange={() => setMuted(audioRef.current?.muted ?? false)}
    />
    {visible && <button
      type="button"
      className="music-toggle"
      onClick={toggleMusic}
      aria-label={audible ? 'Mute background music' : 'Unmute background music'}
      title={`${audible ? 'Mute' : 'Unmute'} music · Love is A Choice — Kris Bowers`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 5 6 9H3v6h3l5 4V5Z" />
        {audible ? <><path d="M15 8a6 6 0 0 1 0 8" /><path d="M18 5a10 10 0 0 1 0 14" /></> : <><path d="m16 9 5 6M21 9l-5 6" /></>}
      </svg>
    </button>}
  </>
})

export default BackgroundMusic
