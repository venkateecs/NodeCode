var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var google = require('googleapis');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/*app.use(session({
    secret: 'topsecret'
}));*/
app.use(passport.initialize());
//app.use(passport.session());
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
// used to deserialize the user
passport.deserializeUser(function (id, done) {

});
passport.use(new GoogleStrategy({
    clientID: '',
    clientSecret: '',
    callbackURL: 'http://localhost:8080/auth/google/callback',
},
    function (token, refreshToken, profile, done) {
        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function () {
            console.log(' profile==> ', profile);
            return done(null, profile);
            // try to find the user based on their google id
            /*User.findOne({'google.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);
            });*/
        });
    }));
app.get('/auth/google/callback', function (req, res, next) {
    var session = req.session;
    var code = req.query.code;

    passport.authenticate('google', function (err, user, info) {
        //console.log('route-user-authenticate-passport.authenticate...google', user)
        if (err) { return next(err) };

        if (!user) {
            res.status(500).json({ error: info.message });
        } else {
            user.signBy = "google";
            console.log('success returning...')
            console.log(user)
            req.logIn(user, function (err) {
                if (err) { return next(err); }

                return res.send({ status: 200, user: user });
                // return res.redirect('/profile');       
            });

        };
    })(req, res, next)
});

app.get('/', (req, res) => {
    res.send('Hello')
});
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

console.log('The Server is running under port number 8080');

app.listen(8080);