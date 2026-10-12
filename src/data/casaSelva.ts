import type { Floor, HeroReelItem, MediaAsset, Property, Zone } from '../types/showroom'

// TODO(pilot): "Casa Selva" is a working name and the agent name is a placeholder.
export const property: Property = {
  slug: 'casa-selva',
  name: 'Casa Selva',
  headline: 'Hacienda de dos niveles con paisajismo inigualable',
  summary:
    'Finca de dos niveles en Copacabana, al norte de Medellín: 1.000 m² construidos sobre un lote de 9.000 m², ' +
    'rodeada de naturaleza y con acabados de lujo. Su paisajismo es literal: se adquirieron tres viveros completos ' +
    'para crearlo. Cuenta con casa de huéspedes, casa de mayordomo, piscina de carril de más de 20 metros y una ' +
    'decoración en la que cada espacio está pensado al milímetro.',
  operation: 'sale',
  price: 4_500_000_000,
  currency: 'COP',
  location: {
    area: 'Norte de Medellín',
    city: 'Copacabana, Antioquia',
    approxLat: 6.359,
    approxLng: -75.504,
  },
  specs: {
    bedrooms: 4,
    bathrooms: 5,
    builtAreaM2: 1000,
    lotAreaM2: 9000,
    parkingSpots: 10,
    floors: 2,
  },
  specNotes: {
    bathrooms: '+ baño de servicio',
    parkingSpots: '+ cuarto útil',
  },
  specsDisclaimer: 'Las características corresponden a la casa principal.',
  features: [
    'Casa de huéspedes de 2 niveles: 3 habitaciones, 2 baños y cocina',
    'Paisajismo con 3 viveros completos incluidos',
    'Piscina de carril de más de 20 m con luces RGB',
    'Gimnasio cubierto',
    'Habitación de escolta',
    'Casa de mayordomo independiente',
    'Sala de doble altura con jardín interior',
    'Escalera flotante en madera',
    'Cocina abierta con isla',
    'Suite principal con vestier y tina',
    'Estudio con biblioteca',
    'Terraza lounge cubierta',
    'Kiosko BBQ con barra',
    'Varias zonas de esparcimiento',
  ],
  heroVideoId: 'hero-aerial',
  heroPosterId: 'aerial-house',
  contact: {
    agentName: 'Asesor comercial',
    whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER ?? '',
  },
}

export const heroReel: HeroReelItem[] = [
  { videoId: 'hero-aerial', label: 'Vista aérea', zoneId: 'arrival' },
  { videoId: 'living', label: 'Sala de doble altura', zoneId: 'living' },
  { videoId: 'pool', label: 'Piscina de carril', zoneId: 'pool' },
  { videoId: 'kitchen', label: 'Cocina', zoneId: 'kitchen' },
  { videoId: 'terrace', label: 'Terraza lounge', zoneId: 'terrace' },
  { videoId: 'master-suite', label: 'Suite principal', zoneId: 'master-suite' },
  { videoId: 'garden-walk', label: 'Senderos del jardín', zoneId: 'gardens' },
  { videoId: 'dining', label: 'Comedor', zoneId: 'dining' },
  { videoId: 'stairs', label: 'Escalera y hall', zoneId: 'upper-hall' },
  { videoId: 'facade', label: 'Fachada de noche', zoneId: 'arrival' },
]

export const floors: Floor[] = [
  {
    id: 'site',
    propertySlug: property.slug,
    label: 'Exteriores',
    shortLabel: 'Exterior',
    sortOrder: 0,
    decorations: [
      { kind: 'footprint', shape: { x: 250, y: 190, width: 280, height: 260 }, label: 'Casa' },
      { kind: 'path', shape: { x: 40, y: 300, width: 210, height: 50 } },
      { kind: 'water', shape: { x: 575, y: 268, width: 350, height: 52 } },
    ],
  },
  {
    id: 'level-1',
    propertySlug: property.slug,
    label: 'Primer piso',
    shortLabel: 'Piso 1',
    sortOrder: 1,
    decorations: [
      { kind: 'stairs', shape: { x: 660, y: 410, width: 120, height: 110 }, label: 'Escalera' },
    ],
  },
  {
    id: 'level-2',
    propertySlug: property.slug,
    label: 'Segundo piso',
    shortLabel: 'Piso 2',
    sortOrder: 2,
    decorations: [
      { kind: 'void', shape: { x: 80, y: 420, width: 600, height: 100 }, label: 'Vacío sobre la sala' },
    ],
  },
]

