const bodyParser       = require("body-parser"),
      mongoose         = require("mongoose"),
      express          = require("express"),
      session          = require("express-session"),
      expressValidator = require("express-validator"), 
      flash            = require("connect-flash"),
      passport         = require("passport"),
      LocalStrategy    = require("passport-local").Strategy,
      methodOverride   = require("method-override"),
      MongoStore       = require("connect-mongo")(session),
      app              = express();

// Requiring MODELS
const User    = require("./database_models/user"),
      seedDB  = require("./seed");

// Requiring ROUTES
const indexRoutes = require("./routes/index"),
      userRoutes  = require("./routes/user");
    
// Connection string to the DB
mongoose.connect(process.env.DATABASEURL || "mongodb://localhost/cProef_Syntra");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// Connect Flash
app.use(flash());

// seed the database with some testing data
// seedDB();

// Express Session
app.use(session ({
    secret: "Lmao dank memes Xd",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: {maxAge: 180 * 60 * 1000}
}));

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());

// Passport strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},
    function(req, email, password, done) {      
        User.getUserByEmail(email, function(err, user) {
            if(err) throw err;
            if(!user){
                return done(null, false);
            }
            User.comparePassword(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                }
                else {
                    return done(null, false);
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

// Global Variables for flash
app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    res.locals.session = req.session;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
  });

// Use the routes
app.use(indexRoutes);
app.use(userRoutes);

// Setup port 
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});