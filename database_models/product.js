var mongoose = require("mongoose");
 
var productSchema = new mongoose.Schema({
   name: String,
   brand: String,
   image: String,
   price: String,
   description: String,
   sizes: String
});
 
module.exports = mongoose.model("Product", productSchema);