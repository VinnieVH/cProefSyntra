var bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    express         = require("express"),
    flash           = require("connect-flash"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    app             = express();

// Requiring MODELS
var User = require("./database_models/user");

mongoose.connect(process.env.DATABASEURL);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// PASSPORT CONFIGURATION
app.use(require("express-session") ({
    secret: "Lmao dank memes Xd",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MIDDLEWARE for all paths: make sure we can access the user info in every single path before rendering
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.get("/", function(req, res){
   res.render("landing"); 
});

app.get("/home", function(req, res){
   res.render("home"); 
});

// =====================
// AUTHENTICATION ROUTES
// =====================

// ROOT ROUTE
app.get("/register", function(req, res) {
   res.render("register"); 
});

// Handle signup logic
app.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err){
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function() {
           res.redirect("/home"); 
        });
    })
});

// Show login form
app.get("/login", function(req, res) {
   res.render("login"); 
});

// Handle login form logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/home",
        failureRedirect: "/login"
    }), function(req, res){
});

// Logout route
app.get("/logout", function(req, res) {
   req.logout();
   res.redirect("/home");
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("cProef server started.");
});