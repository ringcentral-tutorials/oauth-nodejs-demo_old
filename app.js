require('dotenv').config();
var app = require('express')();
var ringcentral = require('ringcentral');

// Configure Mustache
var mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// Start HTTP server
var server = null;
var port = process.env.MY_APP_PORT;
var useTls = process.env.MY_APP_TLS_ENABLED > 0 ? true : false;

if (useTls) {
  var fs = require('fs');
  server = require('https')
    .createServer({
      key: fs.readFileSync(process.env.MY_APP_TLS_PRIVATE_KEY),
      cert: fs.readFileSync(process.env.MY_APP_TLS_PUBLIC_CERT)
    }, app)
    .listen(port, function () {
      console.log('LISTEN_HTTPS ' + port);
    });
} else {
  server = require('http')
    .Server(app)
    .listen(port, function () {
      console.log('LISTEN_HTTP ' + port);
    });
}

// Start RingCentral SDK
var rcsdk = new ringcentral({
  server: process.env.RC_APP_SERVER_URL,
  appKey: process.env.RC_CLIENT_ID,
  appSecret: process.env.RC_CLIENT_SECRET
});

app.get('/', function (req, res) {
  // Get token for display after OAuth
  var token = rcsdk.platform().auth().data();
  token_json = token['access_token'] ? JSON.stringify(token, null, ' ') : '';

  // Render home page with params
  res.render('index', {
    authorize_uri: rcsdk.platform().authUrl({
      brandId: process.env.RC_APP_BRAND_ID,        // optional
      redirectUri: process.env.RC_APP_REDIRECT_URL // optional if 1 configured
    }),
    redirect_uri: process.env.RC_APP_REDIRECT_URL,
    token_json: token_json
  });
});

app.get('/callback', function (req, res) {
  if (req.query.code) {
    rcsdk.platform()
      .login({
        code: req.query.code,
        redirectUri: process.env.RC_APP_REDIRECT_URL
      })
      .then(function (token) {
        // You should store your token in the session here
        console.log('logged_in');
        res.send('login success');
      })
      .catch(function (e) {
        console.log('ERR ' + e.message || 'Server cannot authorize user');
        res.send('Login error ' + e);
      });
  } else {
    res.send('No Auth code');
  }
});
