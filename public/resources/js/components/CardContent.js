import { animated, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import React, { memo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CARD_STATUS, HORIZONTAL_CARD_STATUS, LEVEL_COLOR, LEVEL_RELATION } from '../enums.js'
import { setCardStatus, updateLevel, setHorizontalCardStatus } from '../redux/words.js'
import AddSentence from './AddSentence'
import AudioPlayer from './AudioPlayer'
import Warning from './Warning'

function CardContent() {
  const {
    learningHistory,
    currentWordIndex,
  } = useSelector(state => state.words)
  const { x, y, bindDrag } = useMyDrag()

  const currentWord = learningHistory[currentWordIndex]
  const { word, translation, sentence, frequency, level, audio } = currentWord
  const color = LEVEL_COLOR[level]
  const relation = LEVEL_RELATION[level]
  const contentRef = useRef(null)

  // console.log('render card content with ', currentWord, isCardLoading)

  return (
    <>
      <animated.div
        ref={contentRef}
        className='word gray-border'
        style={{ x, y }}
        {...bindDrag()}>
        <div className='word-zoom-in'>
          <div className='word-wrapper original'>{word}</div>
          <div className='word-wrapper translation'>{translation}</div>
          <div className={`word-wrapper sentence ${sentence ? 'show' : ''}`}>
            {sentence}
          </div>
          <div className={`card-stuff` + (currentWord ? '' : ' hide')}>
            <AddSentence />
            <AudioPlayer audio={audio} />
            <div className='rank'>{frequency}</div>
            <Warning />
          </div>
        </div>
      </animated.div>
      <div className='marker'>
        <span style={{ y }}>{relation}</span>
      </div>
    </>
  )
}

function useMyDrag() {
  const cardStatus = useSelector((state) => state.words.cardStatus)
  const horizontalCardStatus = useSelector((state) => state.words.horizontalCardStatus)
  const isTextFieldActive = useSelector((state) => state.words.isTextFieldActive)
  const level = useSelector((state) => {
    const { currentWordIndex, learningHistory } = state.words
    return learningHistory[currentWordIndex].level
  })
  const dispatch = useDispatch()

  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
  }))

  const bindDrag = useDrag(
    ({ active, movement: [ox, oy] }) => {
      if (isTextFieldActive) {
        return
      }

      if (oy < -50) {
        const changeToRed = oy < -50
        const changeToYellow = oy < -100
        const changeToGreen = oy < -150
        const changeToBlue = oy < -200

        const newLevel = changeToBlue
          ? 'a'
          : changeToGreen
          ? 'b'
          : changeToYellow
          ? 'c'
          : changeToRed
          ? 'd'
          : 'e'

          if (newLevel !== level) {
            dispatch(updateLevel(newLevel))
          }
      }

      const setCardStatusIfDifferent = status => {
        if (cardStatus !== status) {
          dispatch(setCardStatus(status))
        }
      }

      if (ox < -100) {
        setCardStatusIfDifferent(CARD_STATUS.SHOW_NEXT)
      }
      if (ox > 100) {
        setCardStatusIfDifferent(CARD_STATUS.SHOW_PREV)
      }
      if (oy > 100) {
        if (horizontalCardStatus !== HORIZONTAL_CARD_STATUS.SHOW_REVEAL){
          console.log('tu dociera')
          dispatch(setHorizontalCardStatus(HORIZONTAL_CARD_STATUS.SHOW_REVEAL))
        }
      }
      if (oy < -50) {
        if (horizontalCardStatus !== HORIZONTAL_CARD_STATUS.SHOW_UPDATE_LEVEL){
          dispatch(setHorizontalCardStatus(HORIZONTAL_CARD_STATUS.SHOW_UPDATE_LEVEL))
        }
      }

      api.start({
        x: active ? ox : 0,
        y: active ? oy : 0,
        immediate: active,
      })
    },
    { filterTaps: true },
  )

  return { x, y, bindDrag }
}

export default memo(CardContent)
