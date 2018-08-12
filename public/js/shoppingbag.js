// Variables
const items = document.querySelector('#add-to-bag'),
      shoppingBagContent = document.querySelector('.shopping-cart-items'),
      clearBagBtn = document.querySelector('#clear-bag');

// Listeners
loadEventListeners();

function loadEventListeners() {
     // When a new item is added
    items.addEventListener('click', buyItem);

    // When the remove button is clicked
    shoppingBagContent.addEventListener('click', removeItem);

    // Clear bag button
    clearBagBtn.addEventListener('click', clearBag);

    // Document ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);

}

// Functions
function buyItem(e) {
    e.preventDefault();
    //use delegation to find the item that was added
    if(e.target.classList.contains('add-to-bag')){
        // read the item values
        const item = e.target.parentElement.parentElement;
        // read the values 
        getItemInfo(item);
    }
}

// Reads the HTML information of selected item
function getItemInfo(item){
    // Create an Object with Item Data
    const itemDetails = document.querySelector('.show-details');
    const itemInfo = {
        id: itemDetails.dataset.id,
        brand: itemDetails.dataset.brand,
        category: itemDetails.dataset.category,
        price: itemDetails.dataset.price,
        img: itemDetails.dataset.img
    }
    // Insert into the shopping bag
    addIntoBag(itemInfo);
}

// Display the selected course into the shopping bag
function addIntoBag(item){
    //create a row in the shopping bag 
    const row = document.createElement('li');
    //build the template
    row.innerHTML= `
        <li class="clearfix">
            <img src="${item.img}" alt="item1" />
            <span class="item-name">${item.brand} - ${item.category}</span>
            <span class="item-price">€ ${item.price}</span>
            <span class="item-quantity">Quantity: 1</span>
            <a href="#" class="remove" data-id="${item.id}">X</a>
        </li>
    `;
    // Add into the shopping bag
    shoppingBagContent.appendChild(row);
    // Add item into localStorage
    saveIntoStorage(item);
}

// Add items into localStorage
function saveIntoStorage(item){
    let items = getItemsFromStorage();

    // add the item into the array
    items.push(item);

    // convert everything to strings
    localStorage.setItem('items', JSON.stringify(items));
}

// Get items from localStorage
function getItemsFromStorage() {
    let items;

    //if something exists on storage -> get value otherwise empty array
    if(localStorage.getItem('items') === null){
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

// remove item from the shopping bag
function removeItem(e){
    e.preventDefault();
    if(e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
    }
}

// remove all items from the shopping bag
function clearBag(){
    while(shoppingBagContent.firstChild) {
        shoppingBagContent.removeChild(shoppingBagContent.firstChild);
    }

    // clear from localStorage
    clearLocalStorage();
}

// clears entire local Storage
function clearLocalStorage(){
    localStorage.clear();
}

// Loads when document is ready and prints items into shopping bag
function getFromLocalStorage() {
    let itemsLS = getItemsFromStorage();

    //loop through items and add to bag
    itemsLS.forEach(function(item){
        //create the items
        const row = document.createElement('li');

        // print the content
        row.innerHTML= `
        <li class="clearfix">
            <img src="${item.img}" alt="item1" />
            <span class="item-name">${item.brand} - ${item.category}</span>
            <span class="item-price">€ ${item.price}</span>
            <span class="item-quantity">Quantity: 1</span>
            <a href="#" class="remove" data-id="${item.id}">X</a>
        </li>
    `;
    shoppingBagContent.appendChild(row);
    });
}



