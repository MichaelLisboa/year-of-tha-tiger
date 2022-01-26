import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated as a, to as interpolate } from "react-spring";
import { useSpringCarousel } from 'react-spring-carousel-js'
import { useGesture } from "@use-gesture/react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Preloader from "../Preloader";
import style from "../HyperSwiper/Deck.module.css";
import checkFortuneImage from "../../images/check-fortune-button.png";

const CarouselContainer = ({height, children}) => {
    return (
        <div
            style={{height: height*0.7}}
            className={`${style.deck}`}>
            {children}
        </div>
    )
}

const CarouselItem = ({height, children}) => {
    return (
        <div style={{
            border: "#fff 4px solid",
            borderRadius: "20px",
            width: "100%",
            height: "auto"
        }}
        className="uk-margin-small-right uk-margin-small-left">
            <div
                style={{
                    height: "98%",
                    width: "auto"
                }}
                className={`${style.card}`}>
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
    thumbsFragment,
    slideToPrevItem,
    slideToNextItem,
  } = useSpringCarousel({
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
                <h2 onClick={() => setSelected(false)}>{animal.name}'s Personality</h2>
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
                <h2 onClick={() => setSelected(false)}>{animal.name}'s Fortune</h2>
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
                <h2 onClick={() => setSelected(false)}>{animal.name}'s Compatibility</h2>
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
        <div
            style={{height: height-24}}
            className={`${style.deckContainer}`}>
                <a.div style={dateScreenStyle}>
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
                </a.div>

                <a.div
                    style={fortuneScreenStyle}>
                    <div
                        style={{height: height-24}}
                        className={`${style.deckContainer}`}>
                        <CarouselContainer height={height}>
                            {carouselFragment}
                        </CarouselContainer>
                    </div>
                </a.div>
        </div>
        );
    }

export default Fortune;
