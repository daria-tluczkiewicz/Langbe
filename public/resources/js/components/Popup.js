import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateIsPopupActive } from "../redux/words"

export default function Popup () {
    const isPopUpActive = useSelector(state => state.words.isPopUpActive)
    const dispatch = useDispatch()

    function closePopup() {
        dispatch(updateIsPopupActive(false))
    }

    return (
        <div className={isPopUpActive ? 'show popup-overlay' : 'popup-overlay'}>
            <div className="register popup">
                <h2>Login or register to save your progress and personalize training!</h2>
                <div className="buttons-container">
                    <button className="button"><a href="/login">Login</a></button>
                    <button className="button register"><a href="/register">Create a free account</a></button>
                </div>
                <div className="icon close" onClick={closePopup}>
                    <img src="/img/x.png"></img>
                </div>
            </div>
        </div>
    )
}