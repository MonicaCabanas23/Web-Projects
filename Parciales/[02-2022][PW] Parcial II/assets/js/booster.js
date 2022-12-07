//Declaration of logic variables
let boosterCards = {};
let boosterCounter = 0;

//Declaration of visual variables
let boosterCardsSection = null;

const bindElements = () => {
    boosterCardsSection = document.querySelector("#booster");
}

//Fetch random cards from API to booster
const fetchBoosterCardsRare = async () => {
    let data = null;

    try {
        const response = await fetch("https://api.scryfall.com/cards/random?q=r:rare", {mode: "cors"});
        if(response.ok) {
            data = castResponseToCard(await response.json());
        }
    } catch (error) {
        console.error(error);
        console.error("Ups! Ocurrió un error en la conexión");
    } finally {
        return data;
    }
}

const fetchBoosterCardsMythic = async () => {
    let data = null;

    try {
        const response = await fetch("https://api.scryfall.com/cards/random?q=r:mythic", {mode: "cors"});
        if(response.ok) {
            data = castResponseToCard(await response.json());
        }
    } catch (error) {
        console.error(error);
        console.error("Ups! Ocurrió un error en la conexión");
    } finally {
        return data;
    }
}

const fetchBoosterCardsUncommon = async () => {
    let data = [];

    try {
        for(let i = 0; i < 3; i++){
            const response = await fetch("https://api.scryfall.com/cards/random?q=r:uncommon", {mode: "cors"});
            if(response.ok) {
                data[i] = castResponseToCard(await response.json());
            }
        }
    } catch (error) {
        console.error(error);
        console.error("Ups! Ocurrió un error en la conexión");
    } finally {
        return data;
    }
}

const fetchBoosterCardsCommon = async () => {
    let data = [];

    try {
        for(let i = 0; i < 10; i++){
            const response = await fetch("https://api.scryfall.com/cards/random?q=r:common", {mode: "cors"});
            if(response.ok) {
                data[i] = castResponseToCard(await response.json());
            }
        }
    } catch (error) {
        console.error(error);
        console.error("Ups! Ocurrió un error en la conexión");
    } finally {
        return data;
    }
}

const fetchBoosterCardsBasic = async () => {
    let data = null;

    try {
        const response = await fetch("https://api.scryfall.com/cards/random?q=r:common and type:basic", {mode: "cors"});
        if(response.ok) {
            data = castResponseToCard(await response.json());
        }
    } catch (error) {
        console.error(error);
        console.error("Ups! Ocurrió un error en la conexión");
    } finally {
        return data;
    }
}

const fetchAllCards = async () => {
    if((boosterCounter % 4) != 0){
        boosterCards.rare = await fetchBoosterCardsRare();
        boosterCards.mythic = {image: null, type: null};
        boosterCards.uncommon = await fetchBoosterCardsUncommon();
        boosterCards.common = await fetchBoosterCardsCommon();
        boosterCards.basic = await fetchBoosterCardsBasic();
    }
    else{
        boosterCards.mythic = await fetchBoosterCardsMythic();
        boosterCards.rare = {image: null, type: null};
        boosterCards.uncommon = await fetchBoosterCardsUncommon();
        boosterCards.common = await fetchBoosterCardsCommon();
        boosterCards.basic = await fetchBoosterCardsBasic();
    }
    console.log(boosterCards)
}

//Cast cards info
const castResponseToCard = (card) => {
    let getCards = {};
    let power = card.power || "-";
    let toughness = card.toughness || "-";

    try{
        getCards = {
            name: card.name,
            image: card.image_uris.normal || card.image_uris.png || card.image_uris.border_crop || 'https://cards.scryfall.io/large/front/8/d/8d7f421e-6947-4509-a179-8522fa4a29f8.jpg?1617474535',
            rarity: card.rarity,
            type: card.type_line,
            strengthResistance: `${power}/${toughness}` || "-/-",
            occupied: false
        };
    }catch(error){
        getCards = {
            name: null,
            image: 'https://cards.scryfall.io/large/front/8/d/8d7f421e-6947-4509-a179-8522fa4a29f8.jpg?1617474535',
            rarity: null,
            type: undefined,
            strengthResistance: "-/-",
            occupied: true
        };
    }finally{
        return getCards;
    }
}

//Get booster Cards
let getCards = document.querySelector('#get-booster');

getCards.addEventListener("click", async() => {
    console.log("Get new boosters click");
    displayLoader();
    lockModal();
    boosterCounter++;
    const controls = document.querySelector("#controls h4");
    controls.innerHTML = "Booster Fetched: "+boosterCounter.toString().padStart(3, "0");
    const figure = document.querySelectorAll("#booster figure img");
    figure.forEach((element) => {
        element.src = 'https://backs.scryfall.io/large/5/9/597b79b3-7d77-4261-871a-60dd17403388.jpg?1665006177';
    });
    await fetchAllCards();
    renderBoosterCards();
});

//Loader show
let loader = document.querySelector(".loader-container");
const displayLoader = () => {
    loader.style.display = "flex";
}

//Loader hide
const hideLoader = () => {
    loader.style.display = "none";
}

//Get booster Cards by Booster Draft
let getCardsByBoosterDraft = document.querySelector('.btn-container #btn-booster');

getCardsByBoosterDraft.addEventListener("click", async() => {
    console.log("Get new boosters click");
    displayLoader();
    lockModal();
    boosterCounter++;
    const controls = document.querySelector("#controls h4");
    controls.innerHTML = "Booster Fetched: "+boosterCounter.toString().padStart(3, "0");
    const figure = document.querySelectorAll("#booster figure img");
    figure.forEach((element) => {
        element.src = 'https://backs.scryfall.io/large/5/9/597b79b3-7d77-4261-871a-60dd17403388.jpg?1665006177';
    });
    await fetchAllCards();
    renderBoosterCards();
});

//Clear booster cards
let clearCards = document.querySelector('#clear-data');

clearCards.addEventListener("click", () => {
    console.log("Clear boosters click");
    lockModal();
    const figure = document.querySelectorAll("#booster figure img");
    figure.forEach((element) => {
        element.src = 'https://backs.scryfall.io/large/5/9/597b79b3-7d77-4261-871a-60dd17403388.jpg?1665006177';
    });
});

//Render booster cards
const renderBoosterCards = async () => {
    const figure = document.querySelectorAll("#booster figure img");
    let CountUncommon = 0;
    let CountCommon = 0;
    
    figure.forEach((element) => {
        //Replace cards images
        if(element.className === "rare-mythic"){
            element.src =  boosterCards.rare.image ||boosterCards.mythic.image;
            element.dataset.type = boosterCards.rare.type || boosterCards.mythic.type;
        }
        if(element.className === "uncommon"){
            element.src = boosterCards.uncommon[CountUncommon].image;
            element.dataset.type = boosterCards.uncommon[CountUncommon].type;
            CountUncommon++;
        }if(element.className === "common"){
            element.src = boosterCards.common[CountCommon].image;
            element.dataset.type = boosterCards.common[CountCommon].type;
            CountCommon++;
        }
        if(element.className === "basic"){
            element.src = boosterCards.basic.image;
            element.dataset.type = boosterCards.basic.type;
        }
    });
    console.log('boosterCards: ', boosterCards)
    displayModal();
    hideLoader();
    setModal(boosterCards);
}

//Main function
const Main = () => {
    bindElements();
}

window.onload = Main;