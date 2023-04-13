import {deepClone} from '../utils/common'
import {HTML_ASPECT} from '../utils/constants'


export const createSceneSlice = (set, get) => {
  return {
    /* Camera */

    cameraInitPos: [-25 * HTML_ASPECT, 25 * HTML_ASPECT, -25 * HTML_ASPECT],
    cameraDesPos: [-25 * HTML_ASPECT, 25 * HTML_ASPECT, -25 * HTML_ASPECT],

    /* User */

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
        userIsMoving: true,
      }
    }),

    userIsMoving: false,
    setUserIsMoving: (newUserDesPosChanged) => set(() => ({userIsMoving: newUserDesPosChanged})),

    /* Billboard */

    billboardDimensions: {width: 0, height: 0, length: 0},
    setBillboardDimensions: (newBillboardDimensions) => set(() => ({billboardDimensions: newBillboardDimensions})),

    billboardInitPos: [0, 0, 12 * HTML_ASPECT],
    billboardDesPos: [0, 0, 12 * HTML_ASPECT],
    billboardViewDistance: 14.5 * HTML_ASPECT,

    isSeeingBillboard: false,
    seeBillboard: () => set(() => {
      const billboardDesPos = deepClone(get().billboardDesPos)
      const billboardViewDistance = get().billboardViewDistance
      billboardDesPos[2] -= billboardViewDistance
      const cameraDesPos = billboardDesPos
      return {
        cameraDesPos,
        isSeeingBillboard: true,
      }
    }),
  }
}
