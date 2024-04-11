import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import ListItem from './ListItem'
import Pagination from './Pagination'
import { useDispatch } from 'react-redux'
import { resetPageNumber } from "../redux/words"

export default function WordList() {
  const learningHistory = useSelector(state => state.words.learningHistory)
  const [wordsToDisplay, setWordsToDisplay] = useState([])
  const pageNumber = useSelector(state => state.words.pageNumber)
  const dispatch = useDispatch()
  
  useEffect(()=> {
    dispatch(resetPageNumber())
  },[])

  console.log(pageNumber)

  function assignPages() {
    const startFromIdx = pageNumber * 8
    let updatedWordsToDisplay = []
    let maxIndex = learningHistory[startFromIdx + 8] !== undefined // jeśli nie ma przynajmniej 8 kolejnych słów
      ? startFromIdx + 8
      : learningHistory.length

    if (startFromIdx > maxIndex) {
      return
    }

    for(let i = startFromIdx; i < maxIndex; i++){
      updatedWordsToDisplay.push(learningHistory[i])
    }
    setWordsToDisplay(updatedWordsToDisplay)
  }

  useEffect(() => {
    assignPages()
  }, [pageNumber])


  return (
    <>
      <ul
        className='app-card word-list'
        id='wordList'>
          {wordsToDisplay.map(item => (
            <ListItem item={item} key={crypto.randomUUID()} />
          ))}
          <Pagination/>
      </ul>
    </>
  )
}