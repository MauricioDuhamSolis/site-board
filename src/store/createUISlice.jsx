import {PLAUSIBLE_STEP_COUNT} from '../utils/constants'


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
    nextPlausibleStep: () => set(() => ({plausibleStep: (get().plausibleStep + 1) % PLAUSIBLE_STEP_COUNT})),
    prevPlausibleStep: () => set(() => ({plausibleStep: (get().plausibleStep + PLAUSIBLE_STEP_COUNT - 1) % PLAUSIBLE_STEP_COUNT})),
    setPlausibleStep: (newPlausibleStep) => set(() => ({plausibleStep: newPlausibleStep})),
  }
}
