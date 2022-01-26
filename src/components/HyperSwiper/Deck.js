import React, { useState, useEffect } from "react";
import { useSprings, animated as a, to as interpolate } from "react-spring";
import { useGesture } from "@use-gesture/react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Card from "./Card";
import SwipeAlert from "./SwipeAlert";
import SwipeNav from "./SwipeNav";
import style from "./Deck.module.css";
import checkFortuneImage from "../../images/check-fortune-button.png"

const to = i => ({
    x: 0,
    y: i * -1.25,
    scale: 1,
    rot: -3 + Math.random() * 9,
    delay: i * 100,
    config: {
        mass: 1.5,
        friction: 30,
        tension: 300
    }
});

const from = i => ({
    x: 0,
    rot: 0,
    scale: 1.75,
    y: -2000
});

const Deck = ({preload, cards, isEmpty, setIsEmpty, images, setView}) => {
    const { height } = useWindowDimensions();
    const [isSwiped, setIsSwiped] = useState({dir: 0, value: ""});
    const [card, setCard] = useState(cards.length-1);
    const [gone] = useState(() => new Set());
    const [active] = useState(() => new Set([card, card-1]));

    async function GetActiveCard(gone, dir) {
        setIsSwiped({
            ...isSwiped,
            dir: dir,
            value: dir === 1 ? "like" : "pass"
        });
        setCard(card-1);
        active.delete(card+1);
        const res = await card
        return res;
    }

    const [spring, setSpring] = useSprings(cards.length, i => ({
        ...to(i),
        from: from(i)
    }));

    const bind = useGesture(
        {
            onDrag: ({ args: [index], down, movement: [mx], distance, direction: [xDir], velocity: [xVel] }) => {
                const trigger = xDir !== 0 && xVel > 0.3
                const dir = xDir < 0 ? -1 : 1
                if (!down && trigger) {
                    gone.add(index);
                    GetActiveCard(gone, dir)
                }
                setSpring.start(i => {
                    if (index !== i) return
                    const isGone = gone.has(index)
                    const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0
                    const rot = mx / 100 + (isGone ? dir * 10 * xVel : 0)
                    const scale = down ? 1.1 : 1
                    return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
                })
                // if (!down && gone.size === cards.length) setTimeout(() => gone.clear() || setSpring(i => to(i)), 600)
            }
        }
    )

    const forceSwipe = dir => {
        gone.add(card);
        const down = false;
        const {xDelta, velocity} = 0;
        setSpring.start(i => {
            if (card !== i) return;
            const isGone = gone.has(card);
            const x = isGone ? (200 + window.innerWidth) * dir : down ? xDelta : 0 ;
            const rot = xDelta / 100 + (isGone ? dir * 10 * velocity : 0);
            const scale = down ? 1.1 : 1;
            return { x, rot, scale, delay: undefined, config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 } }
        })
        GetActiveCard(gone, dir);
    }

    active.add(card);
    active.add(card-1);

    if(cards.length === 0) {
        return <div />
    }

    return (
        <div
            style={{height: height}}
            className={`${style.deckContainer}`}>
            <div
                style={{height: height*0.7, marginTop: "24px"}}
                className={`${style.deck}`}>
                <SwipeAlert
                    isSwiped={isSwiped}
                    choice={isSwiped} />
                {spring.map(({ x, y, rot, scale }, i) =>
                    <a.div
                        className={`${style.cardContainer}`}
                        key={`card-${i}`}
                        style={{
                            height: "100%",
                            transform: interpolate([x, y], (x, y) => `translate3d(${x}px, ${y}px, 0)`)
                        }}>
                        <Card
                            card={cards[i]}
                            bind={bind}
                            active={active}
                            current={i}
                            images={images}
                            rot={rot}
                            scale={scale}
                            height={height*0.7}
                         />
                    </a.div>
                )}
                <div className="uk-container uk-container-expand uk-margin-large-top uk-height-large uk-flex uk-flex-column uk-flex-middle uk-flex-center">
                    <div
                        className="uk-width-1-1 uk-display-block uk-box-shadow-medium uk-box-shadow-hover-large"
                        onClick={() => setView("fortune")}>
                        <img
                            style={{border: "1px solid rgb(255, 204, 214)", borderRadius: "16px", cursor: "pointer"}}
                            src={checkFortuneImage} />
                    </div>
                    <div className="uk-width-1-1 uk-light uk-text-center uk-text-small uk-margin-large-top uk-margin-medium-bottom">or</div>
                    <div className="uk-width-1-1 uk-display-block uk-text-center">
                        <button
                            style={{color: "#fff", fontSize: "0.85rem"}}
                            onClick={() => setIsEmpty(true)} className="uk-button uk-button-small uk-button-text uk-text-uppercase">
                            start the story again</button>
                    </div>
                </div>
            </div>
            <SwipeNav
                deck={cards}
                cardIndex={card}
                bind={bind}
                forceSwipe={forceSwipe}
                isEmpty={isEmpty}
                height={height*0.4} />
        </div>
    )
}

export default Deck;
