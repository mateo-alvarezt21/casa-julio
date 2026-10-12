import { media, property } from '../data/casaSelva'

const basePath = `/media/${property.slug}`

export const imageUrl = (id: string) => `${basePath}/img/${id}.webp`
export const thumbUrl = (id: string) => `${basePath}/thumb/${id}.webp`
export const videoUrl = (id: string) => `${basePath}/video/${id}.mp4`
export const videoPosterUrl = (id: string) => `${basePath}/video/${id}.webp`

const altById = new Map(media.map((asset) => [asset.id, asset.alt]))

export const mediaAlt = (id: string) => altById.get(id) ?? ''
