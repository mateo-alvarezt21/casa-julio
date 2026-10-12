// Source → web asset mapping for the pilot property.
// Photos are referenced by DJI file name; video stills by source video + timestamp (seconds).

export const PROPERTY_SLUG = 'casa-selva'

/** @type {Array<{ id: string, source: string }>} */
export const photos = [
  // Arrival
  { id: 'facade-night', source: 'DJI_20260910190035_0154_D.JPG' },
  { id: 'entrance-courtyard', source: 'DJI_20260910185427_0142_D.JPG' },
  { id: 'entrance-corridor', source: 'DJI_20260910190003_0151_D.JPG' },
  { id: 'corridor-glass-doors', source: 'DJI_20260910190019_0153_D.JPG' },
  // Gardens
  { id: 'garden-tropical', source: 'DJI_20260910181001_0006_D.JPG' },
  { id: 'garden-path', source: 'DJI_20260910181439_0034_D.JPG' },
  { id: 'garden-house-view', source: 'DJI_20260910181459_0036_D.JPG' },
  { id: 'garden-deck-path', source: 'DJI_20260910181722_0049_D.JPG' },
  // Pool
  { id: 'pool-lights-green', source: 'DJI_20260910183552_0091_D.JPG' },
  { id: 'pool-lights-red', source: 'DJI_20260910183558_0092_D.JPG' },
  { id: 'pool-lights-blue', source: 'DJI_20260910183603_0093_D.JPG' },
  { id: 'pool-from-terrace-purple', source: 'DJI_20260910183720_0102_D.JPG' },
  { id: 'pool-from-terrace-green', source: 'DJI_20260910183731_0104_D.JPG' },
  { id: 'pool-deck', source: 'DJI_20260910183807_0108_D.JPG' },
  { id: 'pool-loungers-purple', source: 'DJI_20260910184030_0113_D.JPG' },
  { id: 'pool-loungers-red', source: 'DJI_20260910184036_0114_D.JPG' },
  { id: 'pool-ladder-blue', source: 'DJI_20260910184150_0121_D.JPG' },
  { id: 'pool-ladder-purple', source: 'DJI_20260910184155_0122_D.JPG' },
  // Pool terrace & kiosk
  { id: 'terrace-lounge', source: 'DJI_20260910183612_0094_D.JPG' },
  { id: 'terrace-lounge-garden', source: 'DJI_20260910183756_0107_D.JPG' },
  { id: 'terrace-deck', source: 'DJI_20260910184247_0125_D.JPG' },
  { id: 'terrace-deck-wide', source: 'DJI_20260910184237_0124_D.JPG' },
  // BBQ
  { id: 'bbq-overview', source: 'DJI_20260910181216_0017_D.JPG' },
  { id: 'bbq-island', source: 'DJI_20260910180944_0003_D.JPG' },
  { id: 'bbq-bar', source: 'DJI_20260910181024_0009_D.JPG' },
  { id: 'bbq-grill', source: 'DJI_20260910181031_0010_D.JPG' },
  // Gym
  { id: 'gym-equipment', source: 'DJI_20260910182056_0060_D.JPG' },
  { id: 'gym-lounge', source: 'DJI_20260910182225_0066_D.JPG' },
  { id: 'gym-wide', source: 'DJI_20260910182350_0074_D.JPG' },
  // Living room
  { id: 'living-tv', source: 'DJI_20260910191717_0167_D.JPG' },
  { id: 'living-double-height', source: 'DJI_20260910191900_0176_D.JPG' },
  { id: 'living-recliners', source: 'DJI_20260910190647_0158_D.JPG' },
  { id: 'living-sofa-set', source: 'DJI_20260910191708_0166_D.JPG' },
  { id: 'living-indoor-garden', source: 'DJI_20260910191654_0164_D.JPG' },
  { id: 'living-garden-view', source: 'DJI_20260910191936_0179_D.JPG' },
  { id: 'living-media-wall', source: 'DJI_20260910191911_0177_D.JPG' },
  // Dining
  { id: 'dining-open-plan', source: 'DJI_20260910191735_0169_D.JPG' },
  { id: 'dining-sculpture', source: 'DJI_20260910191810_0172_D.JPG' },
  { id: 'dining-sculpture-stairs', source: 'DJI_20260910191819_0173_D.JPG' },
  { id: 'dining-table', source: 'DJI_20260910191835_0175_D.JPG' },
  { id: 'dining-to-kitchen', source: 'DJI_20260910191944_0180_D.JPG' },
  // Upper floor
  { id: 'stairs-floating', source: 'DJI_20260910191952_0181_D.JPG' },
  { id: 'stairs-from-above', source: 'DJI_20260910192215_0191_D.JPG' },
  { id: 'upper-hall-art', source: 'DJI_20260910192047_0185_D.JPG' },
  { id: 'upper-hall', source: 'DJI_20260910192119_0186_D.JPG' },
  { id: 'upper-hall-railing', source: 'DJI_20260910192159_0190_D.JPG' },
  { id: 'family-room', source: 'DJI_20260910192151_0189_D.JPG' },
]

