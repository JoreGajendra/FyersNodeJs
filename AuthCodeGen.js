const fyers = require('fyers-api-v2');
const Cred = require('./Cred');

fyers.setAppId(Cred.appId);
fyers.setRedirectUrl('http://192.168.0.1/');
fyers.generateAuthCode();
