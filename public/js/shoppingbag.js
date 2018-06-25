let bag;

if (localStorage.getItem('bag')) {
    bag = JSON.parse(localStorage.getItem('bag'));
} else {
    let bag = {};
    bag.items = [];
}

localStorage.setItem('bag', JSON.stringify(bag));

$('#add-to-bag').on('click', function (e) {

    var item = {};
    item.id = $('h1').attr('data-id');
    item.brand = $('h1').attr('data-brand');
    item.category = $('h1').attr('data-category');
    item.price = $('h1').attr('data-price');
    item.image = $('h1').attr('data-img');
    console.log(item);
    localStorage.setItem('bag', bag);
    console.log(localStorage.getItem('bag'));

    addToCart(item);
});

function addToCart(item) {
    // Retrieve the bag object from session storage
    if (localStorage && localStorage.getItem('bag')) {

        bag.items.push(item);

        localStorage.setItem('bag', JSON.stringify(bag));
    }
};

