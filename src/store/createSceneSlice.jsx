import {customDebug} from '../utils/custom.debug'


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

    billboardInitPos: [0, 0, 4],
    billboardDesPos: [0, 0, 4],

    cameraInitPos: [-5, 5, -5],
    cameraDesPos: [-5, 5, -5],

    seeBillboard: () => set(() => {
      customDebug('createSceneSlice#seeBillboard: billboardDesPos: ', get().billboardDesPos)
      return {}
    }),
  }
}
