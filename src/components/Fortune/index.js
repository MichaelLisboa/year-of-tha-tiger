import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated as a, to as interpolate } from "react-spring";
import { useSpringCarousel } from 'react-spring-carousel-js'
import { useGesture } from "@use-gesture/react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Preloader from "../Preloader";
import style from "../HyperSwiper/Deck.module.css";
import checkFortuneImage from "../../images/check-fortune-button.png";
import reloadButton from "../../images/reload.png";
import next from "../../images/icons/arrow-right-white.svg";
import prev from "../../images/icons/arrow-left-white.svg";

const trans = (r, s) => `perspective(1500px) rotateX(5deg) rotateY(${r/10}deg) rotateZ(${r}deg) scale(${s})`;

const CarouselContainer = ({height, children}) => {
    return (
        <div
            style={{height: height*0.8}}
            className={`${style.deck}`}>
            {children}
        </div>
    )
}

const CarouselItem = ({height, children}) => {
    return (
        <div style={{
            width: "100%",
            border: "#fff 4px solid",
            borderRadius: "20px",
            transform: `rotateY(${(Math.random() * 9)/10} + 'deg')`,
            touchAction: "pan-x"
        }}
        className="uk-margin-right uk-margin-left">
            <div
                style={{
                    height: "98.4%",
                    width: "auto",
                    zIndex: "-1",
                    transform: `rotateY(${(Math.random() * 9)/10} + 'deg')`,
                }}
                className={`${style.fortuneCard}`}>
                <div style={{height: "100%"}}>
                    {children}
                </div>
            </div>
        </div>
    )
}

const Fortune = ({setView, zodiac: data, images, ...props}) => {
    const { height } = useWindowDimensions();
    const [preloader, setPreloader] = useState(true)
    const [animal, setAnimal] = useState({})
    const [selected, setSelected] = useState(false)
    const image = useRef()
    let dateDropdown;

    const {
    carouselFragment,
    slideToPrevItem,
    slideToNextItem,
  } = useSpringCarousel({
    initialActiveItem: 0,
    withLoop: true,
    items: [
      {
        id: "CarouselItem-1",
        renderItem: (
          <CarouselItem>
            <div
                style={{
                    backgroundImage: `url('${image.current}')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                    height: "100%"
                }} />
          </CarouselItem>
        )
      },
      {
        id: "CarouselItem-2",
        renderItem: (
          <CarouselItem>
            <div className={`uk-padding`}>
                <h2>{animal.name}'s Personality</h2>
                <p>{animal?.language?.jive?.personality[0]}</p>
            </div>
          </CarouselItem>
        )
      },
      {
        id: "CarouselItem-2",
        renderItem: (
          <CarouselItem>
            <div className={`uk-padding`}>
                <h2>{animal.name}'s Fortune</h2>
                <p>{animal?.language?.jive?.forecast[0]}</p>
            </div>
          </CarouselItem>
        )
      },
      {
        id: "CarouselItem-2",
        renderItem: (
          <CarouselItem>
            <div className={`uk-padding`}>
                <h2>{animal.name}'s Compatibility</h2>
                <p>{animal?.language?.jive?.story[0]}</p>
            </div>
          </CarouselItem>
        )
      },
    ],
  });

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
        <>
            <a.div style={dateScreenStyle}>
                <div
                    style={{height: height}}
                    className={`${style.deckContainer}`}>
                    <div className="uk-container uk-container-xsmall">
                        <img src={checkFortuneImage} />
                        <select
                            style={{fontSize: "1.2rem", height: "56px"}}
                            id="date-dropdown"
                            defaultValue="Choose your birth year"
                            onChange={handleChange}
                            className="uk-select uk-border-rounded uk-margin-remove-vertical">
                        </select>
                    </div>
                </div>
            </a.div>

            <a.div
                style={fortuneScreenStyle}>
                <div
                    style={{height: height}}
                    className={`${style.fortuneContainer}`}>
                    {selected ?
                    <CarouselContainer height={height}>
                        {carouselFragment}
                        <div className={`${style.swipeNav} uk-width-5-6 uk-margin-top`}>
                            <button
                                type="prev"
                                onClick={slideToPrevItem}
                                style={{borderStyle: "none", padding: "0", opacity: "0.7"}}>
                                <img className="uk-light uk-svg" src={prev} width="48" data-uk-svg />
                            </button>
                            <button
                                style={{borderStyle: "none", padding: "0"}}
                                onClick={() => setSelected(false)}>
                                <img src={reloadButton} width="80" />
                            </button>
                            <button
                                type="next"
                                onClick={slideToNextItem}
                                style={{borderStyle: "none", padding: "0", opacity: "0.7"}}>
                                <img src={next} width="48" data-uk-svg />
                            </button>
                        </div>
                    </CarouselContainer>
                    : null}
                </div>
            </a.div>
        </>
        );
    }

export default Fortune;
