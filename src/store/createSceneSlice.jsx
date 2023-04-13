import {deepClone} from '../utils/common'
import {HTML_ASPECT} from '../utils/constants'


export const createSceneSlice = (set, get) => {
  return {
    selUserIndex: 0,
    setSelUserIndex: (newSelUserIndex) => set(() => ({selUserIndex: newSelUserIndex})),

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
        userDesPosChanged: true,
      }
    }),

    userDesPosChanged: false,
    setUserDesPosChanged: (newUserDesPosChanged) => set(() => ({userDesPosChanged: newUserDesPosChanged})),

    billboardDimensions: null,
    setBillboardDimensions: (newBillboardDimensions) => set(() => ({billboardDimensions: newBillboardDimensions})),

    billboardInitPos: [0, 0, 12 * HTML_ASPECT],
    billboardDesPos: [0, 0, 12 * HTML_ASPECT],
    billboardViewDistance: 9.9 * HTML_ASPECT,

    cameraInitPos: [-15 * HTML_ASPECT, 15 * HTML_ASPECT, -15 * HTML_ASPECT],
    cameraDesPos: [-15 * HTML_ASPECT, 15 * HTML_ASPECT, -15 * HTML_ASPECT],

    seeBillboard: () => set(() => {
      const billboardDesPos = deepClone(get().billboardDesPos)
      const billboardViewDistance = get().billboardViewDistance
      billboardDesPos[2] -= billboardViewDistance
      const cameraDesPos = billboardDesPos
      return {
        cameraDesPos,
        enableOrbitControls: false,
        showMenu: false,
      }
    }),

    enableOrbitControls: true,
    setEnableOrbitControls: (newEnableOrbitControls) => set(() => ({enableOrbitControls: newEnableOrbitControls})),
  }
}
