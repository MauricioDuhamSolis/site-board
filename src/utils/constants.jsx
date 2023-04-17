/* Static */

export const BACKEND_URL = 'https://mboard-backend.onrender.com/main'

export const CHARACTER_URLS = [
  './models/character 1.fbx',
  './models/character 2.fbx',
  './models/character 3.fbx',
  './models/character 4.fbx',
  './models/character 5.fbx',
]

export const BILLBOARD_URL = './models/billboard.fbx'

export const BILLBOARD_HTML_SIZE = 1200

export const DEFAULT_LINEAR_DAMPING = 10

export const DEFAULT_ANGULAR_DAMPING = 1

export const PLAUSIBLE_STEP_COUNT = 3

export const LERP_ALPHA = 0.1

export const REALTIME_DURATION = 100000

/* Dynamic */

export const HTML_ASPECT = BILLBOARD_HTML_SIZE / 400

export const GROUND_SIZE = 30 * HTML_ASPECT

export const BILLBOARD_SCALE = 0.06 * HTML_ASPECT

export const CHARACTER_SCALE = 0.015 * HTML_ASPECT

export const WALKING_SPEED = BILLBOARD_HTML_SIZE * 1.4

export const TOLERANCE_DISTANCE = 0.001 * WALKING_SPEED

export const CAMERA_INIT_POS = [-25 * HTML_ASPECT, 25 * HTML_ASPECT, -25 * HTML_ASPECT]

export const CAMERA_DES_POS = CAMERA_INIT_POS

export const BILLBOARD_INIT_POS = [0, 0, 12 * HTML_ASPECT]

export const BILLBOARD_DES_POS = BILLBOARD_INIT_POS

export const BILLBOARD_VIEW_DISTANCE = 14.5 * HTML_ASPECT
