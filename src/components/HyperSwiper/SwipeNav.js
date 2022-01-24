import React from "react";
import style from "./Deck.module.css";
import hate from "../../images/Hate.png";
import love from "../../images/Love.png";

export default function SwipeNav({deck, cardIndex, bind, forceSwipe, height, isEmpty}) {
    return (
        cardIndex > -1 ?
        <div className={`${style.swipeNav}`}>
                <div>
                    <button
                        style={{borderStyle: "none"}}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (cardIndex >= 0) {
                            forceSwipe(-1)
                          }
                        }}
                        >
                        <img
                            src={hate}
                            alt="Pass"
                            width="36" />
                    </button>
                </div>
                <div>
                    <button
                        style={{borderStyle: "none"}}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (cardIndex >= 0) {
                            forceSwipe(1)
                          }
                        }}
                    >
                        <img
                            src={love}
                            alt="Like"
                            width="36" />
                    </button>
                </div>
        </div>
        : null
    )
}
