import {assertDefined} from './custom.assert'


export const getRandom = (size) => {
  assertDefined(size)
  const halfSize = size / 2
  const random = halfSize - (Math.random() * size)
  return random
}


export const getFileExtension = (path) => {
  assertDefined(path)
  const fileExtension = path.split('.').pop()?.toLowerCase()
  return fileExtension
}


export const getModelType = (path) => {
  assertDefined(path)
  const fileExtension = getFileExtension(path)

  switch (fileExtension) {
    case 'fbx':
      return 'fbx'
    case 'glb':
    case 'gltf':
      return 'gltf'
    default:
      break
  }
}
