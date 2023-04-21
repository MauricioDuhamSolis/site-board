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

    usersQuitState: [],
    setUsersQuitState: (newUsersQuitState) => set(() => ({usersQuitState: newUsersQuitState})),
    setUserQuitState: (index, newUserQuitState) => set(() => {
      const state = get()
      const newUsersQuitState = [...state.usersQuitState]
      newUsersQuitState[index] = newUserQuitState
      return {
        usersQuitState: newUsersQuitState,
      }
    }),

    removeCondUser: (index) => set(() => {
      const state = get()
      if (state.usersInitPos[index] !== state.usersDesPos[index]) {
        return {}
      }
      const newUsersInitPos = state.usersInitPos.filter((userInitPos, userIndex) => userIndex !== index)
      console.log('usersInitPos change: ', state.usersInitPos, newUsersInitPos)
      const newUsersDesPos = state.usersDesPos.filter((userDesPos, userIndex) => userIndex !== index)
      return {
        usersInitPos: newUsersInitPos,
        usersDesPos: newUsersDesPos,
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
