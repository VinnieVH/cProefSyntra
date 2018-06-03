const bodyParser     = require("body-parser"),
    mongoose         = require("mongoose"),
    express          = require("express"),
    session          = require("express-session"),
    expressValidator = require("express-validator"), 
    flash            = require("connect-flash"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local").Strategy,
    methodOverride   = require("method-override"),
    app              = express();

// Requiring MODELS
const User    = require("./database_models/user"),
    Product = require("./database_models/product"),
    seedDB  = require("./seed");
    
// Connection string to the DB
mongoose.connect("mongodb://localhost/cProef_Syntra" || process.env.DATABASEURL);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// seed the database with some testing data
seedDB();

// Express Session
app.use(session ({
    secret: "Lmao dank memes Xd",
    resave: true,
    saveUninitialized: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


// Connect Flash
app.use(flash());

// Global Variables for flash
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
  });

app.get("/", function(req, res){
    res.render("landing");
});


app.get("/home", function(req, res){
      Product.find({}, function(err, allProducts){
       if(err){
           console.log(err);
       } else {
          res.render("home",{products:allProducts});
       }
    });
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
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;

    // Validation
    req.checkBody('firstName', 'First Name is required').notEmpty();
    req.checkBody('lastName', 'Last Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();

    var errors = req.validationErrors();
    
    if(errors){
        res.render("register", {
            errors: errors
        });
    } else {
        console.log("PASSED!");
    }
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

// Setup port 
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});