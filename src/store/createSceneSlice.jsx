// import {deepClone} from '../utils/common'
import {BILLBOARD_DES_POS, BILLBOARD_INIT_POS, BILLBOARD_VIEW_DISTANCE, CAMERA_DES_POS, CAMERA_INIT_POS} from '../utils/constants'


export const createSceneSlice = (set, get) => {
  return {
    /* Camera */

    cameraInitPos: CAMERA_INIT_POS,
    cameraDesPos: CAMERA_DES_POS,

    /* User */

    usersInitPos: [],
    setUsersInitPos: (newUsersInitPos) => set(() => ({usersInitPos: newUsersInitPos})),
    setUserInitPos: (index, newUserInitPos) => set(() => {
      const state = get()
      const newUsersInitPos = [...state.usersInitPos]
      newUsersInitPos[index] = newUserInitPos
      return {
        usersInitPos: newUsersInitPos,
      }
    }),

    usersDesPos: [],
    setUsersDesPos: (newUsersCurPos) => set(() => ({usersDesPos: newUsersCurPos})),
    setUserDesPos: (index, newUserCurPos) => set(() => {
      const state = get()
      const newUsersCurPos = [...state.usersDesPos]
      newUsersCurPos[index] = newUserCurPos
      return {
        usersDesPos: newUsersCurPos,
      }
    }),

    /* Billboard */

    billboardDimensions: {width: 0, height: 0, length: 0},
    setBillboardDimensions: (newBillboardDimensions) => set(() => ({billboardDimensions: newBillboardDimensions})),

    billboardInitPos: BILLBOARD_INIT_POS,
    billboardDesPos: BILLBOARD_DES_POS,
    billboardViewDistance: BILLBOARD_VIEW_DISTANCE,

    isSeeingBillboard: false,
    seeBillboard: () => set(() => {
      // const billboardDesPos = deepClone(get().billboardDesPos)
      // const billboardViewDistance = get().billboardViewDistance
      // billboardDesPos[2] -= billboardViewDistance
      // const cameraDesPos = billboardDesPos
      return {
        // cameraDesPos,
        isSeeingBillboard: true,
      }
    }),
    leaveBillboard: () => set(() => {
      return {
        isSeeingBillboard: false,
      }
    }),
  }
}
