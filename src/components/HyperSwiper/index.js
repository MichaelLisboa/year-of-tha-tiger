import React, { useState, useEffect } from "react";
import Preloader from "../Preloader"
import Deck from "./Deck";

async function fetchCards(data) {
    const res = await data
    return res
}

const HyperSwiper = ({preload, setView, zodiac: data, images}) => {
    const [cards, setCards] = useState({})
    const [isEmpty, setIsEmpty] = useState(true);
    const [preloader, setPreloader] = useState(true)

    useEffect(
        () => {
            setCards({})
            fetchCards(data)
            .then(result => {
                const characters = result.sort(function (a, b) { return b.chapter - a.chapter; });
                setCards(characters);
                setIsEmpty(false);
            })
            .catch(err => {
                console.log("FAILED", err)
            })
        }, [isEmpty, data]
    )

    if(preloader) {
        return (
            <Preloader setPreloader={setPreloader} />
        )
    }

    return (
        !preload && cards.length ?
            <Deck
                preload={preload}
                cards={cards} 
                isEmpty={isEmpty}
                setIsEmpty={setIsEmpty}
                images={images}
                setView={setView} />
            :
            <div style={{height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <small style={{color: "#fff"}}>loading</small>
            </div>
    )
}


export default HyperSwiper;
