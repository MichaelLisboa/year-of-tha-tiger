import React from "react";
import { useSpring, animated as a } from "react-spring";
import style from "./Deck.module.css";
import oof from "../../images/oof.png";
import pow from "../../images/pow.png";
import ouch from "../../images/ouch.png";
import smash from "../../images/smash.png";
import bzzt from "../../images/bzzt.png";
import blam from "../../images/blam.png";

const love_g = [pow, smash, blam]
const hate_g = [oof, ouch, bzzt]

const love = () => {
    const l = love_g.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
    return l.slice(-1)[0]
}

const hate = () => {
    const h = hate_g.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
    return h.slice(-1)[0]
}

export default function SwipeAlert({
    config = {
        tension: 400,
        friction: 40
    },
    choice,
    isSwiped
}) {
    const trans = useSpring({
        from: {
            top: "120%",
            opacity: 0.8
        },
        to: async next => {
            await next({
                top: "-10%",
                opacity: 1
            })
            await next({
                top: "-10%",
                opacity: 0
            })
            await next({
                top: "120%",
                opacity: 0
            })
        },
        config: config
    })

    return (
        choice.value &&
        <a.div className={`${style.swipeAlert} ${choice.dir === 1 ? style.swipeLike : style.swipePass}`} style={trans}>
            {choice.dir === 1 ?
            <img
                src={love()}
                alt={choice.value}
                width="288" />
            :
            <img
                src={hate()}
                alt={choice.value}
                width="288" />
            }
        </a.div>
    )
}
