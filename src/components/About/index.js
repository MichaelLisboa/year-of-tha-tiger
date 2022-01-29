import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated as a, to as interpolate } from "react-spring";
import { useSpringCarousel } from 'react-spring-carousel-js'
import { useGesture } from "@use-gesture/react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Preloader from "../Preloader";
import style from "../HyperSwiper/Deck.module.css";
import checkFortuneImage from "../../images/check-fortune-button.png";
import background from "../../images/paper-bg.png";
import michael from "../../images/michael.png";
import migs from "../../images/migs.png";
import kathleen from "../../images/kathleen.png";

const About = ({setView, ...props}) => {
    const { height } = useWindowDimensions();
    const [preloader, setPreloader] = useState(true)

    // useEffect(
    //     () => {
    //         try {
    //             let timer1 = setTimeout(() => {
    //
    //             }, 1000)
    //             return () => {
    //                 clearTimeout(timer1)
    //             }
    //         } catch (e) {
    //             console.error("ONLOAD LAYOUT ERROR", e, e.response);
    //         }
    //     }, []
    // )


    if(preloader) {
        return (
            <Preloader setPreloader={setPreloader} />
        )
    }

    return (
        <div className="uk-container uk-container-medium uk-height-viewport uk-flex uk-flex-center uk-flex-middle">
        <div data-uk-slider>
            <div className="uk-slider-items uk-grid uk-grid-match uk-child-width-1-3@m">
                <div>
                    <div className={`uk-card uk-card-small uk-card-default uk-border-rounded`}>
                        <div className="uk-card-media-top">
                            <img style={{borderRadius: "6px 6px 0 0"}} src={michael} alt="Michael Lisboa" />
                        </div>
                        <div className="uk-card-body">
                            <h2 style={{fontSize: "32px"}} className="uk-text-nowrap uk-margin-remove-vertical">Michael</h2>
                            <small className="uk-display-block">CREATIVE SILVER BULLET</small>
                            <p className="uk-text-small">I did all the funkin' code for this little app. I also bossed around Kathleen and Migs at all hours, even though they had a lot of client work to get done. I was born in the Year of the Metal Dog. That means I'm badass.</p>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="uk-card uk-card-small uk-card-default uk-border-rounded">
                        <div className="uk-card-media-top">
                            <img style={{borderRadius: "6px 6px 0 0"}} src={kathleen} alt="Kathleen Irena" />
                        </div>
                        <div className="uk-card-body">
                            <h2 style={{fontSize: "32px"}} className="uk-text-nowrap uk-margin-remove-vertical">Kathleen</h2>
                            <small className="uk-display-block">LEAD UX DESIGNER</small>
                            <p className="uk-text-small">Kathleen did all the illustrations. Nice huh? She was born in The Year of the Pig, which means she's creative, intelligent, and compassionate. She's also gullible. A fact that I take advantage of often.</p>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="uk-card uk-card-small uk-card-default uk-border-rounded uk-box-shadow-medium">
                        <div className="uk-card-media-top">
                            <img style={{borderRadius: "6px 6px 0 0"}} src={migs} alt="Martinus Michael" />
                        </div>
                        <div className="uk-card-body">
                            <h2 style={{fontSize: "32px"}} className="uk-text-nowrap uk-margin-remove-vertical">Migs</h2>
                            <small className="uk-display-block">UX/UI DESIGNER</small>
                            <p className="uk-text-small">Migs jumped in to support the team with graphic design. He didn't sleep much, but that's okay. He's young. Migs was born in the Year of the Ox, which means he's honest and hard-working.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="uk-width-1-1 uk-margin-top uk-text-center uk-light uk-flex uk-flex-center">
                <ul className="uk-slider-nav uk-dotnav uk-hidden@m" />
            </div>
        </div>
        </div>
        );
    }

export default About;
