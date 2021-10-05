const fyers = require('./Login');
const Util = require('./Util');
const Companies = require('./NSESec.json');
var tulind = require('tulind');
const log = console.log;

iterateOnCompanies(checkStrategyOnCompany);

async function iterateOnCompanies(callback) {
    for(let i=0; i < Companies.length; i++){
        await Util.sleep(300);
        company = Companies[i];
        if(callback && typeof callback === 'function' )
            callback(company);        
    }
};

function checkStrategyOnCompany (company) {
    var symbol = Util.getCompanySymbol(company);
    getHistory(symbol,company);
}


async function getHistory(symbol,company){
    let history = new fyers.history()
    let data = await history.setSymbol(symbol)
        .setResolution('D')
        .setDateFormat(1)
        .setRangeFrom(Util.getPrevNDate(100))
        .setRangeTo(Util.getCurrentDate())
        .getHistory();
    ExecuteStrategy(company,data.candles);
}

function ExecuteStrategy (company,data) {
    if(data === void(0)){
        log(company["NAME OF COMPANY"]+" ( "+Util.getCompanySymbol(company)+" ) ", ": No DATA");
        return
    }
    var closeData = Util.getClosingPriceData(data);
    
    tulind.indicators.sma.indicator([closeData], [44], (err, results) => { 
        var sma = Util.getLatestValue(results[0]);
        log(company["NAME OF COMPANY"]+" ( "+Util.getCompanySymbol(company)+" ) : ", sma);
    });
}