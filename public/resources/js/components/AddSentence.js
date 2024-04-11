import { useState, memo, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setIsTextFieldActive, updateSentence } from '../redux/words'
import axios from 'axios'
import React from 'react'

const AddSentence = memo(function AddSentence() {
  const { learningHistory, currentWordIndex, isTextFieldActive } = useSelector(
    state => state.words,
  )
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const textAreaRef = useRef()

  function toggleAddSentenceContainer() {
    setValue('')
    dispatch(setIsTextFieldActive(true))
    textAreaRef.current.focus()
  }

  const onButtonClick = () => {
    dispatch(updateSentence(value))
    dispatch(setIsTextFieldActive(false))

    const { word_id } = learningHistory[currentWordIndex]

    const url = `/word/sentence/${word_id}`
    axios
      .put(url, { value })
      .then(response => {
        console.log('Sentence updated successfully', response.data)
      })
      .catch(error => {
        console.error('Sentence not updated.', error)
      })
  }
  return (
    <>
      <button
        className={`show-text-field button ${isTextFieldActive ? 'hide' : ''}`}
        onClick={toggleAddSentenceContainer}>
        <img src='/img/pen.png' />
      </button>
      <div
        className={`add-sentence-container ${
          isTextFieldActive ? 'active' : ''
        }`}>
          <div className='close-senctence-field' onClick={()=> dispatch(setIsTextFieldActive(false))}></div>
        <textarea
          ref={textAreaRef}
          wrap='off'
          id='addSentence'
          className='add-sentence-field'
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button
          onClick={onButtonClick}
          className='send-sentence button'>
          <img src='/img/send.png' />
        </button>
      </div>
    </>
  )
})

export default AddSentence
