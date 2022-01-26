import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated as a, to as interpolate } from "react-spring";
import { useGesture } from "@use-gesture/react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Preloader from "../Preloader";
import style from "../HyperSwiper/Deck.module.css";
import checkFortuneImage from "../../images/check-fortune-button.png";

const Fortune = ({setView, zodiac: data, images, ...props}) => {
    const { height } = useWindowDimensions();
    const [preloader, setPreloader] = useState(true)
    const [animal, setAnimal] = useState({})
    const [selected, setSelected] = useState(false)
    const image = useRef()
    let dateDropdown;

    useEffect(
        () => {
            dateDropdown = document.getElementById('date-dropdown');
            if(!dateDropdown) return;
            const dropdownDefault = document.createElement('option');
            dropdownDefault.text = "In what year were you born?";
            dropdownDefault.value = "";
            dateDropdown.add(dropdownDefault);

            let currentYear = new Date().getFullYear();
            let earliestYear = 1920;
            while (currentYear >= earliestYear) {
                const dateOption = document.createElement('option');
                dateOption.text = currentYear;
                dateOption.value = currentYear;
                dateDropdown.add(dateOption);
                currentYear -= 1;
              }
        }, [preloader, selected]
    )

    useEffect(
        () => {
            animal.name?.length ? setSelected(true) : setSelected(false)
        }, [animal]
    )

    const handleChange = e => {
        const pick = data.filter(d => d.years.includes(Number(e.currentTarget.value)))
        dateDropdown.selectedIndex = 0;
        image.current = Object.values(images).filter(i => i.includes(pick[0].name))
        setAnimal(pick[0])
    }

    const dateScreenStyle = useSpring({
        display: selected ? "none" : "block",
        transform: selected ? "scale(0)" : "scale(1)",
        config: { mass: 1, tension: 600, friction: 50 },
    });

    const fortuneScreenStyle = useSpring({
        display: !selected ? "none" : "block",
        transform: !selected ? "scale(0)" : "scale(1)",
        config: { mass: 1, tension: 600, friction: 50 },
    });

    if(preloader) {
        return (
            <Preloader setPreloader={setPreloader} />
        )
    }

    return (
        <div
            style={{height: height-24}}
            className={`${style.deckContainer}`}>
            <div className={`uk-container uk-container-small`}>
                <a.div style={dateScreenStyle} className="uk-width-1-1">
                    <img src={checkFortuneImage} />
                    <select
                        style={{fontSize: "1.2rem", height: "56px"}}
                        id="date-dropdown"
                        defaultValue="Choose your birth year"
                        onChange={handleChange}
                        className="uk-select uk-border-rounded uk-margin-remove-vertical">
                    </select>
                </a.div>
                <a.div style={fortuneScreenStyle} className="uk-width-1-1">
                    <div className="uk-position-relative uk-visible-toggle" data-uk-slider>
                        <div className="uk-slider-items uk-grid uk-grid-match" data-uk-grid>
                            <div className="uk-width-3-4">
                                <div className="uk-card uk-card-small uk-card-default uk-border-rounded uk-box-shadow-medium uk-box-shadow-hover-large">
                                    <div className="">
                                        <img src={image.current} data-uk-img />
                                    </div>
                                </div>
                            </div>
                            <div className="uk-width-3-4">
                                <div className="uk-card uk-card-small uk-card-default uk-border-rounded uk-box-shadow-medium uk-box-shadow-hover-large">
                                    <div className="uk-card-body">
                                        <h1 onClick={() => setSelected(false)}>{animal.name}</h1>
                                        <p>{animal?.language?.jive?.personality[0]}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="uk-width-3-4">
                                <div className="uk-card uk-card-small uk-card-default uk-border-rounded uk-box-shadow-medium uk-box-shadow-hover-large">
                                    <div className="uk-card-body">
                                        <h1 onClick={() => setSelected(false)}>{animal.name}</h1>
                                        <p>{animal?.language?.jive?.forecast[0]}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="uk-width-3-4">
                                <div className="uk-card uk-card-small uk-card-default uk-border-rounded uk-box-shadow-medium">
                                    <div className="uk-card-body">
                                        <h1 onClick={() => setSelected(false)}>{animal.name}</h1>
                                        <p>{animal?.language?.jive?.story[0]}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a className="uk-position-center-left uk-position-small uk-hidden-hover" href="#" data-uk-slidenav-previous data-uk-slider-item="previous"></a>
                        <a className="uk-position-center-right uk-position-small uk-hidden-hover" href="#" data-uk-slidenav-next data-uk-slider-item="next"></a>
                    </div>
                </a.div>
            </div>
        </div>
        );
    }

export default Fortune;
