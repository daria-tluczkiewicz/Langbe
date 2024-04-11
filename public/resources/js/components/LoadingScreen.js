import React from 'react'
import { useSelector } from 'react-redux'
import { LEVEL_COLOR } from '../enums.js'

export default function LoadingScreen() {
  const learningHistory = useSelector(state => state.words)

  const currentLevel =
    learningHistory.length >= 1
      ? learningHistory[learningHistory.length - 1].level
      : undefined

  const color = currentLevel ? LEVEL_COLOR[currentLevel] : ''

  return (
    <div className={`lds-ring container ${color} color-transition`}>
      <div className='lds-ring'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
