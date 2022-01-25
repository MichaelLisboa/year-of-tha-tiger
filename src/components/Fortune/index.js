import React, { useState, useEffect } from "react";
import checkFortuneImage from "../../images/check-fortune-button.png"

const Fortune = ({setView, preload, zodiac: data, images, ...props}) => {

    useEffect(
        () => {
            const dateDropdown = document.getElementById('date-dropdown');
            console.log(dateDropdown)
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
        }, [images]
    )

    const handleChange = e => {
        console.log("CHANGE", e.currentTarget.value)
    }

    return (
        <section className="uk-section uk-section-large">
            <div className="uk-container uk-container-xsmall uk-margin-large-top uk-height-large uk-flex uk-flex-column uk-flex-middle uk-flex-center uk-border-rounded">
                <div className="uk-width-1-1 uk-display-block uk-margin-large-bottom">
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
                </div>
                <hr />
                <div className="uk-width-1-1 uk-display-block">
                    <button onClick={() => setView("story")} className="uk-width-1-1 uk-button uk-button-large uk-button-danger uk-border-pill uk-text-bold uk-text-uppercase">Start again</button>
                </div>
            </div>
        </section>
        );
    }

export default Fortune;
