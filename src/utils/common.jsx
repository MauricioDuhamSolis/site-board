import * as THREE from 'three'
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


export const deepClone = (obj) => {
  const clonedObj = JSON.parse(JSON.stringify(obj))
  return clonedObj
}


export const getDimensions = (threeObj) => {
  const box3 = new THREE.Box3().setFromObject(threeObj)
  return {
    width: box3.max.x - box3.min.x,
    height: box3.max.y - box3.min.y,
    length: box3.max.z - box3.min.z,
  }
}
