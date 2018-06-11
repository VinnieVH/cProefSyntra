var Product = require("./database_models/product");
 
var data = [
    {
          category: "Polo",
          brand: "Ralph Lauren",
          brandIcon: "https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/0023/8425/brand.gif?itok=KJrYM9wI",
          image: "https://mosaic01.ztat.net/vgs/media/pdp-zoom/RC/72/4D/00/7C/11/RC724D007-C11@24.jpg",
          price: "€39,95",
          description: "Classic fit - Polo shirt",
          sizes: "XS, S, M, L, XL, XXL"
    },
    {
          category: "Sneakers",
          brand: "Ralph Lauren",
          brandIcon: "https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/0023/8425/brand.gif?itok=KJrYM9wI",
          image: "https://mosaic02.ztat.net/vgs/media/pdp-zoom/PO/21/2B/01/XQ/11/PO212B01X-Q11@9.jpg",
          price: "€79,95",
          description: "Hanford - Sneakers laag",
          sizes: ""
    },
    {
          category: "T-shirt",
          brand: "Ralph Lauren",
          brandIcon: "https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/0023/8425/brand.gif?itok=KJrYM9wI",
          image: "https://mosaic02.ztat.net/vgs/media/pdp-zoom/PO/22/4G/05/FA/11/PO224G05F-A11@14.jpg",
          price: "€24,95",
          description: "T-shirt basic",
          sizes: "XS, S, M, L, XL, XXL"
    },
    {
          category: "T-shirt",
          brand: "Ralph Lauren",
          brandIcon: "https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/0023/8425/brand.gif?itok=KJrYM9wI",
          image: "https://assets.academy.com/mgen/34/20088434.jpg",
          price: "€24,95",
          description: "T-shirt basic",
          sizes: "XS, S, M, L, XL, XXL"
    },
        {
          category: "Polo",
          brand: "Ralph Lauren",
          brandIcon: "https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/0023/8425/brand.gif?itok=KJrYM9wI",
          image: "https://mosaic01.ztat.net/vgs/media/pdp-zoom/RC/72/4D/00/7C/11/RC724D007-C11@24.jpg",
          price: "€39,95",
          description: "Classic fit - Polo shirt",
          sizes: "XS, S, M, L, XL, XXL"
    },
    {
          category: "Sneakers",
          brand: "Ralph Lauren",
          brandIcon: "https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/0023/8425/brand.gif?itok=KJrYM9wI",
          image: "https://mosaic02.ztat.net/vgs/media/pdp-zoom/PO/21/2B/01/XQ/11/PO212B01X-Q11@9.jpg",
          price: "€79,95",
          description: "Hanford - Sneakers laag",
          sizes: ""
    },
    {
          category: "T-shirt",
          brand: "Ralph Lauren",
          brandIcon: "https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/0023/8425/brand.gif?itok=KJrYM9wI",
          image: "https://mosaic02.ztat.net/vgs/media/pdp-zoom/PO/22/4G/05/FA/11/PO224G05F-A11@14.jpg",
          price: "€24,95",
          description: "T-shirt basic",
          sizes: "XS, S, M, L, XL, XXL"
    },
    {
          category: "T-shirt",
          brand: "Ralph Lauren",
          brandIcon: "https://botw-pd.s3.amazonaws.com/styles/logo-thumbnail/s3/0023/8425/brand.gif?itok=KJrYM9wI",
          image: "https://assets.academy.com/mgen/34/20088434.jpg",
          price: "€24,95",
          description: "T-shirt basic",
          enumSize: []
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
                Product.create(seed, function(err, product){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a product..");
                    }
                });
            });
        }
    }); 
}
 
module.exports = seedDB;