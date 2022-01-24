import React, { useState } from "react";
import { useSpring, animated as a, to as interpolate } from "react-spring";

import style from "./Deck.module.css";
const trans = (r, s) => `perspective(1500px) rotateX(5deg) rotateY(${r/10}deg) rotateZ(${r}deg) scale(${s})`;

const Card = ({bind, current, active, card, gone, rot, scale, height: viewportHeight, images}) => {
    const [storyExpanded, setStoryExpanded] = useState(false);
    const image = Object.values(images).filter(i => i.includes(card.name))

    const {height} = useSpring({
        height: storyExpanded ? "40%" : "10%",
        config: {
            mass: 3,
            tension: 500,
            friction: 30
        }
    })

    return (
        <a.div
            {...bind(current)}
            className={`uk-box-shadow-medium`}
            style={{
                width: "auto",
                border: "#fff 8px solid",
                borderRadius: "24px",
                transform: interpolate([rot, scale], trans),
                touchAction: "pan-x"
            }}>
            <a.div
                style={{
                    height: viewportHeight,
                    width: "auto",
                    backgroundImage: `url('${image[0]}')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center center"
                }}
                className={`${style.card}`}>
                <div style={{height: "100%"}}>
                    <a.div
                        style={{
                            zIndex: "1",
                            cursor: "pointer",
                            height
                        }}
                        onClick={() => setStoryExpanded(!storyExpanded)}
                        className={`${style.cardBody} uk-flex uk-flex-column uk-flex-middle`}>
                        <p
                            style={{
                                position: "relative",
                                color: "#fff",
                                fontWeight: "600",
                                fontSize: "1.1rem",
                                border: "1px solid rgba(255, 255, 255, 0.5)",
                                borderRadius: "8px",
                                paddingLeft: "24px",
                                paddingRight: "24px"
                            }}
                            className="uk-width-auto uk-display-block uk-text-center uk-padding-remove-bottom uk-margin-small-bottom uk-flex uk-flex-top">
                            {storyExpanded ?
                                <span>Hide {card.name}'s story</span>
                                :
                                <span>{window.innerWidth <= 640 ? "Tap" : "Click"} fo' {card.name}'s story</span>
                            }
                            </p>
                        <p
                            style={{fontWeight: "600", lineHeight: "1.25rem"}}
                            className="uk-padding-remove-top uk-margin-remove-top uk-flex uk-flex-middle">{card.language.jive.story}</p>
                    </a.div>
                </div>
            </a.div>
        </a.div>
    )
}

export default Card;
