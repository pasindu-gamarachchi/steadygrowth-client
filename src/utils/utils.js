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
    if (day===0 || day==6){
        return false;
    }
    const yesterday = new Date(Date.now() - 86400000)
    return new Date(dateStr) <= new Date(yesterday.toDateString());
}


module.exports = {
    isInt,
    isValidStockDay,
    isIntgtZero
}