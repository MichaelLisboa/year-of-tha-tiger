import React, { useState, useEffect } from "react";
import { useSpring, animated as a } from "react-spring";
import style from "../HyperSwiper/Deck.module.css";
import oof from "../../images/oof.png";
import pow from "../../images/pow.png";
import ouch from "../../images/ouch.png";
import smash from "../../images/smash.png";
import bzzt from "../../images/bzzt.png";
import blam from "../../images/blam.png";
import checkFortuneImage from "../../images/check-fortune-button.png"

const effects = [pow, smash, blam, oof, ouch, bzzt]

const sfx = () => {
    const l = effects.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
    return l.slice(-1)[0]
}

const Preloader = ({setPreloader, ...props}) => {

    const trans = useSpring({
        from: {
            top: "120%",
            opacity: 0.6
        },
        to: async next => {
            await next({
                delay: 500
            })
            await next({
                top: "20%",
                opacity: 1
            })
            await next({
                delay: 500
            })
            await next({
                top: "20%",
                opacity: 0
            })
            await next({
                top: "120%",
                opacity: 0
            })
        },
        config: {tension: 400, friction: 40}
    })

    useEffect(
        () => {
            let timer = setTimeout(() => {
                setPreloader(false)
            }, 1800)
            return () => {
                clearTimeout(timer)
            }
        }
    )

    return (
        <section className="uk-section uk-section-large">
            <div className="uk-container uk-container-xsmall uk-margin-large-top uk-height-large uk-flex uk-flex-column uk-flex-middle uk-flex-center uk-border-rounded">
                <div className="uk-width-1-1 uk-display-block uk-margin-large-bottom">
                    <a.div className={`${style.swipeAlert}`} style={trans}>
                        <img
                            src={sfx()}
                            alt={"loading"}
                            width="420" />
                    </a.div>
                </div>
            </div>
        </section>
        );
    }

export default Preloader;
