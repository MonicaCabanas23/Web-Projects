let modal = document.querySelectorAll(".modal-container");
const displayModal = () => {
    modal.forEach(card => {
        card.style.display = "block"
        if(card.querySelector('.modal').classList.contains('true')) card.querySelector('.modal').classList.remove('true');
    });
}

const displayModalDeck = (modal_deck) => {
    modal_deck.style.display = "block";
    if(modal_deck.querySelector('.modal-deck').classList.contains('true')) modal_deck.querySelector('.modal-deck').classList.remove('true');
}

const lockModal = () => {
    let modal = document.querySelectorAll(".modal-container");
    modal.forEach(card => {
        card.style.display = "none"
    });
}

const setModal = (Card) => {
    let card =  Card;
    const modal = document.querySelectorAll(".modal-container .modal");
    let CountCommon = 0, CountUncommon = 0;
    modal.forEach((element) => {
        const informacion = element.querySelector(".information");
        if(informacion){
            if((card.rare.image != null || card.mythic.image != null) && !card.rare.occupied && !element.classList.contains('true')){
                if(card.rare.image){
                    //Set modal information for rare cards
                    informacion.querySelector(".name").textContent = card.rare.name;
                    informacion.querySelector("h3.rarity").textContent = card.rare.rarity;
                    informacion.querySelector("h3.strength-resistance").textContent = card.rare.strengthResistance;
                    element.querySelector("h3.typeline").textContent = card.rare.type;
                    element.classList.add('true');
                    card.rare.occupied = true;
                }
                else if(card.mythic.image){
                    //Set modal information for mythic cards
                    informacion.querySelector("h3.name").textContent = card.mythic.name;
                    informacion.querySelector("h3.rarity").textContent = card.mythic.rarity;
                    informacion.querySelector("h3.strength-resistance").textContent = card.mythic.strengthResistance;
                    element.querySelector("h3.typeline").textContent = card.mythic.type;
                    element.classList.add('true');
                    card.mythic.image = null;
                }
            }
            if(card.uncommon[CountUncommon] && !card.uncommon[CountUncommon].occupied && !element.classList.contains('true')){
                //Set modal information for uncommon cards
                informacion.querySelector("h3.name").textContent = card.uncommon[CountUncommon].name;
                informacion.querySelector("h3.rarity").textContent = card.uncommon[CountUncommon].rarity;
                informacion.querySelector("h3.strength-resistance").textContent = card.uncommon[CountUncommon].strengthResistance;
                element.querySelector("h3.typeline").textContent = card.uncommon[CountUncommon].type;
                element.classList.add('true');
                card.uncommon[CountUncommon].occupied = true;
                CountUncommon++;
            }
            if(card.common[CountCommon] && !card.common[CountCommon].occupied && !element.classList.contains('true')){
                //Set modal information for common cards
                informacion.querySelector("h3.name").textContent = card.common[CountCommon].name;
                informacion.querySelector("h3.rarity").textContent = card.common[CountCommon].rarity;
                informacion.querySelector("h3.strength-resistance").textContent = card.common[CountCommon].strengthResistance;
                element.querySelector("h3.typeline").textContent = card.common[CountCommon].type;
                element.classList.add('true');
                card.common[CountCommon].occupied = true;
                CountCommon++;
            }
            if(card.basic && !card.basic.occupied && !element.classList.contains('true')){
                //Set modal information for basic cards
                informacion.querySelector("h3.name").textContent = card.basic.name;
                informacion.querySelector("h3.rarity").textContent = card.basic.rarity;
                informacion.querySelector("h3.strength-resistance").textContent = card.basic.strengthResistance;
                element.querySelector("h3.typeline").textContent = card.basic.type;
                element.classList.add('true');
                card.basic.occupied = true;
            }
        }
    });
}