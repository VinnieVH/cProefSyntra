(function(){
 
    $("#shoppingbag").on("click", function() {
      $(".shopping-cart").fadeToggle( "fast");
    });
    
   })();
//    var productSchema = new mongoose.Schema({
//     category: String,
//     brand: String,
//     brandIcon: String,
//     image: String,
//     price: Number,
//     description: String,
//     sizes: [String]
//  });
const shoppingbag = [];
function Item(category, brand, image, price) {
    this.category = category
    this.brand = brand
    this.image = image
    this.price = price
}

function addItemToBag(product) {
    var item = new Item(product);
    shoppingbag.push(item);
}
