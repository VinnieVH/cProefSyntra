const mongoose        = require("mongoose"),
      bcrypt          = require("bcryptjs"),
      uniqueValidator = require("mongoose-unique-validator");

// mongoose.connect(process.env.DATABASEURL || 'mongodb://localhost/cProef_Syntra');

// var db = mongoose.connection;

var UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        index: true,
        required: [true,  'Please enter your first name.']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your last name.']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email address.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password.'],
        minLength: [4, 'Your password must be at least 4 characters long.']
    }

});

UserSchema.plugin(uniqueValidator, { message: 'That email address is already in use.' });

var User = module.exports = mongoose.model("User", UserSchema);

module.exports.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByEmail = function(email, callback){
    var query = {email: email};
    User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
        if(err) throw err;
        callback(null, isMatch);
    });
}