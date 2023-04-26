// import {deepClone} from '../utils/common'
import {BILLBOARD_DES_POS, BILLBOARD_INIT_POS, CAMERA_DES_POS, CAMERA_INIT_POS, MAX_CHARACTER_CNT, QUIT_ORIGIN_POS} from '../utils/constants'


export const createSceneSlice = (set, get) => {
  return {
    /* Camera */

    cameraInitPos: CAMERA_INIT_POS,
    cameraDesPos: CAMERA_DES_POS,

    /* User */

    prevLastCharacterIndex: -1,
    setPrevLastCharacterIndex: (newPrevLastCharacterIndex) => set(() => ({prevLastCharacterIndex: newPrevLastCharacterIndex})),

    usersInitPos: Array.from({length: MAX_CHARACTER_CNT}).map(() => QUIT_ORIGIN_POS),
    setUsersInitPos: (newUsersInitPos) => set(() => ({usersInitPos: newUsersInitPos})),

    usersDesPos: [],
    setUsersDesPos: (newUsersDesPos) => set(() => ({usersDesPos: newUsersDesPos})),

    /* Billboard */

    billboardDimensions: {width: 0, height: 0, length: 0},
    setBillboardDimensions: (newBillboardDimensions) => set(() => ({billboardDimensions: newBillboardDimensions})),

    billboardInitPos: BILLBOARD_INIT_POS,
    billboardDesPos: BILLBOARD_DES_POS,

    isSeeingBillboard: true,
    setIsSeeingBillboard: (newIsSeeingBillboard) => set(() => ({isSeeingBillboard: newIsSeeingBillboard})),
  }
}
