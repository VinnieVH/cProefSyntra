const express        =  require("express"),
    router           = express.Router(),
    passport         = require("passport"),
    Shoppingbag      = require("../database_models/shoppingbag"),
    User             = require("../database_models/user"),
    Product          = require("../database_models/product");

router.get("/", function(req, res){
    res.render("landing");
});


router.get("/home", function(req, res){
    let shoppingbag = new Shoppingbag(req.session.shoppingbag ? req.session.shoppingbag: {});
      Product.find({}, function(err, allProducts){
       if(err){
           console.log(err);
       } else {
           if(!req.session.shoppingbag){
            res.render("home",{products:allProducts, shoppingbag: null});
           }
           else {
            res.render("home",{products:allProducts, shoppingbag: shoppingbag.generateArray(), totalPrice: shoppingbag.totalPrice});
           }
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

router.get("/add-to-bag/:id", function(req, res){
    let productId = req.params.id;
    let shoppingbag = new Shoppingbag(req.session.shoppingbag ? req.session.shoppingbag: {});

    Product.findById(productId, function(err, product) {
        if(err){
            return res.redirect("/home");
        }
        shoppingbag.add(product, product.id);
        req.session.shoppingbag = shoppingbag;
        console.log(req.session.shoppingbag);
        res.redirect("/home");
    });
});

module.exports = router;