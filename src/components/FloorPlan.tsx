import type { Floor, PlanDecoration, PlanShape, Zone } from '../types/showroom'

interface FloorPlanProps {
  floor: Floor
  zones: Zone[]
  selectedZoneId: string
  onSelectZone: (zoneId: string) => void
}

const VIEWBOX = { width: 1000, height: 640 }
const LABEL_CHAR_WIDTH = 13.5

/** Splits a label in two lines when it would overflow its room. */
function labelLines(text: string, maxWidth: number): string[] {
  if (text.length * LABEL_CHAR_WIDTH <= maxWidth) return [text]
  const words = text.split(' ')
  const middle = Math.ceil(words.length / 2)
  return [words.slice(0, middle).join(' '), words.slice(middle).join(' ')]
}

const center = (shape: PlanShape) => ({ cx: shape.x + shape.width / 2, cy: shape.y + shape.height / 2 })

function Decoration({ decoration }: { decoration: PlanDecoration }) {
  const { x, y, width, height } = decoration.shape
  const { cx, cy } = center(decoration.shape)

  switch (decoration.kind) {
    case 'footprint':
      return (
        <g>
          <rect x={x} y={y} width={width} height={height} rx={6} fill="url(#hatch)" stroke="#3b5244" strokeWidth={2} />
          <text x={cx} y={cy} textAnchor="middle" className="fill-stone text-[26px] font-semibold tracking-[0.2em] uppercase">
            {decoration.label}
          </text>
          <text x={cx} y={cy + 30} textAnchor="middle" className="fill-stone/70 text-[18px]">
            ver pisos 1 y 2
          </text>
        </g>
      )
    case 'water':
      return <rect x={x} y={y} width={width} height={height} rx={4} fill="url(#water)" opacity={0.85} />
    case 'path':
      return <rect x={x} y={y} width={width} height={height} rx={4} fill="#26332b" stroke="#33463a" strokeDasharray="10 8" />
    case 'stairs': {
      const steps = 8
      return (
        <g>
          <rect x={x} y={y} width={width} height={height} fill="none" stroke="#3b5244" strokeWidth={2} />
          {Array.from({ length: steps - 1 }, (_, index) => {
            const stepX = x + ((index + 1) * width) / steps
            return <line key={index} x1={stepX} y1={y} x2={stepX} y2={y + height} stroke="#3b5244" strokeWidth={1.5} />
          })}
          <text x={cx} y={y + height + 28} textAnchor="middle" className="fill-stone text-[20px]">
            {decoration.label}
          </text>
        </g>
      )
    }
    case 'void':
      return (
        <g>
          <rect x={x} y={y} width={width} height={height} fill="none" stroke="#3b5244" strokeWidth={2} strokeDasharray="12 10" />
          <line x1={x} y1={y} x2={x + width} y2={y + height} stroke="#2c3d33" />
          <line x1={x + width} y1={y} x2={x} y2={y + height} stroke="#2c3d33" />
          <text x={cx} y={cy + 5} textAnchor="middle" className="fill-stone text-[22px]">
            {decoration.label}
          </text>
        </g>
      )
  }
}

export function FloorPlan({ floor, zones, selectedZoneId, onSelectZone }: FloorPlanProps) {
  const isSite = floor.id === 'site'

  return (
    <svg
      viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
      className="h-auto w-full select-none"
      role="group"
      aria-label={`Plano: ${floor.label}`}
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#18241d" strokeWidth="1" />
        </pattern>
        <pattern id="hatch" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="14" height="14" fill="#16211b" />
          <line x1="0" y1="0" x2="0" y2="14" stroke="#22322a" strokeWidth="4" />
        </pattern>
        <linearGradient id="water" x1="0" x2="1">
          <stop offset="0%" stopColor="#1f6f8b" />
          <stop offset="100%" stopColor="#4b3fb5" />
        </linearGradient>
      </defs>

      <rect width={VIEWBOX.width} height={VIEWBOX.height} fill="url(#grid)" />

      {isSite ? (
        <rect x={20} y={20} width={960} height={600} rx={18} fill="none" stroke="#2f4337" strokeWidth={2} strokeDasharray="4 10" />
      ) : (
        <rect x={60} y={60} width={900} height={480} rx={4} fill="#0f1712" stroke="#4a6455" strokeWidth={6} />
      )}

      {floor.decorations.map((decoration, index) => (
        <Decoration key={index} decoration={decoration} />
      ))}

      {zones.map((zone) => {
        const { x, y, width, height } = zone.planShape
        const { cx, cy } = center(zone.planShape)
        const isSelected = zone.id === selectedZoneId
        const lines = labelLines(zone.name, width - 24)

        return (
          <g
            key={zone.id}
            role="button"
            tabIndex={0}
            aria-label={zone.name}
            aria-pressed={isSelected}
            className="group cursor-pointer outline-none"
            onClick={() => onSelectZone(zone.id)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onSelectZone(zone.id)
              }
            }}
          >
            <rect
              x={x}
              y={y}
              width={width}
              height={height}
              rx={6}
              className={
                isSelected
                  ? 'fill-wood/20 stroke-wood'
                  : 'fill-fern/40 stroke-[#4a6455] transition-colors group-hover:fill-fern/80 group-focus-visible:stroke-wood'
              }
              strokeWidth={isSelected ? 3 : 2}
            />
            <circle cx={cx} cy={cy - 22} r={11} className={`hotspot-ring ${isSelected ? 'fill-wood' : 'fill-leaf'}`} />
            <circle cx={cx} cy={cy - 22} r={10} className={isSelected ? 'fill-wood' : 'fill-leaf'} />
            {lines.map((line, index) => (
              <text
                key={line}
                x={cx}
                y={cy + 22 + index * 28}
                textAnchor="middle"
                className={`pointer-events-none text-[25px] font-semibold ${isSelected ? 'fill-wood' : 'fill-mist'}`}
              >
                {line}
              </text>
            ))}
          </g>
        )
      })}
    </svg>
  )
}
