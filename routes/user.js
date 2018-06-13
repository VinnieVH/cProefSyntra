const express        =  require("express"),
    router           = express.Router(),
    passport         = require("passport"),
    User             = require("../database_models/user");


// =====================
// AUTHENTICATION ROUTES
// =====================
// Get register page
router.get("/register", function(req, res) {
    res.render("user/register");
});

// Handle signup logic
router.post("/register", function(req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;

    var newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    });       
    User.createUser(newUser, function(err, user) {
        if(err) {
            console.log(err.message);
            req.flash("error", err.message);
            res.redirect("/register");
        } else {
            passport.authenticate("local")(req, res, function() {
                req.flash("success", 'Your account has been successfully created. Welcome to Discover Yourself, ' + user.firstName + "!");
                res.redirect("/home");
                console.log(user);
            }); 
        }
    });
}); 

// Show login form
router.get("/login", function(req, res) {
   res.render("user/login"); 
});

// Handle login  logic
router.post("/login", passport.authenticate("local", {successRedirect: "home", failureRedirect: "login", failureFlash: true}),
function(req, res){
     res.redirect("home");
});

// Logout route
router.get("/logout", function(req, res) {
   req.logout();
   req.flash("success", "You have been successfully logged out!");
   res.redirect("home");
});

module.exports = router;