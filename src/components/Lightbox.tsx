import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect } from 'react'
import { imageUrl, mediaAlt } from '../lib/media'

interface LightboxProps {
  imageIds: string[]
  index: number
  onIndexChange: (index: number) => void
  onClose: () => void
}

export function Lightbox({ imageIds, index, onIndexChange, onClose }: LightboxProps) {
  const count = imageIds.length
  const go = (step: number) => onIndexChange((index + step + count) % count)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onIndexChange((index + 1) % count)
      if (event.key === 'ArrowLeft') onIndexChange((index - 1 + count) % count)
    }
    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [index, count, onClose, onIndexChange])

  const id = imageIds[index]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Galería ampliada"
      onClick={onClose}
    >
      <img
        src={imageUrl(id)}
        alt={mediaAlt(id)}
        className="max-h-full max-w-full rounded-lg object-contain"
        onClick={(event) => event.stopPropagation()}
      />
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 rounded-full bg-white/10 p-3 hover:bg-white/20"
        aria-label="Cerrar"
      >
        <X className="size-5" />
      </button>
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              go(-1)
            }}
            className="absolute left-3 rounded-full bg-white/10 p-3 hover:bg-white/20"
            aria-label="Anterior"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              go(1)
            }}
            className="absolute right-3 rounded-full bg-white/10 p-3 hover:bg-white/20"
            aria-label="Siguiente"
          >
            <ChevronRight className="size-6" />
          </button>
          <p className="absolute bottom-5 text-sm text-stone">
            {index + 1} / {count}
          </p>
        </>
      )}
    </div>
  )
}
