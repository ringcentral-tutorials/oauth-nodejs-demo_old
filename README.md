RingCentral 3-Legged OAuth Demo in Node.js with Express
==========================================================

## Overview

This is a quick 3-legged OAuth demo that runs using JavaScript, Node.js and Express with the [RingCentral JavaScript SDK](https://github.com/ringcentral/ringcentral-js) v2.x

## Installation

### Via NPM

```bash
$ git clone https://github.com/ringcentral-tutorials/oauth-nodejs-demo.git
$ cd oauth-nodejs-demo
$ npm install
```

## Configuration

Edit the `.env` file to add your client ID and secret.

```bash
$ cp config-sample.env .env
$ vi .env
```

In the [Developer Portal](http://developer.ringcentral.com/), ensure the redirect URI in your config file has been entered in your app configuration. By default, the URL is set to the following for this demo:

```
http://localhost:8080/callback
```

#### Using TLS

If you set the following parameters, you can start this demo using TLS. Be sure you are using HTTPS for your redirect URI.

| Property | Information |
|----------|-------------|
| `MY_APP_TLS_ENABLED` | Set to `1` for HTTPS and `0` for HTTP |
| `MY_APP_TLS_PRIVATE_KEY` | Set to path to PEM file for private key |
| `MY_APP_TLS_CERTIFICATE` | Set to path to PEM file for certificate |

## Usage

Open the web page:

```bash
$ npm start
```

Go to the URL:

```
http://localhost:8080
````

Then click the <input type="button" value="Login with RingCentral"> button to authorize the demo app and view the access token.
