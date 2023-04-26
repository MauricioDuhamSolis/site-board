// import {deepClone} from '../utils/common'
import {BILLBOARD_DES_POS, BILLBOARD_INIT_POS, CAMERA_DES_POS, CAMERA_INIT_POS} from '../utils/constants'


export const createSceneSlice = (set, get) => {
  return {
    /* Camera */

    cameraInitPos: CAMERA_INIT_POS,
    cameraDesPos: CAMERA_DES_POS,

    /* User */

    curLastCharacterInd: 0,
    setCurLastCharacterInd: (newCurLastCharacterInd) => set(() => ({curLastCharacterInd: newCurLastCharacterInd})),

    /* Billboard */

    billboardDimensions: {width: 0, height: 0, length: 0},
    setBillboardDimensions: (newBillboardDimensions) => set(() => ({billboardDimensions: newBillboardDimensions})),

    billboardInitPos: BILLBOARD_INIT_POS,
    billboardDesPos: BILLBOARD_DES_POS,

    isSeeingBillboard: true,
    setIsSeeingBillboard: (newIsSeeingBillboard) => set(() => ({isSeeingBillboard: newIsSeeingBillboard})),
  }
}
