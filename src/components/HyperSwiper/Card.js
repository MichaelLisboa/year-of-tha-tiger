import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useSpring, animated as a, to as interpolate } from "react-spring";
import useWindowDimensions from "../../hooks/useWindowDimensions";

import style from "./Deck.module.css";
const trans = (r, s) => `perspective(1500px) rotateX(5deg) rotateY(${r/10}deg) rotateZ(${r}deg) scale(${s})`;

const Card = ({
    bind,
    current,
    card,
    rot,
    scale,
    height: viewportHeight,
    images
  }) => {
    const { width } = useWindowDimensions();
    const [storyExpanded, setStoryExpanded] = useState(false);
    const image = useMemo(
        () => Object.values(images).filter(i => i.includes(card.name)),
        [images, card]
      );
    const handleClick = useCallback(() => setStoryExpanded(!storyExpanded), [storyExpanded]);

    useEffect(
        () => {
          const footerElement = document.querySelector('.view-story');
          footerElement.addEventListener('click', handleClick);
          return () => {
            footerElement.removeEventListener('click', handleClick);
          };
        },
        [handleClick]
      );

    const {height} = useSpring({
        height: storyExpanded ? "60%" : "8%",
        config: {
            mass: 3,
            tension: 500,
            friction: 30
        }
    })

    const animalStory = useSpring({
        height: "100%",
        opacity: storyExpanded ? 1 : 0
    })

    return (
        <a.div
            {...bind(current)}
            className={`uk-box-shadow-medium`}
            style={{
                width: "auto",
                border: "#fff 4px solid",
                borderRadius: "20px",
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
                        onClick={handleClick}
                        className={`${style.cardBody} view-story uk-flex uk-flex-column uk-flex-middle`}>
                        <p
                            style={{
                                position: "relative",
                                color: "#fff",
                                fontWeight: "600",
                                fontSize: "16px",
                                border: "1px solid rgba(255, 255, 255, 0.5)",
                                borderRadius: "8px",
                                paddingLeft: "24px",
                                paddingRight: "24px"
                            }}
                            className="uk-width-auto uk-display-block uk-text-center uk-padding-remove-bottom uk-margin-small-bottom uk-flex uk-flex-top">
                            {storyExpanded ?
                                <span>Hide {card.name}'s story</span>
                                :
                                <span>{width <= 640 ? "Tap" : "Click"} fo' {card.name}'s story</span>
                            }
                            </p>
                        <a.div style={animalStory} className="uk-flex uk-flex-column uk-flex-middle uk-flex-center">
                            <p className="scale-text uk-flex uk-flex-column uk-flex-between">{card.language.jive.story}</p>
                        </a.div>
                    </a.div>
                </div>
            </a.div>
        </a.div>
    )
}

export default Card;
