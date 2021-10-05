const fyers = require('fyers-api-v2');
const Cred = require('./Cred');
const log = console.log;

fyers.setAppId(Cred.appId);
const reqBody = {
    auth_code:'',
    secret_key:Cred.secret
    
}

fyers.generate_access_token(reqBody).then((response)=>{
    log(response)
})
