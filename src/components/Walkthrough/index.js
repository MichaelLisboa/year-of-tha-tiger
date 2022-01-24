import React, {useState, useEffect} from "react";
import { useSpring, animated as a } from "react-spring"
import style from "./Walkthrough.module.css";
import logo from "../../images/tiger-icon.png"

const Walkthrough = ({preload, setPreload, mobile}) => {
    const coverScreenStyle = useSpring({
        position: "fixed",
        top: preload ? "0%" : "100%",
        left: 0,
        right: 0,
        height: "100%",
        width: "100%",
        opacity: preload ? 1 : 0,
        zIndex: "1005",
        config: { mass: 1, tension: 600, friction: 50 },
    });

    return (
        <a.div id="walkthroughPWA" style={coverScreenStyle}>
            <div className={`${style.walkthroughContainer} uk-container uk-container-expand`}>
                <div
                    style={{
                            border: "4px inset rgba(215, 80, 78, 0.4)",
                            backgroundColor: "background-color: rgba(163, 41, 37, 0.8)",
                            borderRadius: "32px",
                            padding: "32px"
                        }}
                    className="uk-width-1-2@s uk-flex uk-flex-column uk-flex-middle uk-flex-center">
                    <div>
                        <p style={{fontSize: "1.85em", color: "#fff", fontWeight: "800"}} className="uk-text-nowrap">A long azz time'go...</p>
                        <div>
                            <p className="uk-h5 uk-margin-small">Jade Emperuh wants t'select twelve badass animals to be his muthafunkin' Royal Guards, see?</p>
                            <p className="uk-h5 uk-margin-small">He spread tha damn message all through his lands, bein' like,</p>
                            <p className="uk-h5 uk-margin-small"><i>"All yalls badass animals gots ta race to tha Heavenly Gate, yo."</i></p>
                            <p className="uk-h5 uk-margin-small">He said, <i>"Tha faster you is, tha higher yo rank. Get it? Don't be a jive turkey, get yo' azz up there!"</i></p>
                            <p className="uk-h5 uk-margin-small">Tha nex'day the baddest of the badass animals rolled up on tha Heavenly Gate.</p>
                            <div className="uk-text-center uk-margin-large-top">
                                <button className="uk-button uk-button-large uk-button-danger uk-text-bold uk-border-pill uk-box-shadow-small uk-box-shadow-hover-large"
                                    onClick={() => setPreload(false)}><span>Yo, {mobile ? "tap" : "click"} dis fo' tha story</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a.div>
    )
}
export default Walkthrough;
