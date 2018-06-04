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
    Product   = require("./database_models/product"),
    seedDB    = require("./seed");
    
// Connection string to the DB
mongoose.connect(process.env.DATABASEURL || "mongodb://localhost/cProef_Syntra");

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
            error: errors
        });
    } else {
        var newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        });
        
        User.createUser(newUser, function(err, user) {
            if(err) throw err;
            console.log(user);
        });

        req.flash('succes_msg', 'You are registered and can now login');
        res.redirect("home");
    }
}); 

// Show login form
app.get("/login", function(req, res) {
   res.render("login"); 
});

// Passport strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'},
    function(email, password, done) {
        User.getUserByEmail(email, function(err, user) {
            if(err) throw err;
            if(!user){
                return done(null, false, {message: "Unknown User"});
            }

            User.comparePassword(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                }
                else {
                    return done(null, false, {message: "Invalid Password"});
                }
            });
        })
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
    });
    
passport.deserializeUser(function(id, done) {
User.getUserById(id, function(err, user) {
    done(err, user);
});
});

// Handle login  logic
app.post("/login", passport.authenticate("local", {successRedirect: "home", failureRedirect: "login", failureFlash: true}),
function(req, res){
    res.redirect("home");
});

// Logout route
app.get("/logout", function(req, res) {
   req.logout();
   res.redirect("home");
});

// Setup port 
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});