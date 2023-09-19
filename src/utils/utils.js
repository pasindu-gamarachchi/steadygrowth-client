const isInt = (num) =>{
    if ((num.trim()[0]==="+") || (num.trim()[0]==="-")){
        return false;
    }

    return (typeof(num) === 'number' || typeof(num) === "string" && num.trim() !== '') && !isNaN(num);
  }

const isIntgtZero = (num) =>{
    if ((num.trim()[0]==="+") || (num.trim()[0]==="-")){
        return false;
    }
    if (num==="0"){
        return false;
    }

    return (typeof(num) === 'number' || typeof(num) === "string" && num.trim() !== '') && !isNaN(num);
  }

const isValidStockDay = (dateStr) =>{
    let day = new Date(dateStr).getUTCDay();
    // console.log(new Date(dateStr));
    if (day===0 || day===6){
        return false;
    }
    const yesterday = new Date(Date.now() - 86400000)
    return new Date(dateStr) <= new Date(yesterday.toDateString());
}

const generatePorfCardData = (portfObj)=>{
    const summData =  []
    for (let i=0; i< portfObj.length-1; i++){
        let cval = portfObj[i].stockSumm[
            portfObj[i].stockSumm.length-1
        ].stockValue;
        cval = Number(cval).toFixed(2)
        let pval = portfObj[i].stockSumm[0].stockValue;
        pval = Number(pval).toFixed(2);
        const profval = Number(cval - pval).toFixed(2)
        const portfSumm = {
            purchaseDate: portfObj[i].stockSumm[0].date,
            stockSymbol : portfObj[i].stock_symbol,
            purchaseValue : pval ,
            currentValue: cval,
            profitValue: profval
        }
        summData.push(portfSumm);
    }

    return summData;


}

const mapper = {
    'aapl': 'Apple Inc.',
    'amzn': 'Amazon.com, Inc.',
    'bp': 'BP p.l.c.',
    'googl': 'Alphabet Inc.',
    'mdb': 'MongoDB, Inc.',
    'msft': 'Microsoft Corporation',
    'nflx': 'Netflix, Inc.',
    'shop': 'Shopify Inc.',
    'su': 'Suncor Energy  Inc.',
    'team': 'Atlassian Corp Plc',
    'tsla': 'Tesla, Inc.'

}
const invertedMapper = {
    'Apple Inc.': 'aapl',
    'Amazon.com, Inc.': 'amzn',
    'BP p.l.c.': 'bp',
    'Alphabet Inc.': 'googl',
    'MongoDB, Inc.': 'mdb',
    'Microsoft Corporation': 'msft',
    'Netflix, Inc.': 'nflx',
    'Shopify Inc.': 'shop',
    'Suncor Energy  Inc.': 'su',
    'Atlassian Corp Plc': 'team',
    'Tesla, Inc.': 'tsla' 

}
const symbolSet = new Set(
    [
        'Apple Inc.',
        'Amazon.com, Inc.',
        'BP p.l.c.',
        'Alphabet Inc.',
        'MongoDB, Inc.',
        'Microsoft Corporation',
        'Netflix, Inc.',
        'Shopify Inc.',
        'Suncor Energy  Inc.',
        'Atlassian Corp Plc',
        'Tesla, Inc.' 
    ]
)


module.exports = {
    isInt,
    isValidStockDay,
    isIntgtZero,
    generatePorfCardData,
    mapper,
    invertedMapper,
    symbolSet
}