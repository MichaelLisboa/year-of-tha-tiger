import React, { useState, useEffect } from "react";
import { useSpring, animated as a } from "react-spring";
import style from "../HyperSwiper/Deck.module.css";
import loading from "../../images/loading.png";
import checkFortuneImage from "../../images/check-fortune-button.png"


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
        <div className="uk-height-viewport uk-flex uk-flex-middle uk-flex-center">
            <a.div className={`${style.swipeAlert} uk-text-center`} style={trans}>
                <img
                    src={loading}
                    alt={"loading"}
                    width="360"
                    data-uk-img />
            </a.div>
        </div>
        );
    }

export default Preloader;
