import {PLAUSIBLE_STEP_CNT} from '../utils/constants'


export const createUISlice = (set, get) => {
  return {
    showColorPicker: false,
    setShowColorPicker: (newShowColorPicker) => set(() => ({showColorPicker: newShowColorPicker})),

    confirmFunc: null,
    confirmMsg: '',
    onConfirm: (newConfirmFunc, newConfirmMsg) => set(() => ({
      confirmFunc: newConfirmFunc,
      confirmMsg: newConfirmMsg,
    })),

    alertMsg: '',
    setAlertMsg: (newAlertMsg) => set(() => ({alertMsg: newAlertMsg})),

    plausibleStep: 0,
    setPlausibleStep: (newPlausibleStep) => set(() => ({plausibleStep: newPlausibleStep})),
    nextPlausibleStep: () => set(() => ({plausibleStep: (get().plausibleStep + 1) % PLAUSIBLE_STEP_CNT})),
    prevPlausibleStep: () => set(() => ({plausibleStep: (get().plausibleStep + PLAUSIBLE_STEP_CNT - 1) % PLAUSIBLE_STEP_CNT})),
    closePlausible: () => set(() => ({plausibleStep: 0})),

    menuArr: [],
    setMenuArr: (newMenuArr) => set(() => ({menuArr: newMenuArr})),
    addMenu: (newMenu) => set(() => ({menuArr: [...get().menuArr, newMenu]})),
    deleteMenu: (delIndex) => set(() => ({menuArr: [...get().menuArr.filter((menu, index) => index !== delIndex)]})),

    selMenuIndex: null,
    setSelMenuIndex: (newSelMenuIndex) => set(() => ({selMenuIndex: newSelMenuIndex})),

    aggregate: null,
    setAggregate: (newAggregate) => set(() => ({aggregate: newAggregate})),

    realtimeVisitors: 0,
    setRealtimeVisitors: (newRealtimeVisitors) => set(() => ({realtimeVisitors: newRealtimeVisitors})),

    isLoading: false,
    setIsLoading: (newIsLoading) => set(() => ({isLoading: newIsLoading})),

    isBackgroundLoading: false,
    setIsBackgroundLoading: (newIsBackgroundLoading) => set(() => ({isBackgroundLoading: newIsBackgroundLoading})),

    isSeeingApp: true,
    setIsSeeingApp: (newIsSeeingApp) => set(() => ({isSeeingApp: newIsSeeingApp})),
  }
}
