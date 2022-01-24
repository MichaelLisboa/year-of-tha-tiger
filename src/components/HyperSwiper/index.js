import React, { useState, useEffect } from "react";
import Deck from "./Deck";

async function fetchCards(data) {
    const cardData = data;
    const res = await cardData
    return res
}

const HyperSwiper = ({preload, zodiac: data, images, ...props}) => {
    const [cards, setCards] = useState({})
    const [isEmpty, setIsEmpty] = useState(true);

    useEffect(
        () => {
            setCards({})
            fetchCards(data)
            .then(result => {
                const characters = result.sort(function (a, b) { return b.chapter - a.chapter; });
                setCards(characters)
                setIsEmpty(false)
            })
            .catch(err => {
                console.log("FAILED", err)
            })
        }, [isEmpty, data]
    )

    return (
        !preload ?
        cards.length ?
            <Deck preload={preload} cards={cards} isEmpty={isEmpty} setIsEmpty={setIsEmpty} images={images} />
            :
            <div style={{height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
                <small style={{color: "#fff"}}>loading</small>
            </div>
        : null
    )
}


export default HyperSwiper;
