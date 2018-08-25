const express = require('express');
const app = express();
const passport = require('passport');
const FacebookStrategy = require('passport-facebook')
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const FACEBOOK_APP_ID = process.env.appID;
const FACEBOKK_APP_SECRET = process.env.appSecret;

const fbOpts = {
    clientID:FACEBOOK_APP_ID,
    clientSecret:FACEBOKK_APP_SECRET,
    callbackURL:'http://localhost:3000/auth/facebook/callback'
};

var fbCallback = function(accessToken, refreshToken, profile, cb) {
  console.log(accessToken, refreshToken, profile);
}
passport.use(new FacebookStrategy(fbOpts,fbCallback));

app.route('/').get(passport.authenticate('facebook'));
app.route('/auth/facebook/callback').get(passport.authenticate);

app.listen(port,()=> {
    console.log('the app is running under port '+ port);
})