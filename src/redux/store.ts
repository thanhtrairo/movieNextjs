import { configureStore } from '@reduxjs/toolkit'
import modalSlice from './modal/modalRateSlice'

const store = configureStore({
  reducer: {
    modalShow: modalSlice,
  },
})
export type RootState = ReturnType<typeof store.getState>

export default store
