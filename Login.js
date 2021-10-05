const Cred = require("./Cred");
const fyers = require('fyers-api-v2');

module.exports = (() => {
    fyers.setAppId(Cred.appId);
    fyers.setAccessToken(Cred.accessToken);
    return fyers;
})();