import React, { useState, useRef, useEffect, useContext } from "react";
import { useSpring, animated as a, interpolate } from "react-spring";
import { useDrag, useScroll } from "@use-gesture/react";
import useIsIOS from "./hooks/useIsIOS"
import {InstallPWA} from "./components/InstallPWA"
import Walkthrough from "./components/Walkthrough"
import HyperSwiper from "./components/HyperSwiper";
import './App.css';
import "./styles/uikit.css";
import {zodiac, elements} from './Data/index.js'
import logo from "./images/tiger-icon.png"

function importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        return images;
    }

const App = () => {
    const { isIPhone, isIPad, isIOS, isSafari, prompt } = useIsIOS();
    const [walkthrough, setWalkthrough] = useState();
    const [preload, setPreload] = useState(true);
    const [mobile, setMobile] = useState(false);
    const [images, setImages] = useState([])
    const [searchExpanded, setSearchExpanded] = useState(true)

    useEffect(
        () => {
            setImages(importAll(require.context('./images/characters', false, /\.(png|jpe?g|svg)$/)));
        }, [walkthrough]
    )

    useEffect(
        () => {
            try {
                const UIkit = require("uikit/dist/js/uikit");
                const Icons = require("uikit/dist/js/uikit-icons");
                UIkit.use(Icons);

                if(window.innerWidth <= 640) {setMobile(true)}
                const loader = document.getElementById('loadingOverlayPWA')
                if (!loader) return;
                let timer1 = setTimeout(() => {
                    loader.classList.add("fadeOut")
                }, 1000)

                let timer2 = setTimeout(() => {
                    loader.remove()
                }, 2500)
                return () => {
                    clearTimeout(timer1)
                    clearTimeout(timer2)
                }
            } catch (e) {
                console.error("ONLOAD LAYOUT ERROR", e, e.response);
            }
        }, []
    )

    const bind = useDrag(({ args: [index], down, movement: [my], distance, direction: [x, y], delta: [yDelta], velocity }) => {
        const trigger = velocity > 0.2
        const gotDelta = Math.abs(yDelta) >= 1
        let dir = y < 0 ? -1 : 1
        // if(!down && trigger) {
        //     setDataExpanded(dir)
        // };
    })

    return (
        <>
        <div id="loadingOverlayPWA"
            style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: "0",
                left: "0",
                zIndex: 100020,
                backgroundColor: "rgb(163, 41, 37)"
            }}/>
        <nav style={{zIndex: "100000"}} className="uk-navbar-container uk-navbar-transparent" data-uk-navbar>
            <div className="uk-navbar-center uk-padding-small">
                <img src={logo} className="uk-margin-remove" width="48" />
            </div>
        </nav>
        <main>
            <Walkthrough mobile={mobile} preload={preload} setPreload={setPreload} />
            <HyperSwiper preload={preload} zodiac={zodiac} images={images} />
            {prompt && <InstallPWA />}
        </main>
        </>
        );
    }

export default App;
