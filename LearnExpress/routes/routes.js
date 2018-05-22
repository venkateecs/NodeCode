let express = require('express');
let app  = express();
let bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
app.use(session({secret: 'ssshhhhh'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  
  passport.deserializeUser(function(id, cb) {
    /*User.findById(id, function(err, user) {
      cb(err, user);
    });*/
    console.log('Deserialize');
    cb(null, id);
  });

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var sess;
function requireLogin (req, res, next) {
    console.log('test ramana' + req.session.email + req.isAuthenticated());
    if (sess) {
        next();
      //res.redirect('/login');
    } else {
        res.send('You are not Logged IN');
    }
  };
app.get('/',requireLogin,(req,res,next)=> {
 res.cookie('name', 'express venkat');  
 res.send({status:200,message:'Your Successfully Logged In and cookies are set to the browser'});
});

app.post('/login',function(req,res){
    sess = req.session;
  //In this we are assigning email to sess.email variable.
  //email comes from HTML page.
    sess.email=req.body.username;
    req.session.email = req.body.username ;
    //res.send({sessionEmail:sess.email});
    res.send(req.session);
    res.end('done');
  });

  app.get('/logout', function(req, res) {
    sess = null ;
    res.send({'status':200,'message':'user logged out successfully'});
  });

passport.use(new LocalStrategy(
    function(username, password, done) {
        return done(null,{username,password});
        /*UserDetails.findOne({
          username: username
        }, function(err, user) {
          if (err) {
            return done(err);
          }
  
          if (!user) {
            return done(null, false);
          }
  
          if (user.password != password) {
            return done(null, false);
          }
          return done(null, user);
        });*/
    }
  ));

app.post('/',
  passport.authenticate('local', { failureRedirect: '/error' }),
  function(req, res) {
      res.send({status:200,username:req.user.username,password:req.user.password});
    //res.redirect('/success?username='+req.user.username);
  });

app.get('/success', (req, res) => res.send("Welcome "+req.query.username+"!!"));
app.get('/error', (req, res) => res.send("error logging in"));


module.exports = app ;