var mongoose = require('mongoose');
var crypto = require('crypto');


var linkSchema = mongoose.Schema({
<<<<<<< HEAD
    url: String,
    baseurl: String,
    code: String,
    title: String,
    visits: Number
});

linkSchema.pre('save', function(next) {
    var shasum = crypto.createHash('sha1');
    shasum.update(this.url);
    this.code = shasum.digest('hex').slice(0, 5);
    next();
=======
  url: String,
  baseurl: String,
  code: String,
  title: String,
  visits: Number
});

linkSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
>>>>>>> 6c77d383832eed987a8b8bc638378abf9da6fdc8
});

module.exports = mongoose.model('Link', linkSchema);

// var mongoose = require('./../config');
// var crypto = require('crypto');
// module.exports.Link = mongoose.mongoose.model('URL', mongoose.LinkSchema);

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function() {
//     this.on('creating', function(model, attrs, options) {
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });
<<<<<<< HEAD
=======

>>>>>>> 6c77d383832eed987a8b8bc638378abf9da6fdc8
