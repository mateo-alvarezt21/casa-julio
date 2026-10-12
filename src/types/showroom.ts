// Domain model for a virtual showroom. Each interface maps 1:1 to a future
// Supabase table (properties, floors, zones, media, leads), so local data can
// be swapped for a database query without touching the UI.

export type OperationType = 'sale' | 'rent'

export interface PropertySpecs {
  bedrooms: number | null
  bathrooms: number | null
  builtAreaM2: number | null
  lotAreaM2: number | null
  parkingSpots: number | null
  floors: number | null
}

export interface Property {
  slug: string
  name: string
  headline: string
  summary: string
  operation: OperationType
  /** Null means "price on request". */
  price: number | null
  currency: 'COP' | 'USD'
  location: {
    area: string
    city: string
    /** Public, approximate coordinates — never the exact address. */
    approxLat: number
    approxLng: number
  }
  specs: PropertySpecs
  /** Free-text suffix per spec, e.g. bathrooms: "+ baño de servicio". */
  specNotes?: Partial<Record<keyof PropertySpecs, string>>
  specsDisclaimer?: string
  features: string[]
  heroVideoId: string
  heroPosterId: string
  contact: {
    agentName: string
    /** International format without "+" (e.g. 573001234567). Empty → user picks the chat. */
    whatsappNumber: string
  }
}

export interface PlanShape {
  x: number
  y: number
  width: number
  height: number
}

/** Non-interactive drawing on the plan (house footprint, water, stairs, voids). */
export interface PlanDecoration {
  kind: 'footprint' | 'water' | 'stairs' | 'void' | 'path'
  shape: PlanShape
  label?: string
}

export interface Floor {
  id: string
  propertySlug: string
  label: string
  shortLabel: string
  sortOrder: number
  decorations: PlanDecoration[]
}

export interface LightVariant {
  label: string
  /** CSS color used for the swatch. */
  swatch: string
  mediaId: string
}

export interface Zone {
  id: string
  floorId: string
  name: string
  tagline: string
  description: string
  highlights: string[]
  /** Rectangle on the schematic floor plan (viewBox 0 0 1000 640). */
  planShape: PlanShape
  mediaIds: string[]
  videoId?: string
  lightVariants?: LightVariant[]
  /** Gaussian splat scene (.ply / .splat / .spz) — roadmap step 2. */
  splatUrl?: string
}

/** One clip of the rotating hero reel. */
export interface HeroReelItem {
  videoId: string
  label: string
  zoneId: string
}

export type MediaKind = 'image' | 'video'

export interface MediaAsset {
  id: string
  kind: MediaKind
  alt: string
}

export type LeadInterest = 'visit' | 'price' | 'info'

export interface Lead {
  id: string
  propertySlug: string
  name: string
  phone: string
  email: string
  interest: LeadInterest
  message: string
  zoneId: string | null
  brokerRef: string | null
  createdAt: string
}
