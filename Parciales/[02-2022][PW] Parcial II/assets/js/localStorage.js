//Render
const renderHistoryItem = (items) => {
    try {
        if(items.length > 0)
        {
            items.forEach(element => {
                if(element){
                    const card = createDeckCard(element, false, true);
                    AddSection(card);
                }
                else{
                    console.log("No hay items");
                }
            });
        }
    } catch (error) {
        console.log(error)
    }
};

//Dynamic history
const getHistoryItemsFromLocalStorage = () => {
    const historyItems = JSON.parse(localStorage.getItem("historyItems")) || [];
    return historyItems;
};

const addHistoryItemToLocalStorage = (item) => {
    try{
        const historyItems = getHistoryItemsFromLocalStorage();
        historyItems.push(item);

        localStorage.setItem("historyItems", JSON.stringify(historyItems));
    } catch(e){
        console.error(e);
    }
};

const DeleteAllHistoryItemToLocalStorage = () => {
    try{
        let historyItem = [];
        localStorage.setItem("historyItems", JSON.stringify(historyItem));
    } catch(e){
        console.error(e);
    }
};

const DeleteHistoryItemToLocalStorage = (item) => {
    try{
        const historyItems = getHistoryItemsFromLocalStorage();
        let flag = false;
        historyItems.forEach(element => {
            if(element.modal.name == item.querySelector("h3.name").textContent){
                if(!flag)
                {
                    historyItems.splice(historyItems.indexOf(element), 1);
                    flag = true;
                }
            }
        });

        localStorage.setItem("historyItems", JSON.stringify(historyItems));
    } catch(e){
        console.error(e);
    }
};

//event listener when dom is loaded
const CargarLocalHistory = () => {
    //Include localStorage.js
    const historyItems = getHistoryItemsFromLocalStorage();
    renderHistoryItem(historyItems)
};

CargarLocalHistory();

/*
    addHistoryItemToLocalStorage(historyItem);
    renderHistoryItem(historyItem); 
*/