// import {clone} from 'three/examples/jsm/utils/SkeletonUtils'
import {useAnimations, useFBX} from '@react-three/drei'


export const useCloneFbx = (url) => {
  const fbx = useFBX(url)
  const modelScene = fbx
  const modelAnims = fbx.animations
  const {ref, actions, mixer} = useAnimations(modelAnims)

  return {modelScene, ref, actions, mixer}
}
