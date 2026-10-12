import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from 'react'

/** Seconds each clip stays on screen before crossfading to the next one. */
const CLIP_SECONDS = 8

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Autoplay blocked by the browser → show the paused state; other rejections are just interrupted loads. */
function playSafely(video: HTMLVideoElement, onBlocked: () => void) {
  video.play().catch((error: DOMException) => {
    if (error.name === 'NotAllowedError') onBlocked()
  })
}

/** Drives the rotating hero reel: which clip plays, its progress and play/pause. */
export function useHeroReel(count: number) {
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(() => !prefersReducedMotion())
  const videos = useRef<Array<HTMLVideoElement | null>>([])
  const activeIndex = useRef(index)

  useEffect(() => {
    activeIndex.current = index
  }, [index])

  const goTo = useCallback((target: number) => {
    setIndex((target + count) % count)
    setProgress(0)
  }, [count])

  const next = useCallback(() => {
    setIndex((current) => (current + 1) % count)
    setProgress(0)
  }, [count])

  useEffect(() => {
    videos.current.forEach((video, videoIndex) => {
      if (!video) return
      if (videoIndex === index) {
        video.currentTime = 0
        if (isPlaying) playSafely(video, () => setIsPlaying(false))
      } else {
        // Let the outgoing clip keep moving during the crossfade, then stop it.
        window.setTimeout(() => {
          if (activeIndex.current !== videoIndex) video.pause()
        }, 1500)
      }
    })
  }, [index]) // eslint-disable-line react-hooks/exhaustive-deps -- play state handled below

  useEffect(() => {
    const video = videos.current[index]
    if (!video) return
    if (isPlaying) playSafely(video, () => setIsPlaying(false))
    else video.pause()
  }, [isPlaying]) // eslint-disable-line react-hooks/exhaustive-deps -- only react to play toggles

  // Resume when the tab becomes visible again (browsers may skip a play() issued while hidden).
  useEffect(() => {
    const onVisibilityChange = () => {
      const video = videos.current[activeIndex.current]
      if (document.visibilityState === 'visible' && isPlaying && video?.paused) playSafely(video, () => setIsPlaying(false))
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [isPlaying])

  /** Fallback for the first clip: start it as soon as it has data, if it is still paused. */
  const onCanPlay = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      if (isPlaying && event.currentTarget.paused) playSafely(event.currentTarget, () => setIsPlaying(false))
    },
    [isPlaying],
  )

  const onTimeUpdate = useCallback(
    (event: SyntheticEvent<HTMLVideoElement>) => {
      const video = event.currentTarget
      const clipLength = Math.min(CLIP_SECONDS, video.duration || CLIP_SECONDS)
      const ratio = video.currentTime / clipLength
      setProgress(Math.min(ratio, 1))
      if (ratio >= 1) next()
    },
    [next],
  )

  const registerVideo = useCallback(
    (videoIndex: number) => (element: HTMLVideoElement | null) => {
      videos.current[videoIndex] = element
    },
    [],
  )

  return {
    index,
    nextIndex: (index + 1) % count,
    progress,
    isPlaying,
    togglePlaying: () => setIsPlaying((playing) => !playing),
    goTo,
    next,
    onCanPlay,
    onTimeUpdate,
    registerVideo,
  }
}
