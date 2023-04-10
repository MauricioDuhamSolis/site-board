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
  }
}
