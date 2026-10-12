import { Check, Copy, X } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useRef, useState } from 'react'
import { property } from '../data/casaSelva'
import { whatsappShareUrl } from '../lib/whatsapp'

export function ShareDialog({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const shareUrl = window.location.href

  useEffect(() => {
    // No close() in cleanup: it fires the dialog's `close` event, which would
    // call onClose and unmount the dialog under StrictMode's double effects.
    const dialog = dialogRef.current
    if (dialog && !dialog.open) dialog.showModal()
  }, [])

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => event.target === dialogRef.current && onClose()}
      className="fixed inset-0 m-auto h-fit max-h-[92svh] w-[min(92vw,26rem)] overflow-y-auto rounded-[4px] border border-fern bg-forest p-0 text-mist backdrop:bg-black/70"
      aria-labelledby="share-title"
    >
      <div className="flex flex-col items-center gap-5 p-7 text-center">
        <button type="button" onClick={onClose} className="absolute top-3 right-3 rounded-full p-2 hover:bg-fern" aria-label="Cerrar">
          <X className="size-5" />
        </button>
        <h2 id="share-title" className="font-display text-3xl">
          Compartir {property.name}
        </h2>
        <p className="text-sm text-stone">Escanea el código o envía el enlace. Se abrirá en el espacio que estás viendo.</p>
        <div className="rounded-[4px] bg-mist p-4">
          <QRCodeSVG value={shareUrl} size={200} bgColor="#ece7dd" fgColor="#0a0e0c" level="M" />
        </div>
        <div className="flex w-full flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={copyLink}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-fern px-4 py-2.5 text-sm hover:border-stone"
          >
            {copied ? <Check className="size-4 text-leaf" /> : <Copy className="size-4" />}
            {copied ? 'Enlace copiado' : 'Copiar enlace'}
          </button>
          <a
            href={whatsappShareUrl(`Mira ${property.name}: ${property.headline.toLowerCase()} ${shareUrl}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center rounded-full bg-wood px-4 py-2.5 text-sm font-semibold text-night hover:bg-mist"
          >
            Enviar por WhatsApp
          </a>
        </div>
      </div>
    </dialog>
  )
}
