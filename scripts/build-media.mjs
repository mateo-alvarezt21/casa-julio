// Converts raw drone photos/videos into web-ready assets under public/media/<slug>/.
// Usage: MEDIA_SOURCE_DIR="C:/path/to/raw" node scripts/build-media.mjs [--force]
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { PROPERTY_SLUG, clips, photos, videoStills } from './media-manifest.mjs'

const sourceDir = resolve(process.env.MEDIA_SOURCE_DIR ?? '../../Downloads/contenido')
const outDir = resolve('public/media', PROPERTY_SLUG)
const force = process.argv.includes('--force')

const FULL_WIDTH = 1920
const THUMB_WIDTH = 480

function indexFiles(dir, index = new Map()) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name)
    if (statSync(path).isDirectory()) indexFiles(path, index)
    else index.set(name, path)
  }
  return index
}

function ffmpeg(args, output) {
  if (!force && existsSync(output)) return
  const result = spawnSync('ffmpeg', ['-v', 'error', '-y', ...args, output], { stdio: 'inherit' })
  if (result.status !== 0) throw new Error(`ffmpeg failed for ${output}`)
  console.log('✔', output.replace(outDir, ''))
}

function writeImageSet(id, inputArgs) {
  ffmpeg([...inputArgs, '-frames:v', '1', '-vf', `scale=${FULL_WIDTH}:-2`, '-quality', '82'], join(outDir, 'img', `${id}.webp`))
  ffmpeg([...inputArgs, '-frames:v', '1', '-vf', `scale=${THUMB_WIDTH}:-2`, '-quality', '75'], join(outDir, 'thumb', `${id}.webp`))
}

const files = indexFiles(sourceDir)
const locate = (name) => {
  const path = files.get(name)
  if (!path) throw new Error(`Source file not found: ${name}`)
  return path
}

for (const sub of ['img', 'thumb', 'video']) mkdirSync(join(outDir, sub), { recursive: true })

for (const photo of photos) writeImageSet(photo.id, ['-i', locate(photo.source)])

for (const still of videoStills) writeImageSet(still.id, ['-ss', String(still.at), '-i', locate(still.video)])

for (const clip of clips) {
  const input = ['-ss', String(clip.start), '-t', String(clip.duration), '-i', locate(clip.video)]
  ffmpeg(
    [...input, '-an', '-vf', `scale=${clip.width ?? 1920}:-2,fps=30`, '-c:v', 'libx264', '-preset', 'slow', '-crf', String(clip.crf ?? 27),
      '-pix_fmt', 'yuv420p', '-movflags', '+faststart'],
    join(outDir, 'video', `${clip.id}.mp4`),
  )
  ffmpeg(['-ss', String(clip.start + 1), '-i', locate(clip.video), '-frames:v', '1', '-vf', 'scale=1280:-2', '-quality', '75'],
    join(outDir, 'video', `${clip.id}.webp`))
}

console.log('Media build complete →', outDir)
