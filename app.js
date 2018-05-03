var bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    express     = require("express"),
    app         = express();

mongoose.connect("mongodb://localhost/cProefSyntra");

app.get("/", function(req, res){
   res.send("homepage"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("cProef server started.");
});