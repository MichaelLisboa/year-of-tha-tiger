import React, { useState } from "react";
import { useSpring, animated as a, interpolate } from "react-spring";
import info from "../../images/info.png";
import back from "../../images/flip-back.png";

import style from "./Deck.module.css";
const trans = (r, s) => `perspective(1500px) rotateX(5deg) rotateY(${r/10}deg) rotateZ(${r}deg) scale(${s})`;

const Card = ({bind, current, active, card, gone, rot, scale, height: viewportHeight, images}) => {
    const [flipped, setFlipped] = useState(false);
    const [storyExpanded, setStoryExpanded] = useState(false);
    const image = Object.values(images).filter(i => i.includes(card.name))

    const {transform, opacity, zIndex} = useSpring({
        opacity: flipped ? 1 : 0,
        zIndex: flipped ? 1 : -1,
        transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg)`,
        config: {
            mass: 5,
            tension: 500,
            friction: 80
        }
    })

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
            style={{transform: interpolate([rot, scale], trans), touchAction: "pan-x" }}>
            <a.div
                style={{
                    height: viewportHeight,
                    backgroundImage: `url('${image[0]}')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    opacity: opacity.interpolate(o => 1 - o),
                    transform
                }}
                className={`${style.card}`}>
                <div style={{height: "100%"}}>
                    <div className={`${style.cardHeader}`}>
                        <h2>{card.name}</h2>
                    </div>
                    <a.div
                        style={{
                            zIndex: "1",
                            height: "10%",
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
                                textDecoration: "none",
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
