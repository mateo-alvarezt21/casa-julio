import { zones } from '../data/casaSelva'

/** Two-digit position of a zone in the tour, e.g. "07". */
export const zoneNumber = (zoneId: string) => String(zones.findIndex((zone) => zone.id === zoneId) + 1).padStart(2, '0')