export const zones: Zone[] = [
  // ── Exterior ──────────────────────────────────────────────
  {
    id: 'arrival',
    floorId: 'site',
    name: 'Llegada y fachada',
    tagline: 'Portón privado y patio de acceso',
    description:
      'Un camino entre palmas lleva al portón privado y a un patio en piedra frente a la fachada: ' +
      'volúmenes blancos, madera y grandes ventanales que de noche se encienden entre la vegetación.',
    highlights: ['Portón privado', 'Patio de llegada en piedra', 'Iluminación paisajística'],
    planShape: { x: 40, y: 360, width: 190, height: 170 },
    mediaIds: ['aerial-house', 'aerial-approach', 'facade-night', 'driveway-gate', 'entrance-courtyard', 'aerial-garden'],
    videoId: 'facade',
  },
  {
    id: 'gardens',
    floorId: 'site',
    name: 'Jardines y senderos',
    tagline: 'Paisajismo de tres viveros completos',
    description:
      'Para el paisajismo se adquirieron tres viveros completos: palmas, heliconias y helechos rodean la casa en un lote de 9.000 m². Senderos en piedra y deck de madera conectan ' +
      'todas las zonas sociales, con iluminación baja que hace del recorrido nocturno una experiencia.',
    highlights: ['3 viveros incluidos', 'Lote de 9.000 m²', 'Senderos iluminados'],
    planShape: { x: 250, y: 40, width: 280, height: 130 },
    mediaIds: ['garden-tropical', 'garden-path', 'garden-house-view', 'garden-deck-path'],
    videoId: 'garden-walk',
  },
  {
    id: 'pool',
    floorId: 'site',
    name: 'Piscina',
    tagline: 'Carril de nado de más de 20 metros',
    description:
      'Piscina de carril de más de 20 metros de largo, bordeada por deck en madera, asoleadoras y jardineras. La iluminación ' +
      'subacuática RGB cambia el ambiente con un toque: verde, azul, violeta o rojo.',
    highlights: ['Más de 20 m de carril', 'Iluminación RGB', 'Deck con asoleadoras'],
    planShape: { x: 560, y: 250, width: 380, height: 90 },
    mediaIds: [
      'pool-loungers-purple', 'pool-deck', 'pool-from-terrace-purple', 'pool-ladder-blue',
      'pool-from-terrace-green', 'pool-loungers-red', 'pool-ladder-purple',
    ],
    videoId: 'pool',
    lightVariants: [
      { label: 'Verde', swatch: '#2dd4a7', mediaId: 'pool-lights-green' },
      { label: 'Azul', swatch: '#3b5bff', mediaId: 'pool-lights-blue' },
      { label: 'Rojo', swatch: '#ff3b5c', mediaId: 'pool-lights-red' },
    ],
  },
  {
    id: 'terrace',
    floorId: 'site',
    name: 'Terraza lounge',
    tagline: 'Sala exterior frente a la piscina',
    description:
      'Terraza cubierta con muebles en madera maciza, muro en piedra y vista directa a la piscina ' +
      'y al jardín. El lugar para las tardes largas.',
    highlights: ['Cubierta con pérgola', 'Vista a la piscina', 'Muebles en madera maciza'],
    planShape: { x: 560, y: 360, width: 230, height: 140 },
    mediaIds: ['terrace-lounge', 'terrace-lounge-garden', 'terrace-deck', 'terrace-deck-wide'],
    videoId: 'terrace',
  },
  {
    id: 'bbq',
    floorId: 'site',
    name: 'Kiosko BBQ',
    tagline: 'Cocina exterior con barra',
    description:
      'Kiosko con parrilla a gas, isla en granito, campana, barra en madera y comedor exterior ' +
      'para reuniones grandes, todo bajo cubierta.',
    highlights: ['Parrilla a gas', 'Barra en madera', 'Comedor exterior'],
    planShape: { x: 560, y: 50, width: 190, height: 170 },
    mediaIds: ['bbq-overview', 'bbq-island', 'bbq-bar', 'bbq-grill'],
  },
  {
    id: 'gym',
    floorId: 'site',
    name: 'Gimnasio cubierto',
    tagline: 'Entrenar rodeado de jardín',
    description:
      'Gimnasio cubierto y abierto al jardín, con máquinas, zona funcional, hamacas y una sala de ' +
      'descanso en madera.',
    highlights: ['Equipos de cardio y fuerza', 'Zona de descanso', 'Hamacas'],
    planShape: { x: 770, y: 50, width: 170, height: 170 },
    mediaIds: ['gym-lounge', 'gym-equipment', 'gym-wide'],
  },

  // ── Level 1 ───────────────────────────────────────────────
  {
    id: 'living',
    floorId: 'level-1',
    name: 'Sala de doble altura',
    tagline: 'Jardín interior y ventanales al bosque',
    description:
      'El corazón de la casa: una sala de doble altura con jardín interior en piedra, ventanales ' +
      'de piso a techo en madera y una sala de cine con reclinables.',
    highlights: ['Doble altura', 'Jardín interior', 'Ventanales piso a techo', 'Sala de TV con reclinables'],
    planShape: { x: 80, y: 80, width: 440, height: 300 },
    mediaIds: [
      'living-double-height', 'living-indoor-garden', 'living-tv', 'living-sofa-set',
      'living-recliners', 'living-media-wall', 'living-garden-view',
    ],
    videoId: 'living',
  },
  {
    id: 'dining',
    floorId: 'level-1',
    name: 'Comedor',
    tagline: 'Espacio abierto entre sala y cocina',
    description:
      'Comedor en madera integrado a la sala y la cocina, con piso en concreto pulido, ' +
      'esculturas y vista a los jardines.',
    highlights: ['Concepto abierto', 'Piso en concreto pulido', 'Conexión con la cocina'],
    planShape: { x: 540, y: 80, width: 200, height: 300 },
    mediaIds: ['dining-open-plan', 'dining-table', 'dining-sculpture', 'dining-sculpture-stairs', 'dining-to-kitchen'],
    videoId: 'dining',
  },
  {
    id: 'kitchen',
    floorId: 'level-1',
    name: 'Cocina',
    tagline: 'Isla central y barra de desayuno',
    description:
      'Cocina abierta con isla en cuarzo, barra en madera, hornos empotrados, nevera ' +
      'french door, campana de isla y techo en madera.',
    highlights: ['Isla central', 'Barra de desayuno', 'Electrodomésticos empotrados'],
    planShape: { x: 760, y: 80, width: 180, height: 300 },
    mediaIds: ['kitchen-island', 'kitchen-windows', 'kitchen-breakfast-bar', 'kitchen-hood'],
    videoId: 'kitchen',
  },
  {
    id: 'entry-gallery',
    floorId: 'level-1',
    name: 'Galería de acceso',
    tagline: 'Corredor en vidrio junto al jardín',
    description:
      'Un corredor con puertas de vidrio y madera que recorre la casa de lado a lado, ' +
      'abierto a un jardín de piedras.',
    highlights: ['Puertas en vidrio y madera', 'Jardín lateral'],
    planShape: { x: 80, y: 400, width: 560, height: 120 },
    mediaIds: ['corridor-glass-doors', 'entrance-corridor'],
  },

  // ── Level 2 ───────────────────────────────────────────────
  {
    id: 'master-suite',
    floorId: 'level-2',
    name: 'Suite principal',
    tagline: 'Vestier, tina y vista al bosque',
    description:
      'Suite con zona de estar, mueble de TV, vestier abierto y baño con tina de hidromasaje ' +
      'rodeada de plantas y ventanal hacia el bosque.',
    highlights: ['Vestier', 'Baño con tina', 'Zona de estar'],
    planShape: { x: 80, y: 80, width: 380, height: 320 },
    mediaIds: [
      'master-bedroom', 'master-bedroom-bed', 'master-bedroom-sofa', 'master-closet',
      'master-bath-tub', 'master-bath-vanity',
    ],
    videoId: 'master-suite',
  },
  {
    id: 'upper-hall',
    floorId: 'level-2',
    name: 'Escalera y hall',
    tagline: 'Balcón interior sobre la sala',
    description:
      'Escalera flotante en madera junto a un muro en piedra, que lleva a un hall con baranda ' +
      'en vidrio asomado a la doble altura y obras de arte.',
    highlights: ['Escalera flotante', 'Baranda en vidrio', 'Muro en piedra'],
    planShape: { x: 480, y: 80, width: 200, height: 320 },
    mediaIds: ['upper-hall-art', 'stairs-floating', 'upper-hall', 'upper-hall-railing', 'stairs-from-above'],
    videoId: 'stairs',
  },
  {
    id: 'family-room',
    floorId: 'level-2',
    name: 'Sala familiar y estudio',
    tagline: 'Espacio privado del segundo piso',
    description:
      'Sala de estar privada y estudio con escritorio y biblioteca, ideal para trabajar desde casa con vista al bosque.',
    highlights: ['Estudio con biblioteca', 'Uso flexible'],
    planShape: { x: 700, y: 80, width: 240, height: 140 },
    mediaIds: ['family-room', 'study'],
  },
  {
    id: 'bedroom-two',
    floorId: 'level-2',
    name: 'Habitación 2',
    tagline: 'Con balcón y baño privado',
    description:
      'Habitación con salida a un balcón amplio con baranda en vidrio sobre el jardín, baño privado y ducha en vidrio.',
    highlights: ['Balcón privado', 'Baño privado', 'Ducha en vidrio'],
    planShape: { x: 700, y: 235, width: 240, height: 140 },
    mediaIds: ['bedroom-two', 'bedroom-two-balcony', 'bathroom-two-vanity', 'bathroom-two-shower'],
  },
  {
    id: 'bedroom-three',
    floorId: 'level-2',
    name: 'Habitación 3',
    tagline: 'Dos camas, ideal para niños o huéspedes',
    description: 'Habitación con dos camas, persianas y ventanal, perfecta para niños o visitas.',
    highlights: ['Dos camas', 'Ventanal'],
    planShape: { x: 700, y: 390, width: 240, height: 130 },
    mediaIds: ['bedroom-three'],
  },
]

const imageAlts: Record<string, string> = {
  'aerial-house': 'Vista aérea de la casa entre la vegetación',
  'aerial-approach': 'Vista aérea del patio de acceso',
  'aerial-garden': 'Vista aérea de los jardines y la casa',
  'driveway-gate': 'Camino de acceso y portón',
  'facade-night': 'Fachada iluminada de noche',
  'entrance-courtyard': 'Patio de acceso con pérgola',
}

const allMediaIds = new Set(zones.flatMap((zone) => [...zone.mediaIds, ...(zone.lightVariants?.map((v) => v.mediaId) ?? [])]))

export const media: MediaAsset[] = [
  ...[...allMediaIds, property.heroPosterId].map((id) => ({
    id,
    kind: 'image' as const,
    alt: imageAlts[id] ?? zones.find((zone) => zone.mediaIds.includes(id))?.name ?? id,
  })),
  ...zones.filter((zone) => zone.videoId).map((zone) => ({ id: zone.videoId!, kind: 'video' as const, alt: `Recorrido: ${zone.name}` })),
  { id: property.heroVideoId, kind: 'video', alt: 'Vuelo aéreo sobre la propiedad' },
]
