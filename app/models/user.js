var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var userSchema = mongoose.Schema({
<<<<<<< HEAD
    username: String,
    password: String
});

userSchema.pre('save', function(next) {
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.password, null, null).bind(this)
        .then(function(hash) {
            this.password = hash;
        })
        .then(next);
});

=======
  username: String,
  password: String
});

userSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
    })
    .then(next);
});

>>>>>>> 6c77d383832eed987a8b8bc638378abf9da6fdc8
module.exports = mongoose.model('User', userSchema);

// var mongoose = require('./../config');
// var bcrypt = require('bcrypt-nodejs');
// console.log(mongoose.UserSchema);
// var Promise = require('bluebird');
// module.exports.User = mongoose.mongoose.model('User', mongoose.UserSchema);

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function() {
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function() {
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });
<<<<<<< HEAD
=======

>>>>>>> 6c77d383832eed987a8b8bc638378abf9da6fdc8
