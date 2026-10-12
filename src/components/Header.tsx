import { Share2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { property } from '../data/casaSelva'

const navItems = [
  { href: '#recorrido', label: 'Recorrido' },
  { href: '#la-casa', label: 'La casa' },
  { href: '#contacto', label: 'Contacto' },
]

export function Header({ onShare }: { onShare: () => void }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        isScrolled ? 'border-b border-fern/60 bg-night/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-8 lg:px-[72px]">
        <a href="#" className="font-display text-[1.6rem] tracking-[0.02em]">
          {property.name}
        </a>
        <nav className="hidden items-center gap-10 text-[13px] tracking-[0.14em] text-mist/85 uppercase md:flex" aria-label="Secciones">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-wood">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onShare}
            className="flex items-center gap-2 rounded-full border border-mist/25 px-4 py-2 text-sm transition-colors hover:border-mist"
          >
            <Share2 className="size-4" />
            <span className="hidden sm:inline">Compartir</span>
          </button>
          <a
            href="#contacto"
            className="rounded-full border border-mist/50 px-5 py-2.5 text-sm tracking-[0.06em] transition-colors hover:border-mist hover:bg-mist hover:text-night"
          >
            <span className="sm:hidden">Agendar</span>
            <span className="hidden sm:inline">Agendar visita privada</span>
          </a>
        </div>
      </div>
    </header>
  )
}
