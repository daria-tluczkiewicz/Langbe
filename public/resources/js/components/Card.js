import { useGesture } from '@use-gesture/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { APP_MODE_STATUS, CARD_STATUS, HORIZONTAL_CARD_STATUS, LEVEL_COLOR } from '../enums.js'
import {
  loadNewWord,
  nextIndex,
  prevIndex,
  setCardStatus,
  setIsCardLoading,
  updateAppModeStatus,
  setHorizontalCardStatus,
  setIsTranslationRevealed,
} from '../redux/words'
import { uploadNewLevelToDatabase } from '../redux/words.js'
import CardContent from './CardContent'
import LoadingScreen from './LoadingScreen'

export default function Card() {
  const {
    learningHistory,
    currentWordIndex,
    cardStatus,
    isCardLoading,
    isTranslationRevealed,
    horizontalCardStatus
  } = useSelector(state => state.words)
  const bindGesture = useMyGesture()

  const color = learningHistory[currentWordIndex]
    ? LEVEL_COLOR[learningHistory[currentWordIndex].level]
    : ''
  const cardRevealClass = isTranslationRevealed ? 'revealed' : ''

  const className = `app-card ${cardRevealClass} ${color} ${color}-border ${cardStatus} ${horizontalCardStatus}`

  return (
    <>
      <div
        className={className}
        {...bindGesture()}
      >
        {isCardLoading
        ? (
          <LoadingScreen />
        )
        : (
          <>
            <div className='card-nav next'></div>
            <div className='card-nav prev'></div>
            <div className='card-nav-reveal'>
              <span>Pokaż znaczenie</span>
            </div>
            <CardContent />
          </>
        )}
      </div>
    </>
  )
}

function useMyGesture () {
  const isTextFieldActive = useSelector((state) => state.words.isTextFieldActive)
  const isUserLoggedIn = useSelector((state) => state.words.isUserLoggedIn)
  const cardStatus = useSelector((state) => state.words.cardStatus)
  const learningHistory = useSelector((state) => state.words.learningHistory)
  const currentWordIndex = useSelector((state) => state.words.currentWordIndex)
  const horizontalCardStatus = useSelector((state) => state.words.horizontalCardStatus)
  const level = useSelector((state) => {
    const { currentWordIndex, learningHistory } = state.words
    return learningHistory[currentWordIndex]?.level
  })
  const dispatch = useDispatch()

  const bindGesture = useGesture({
    onDragEnd: () => {
      if (isTextFieldActive) {
        return
      }
      //TODO: zamienić na cardlevelupdate
      if (isUserLoggedIn && horizontalCardStatus === HORIZONTAL_CARD_STATUS.SHOW_UPDATE_LEVEL) {
        dispatch(uploadNewLevelToDatabase(level))
        dispatch(setHorizontalCardStatus(HORIZONTAL_CARD_STATUS.DEFAULT))
      }
      if (cardStatus === CARD_STATUS.SHOW_NEXT) {
        dispatch(nextIndex())
        if(currentWordIndex >= learningHistory.length - 1){
          dispatch(loadNewWord())
        }
        dispatch(setCardStatus(CARD_STATUS.DEFAULT))
      }
      if (cardStatus === CARD_STATUS.SHOW_PREV) {
        dispatch(setIsCardLoading(true))
        dispatch(prevIndex())
        dispatch(setCardStatus(CARD_STATUS.DEFAULT))
      }
      if (horizontalCardStatus === HORIZONTAL_CARD_STATUS.SHOW_REVEAL) {
        dispatch(setIsTranslationRevealed(true))
      }
    },
    onDragStart: () => {
      if (isTextFieldActive) {
        return
      }
      dispatch(setCardStatus(CARD_STATUS.DEFAULT))
      dispatch(setHorizontalCardStatus(HORIZONTAL_CARD_STATUS.DEFAULT))
      dispatch(setIsTranslationRevealed(false))
      dispatch(updateAppModeStatus(APP_MODE_STATUS.DEFAULT))
    },
  })
  return bindGesture
}
