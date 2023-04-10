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
  }
}
