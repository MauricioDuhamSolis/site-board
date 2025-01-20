import {useFBX} from '@react-three/drei'
import {useEffect, useState} from 'react'
import * as THREE from 'three'
import {clone} from 'three/examples/jsm/utils/SkeletonUtils'


export const useCloneFbx = (url) => {
  const [modelScene, setModelScene] = useState(null)
  const [mixer, setMixer] = useState(null)
  const [actions, setActions] = useState([])
  const fbx = useFBX(url)

  useEffect(() => {
    const newModelScene = clone(fbx)
    const newMixer = new THREE.AnimationMixer(newModelScene)
    const newActions = {}
    fbx.animations.forEach((animation) => {
      newActions[animation.name] = newMixer.clipAction(animation)
    })
    setModelScene(newModelScene)
    setMixer(newMixer)
    setActions(newActions)
  }, [fbx])

  return {modelScene, actions, mixer}
}
