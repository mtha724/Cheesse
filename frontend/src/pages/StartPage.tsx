// src/pages/GamePage.tsx
import "./StartPage.css"
import GamePage from './GamePage'
import { useState } from "react";

export default function StartPage() {
    const [gamePage, setGamePage] = useState(false)
    const [buttonsVisible, setButtonsVisible] = useState(true)
    const showGamePage = () => {
        setGamePage(true);
        setButtonsVisible(false)
    }

    return (
        <div className="start-page-wrapper">
            {buttonsVisible && (
                <div className="start-page-div">
                    <h1 className="cheesse">Cheesse</h1>
                    <div id="buttons-div" className="buttons-div">
                        <div className="play-style-buttons">
                            <button className="option-button">Local PVP</button>
                            <button className="option-button">PVC</button>
                            <button className="option-button">Online PVP</button>
                        </div>
                        <div className="timer-buttons">
                            <button className="option-button">5 Mins</button>
                            <button className="option-button">10 Mins</button>
                            <button className="option-button">60 Mins</button>
                        </div>
                        <button className="start-button" onClick={showGamePage}> Start </button>
                    </div>
                </div>
            )}
            {gamePage ? <GamePage /> : null};
        </div>
    );
}
