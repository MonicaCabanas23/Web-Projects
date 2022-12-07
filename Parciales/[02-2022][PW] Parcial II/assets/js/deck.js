let agregarTodo = document.querySelector('#save-all'),
    section_deck = document.querySelector("#deck"),
    ClearAllDeck = document.querySelector('#clear-deck'),
    CargarJson = document.querySelector('#load-deck'),
    GuardarJson = document.querySelector('#save-deck'),
    AddDeck = document.querySelectorAll('.add')


AddDeck.forEach(element => {
    element.addEventListener('click', function () {
        const card = createDeckCard(element.parentElement.parentElement.parentElement.querySelector('img'), element.parentElement.parentElement.parentElement.querySelector('.modal-container .modal'));
        AddSection(card);
        alert("Card added to deck");
    });
});


agregarTodo.addEventListener("click", () => {
    const Booster = document.querySelectorAll("#booster figure");
    const data = JSON.parse(localStorage.getItem("historyItems")) || [];
    Booster.forEach(element => {
        const card = createDeckCard(element.querySelector('img'), element.querySelector('.modal-container .modal'));
        AddSection(card);
    });
    alert("Cards added to deck");
});

function AddSection(card) {
    
    section_cards_deck = document.querySelectorAll(".section-cards");
    if (card.dataset.type && card.dataset.type != 'undefined') {
        if (section_cards_deck[0].querySelector('h3').textContent != "Sorry, you don't have cards in your deck :(") {
            let flag = false;
            section_cards_deck.forEach(element => {
                let type = element.dataset.type.split(' — ');
                type = type[0].split('/');
                if (card.dataset.type == type) {
                    element.querySelector(".cards-container").
                        appendChild(card);
                    flag = true;
                }
            });
            if (!flag) {
                flag = false;
                const _section = document.createElement("section");
                _section.dataset.type = card.dataset.type;
                _section.classList.add("section-cards");
                const h3 = document.createElement("h3");
                h3.textContent = card.dataset.type;
                const hr = document.createElement("hr");
                _section.appendChild(h3);
                _section.appendChild(hr);
                const _section2 = document.createElement("section");
                _section2.classList.add("cards-container")
                _section2.appendChild(card);
                _section.appendChild(_section2);
                section_deck.appendChild(_section);
            }
        }
        else {
            section_cards_deck.forEach(element => {
                element.dataset.type = card.dataset.type;
                element.querySelector('h3').textContent = card.dataset.type;
                element.querySelector(".cards-container").
                    appendChild(card);
            });
        }
    }
}

CargarJson.addEventListener("click", async () => {
    try {
        const referencias = await window.showOpenFilePicker({});

        const archivo = await referencias[0].getFile();

        let contenido = await archivo.text();
        contenido = JSON.parse(contenido);
        for (element in contenido) {
            const card = createDeckCard(contenido[element]);
            AddSection(card);
        }
    } catch (err) {
        console.log(err)
        console.log("Se ha producido un error o se ha cancelado la carga. " + err);
    }
});

GuardarJson.addEventListener("click", async () => {
    try {
        const datos = deck.querySelectorAll('figure');
        let contenido = {};

        datos.forEach((elemento, index) => {
            let type = elemento.dataset.type.split(' — ');
            type = type[0].split('/');
            contenido[index] = { src: elemento.querySelector('img').src,
            alt: elemento.querySelector('img').alt,
            id: elemento.querySelector('img').id,
            dataset: { type: type },
            modal: {
                name: elemento.querySelector('.modal-deck .information .name').textContent,
                type: elemento.querySelector('.modal-deck .typeline').textContent,
                'strength-resistance': elemento.querySelector('.modal-deck .information .strength-resistance').textContent,
                rarity: elemento.querySelector('.modal-deck .information .rarity').textContent
            }
        };
        });
        downloadFiles(JSON.stringify(contenido), "deck.json", "application/json");
    } catch (err) {
        console.log("Se ha producido un error o se ha cancelado la carga. " + err);
    }
});

ClearAllDeck.addEventListener("click", () => {
    section_deck.innerHTML = `
    <section class="section-cards">
        <h3>Sorry, you don't have cards in your deck :(</h3>
        <hr>
        <section class="cards-container">
        </section>

    </section>
    `;
    DeleteAllHistoryItemToLocalStorage();
});

