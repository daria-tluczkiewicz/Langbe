import React from 'react'
import { triggerWarning } from '../redux/words'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

export default function Warning() {
  const { learningHistory, currentWordIndex } = useSelector(
    state => state.words,
  )
  const { warning } = learningHistory[currentWordIndex]
  const dispatch = useDispatch()

  function setWarning() {
    const { word_id, warning } = learningHistory[currentWordIndex]
    let changedWarning = warning === 1 ? 0 : 1
    axios.get('/word/warning/' + word_id).then(function () {
      dispatch(triggerWarning(changedWarning))
    })
  }

  return (
    <div
      className={`warn ${warning > 0 ? 'warned' : ''}`}
      onClick={setWarning}></div>
  )
}
