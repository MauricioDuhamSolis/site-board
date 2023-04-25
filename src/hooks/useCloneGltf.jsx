// import {clone} from 'three/examples/jsm/utils/SkeletonUtils'
import {useAnimations, useGLTF} from '@react-three/drei'


export const useCloneGltf = (url) => {
  const gltf = useGLTF(url)
  const modelScene = gltf.scene
  const modelAnims = gltf.animations
  const {ref, actions, mixer} = useAnimations(modelAnims)

  return {modelScene, ref, actions, mixer}
}
