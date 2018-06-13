var mongoose = require("mongoose");
 
var productSchema = new mongoose.Schema({
   category: String,
   brand: String,
   brandIcon: String,
   image: String,
   price: Number,
   description: String,
   sizes: [String]
});
 
module.exports = mongoose.model("Product", productSchema);