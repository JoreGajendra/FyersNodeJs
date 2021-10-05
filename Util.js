var tulind = require('tulind');

const getRSI = (data,callback) => tulind.indicators.rsi.indicator([data],[14],callback)
const getMACD = (data,callback) => tulind.indicators.macd.indicator([data],[12,26,9],callback)
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const getCompanySymbol = (company) => 'NSE:'+company.SYMBOL+'-'+company.SERIES

module.exports = {
    "getRSI":getRSI,
    "getMACD":getMACD,    
    "sleep":sleep,
    "getCompanySymbol":getCompanySymbol,
    "getCurrentDate" : function() {return new Date().toISOString().slice(0, 10);},
    "getPrevNDate" : function(N) { var d = new Date(); d.setDate(d.getDate() - N); return d.toISOString().slice(0, 10);},
    "getLatestValue" : function(arr) { if(arr instanceof Array) return arr.splice(-1)[0];},
    "getOpeningPriceData" : function(data) {return data.map( d => d[1]); },
    "getHighPriceData" : function(data) {return data.map( d => d[2]); },
    "getLowPriceData" : function(data) {return data.map( d => d[3]); },
    "getClosingPriceData" : function (data) {return data.map( d => d[4]); },
    "getVolumeData" : function(data) {return data.map( d => d[5]); }
}