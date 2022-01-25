import React, { useState, useEffect } from "react";
import { useSpring, animated as a, to as interpolate } from "react-spring";
import { useGesture } from "@use-gesture/react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Preloader from "../Preloader";
import checkFortuneImage from "../../images/check-fortune-button.png";

const Fortune = ({setView, preload, zodiac: data, images, ...props}) => {
    const [preloader, setPreloader] = useState(true)
    const [animal, setAnimal] = useState({})
    const [selected, setSelected] = useState(false)

    useEffect(
        () => {
            const dateDropdown = document.getElementById('date-dropdown');
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
        }, [preloader]
    )

    useEffect(
        () => {
            animal.name?.length ? setSelected(true) : setSelected(false)
        }, [animal]
    )

    const handleChange = e => {
        const pick = data.filter(d => d.years.includes(Number(e.currentTarget.value)))
        setAnimal(pick[0])
    }

    const dateScreenStyle = useSpring({
        // position: selected ? "relative" : "",
        top: selected ? -200 : 0,
        opacity: selected ? 0 : 1,
        // zIndex: selected ? -1 : 1,
        config: { mass: 1, tension: 600, friction: 50 },
    });

    const fortuneScreenStyle = useSpring({
        // position: !selected ? "relative" : "",
        top: !selected ? -200 : 0,
        opacity: !selected ? 0 : 1,
        // zIndex: !selected ? -1 : 1,
        config: { mass: 1, tension: 600, friction: 50 },
    });

    if(preloader) {
        return (
            <Preloader setPreloader={setPreloader} />
        )
    }

    console.log("IS SELECTED?", selected, animal.image, animal?.language?.jive?.forecast)

    return (
        <div
            style={{
                // background: "black"
            }}
            className="uk-container uk-container-xsmall uk-padding-remove-vertical uk-margin-remove-vertical uk-flex uk-flex-column uk-flex-middle uk-flex-center uk-border-rounded"
            data-uk-height-viewport="offset-top: false; offset-bottom: 56px">
                <a.div style={dateScreenStyle} className="uk-width-1-1">
                    <img src={checkFortuneImage} />
                    <label style={{color: "#fff", paddingBottom: "4px"}} className="uk-form-label">
                        Select your birth year
                    </label>
                    <select
                        style={{fontSize: "1.2rem", height: "56px"}}
                        id="date-dropdown"
                        defaultValue="Choose your birth year"
                        onChange={handleChange}
                        className="uk-select uk-border-rounded">
                    </select>
                </a.div>
                <a.div style={fortuneScreenStyle} className="uk-width-1-1">
                    <div className="uk-container uk-container-expand">
                        <div className="uk-card uk-card-small uk-card-default uk-border-rounded uk-box-shadow-medium">
                            <div className="uk-card-body">
                                <h1>{animal.name}</h1>
                                <p>{animal?.language?.jive?.personality[0]}</p>
                            </div>
                        </div>
                    </div>
                </a.div>
        </div>
        );
    }

export default Fortune;
