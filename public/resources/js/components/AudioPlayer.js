import { useRef, memo } from 'react'
import React from 'react'
import PropTypes from 'prop-types'

AudioPlayer.propTypes = {
  audio: PropTypes.string,
}
function AudioPlayer({ audio }) {
  const playerRef = useRef(null)

  const audioFileSource = audio.split('/')
  const audioFileName = audioFileSource[audioFileSource.length - 1]
  const path = `https://langbe.online/audio/${audioFileName}`

  function playAudio() {
    playerRef.current.load()
    playerRef.current.play()
  }

  return (
    <>
      <button
        onClick={playAudio}
        className='play button'>
        <img src='/img/speaker.png' />
      </button>
      <div className='player'>
        <audio
          ref={playerRef}
          src={path}></audio>
      </div>
    </>
  )
}

export default memo(AudioPlayer)