/** @type {Array<{ id: string, video: string, at: number }>} */
export const videoStills = [
  { id: 'aerial-approach', video: 'DJI_20260910180401_0001_D.MP4', at: 8 },
  { id: 'aerial-house', video: 'DJI_20260910180401_0001_D.MP4', at: 12 },
  { id: 'aerial-garden', video: 'DJI_20260910180401_0001_D.MP4', at: 20 },
  { id: 'driveway-gate', video: 'DJI_20260910180401_0001_D.MP4', at: 70 },
  { id: 'kitchen-island', video: 'DJI_20260910200654_0197_D.MP4', at: 1 },
  { id: 'kitchen-windows', video: 'DJI_20260910200654_0197_D.MP4', at: 8 },
  { id: 'kitchen-breakfast-bar', video: 'DJI_20260910200654_0197_D.MP4', at: 20 },
  { id: 'kitchen-hood', video: 'DJI_20260910200654_0197_D.MP4', at: 37 },
  { id: 'master-bedroom', video: 'DJI_20260910192558_0194_D.MP4', at: 18 },
  { id: 'master-bedroom-bed', video: 'DJI_20260910192558_0194_D.MP4', at: 26 },
  { id: 'master-bedroom-sofa', video: 'DJI_20260910192558_0194_D.MP4', at: 3 },
  { id: 'master-closet', video: 'DJI_20260910192558_0194_D.MP4', at: 50 },
  { id: 'master-bath-tub', video: 'DJI_20260910192558_0194_D.MP4', at: 70 },
  { id: 'master-bath-vanity', video: 'DJI_20260910192558_0194_D.MP4', at: 60 },
  { id: 'bedroom-two', video: 'DJI_20260910192249_0193_D.MP4', at: 0 },
  { id: 'bedroom-two-balcony', video: 'DJI_20260910192249_0193_D.MP4', at: 9 },
  { id: 'study', video: 'DJI_20260910192249_0193_D.MP4', at: 65 },
  { id: 'bedroom-three', video: 'DJI_20260910192249_0193_D.MP4', at: 75 },
  { id: 'bathroom-two-vanity', video: 'DJI_20260910192249_0193_D.MP4', at: 45 },
  { id: 'bathroom-two-shower', video: 'DJI_20260910192249_0193_D.MP4', at: 100 },
]

/** @type {Array<{ id: string, video: string, start: number, duration: number, width?: number, crf?: number }>} */
export const clips = [
  { id: 'hero-aerial', video: 'DJI_20260910180401_0001_D.MP4', start: 3, duration: 20, width: 1600, crf: 31 },
  { id: 'facade', video: 'DJI_20260910190055_0156_D.MP4', start: 0, duration: 11 },
  { id: 'garden-walk', video: 'DJI_20260910184625_0128_D.MP4', start: 0, duration: 20 },
  { id: 'pool', video: 'DJI_20260910183817_0109_D.MP4', start: 0, duration: 19 },
  { id: 'terrace', video: 'DJI_20260910183340_0089_D.MP4', start: 12, duration: 20 },
  { id: 'living', video: 'DJI_20260910190709_0161_D.MP4', start: 0, duration: 20 },
  { id: 'dining', video: 'DJI_20260910190914_0162_D.MP4', start: 0, duration: 20 },
  { id: 'kitchen', video: 'DJI_20260910200654_0197_D.MP4', start: 0, duration: 20 },
  { id: 'stairs', video: 'DJI_20260910192223_0192_D.MP4', start: 0, duration: 17 },
  { id: 'master-suite', video: 'DJI_20260910192558_0194_D.MP4', start: 3, duration: 25 },
]
