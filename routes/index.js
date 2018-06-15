const express        =  require("express"),
    router           = express.Router(),
    User             = require("../database_models/user"),
    Product          = require("../database_models/product");

router.get("/", function(req, res){
    res.render("landing");
});


router.get("/home", function(req, res){
      Product.find({}, function(err, allProducts){
       if(err){
           console.log(err);
        } else {
            res.render("home",{products:allProducts});
        }
    });
});

// Show - shows more information about a product
router.get("/product/:id", function(req, res) {
    Product.findById(req.params.id).exec(function(err, foundProduct) {
        if(err) {
            console.log(err);
        } else {
            res.render("product/show", {product: foundProduct});
        }
    });
});

module.exports = router;