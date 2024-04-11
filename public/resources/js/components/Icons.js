import {
  updateAppModeStatus,
  checkStats,
} from '../redux/words'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { APP_MODE_STATUS } from '../enums'

export default function Icons() {
  const { isUserLoggedIn, gameMode, appModeStatus } = useSelector(
    state => state.words,
  )
  const dispatch = useDispatch()


  function toggleStats() {
    dispatch(checkStats())
  }

  function toggleChangeMode() {

    if(appModeStatus === APP_MODE_STATUS.CHANGE_MODE_OPEN){
      dispatch(updateAppModeStatus(APP_MODE_STATUS.DEFAULT))
      return
    }
    dispatch(updateAppModeStatus(APP_MODE_STATUS.CHANGE_MODE_OPEN))
  }

  function toggleWordList() {
    dispatch(updateAppModeStatus(APP_MODE_STATUS.WORD_LIST_OPEN))
    if (appModeStatus === APP_MODE_STATUS.WORD_LIST_OPEN) {
      dispatch(updateAppModeStatus(''))
    }
  }
  function logoutUser (event) {
    // TODO: add functionality
    event.preventDefault();
    document.getElementById('logout-form').submit();
    console.log('logged out')
    dispatch
  }

  return (
    <>
    <nav className='navbar'>
      <div className='logo'>
        <img src='/img/langbe.png' />
      </div>
      <div className='icons-container'>
        {isUserLoggedIn
        ? (
          <div className='logged-in-icons-container'>
            <div
              className='mode icon'
              onClick={toggleChangeMode}>
              Lvl
              <div className='lvl'>{gameMode}</div>
            </div>
              <div
                className='word-list-icon icon'
                onClick={toggleWordList}>
                <img src='/img/list-icon.png' />
              </div>
              <div
                className='stats icon'
                onClick={toggleStats}>
                <img src='/img/info.png' />
              </div>
              <div className='logout icon' onClick={logoutUser}>
                <img src='/img/logout.png'/>
              </div>
            </div>
        )
        : (
          <button className='login button'>
            <a
              href='/login'>
              Login
            </a>
          </button>
        )}
      </div>
    </nav>
    </>
  )
}
