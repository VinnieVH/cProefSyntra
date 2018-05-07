var bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    express     = require("express"),
    app         = express();

// mongoose.connect("mongodb://localhost/cProefSyntra");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/homepage", function(req, res){
   res.render("homepage"); 
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("cProef server started.");
});