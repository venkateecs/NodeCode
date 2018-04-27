# Hapi Auth with JSON Web Tokens (JWT)

An authentication scheme/plugin for
[**Hapi.js**](http://hapijs.com/) apps using **JSON Web Tokens**

This node.js module (Hapi plugin) lets you use JSON Web Tokens (JWTs)
for authentication in your [Hapi.js](http://hapijs.com/)
web application.

## Motivation

Some oauth2 providers don't only use one signing key, among other variations not easily encapsulated in a module that makes too many assumptions. Only use this if complexity requires you to. Otherwise, it's recommended to use [hapi-auth-jwt2](https://github.com/dwyl/hapi-auth-jwt2)

## Usage

This is a simplified version of [hapi-auth-jwt2](https://github.com/dwyl/hapi-auth-jwt2)

*You must handle verifying the JWT in the validate function*

This module won't do it for you by itself

### Install from NPM

```sh
npm install hapi-auth-jwt-simple --save
```

### Example

This basic usage example should help you get started:


```javascript
var Hapi = require('hapi');
var jwt = require('jsonwebtoken');

// IMPORTANT: you must bring your own validation function
var validate = function (token, request, callback) {

    var publicKey = 'someKey';
    jwt.verify(token, publicKey, function (err, decoded) {

      if (err) {
        return callback(err)
      }
      var credentials = request.auth.credentials;
      // .. do some additional credentials checking
      return callback(null, true, decoded);
    });
};

var server = new Hapi.Server();
server.connection({ port: 8000 });
        // include our module here ↓↓
server.register(require('hapi-auth-jwt-simple'), function (err) {

    if(err){
      console.log(err);
    }

    server.auth.strategy('jwt', 'jwt', {
      validateFunc: validate
    });

    server.auth.default('jwt');

    server.route([
      {
        method: "GET", path: "/", config: { auth: false },
        handler: function(request, reply) {
          reply({text: 'Token not required'});
        }
      },
      {
        method: 'GET', path: '/restricted', config: { auth: 'jwt' },
        handler: function(request, reply) {
          reply({text: 'You used a Token!'})
          .header("Authorization", request.headers.authorization);
        }
      }
    ]);
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
});
```

## Documentation

- `validateFunc` - (***required***) the function which is run once the Token has been decoded with
 signature `function(decoded, request, callback)` where:
    - `decoded` - (***required***) is the ***decoded*** and ***verified*** JWT received from the client in **request.headers.authorization**
    - `request` - (***required***) is the original ***request*** received from the client
    - `callback` - (***required***) a callback function with the signature `function(err, isValid, credentials)` where:
        - `err` - an internal error.
        - `valid` - `true` if the JWT was valid, otherwise `false`.
        - `credentials` - (***optional***) alternative credentials to be set instead of `decoded`.
- `urlKey` - (***optional***) if you prefer to pass your token via url, simply add a `token` url parameter to your request or use a custom parameter by setting `urlKey`
- `cookieKey` - (***optional***) if you prefer to pass your token via a cookie, simply set the cookie `token=your.jsonwebtoken.here` or use a custom key by setting `cookieKey`
- `tokenType` - (**optinal**) allow custom token type, e.g. Authorization: \<tokenType> 12345678, default is none.

### Authentication Modes

This plugin supports [authentication modes](http://hapijs.com/api#route-options) on routes.

- `required` - requires Authorization header to be sent with every request

- `optional` - if no Authorization header is provided, request will pass with `request.auth.isAuthenticated` set to `true` and `request.auth.credentials` set to empty object

- `try` - similar to `optional` but invalid Authorization header will pass with `request.auth.isAuthenticated` set to false and failed credentials provided in `request.auth.credentials`


### Usage

Setup your hapi.js server as described above (_no special setup for using jwt tokens in urls_)

```sh
https://yoursite.co/path?token=your.jsonwebtoken.here
```
You will need to generage valid tokens for this to work.

```js
var JWT   = require('jsonwebtoken');
var obj   = { id:123,"name":"Charlie" }; // object/info you want to sign
var token = JWT.sign(obj, secret);
var url   = "/path?token="+token;
```

## Want to send/store your JWT in a Cookie?

[@benjaminlees](https://github.com/benjaminlees)
requested the ability to send tokens as cookies:
https://github.com/stongo/hapi-auth-jwt-simple/issues/55
So we added the ability to *optionally* send/store your tokens in cookies
to simplify building your *web app*.

To enable cookie support in your application all you need to do is add
a few lines to your code:

### Cookie Options

Firstly set the options you want to apply to your cookie:

```js
var cookie_options = {
  ttl: 365 * 24 * 60 * 60 * 1000, // expires a year from today
  encoding: 'none',    // we already used JWT to encode
  isSecure: true,      // warm & fuzzy feelings
  isHttpOnly: true,    // prevent client alteration
  clearInvalid: false, // remove invalid cookies
  strictHeader: true   // don't allow violations of RFC 6265
}
```

### Set the Cookie on your `reply`

Then, in your authorisation handler

```js
reply({text: 'You have been authenticated!'})
.header("Authorization", token)        // where token is the JWT
.state("token", token, cookie_options) // set the cookie with options
```

### Compatibility

`hapi-auth-jwt-simple` is compatible with Hapi.js versions `11.x.x` `10.x.x` `9.x.x` and `8.x.x` as there was no change to how the Hapi plugin system works
for the past two versions.
See the release notes for more details:
+ Hapi Version 10: https://github.com/hapijs/hapi/issues/2764
+ Hapi Version 9: https://github.com/hapijs/hapi/issues/2682

However in the interest of
 security/performance we *recommend* using the [*latest version*](https://github.com/hapijs/hapi/) of Hapi.

## Useful Links

+ For more background on jsonwebtokens (JWTs) see our detailed overview:
https://github.com/stongo/learn-json-web-tokens
+ Securing Hapi Client Side Sessions:
https://blog.liftsecurity.io/2014/11/26/securing-hapi-client-side-sessions

### Hapi.js Auth

Borrowed code from the following:

+ http://hapijs.com/tutorials/auth
+ https://github.com/hapijs/hapi-auth-basic
+ https://github.com/hapijs/hapi-auth-cookie
+ https://github.com/hapijs/hapi-auth-hawk
+ https://github.com/ryanfitz/hapi-auth-jwt
+ https://github.com/ryanfitz/hapi-auth-jwt2
