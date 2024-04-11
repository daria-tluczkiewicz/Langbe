import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkIfUserIsLoggedIn, loadNewWord } from '../redux/words'
import Card from './Card'
import Containers from './Containers'
import Icons from './Icons'
import WordList from './WordList'
import Overlay from './Overlay'
import Popup from './Popup'

export default function App() {
  const gameMode = useSelector(state => state.words.gameMode)
  const appModeStatus = useSelector(state => state.words.appModeStatus)
  const dispatch = useDispatch()
  const displayPopup = JSON.parse(localStorage.getItem("isOverlayActive"))
  const [isOverlayActive, setIsOverlayActive] = useState(displayPopup === null)

  console.log(isOverlayActive)
  useEffect(() => {
    dispatch(loadNewWord())
  }, [gameMode])

  useEffect(() => {
    dispatch(checkIfUserIsLoggedIn())
  },[])

  return (
    <>
      <Popup/>
      {isOverlayActive
        ? <Overlay setIsOverlayActive={setIsOverlayActive}/>
        : null}
      <div className={appModeStatus}>
        <Icons />
        <Containers />
        <main className='centered'>
          {appModeStatus === 'word-list-open' ? <WordList /> : <Card />}
        </main>
      </div>
    </>
  )
}
