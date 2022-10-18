import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'connectWalletModal',
  initialState: {
    showing: false,
  },
  reducers: {
    showModal: (state) => {
      state.showing = true;
    },
    hideModal: (state) => {
      state.showing = false;
    },
  },
})

export const { showModal, hideModal } = modalSlice.actions

export default modalSlice.reducer