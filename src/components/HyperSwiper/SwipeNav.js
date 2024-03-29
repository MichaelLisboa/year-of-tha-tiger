import React from "react";
import style from "./Deck.module.css";
import next from "../../images/icons/arrow-right-white.svg";
import prev from "../../images/icons/arrow-left-white.svg";

export default function SwipeNav({cardIndex, forceSwipe}) {
    return (
        cardIndex > -1 ?
        <div className={`${style.swipeNav}`}>
                <div>
                    <button
                        style={{borderStyle: "none", opacity: "0.7"}}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (cardIndex >= 0) {
                            forceSwipe(-1)
                          }
                        }}
                        >
                        <img src={prev} width="48" />
                    </button>
                </div>
                <div>
                    <button
                        style={{borderStyle: "none", opacity: "0.7"}}
                        onClick={(e) => {
                          e.stopPropagation()
                          if (cardIndex >= 0) {
                            forceSwipe(1)
                          }
                        }}
                    >
                        <img src={next} width="48" />
                    </button>
                </div>
        </div>
        : null
    )
}
