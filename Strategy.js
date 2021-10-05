const Login = require('./Login');
const log = console.log;
const Companies = require('./NSECompany.json');
const Util = require('./Util');
var fyers;

Login.init((fyClient) => {
    fyers = fyClient;
    iterateOnCompanies(checkStrategyOnCompany);
});

function iterateOnCompanies(callback) {
    Companies.forEach((company) => {
        if(callback && typeof callback === 'function' )
            callback(company);
    });
};

function checkStrategyOnCompany (company) {
    var symbol = 'NSE:'+company.Name+'-'+company.Series;
    getHistory(symbol,company);
}

async function getHistory(symbol,company){
    let history = new fyers.history()
    let data = await history.setSymbol(symbol)
        .setResolution('D')
        .setDateFormat(1)
        .setRangeFrom(Util.getPrevNDate(100))
        .setRangeTo(Util.getCurrentDate())
        .getHistory()
    ExecuteStrategy(company,data);
}

function ExecuteStrategy (company,data) {
    var closeData = Util.getClosingPriceData(data);
    Util.getRSI(closeData,(err,rsi)=>{
        if(err) log(err);
        var RSI = Util.getLatestValue(rsi[0]);
        if( RSI < 35){
            Util.getMACD(closeData,(err,MACDData) => {
                var macdValue = Util.getLatestValue(MACDData[0]);
                var signalValue = Util.getLatestValue(MACDData[1]);
                if(macdValue < 0 && macdValue > signalValue){
                    log(company.FullName);
                    log("\t RSI: ", RSI);
                    log("\t MACD: ", macdValue);
                    log("\t MACDSignal: ", signalValue);
                }
            });
        }
    });
}