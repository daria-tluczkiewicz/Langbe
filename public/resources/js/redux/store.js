import { configureStore } from '@reduxjs/toolkit'
import { wordsSlice } from './words'

export default configureStore({
  reducer: {
    words: wordsSlice.reducer,
  },
})
