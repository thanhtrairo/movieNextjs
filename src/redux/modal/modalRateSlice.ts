import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ShowType {
  rate: {
    showRate: boolean
    movieId: string
  }
  video: {
    showVideo: boolean
    videoId: string
  }
}

const initialState: ShowType = {
  rate: {
    showRate: false,
    movieId: '',
  },
  video: {
    showVideo: false,
    videoId: '',
  },
}

const modalSlice = createSlice({
  name: 'rate',
  initialState,
  reducers: {
    setShow: (state, { payload }: PayloadAction<ShowType>) => {
      return payload
    },
  },
})

export const { setShow } = modalSlice.actions
export default modalSlice.reducer
