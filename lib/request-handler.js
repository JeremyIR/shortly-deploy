var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var db = require('../app/config');
var User = require('../app/models/user');
var Link = require('../app/models/link');
// var Users = require('../app/collections/users');
// var Links = require('../app/collections/links');

exports.renderIndex = function(req, res) {
  res.render('index');
};

exports.signupUserForm = function(req, res) {
  res.render('signup');
};

exports.loginUserForm = function(req, res) {
  res.render('login');
};

exports.logoutUser = function(req, res) {
  req.session.destroy(function() {
    res.redirect('/login');
  });
};

exports.fetchLinks = function(req, res) {

  Link.find({}, function(err, linkDocs) {
    if (err) {
      console.log('Error fetching all links', err);
    } else {
      console.log(linkDocs);
      res.send(200, linkDocs);
    }
  });

  // Links.reset().fetch().then(function(links) {
  //   res.send(200, links.models);
  // });
};

exports.saveLink = function(req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.send(404);
  }

  Link.findOne({ url: uri }, function(err, linkDoc) {
    console.log(linkDoc);
    if (linkDoc) {
      res.send(200, linkDoc);
    } else {
      util.getUrlTitle(uri, function(err, title) {
        if (err) {
          console.log('Error reading URL heading: ', err);
          return res.send(404);
        }
        console.log(req.headers.origin);
        var newLink = new Link({
          url: uri,
          title: title,
          baseUrl: req.headers.origin,
          visits: 0
        });
        newLink.save(function(err) {
          if (err) {
            console.log('Error saving URL', err);
          }
          res.send(200, newLink);
        });
      });
    }

//   new Link({ url: uri }).fetch().then(function(found) {
//     if (found) {
//       res.send(200, found.attributes);
//     } else {
//       util.getUrlTitle(uri, function(err, title) {
//         if (err) {
//           console.log('Error reading URL heading: ', err);
//           return res.send(404);
//         }
//         var newLink = new Link({
//           url: uri,
//           title: title,
//           baseUrl: req.headers.origin
//         });
//         newLink.save().then(function(newLink) {
//           Links.add(newLink);
//           res.send(200, newLink);
//         });
//       });
//     }
//   });
  });
};

exports.loginUser = function(req, res) {
  var username = req.body.username;
  var providedPassword = req.body.password;

  User.findOne({username: username}, function(err, userDoc) {
    if (!userDoc) {
      res.redirect('/login');
    } else {
      bcrypt.compare(providedPassword, userDoc.password, function(err, isMatch) {
        if (err) {
          console.log('Error comparing password', err);
        } else {
          if (isMatch) {
            util.createSession(req, res, userDoc);
          } else {
            res.redirect('/login');
          }
        }
      });
    }
  });
};

exports.signupUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({username: username}, function(err, userDoc) {
    if (err) {
      console.log('Error signing up user', err);
    } else {
      if (!userDoc) {
        // create the user
        var newUser = new User({
          username: username,
          password: password
        });

        // save the user
        newUser.save(function(err) {
          if (err) {
            console.log('Error saving new user', err);
          } else {
            util.createSession(req, res, newUser);
          }
        });
      } else {
        // redirect to signup
        console.log('Account already exists');
        res.redirect('/signup');
      }
    }
  });

  // new User({ username: username })
  //   .fetch()
  //   .then(function(user) {
  //     if (!user) {
  //       var newUser = new User({
  //         username: username,
  //         password: password
  //       });
  //       newUser.save()
  //         .then(function(newUser) {
  //           Users.add(newUser);
  //           util.createSession(req, res, newUser);
  //         });
  //     } else {
  //       console.log('Account already exists');
  //       res.redirect('/signup');
  //     }
  //   });
};

exports.navToLink = function(req, res) {
  // new Link({ code: req.params[0] }).fetch().then(function(link) {
  //   if (!link) {
  //     res.redirect('/');
  //   } else {
  //     link.set({ visits: link.get('visits') + 1 })
  //       .save()
  //       .then(function() {
  //         return res.redirect(link.get('url'));
  //       });
  //   }
  // });
  // console.log('LINK CODE------------', req.params);

  Link.findOne({code: req.params[0]}, function(err, linkDoc) {
    if (err) {
      console.log('Error retrieving link', err);
    } else {
      if (!linkDoc) {
        res.redirect('/');
      } else {
        // linkDoc.visits.$inc();
        linkDoc.visits = linkDoc.visits + 1;
        linkDoc.save(function(err) {
          if (err) {
            console.log('Couldn\'t save link', err);
          } else {
            console.log('Redirecting to: ', linkDoc.url);
            res.redirect(linkDoc.url);
          }
        });
      }
    }
  });
};