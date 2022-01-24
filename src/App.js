import React, { useState, useEffect } from "react";
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
    const { prompt } = useIsIOS();
    const [preload, setPreload] = useState(true);
    const [mobile, setMobile] = useState(false);
    const [images, setImages] = useState([])

    console.log(elements)

    useEffect(
        () => {
            setImages(importAll(require.context('./images/characters', false, /\.(png|jpe?g|svg)$/)));
        }, []
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

            <div className="uk-navbar-left uk-padding-remove-vertical uk-margin-remove-vertical">
                <div className="uk-navbar-item">
                    <a style={{height: "16px", fontSize: "12px", color: "#fff"}} className="uk-padding-remove-vertical uk-margin-remove-vertical uk-text-uppercase">Get yo' fortune</a>
                </div>
            </div>
            <div style={{marginTop: "16px"}} className="uk-navbar-center">
                <img src={logo} alt="Year of tha Tigah" width="48" />
            </div>
            <div className="uk-navbar-right uk-padding-remove-vertical uk-margin-remove-vertical">
                <div className="uk-navbar-item">
                    <a style={{height: "16px", fontSize: "12px", color: "#fff"}} className="uk-padding-remove-vertical uk-margin-remove-vertical uk-text-uppercase">Check tha creds</a>
                </div>
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
