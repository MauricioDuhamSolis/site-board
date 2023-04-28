import * as THREE from 'three'
import {mergeBufferGeometries} from 'three/examples/jsm/utils/BufferGeometryUtils'
import {assertDefined} from './custom.assert'
import {customDebug} from './custom.debug'


export const getBox3RandomPoint = (box3) => {
  assertDefined(box3, box3.min, box3.max)
  customDebug().log('common#getBox3RandomPoint: box3: ', box3)
  const diffX = Math.random() * (box3.max.x - box3.min.x)
  const diffY = Math.random() * (box3.max.y - box3.min.y)
  const diffZ = Math.random() * (box3.max.z - box3.min.z)
  const randomPoint = [
    box3.min.x + diffX,
    box3.min.y + diffY,
    box3.min.z + diffZ,
  ]
  customDebug().log('common#getBox3RandomPoint: randomPoint: ', randomPoint)
  return randomPoint
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
  assertDefined(obj)
  const clonedObj = JSON.parse(JSON.stringify(obj))
  return clonedObj
}


export const getDimensions = (threeObj) => {
  assertDefined(threeObj)
  threeObj.traverse((child) => {
    if (child.isMesh && child.geometry.isBufferGeometry) {
      child.geometry.computeBoundingBox()
    }
  })
  const box3 = new THREE.Box3().setFromObject(threeObj)
  return {
    width: box3.max.x - box3.min.x,
    height: box3.max.y - box3.min.y,
    length: box3.max.z - box3.min.z,
  }
}


export const mergeModelMeshes = (model, customMaterial) => {
  assertDefined(model)
  const bufferGeometries = []
  const materials = []
  const matrix4 = new THREE.Matrix4()

  model.traverse((child) => {
    if (child.isMesh) {
      if (child.geometry?.isBufferGeometry) {
        matrix4.compose(child.position, child.quaternion, child.scale)
        child.geometry.applyMatrix4(matrix4)
        bufferGeometries.push(child.geometry)
      }

      if (child.material?.isMaterial) {
        materials.push(child.material)
      }
    }
  })

  const material = customMaterial ? customMaterial : materials
  const useGroups = Array.isArray(material)
  const mergedBufferGeometry = mergeBufferGeometries(bufferGeometries, useGroups)
  mergedBufferGeometry.computeBoundingBox()
  const mergedMesh = new THREE.Mesh(mergedBufferGeometry, material)
  return mergedMesh
}


export const domainToUrl = (domain) => {
  assertDefined(domain)
  const domainUrl = `https://${domain}`
  return domainUrl
}


export const urlToDomain = (url) => {
  assertDefined(url)
  if (url.indexOf('www.') > -1) {
    return
  }
  const domain = url.replace(/https:\/\//g, '').split('/').shift()
  return domain
}


export const getCharacterUrls = (modelType, characterCnt) => {
  assertDefined(modelType, characterCnt)

  switch (modelType) {
    case 'glb':
      return Array.from({length: characterCnt}).map((v, i) => `./models/glb/characters/character (${i + 1}).glb`)
    case 'fbx':
      return Array.from({length: characterCnt}).map((v, i) => `./models/fbx/characters/character (${i + 1}).fbx`)
    default:
      return []
  }
}


export const isIndexInInterval = (firstIndex, lastIndex, index) => {
  assertDefined(firstIndex, lastIndex, index)
  if (firstIndex < lastIndex) {
    return index >= firstIndex && index <= lastIndex
  } else {
    return index >= firstIndex || index <= lastIndex
  }
}


export const getDirec = (start, end) => {
  assertDefined(start, end)
  const startVec3 = new THREE.Vector3(start[0], start[1], start[2])
  const endVec3 = new THREE.Vector3(end[0], end[1], end[2])
  const direc = endVec3.sub(startVec3)
  return direc
}