function downloadFiles(data, file_name, file_type) {
    var file = new Blob([data], { type: file_type });
    if (window.navigator.msSaveOrOpenBlob)
        window.navigator.msSaveOrOpenBlob(file, file_name);
    else {
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = file_name;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

function createDeckCard (card, modal=false, flag=false) {
    const _figure = document.createElement("figure");
    let storageCard = {};
    NewModal = {};
    NewDataSet = {};
    if(!flag)
    {
        if(!modal)
        {
            const _img = document.createElement("img");
            storageCard.src = _img.src = card.src;
            storageCard.alt = _img.alt = card.alt;
            storageCard.id = _img.id = card.id;

            const _div = document.createElement("div");
            _div.classList.add("modal-container-deck");
            const _div2 = document.createElement("div");
            _div2.classList.add("modal-deck");
            const _div3 = document.createElement("div");
            _div3.classList.add("information");
            const _h3 = document.createElement("h3");
            _h3.classList.add("name");
            NewModal.name = _h3.textContent = card.modal.name;
            const _h3_1 = document.createElement("h3");
            _h3_1.classList.add("strength-resistance");
            NewModal['strength-resistance'] = _h3_1.textContent =  card.modal['strength-resistance'];
            const _h3_2 = document.createElement("h3");
            _h3_2.classList.add("rarity");
            NewModal.rarity = _h3_2.textContent =  card.modal.rarity;
            _h3_2.classList.add("rarity");

            _div3.appendChild(_h3);
            _div3.appendChild(_h3_1);
            _div3.appendChild(_h3_2);
            _div2.appendChild(_div3);
            const _button = document.createElement("button");
            _button.classList.add("remove");
            _button.textContent = "-";
            const _h3_3 = document.createElement("h3");
            _h3_3.classList.add("typeline");
            NewModal.typeline = _h3_3.textContent = card.modal.type;
            _div2.appendChild(_button);
            _div2.appendChild(_h3_3);
            _div.appendChild(_div2);

            _button.addEventListener('click', function () {
                const Eliminar = _button.parentElement.parentElement.parentElement;
                const section =  _button.parentElement.parentElement.parentElement.parentElement.parentElement;
                DeleteHistoryItemToLocalStorage(Eliminar);
                Eliminar.remove();
                if(section.querySelectorAll('figure').length < 1) section.remove();
            });

            _figure.appendChild(_div);
            _figure.appendChild(_img);
            NewDataSet.type = _figure.dataset.type = card.dataset.type;
            displayModalDeck(_div);

        }
        else
        {
            const _img = document.createElement("img");
            storageCard.src = _img.src = card.src;
            storageCard.alt = _img.alt = card.alt;
            storageCard.id = _img.id = card.id;

            const _div = document.createElement("div");
            _div.classList.add("modal-container-deck");
            const _div2 = document.createElement("div");
            _div2.classList.add("modal-deck");
            const _div3 = document.createElement("div");
            _div3.classList.add("information");
            const _h3 = document.createElement("h3");
            _h3.classList.add("name");
            NewModal.name = _h3.textContent = modal.querySelector('.modal .information .name').textContent;
            const _h3_1 = document.createElement("h3");
            _h3_1.classList.add("strength-resistance");
            NewModal['strength-resistance'] = _h3_1.textContent =  modal.querySelector('.modal .information .strength-resistance').textContent;
            const _h3_2 = document.createElement("h3");
            _h3_2.classList.add("type");
            NewModal.rarity = _h3_2.textContent =  modal.querySelector('.modal .rarity').textContent;
            _h3_2.classList.add("rarity");

            _div3.appendChild(_h3);
            _div3.appendChild(_h3_1);
            _div3.appendChild(_h3_2);
            _div2.appendChild(_div3);
            const _button = document.createElement("button");
            _button.classList.add("remove");
            _button.textContent = "-";

            _button.addEventListener('click', function () {
                const Eliminar = _button.parentElement.parentElement.parentElement;
                const section =  _button.parentElement.parentElement.parentElement.parentElement.parentElement;
                DeleteHistoryItemToLocalStorage(Eliminar);
                Eliminar.remove();
                if(section.querySelectorAll('figure').length < 1) section.remove();

            });

            const _h3_3 = document.createElement("h3");
            _h3_3.classList.add("typeline");
            storageCard.typeline = _h3_3.textContent = modal.querySelector('.modal .typeline').textContent;
            _div2.appendChild(_button);
            _div2.appendChild(_h3_3);
            _div.appendChild(_div2);

            
            let type = modal.querySelector('.modal .typeline').textContent.split(' — ');
            type = type[0].split('/');

            _figure.appendChild(_img);
            _figure.appendChild(_div);
            NewDataSet.type = _figure.dataset.type = type;
            displayModalDeck(_div);
        }
        storageCard.modal = NewModal;
        storageCard.dataset = NewDataSet;
        addHistoryItemToLocalStorage(storageCard);
    }
    else{
        const _img = document.createElement("img");
        storageCard.src = _img.src = card.src;
        storageCard.alt = _img.alt = card.alt;
        storageCard.id = _img.id = card.id;

        const _div = document.createElement("div");
        _div.classList.add("modal-container-deck");
        const _div2 = document.createElement("div");
        _div2.classList.add("modal-deck");
        const _div3 = document.createElement("div");
        _div3.classList.add("information");
        const _h3 = document.createElement("h3");
        _h3.classList.add("name");
        NewModal.name = _h3.textContent = card.modal.name;
        const _h3_1 = document.createElement("h3");
        _h3_1.classList.add("strength-resistance");
        NewModal['strength-resistance'] = _h3_1.textContent =  card.modal['strength-resistance'];
        const _h3_2 = document.createElement("h3");
        _h3_2.classList.add("rarity");
        NewModal.rarity = _h3_2.textContent =  card.modal.rarity;
        _h3_2.classList.add("rarity");
        

        _div3.appendChild(_h3);
        _div3.appendChild(_h3_1);
        _div3.appendChild(_h3_2);
        _div2.appendChild(_div3);
        const _button = document.createElement("button");
        _button.classList.add("remove");
        _button.textContent = "-";

        _button.addEventListener('click', function () {
            const Eliminar = _button.parentElement.parentElement.parentElement;
            const section =  _button.parentElement.parentElement.parentElement.parentElement.parentElement;
            DeleteHistoryItemToLocalStorage(Eliminar);
            Eliminar.remove();
            if(section.querySelectorAll('figure').length < 1) section.remove();
        });


        const _h3_3 = document.createElement("h3");
        _h3_3.classList.add("typeline");
        NewModal.typeline = _h3_3.textContent = card.modal.type;
        _div2.appendChild(_button);
        _div2.appendChild(_h3_3);
        _div.appendChild(_div2);



        _figure.appendChild(_div);
        _figure.appendChild(_img);
        _figure.dataset.type = card.dataset.type;
        displayModalDeck(_div);
    }
    return _figure;
}