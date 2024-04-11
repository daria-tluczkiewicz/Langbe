import { useDispatch } from 'react-redux'
import {
  updateGameMode,
  cleanLearningHistory,
  updateAppModeStatus,
  setIsCardLoading,
} from '../redux/words'
import React from 'react'

export default function Mode() {
  const dispatch = useDispatch()

  function changeGameMode(event) {
    console.log(event.target.value)
    dispatch(setIsCardLoading(true))
    dispatch(updateGameMode(event.target.value))
    dispatch(cleanLearningHistory())
    dispatch(updateAppModeStatus(''))
  }

  return (
    <>
      <div className='change-mode-container transition'>
        <h2>Wybierz ilość słów</h2>
        <div className='input-container'>
          <input
            type='radio'
            id='level1'
            value='200'
            name='change-mode'
            onClick={changeGameMode}
          />
          <label htmlFor='level1'>200</label>
          <input
            type='radio'
            id='level2'
            value='500'
            name='change-mode'
            onClick={changeGameMode}
          />
          <label htmlFor='level2'>500</label>
          <input
            type='radio'
            id='level3'
            value='1000'
            name='change-mode'
            onClick={changeGameMode}
          />
          <label htmlFor='level3'>1000</label>
          <input
            type='radio'
            id='level4'
            value='2000'
            name='change-mode'
            onClick={changeGameMode}
          />
          <label htmlFor='level4'>2000</label>
          <input
            type='radio'
            id='level5'
            value='3000'
            name='change-mode'
            onClick={changeGameMode}
          />
          <label htmlFor='level5'>3000</label>
        </div>
      </div>
    </>
  )
}
