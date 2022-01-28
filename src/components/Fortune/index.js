import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated as a, to as interpolate } from "react-spring";
import { useSpringCarousel } from 'react-spring-carousel-js'
import { useGesture } from "@use-gesture/react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Preloader from "../Preloader";
import style from "../HyperSwiper/Deck.module.css";
import checkFortuneImage from "../../images/check-fortune-button.png";
import reloadButton from "../../images/reload.png";
import background from "../../images/paper-bg.png";
import next from "../../images/icons/arrow-right-white.svg";
import prev from "../../images/icons/arrow-left-white.svg";

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
            touchAction: "pan-x"
        }}
        className="uk-margin-right uk-margin-left">
            <div
                style={{
                    height: "98.4%",
                    width: "auto",
                    zIndex: "-1",
                    backgroundImage: `url(${background})`,
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
     springConfig: {
      tension: 500,
      mass: 2,
    },
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
                <div className="uk-text-center">
                    <h5 style={{lineHeight: "8px"}} className="uk-text-bold uk-text-small uk-margin-remove-bottom uk-padding-remove-bottom uk-text-uppercase">{animal?.name}'s</h5>
                    <h2 className="uk-margin-remove-top uk-padding-remove-top">Personality</h2>
                </div>
                <div className="uk-margin-bottom">
                    <h5 style={{lineHeight: "8px"}} className="uk-text-bold uk-margin-remove-bottom uk-padding-remove">Tha Good</h5>
                    <div className="uk-margin-remove-vertical uk-padding-remove">
                    {animal?.positive?.map((p, i) =>
                        <small className="uk-margin-right uk-margin-remove-vertical uk-padding-remove uk-text-nowrap uk-text-uppercase" key={`${animal.name}-pos-${i}`}>
                            {p}
                        </small>
                    )}
                    </div>
                </div>
                <div>
                    <h5 style={{lineHeight: "8px"}} className="uk-text-bold uk-margin-remove-bottom uk-padding-remove">Tha Bad</h5>
                    <div className="uk-margin-remove-vertical uk-padding-remove">
                    {animal?.negative?.map((p, i) =>
                        <small className="uk-margin-right uk-margin-remove-vertical uk-padding-remove uk-text-nowrap uk-text-uppercase" key={`${animal.name}-neg-${i}`}>
                            {p}
                        </small>
                    )}
                    </div>
                </div>
                <p>{animal?.language?.english?.personality[0]}</p>
            </div>
          </CarouselItem>
        )
      },
      {
        id: "CarouselItem-3",
        renderItem: (
          <CarouselItem>
            <div className={`uk-padding`}>
                <div className="uk-text-center">
                    <h5 style={{lineHeight: "8px"}} className="uk-text-bold uk-text-small uk-margin-remove-bottom uk-padding-remove-bottom uk-text-uppercase">{animal?.name}'s</h5>
                    <h2 className="uk-margin-remove-top uk-padding-remove-top uk-text-nowrap">Funky Fortune</h2>
                </div>
                <p>{animal?.language?.english?.forecast[0]}</p>
            </div>
          </CarouselItem>
        )
      },
      {
        id: "CarouselItem-4",
        renderItem: (
          <CarouselItem>
            <div style={{height: "100%"}} className={`uk-padding`}>
                <div className="uk-text-center">
                    <h5 style={{lineHeight: "8px"}} className="uk-text-bold uk-text-small uk-margin-remove-bottom uk-padding-remove-bottom uk-text-uppercase">{animal?.name}'s</h5>
                    <h2 className="uk-margin-remove-top uk-padding-remove-top">Compatibility</h2>
                </div>
                <div className="uk-margin">
                    {animal?.friends?.length >= 1 ?
                    <div className="uk-grid uk-grid-small">
                        <h5 style={{lineHeight: "24px"}} className="uk-text-bold uk-width-1-1 uk-margin-remove-vertical">{animal.name} gets groovy wit'</h5>
                        {animal.friends.map((f, i) =>
                            <div key={`friend-${i}`} className={`uk-margin-remove uk-text-center uk-width-1-${animal.friends.length}`}>
                                <img style={{border: "solid 3px #fff", borderRadius: "8px"}} className="uk-box-shadow-medium" src={f.image} data-uk-img />
                                <small className="uk-margin-remove-vertical uk-text-bold uk-display-block uk-text-center">{f.friend}</small>
                            </div>
                        )}
                    </div>
                    : null}
                    {animal?.enemies?.length >= 1 ?
                    <div className="uk-grid uk-grid-small uk-margin-top">
                        <h5 style={{lineHeight: "24px"}} className="uk-text-bold uk-width-1-1 uk-margin-remove-vertical">{animal.name} ain't down wit'</h5>
                        {animal.enemies.map((f, i) =>
                            <div key={`enemy-${i}`} className={`uk-margin-remove uk-text-center uk-width-1-${animal.enemies.length}`}>
                                <img style={{border: "solid 3px #fff", borderRadius: "8px"}} className="uk-box-shadow-medium" src={f.image} data-uk-img />
                                <small className="uk-margin-remove-vertical uk-text-bold uk-display-block uk-text-center">{f.friend}</small>
                            </div>
                        )}
                    </div>
                    : null}
                </div>
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
            while (dateDropdown.firstChild) {
                dateDropdown.removeChild(dateDropdown.firstChild);
            }
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

        let friends = [];
        let enemies = [];

        for (const [k, v] of Object.entries(pick[0])) {
            if(k === "friends") {
                v.map(f => {
                    friends.push({
                        friend: f,
                        image: Object.values(images).filter(i => i.includes(f))[0]
                    })
                })
            }
            if(k === "enemies") {
                v.map(f => {
                    enemies.push({
                        friend: f,
                        image: Object.values(images).filter(i => i.includes(f))[0]
                    })
                })
            }
        }

        const animalData = {
            name: pick[0].name,
            image: image.current[0],
            friends: friends,
            enemies: enemies,
            language: pick[0].language,
            negative: pick[0].negative_traits,
            positive: pick[0].positive_traits
        }

        console.log("DATA", animalData)

        setAnimal(animalData)
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
                                <img className="uk-light uk-svg" src={prev} width="48" />
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
                                <img src={next} width="48" />
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
