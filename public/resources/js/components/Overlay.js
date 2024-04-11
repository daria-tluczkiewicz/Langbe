import React from "react"
export default function Overlay ({setIsOverlayActive}) {

    function disableOverlay() {
        setIsOverlayActive(false)
        localStorage.setItem("isOverlayActive", false);
    }
    return (
        <>
            <div className="overlay centered">
                <div className="instructions">
                    <div className="centered drag up">
                        <img className="arrow" src="/img/arrow.png"></img>
                        <div className="row">
                            <p>Drag up and hold to pick your</p>
                            <div className="level-icon">
                                <img src="/img/level.png"></img>
                                <p>level</p>
                            </div>
                        </div>
                        <p>and release to save it</p>

                    </div>
                    <div className="centered drag right">
                        <img className="arrow" src="/img/arrow.png"></img>
                        <div className="flex-row container">
                            <p>Swipe left<br/>for next</p>
                            <div className="outline">word</div>
                        </div>
                    </div>
                    <div className="centered drag left">
                        <img className="arrow" src="/img/arrow.png"></img>
                        <div className="flex-row container">
                            <p>Swipe right<br/>for previous</p>
                            <div className="outline">word</div>
                        </div>
                    </div>
                    <div className="centered drag down">
                        <img className="arrow" src="/img/arrow.png"></img>
                        <p>Swipe down to reveal <br/> the translation</p>

                    </div>
                    <button className="button try" onClick={disableOverlay}>Try it out!</button>
                </div>
            </div>
        </>
    )
}