import {useGLTF} from '@react-three/drei'
import {useEffect, useState} from 'react'
import * as THREE from 'three'
import {clone} from 'three/examples/jsm/utils/SkeletonUtils'


export const useCloneGltf = (url) => {
  const [modelScene, setModelScene] = useState(null)
  const [mixer, setMixer] = useState(null)
  const [actions, setActions] = useState([])
  const gltf = useGLTF(url)

  useEffect(() => {
    const newModelScene = clone(gltf.scene)
    const newMixer = new THREE.AnimationMixer(newModelScene)
    const newActions = {}
    gltf.animations.forEach((animation) => {
      newActions[animation.name] = newMixer.clipAction(animation)
    })
    setModelScene(newModelScene)
    setMixer(newMixer)
    setActions(newActions)
  }, [gltf])

  return {modelScene, actions, mixer}
}
