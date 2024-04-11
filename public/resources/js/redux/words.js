import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { APP_MODE_STATUS } from '../enums'

// TODO: podzielić na więcej slice?
// usunąć niepotrzbne rzeczy ze stanu?

export const wordsSlice = createSlice({
  name: 'words',
  initialState: {
    currentWordIndex: 0,
    learningHistory: [],
    gameMode: 5000,
    userStatistics: [],
    appModeStatus: '',
    cardStatus: '',
    horizontalCardStatus: '',
    isUserLoggedIn: false,
    isMouseDown: false,
    isCardLoading: true,
    isTranslationRevealed: false,
    isTextFieldActive: false,
    pageNumber: 0,
    isPopUpActive: false
  },
  reducers: {
    nextIndex: state => {
      // TODO: ifologia w reducerze, big no no
      //chuj kurwa tylko tu jest aktualny stan, elo
      if (state.currentWordIndex <= state.learningHistory.length) {
        state.currentWordIndex++
      } else if (state.currentWordIndex > state.learningHistory.length) {
        state.currentWordIndex = state.learningHistory.length - 1
      }
    },
    prevIndex: state => {
      if (state.currentWordIndex > 0) {
        state.currentWordIndex--
      }
      state.isCardLoading = false
    },
    cleanLearningHistory: state => {
      state.learningHistory = []
      state.currentWordIndex = 0
      state.isCardLoading = true
    },
    updateGameMode: (state, action) => {
      state.gameMode = action.payload
    },
    updateSentence: (state, action) => {
      state.learningHistory[state.currentWordIndex].sentence = action.payload
    },
    updateLevel: (state, action) => {
      state.learningHistory[state.currentWordIndex].level = action.payload
    },
    triggerWarning: (state, action) => {
      state.learningHistory[state.currentWordIndex].warning = action.payload
    },
    updateUserStatistics: (state, action) => {
      state.userStatistics = action.payload
    },
    updateAppModeStatus: (state, action) => {
      state.appModeStatus = action.payload
    },
    updateIsUserLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload
    },
    setIsMouseDown: (state, action) => {
      state.isMouseDown = action.payload
    },
    setCardStatus: (state, action) => {
      state.cardStatus = action.payload
    },
    setIsCardLoading: (state, action) => {
      state.isCardLoading = action.payload
    },
    setIsTranslationRevealed: (state, action) => {
      state.isTranslationRevealed = action.payload
    },
    setIsTextFieldActive: (state, action) => {
      state.isTextFieldActive = action.payload
    },
    resetPageNumber: state => {
      state.pageNumber = 0
    },
    showPreviousPage: (state) => {
      if(state.pageNumber === 0) {
        return
      }
      state.pageNumber--
    },
    showNextPage: (state) => {
      const upperBound = Math.floor((state.learningHistory.length - 1) / 8)
      console.log('upperbound',upperBound)
      if(state.pageNumber === upperBound) {
        return
      }
      state.pageNumber++
    },
    updateIsPopupActive: (state, action) => {
      state.isPopUpActive = action.payload
    },
    setHorizontalCardStatus: (state, action) => {
      state.horizontalCardStatus = action.payload
      console.log('setting horizontal status to: ',action.payload)
    },
  },
  extraReducers: builder => {
    builder.addCase(loadNewWord.pending, state => {
      state.isCardLoading = true
    }),
    builder.addCase(loadNewWord.fulfilled, (state, action) => {
      state.learningHistory.push(action.payload)
      state.isCardLoading = false
    }),
    builder.addCase(checkIfUserIsLoggedIn.fulfilled, (state, action) => {
      state.isUserLoggedIn = action.payload
      state.isPopUpActive = !action.payload
    }),
    builder.addCase(checkStats.fulfilled, (state, action) => {

      if (state.appModeStatus === APP_MODE_STATUS.STATS_OPEN){
        state.appModeStatus = APP_MODE_STATUS.DEFAULT
        return
      }
      state.userStatistics = action.payload
      state.appModeStatus = APP_MODE_STATUS.STATS_OPEN
    })
  }
})

export const loadNewWord = createAsyncThunk(
  'words/loadNewWord',
  async (_, thunkAPI) => {
    const maxRetries = 3
    const url = '/word/' + thunkAPI.getState().words.gameMode
    const response = await retryRequest(url, maxRetries)
    return response

  }
)

async function retryRequest(url, retries) {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    if (retries > 0) {
      console.error(`Request failed. Retrying... (${retries} retries left)`);
      return retryRequest(url, retries - 1);
    } else {
      console.error('Max retries reached. Request failed.');
      throw error;
    }
  }
}


export const uploadNewLevelToDatabase = createAsyncThunk(
  'words/uploadNewLevelToDatabase',
  async (requestData, { getState }) =>{
  const {learningHistory, currentWordIndex} = getState().words
  const url = `/status/${learningHistory[currentWordIndex].word_id}/${requestData}`;

    try {
      await axios.put(url, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return  requestData; // You can return any data you want from the response
    } catch (error) {
      console.error('Error:', error);
      throw error; // Rethrow the error to be caught by the rejectWithValue handler
    }
  }
)


export const checkIfUserIsLoggedIn = createAsyncThunk(
  'words/checkIfUserIsLoggedIn',
  async () => {
    const url = `https://langbe.online/check-auth`
    return (await axios.get(url)).data.loggedIn
  }
)

export const checkStats = createAsyncThunk(
  'words/checkStats',
  async (_, { getState }) => {
    const appModeStatus = getState(state=> state.words.appModeStatus)
     if (appModeStatus === APP_MODE_STATUS.STATS_OPEN) {
      return
    } else {
       const url = `https://langbe.online/stats`
       return (await axios.get(url)).data
     }
  }
)

export const {
  setData,
  updateIsUserLoggedIn,
  updateAppModeStatus,
  updateUserStatistics,
  triggerWarning,
  nextIndex,
  prevIndex,
  updateSentence,
  updateLevel,
  setIsMouseDown,
  setCardStatus,
  setIsCardLoading,
  setIsTranslationRevealed,
  updateGameMode,
  setIsTextFieldActive,
  cleanLearningHistory,
  showPreviousPage,
  showNextPage,
  resetPageNumber,
  updateIsPopupActive,
  setHorizontalCardStatus
} = wordsSlice.actions

export default wordsSlice.reducer
