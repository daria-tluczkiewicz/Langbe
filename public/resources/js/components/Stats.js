import { useDispatch, useSelector } from 'react-redux'
import { updateUserStatistics } from '../redux/words'
import axios from 'axios'
import React from 'react'
import { LEVEL_COLOR } from '../enums.js'

//window.crypto.randomUUID()

export default function Stats() {
  const userStatistics = useSelector(state => state.words.userStatistics)
  const dispatch = useDispatch({ checkStats })

  function checkStats() {
    const url = `https://langbe.online/stats`

    axios
      .get(url)
      .then(response => {
        dispatch(updateUserStatistics(response.data))
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  return (
    <>
      <div
        className={`statistics-container transition`}
        id='statisticsContainer'>
        {Object.entries(userStatistics).map(([key, stat]) => {
          const color = LEVEL_COLOR[key]

          return (
            <div
              className='stats-container'
              key={crypto.randomUUID()}>
              <div className={`dot ${color}`}></div>
              <div className={`stats${key}`}>{stat}</div>
            </div>
          )
        })}
      </div>
    </>
  )
}
