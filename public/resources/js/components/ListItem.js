import React, { memo, useState, useRef } from "react"
import { LEVEL_HASH_COLOR } from '../enums.js'
import PropTypes from 'prop-types'
import { useGesture } from "@use-gesture/react"
import { useSpring, animated } from "react-spring"
import { useDispatch } from "react-redux"
import { updateLevel, uploadNewLevelToDatabase } from '../redux/words.js'

ListItem.propTypes = {
    item: PropTypes.object
}

function ListItem ({item}) {
    const dispatch = useDispatch()
    console.log('li render')
    const [oldLevel, setOldLevel] = useState(item.level)
    const newLevelRef = useRef(null)

    const [{ x, width, backgroundColor }, api] = useSpring(() => ({
        x: 0,
        width: '10px',
        backgroundColor: LEVEL_HASH_COLOR[item.level]
      }))

    const bindItemDrag = useGesture({
        onDrag: ({ active, movement: [ox] }) => {

            if ( ox < 50 && ox > 10){
                newLevelRef.current = 'd'
            } else if (ox > 50 && ox < 100){
                newLevelRef.current = 'c'
            } else if (ox > 100 && ox < 150){
                newLevelRef.current = 'b'
            } else if (ox > 150){
                newLevelRef.current = 'a'
            }
            const color = LEVEL_HASH_COLOR[newLevelRef.current]

            api.start({
                x: active ? ox : 0,
                to: {
                    width: active? `${ox + 10}px`: '10px',
                    backgroundColor: color
                }
            })
        },
        onDragEnd: () => {
            if(oldLevel === newLevelRef.current){
                return
            }
            dispatch(updateLevel(newLevelRef.current))
            setOldLevel(newLevelRef.current)
            dispatch(uploadNewLevelToDatabase(newLevelRef.current))
        }
    })


    return(
        <animated.li className='word-container' {...bindItemDrag()}>
            <animated.div
                className={`word-list-level`}
                style={{ x, width, backgroundColor }}
            ></animated.div>
            <p className='word-list-word'>{item.word}</p>
            <p className='word-list-translation'>{item.translation}</p>
        </animated.li>
    )

}
export default memo(ListItem)