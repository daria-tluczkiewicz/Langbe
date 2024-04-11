import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { showPreviousPage, showNextPage } from "../redux/words"

export default function Pagination() {
    const learningHistory = useSelector(state => state.words.learningHistory)
    const pageNumber = useSelector(state => state.words.pageNumber)
    const dispatch = useDispatch()

    const isDisabled = {
        prev: pageNumber === 0? true : false,
        next: Math.floor((learningHistory.length-1) / 8) <= pageNumber * 8? true : false
    }

    return (
        <div className="pagination-container">
            <div className={`prev ${isDisabled.prev ? 'disabled' : ''}`}
            onClick={isDisabled.prev
                ? null
                : () => dispatch(showPreviousPage())}
            >
                <img src="/img/prev.png"></img>
            </div>
            <div className={`next ${isDisabled.next ? 'disabled' : ''}`}
                onClick={isDisabled.next
                ? null
                : () => dispatch(showNextPage())}
            >
                <img src="/img/next.png"></img>
            </div>
        </div>
    )
}