/* Static */

export const isDevMode = false

export const BACKEND_URL = isDevMode ? 'http://127.0.0.1:4000/main' : 'https://mboard-backend.onrender.com/main'

export const CHARACTER_URLS = [
  './models/character 1.glb',
  './models/character 2.glb',
  './models/character 3.glb',
  './models/character 4.glb',
  './models/character 5.glb',
]

export const AXIS_SIZE = 10

export const GROUND_SIZE = 3000

export const GROUND_HEIGHT = 2

export const BILLBOARD_URL = './models/billboard.fbx'

export const BILLBOARD_HTML_SIZE = 1200

export const DEFAULT_LINEAR_DAMPING = 10

export const DEFAULT_ANGULAR_DAMPING = 10

export const PLAUSIBLE_STEP_COUNT = 3

export const LERP_ALPHA = 0.1

export const REALTIME_DURATION = isDevMode ? 2500 : 10000

/* Dynamic */

export const HTML_ASPECT = BILLBOARD_HTML_SIZE / 400

export const BILLBOARD_SCALE = 0.06 * HTML_ASPECT

export const CHARACTER_SCALE = 0.015 * HTML_ASPECT

export const WALKING_SPEED = isDevMode ? BILLBOARD_HTML_SIZE * 1.4 * 4 : BILLBOARD_HTML_SIZE * 1.4

export const TOLERANCE_DISTANCE = CHARACTER_URLS.length * HTML_ASPECT

export const CAMERA_INIT_POS = [-25 * HTML_ASPECT, 25 * HTML_ASPECT, -25 * HTML_ASPECT]

export const CAMERA_DES_POS = CAMERA_INIT_POS

export const BILLBOARD_INIT_POS = [0, 0, 12 * HTML_ASPECT]

export const BILLBOARD_DES_POS = BILLBOARD_INIT_POS

export const BILLBOARD_VIEW_DISTANCE = 14.5 * HTML_ASPECT

export const CHARACTER_BILLBOARD_VIEW_DISTANCE = 2 * HTML_ASPECT

export const CHARACTER_POS_GENERATION_HALF_WIDE = 20 * HTML_ASPECT
