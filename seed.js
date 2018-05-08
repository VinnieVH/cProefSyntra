var mongoose = require("mongoose");
var User    = require("./database_models/user");
var Product = require("./database_models/product");
 
var data = [
    {
          name: "Polo",
          brand: "Ralph Lauren",
          image: "https://mosaic01.ztat.net/vgs/media/pdp-zoom/RC/72/4D/00/7C/11/RC724D007-C11@24.jpg",
          price: "€39,95",
          description: "Classic fit - Polo shirt",
          sizes: "XS, S, M, L, XL, XXL"
    },
    {
          name: "Sneakers",
          brand: "Ralph Lauren",
          image: "https://mosaic02.ztat.net/vgs/media/pdp-zoom/PO/21/2B/01/XQ/11/PO212B01X-Q11@9.jpg",
          price: "€79,95",
          description: "Hanford - Sneakers laag",
          sizes: ""
    },
    {
          name: "T-shirt",
          brand: "Ralph Lauren",
          image: "https://mosaic02.ztat.net/vgs/media/pdp-zoom/PO/22/4G/05/FA/11/PO224G05F-A11@14.jpg",
          price: "€24,95",
          description: "T-shirt basic",
          sizes: "XS, S, M, L, XL, XXL"
    }
]
 
function seedDB(){
   //Remove all products
   Product.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("removed products!");
            data.forEach(function(seed){
                Product.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a product");
                    }
                });
            });
        }
    }); 
}
 
module.exports = seedDB;