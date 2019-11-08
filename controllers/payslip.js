const taxTable = require('../public/taxTable.json');
const taxTableData = taxTable.data;

let calculatePaySlip = (details) => {
    return new Promise((resolve, reject)=>{
        let grossIncome = getGrossIncome(details.annualSalary); 
        let incomeTax =  getIncomeTax(details.annualSalary, taxTableData);
        let netIncome = getNetIncome(grossIncome, incomeTax);
        let superAmount = getSuperAmount(grossIncome, details.superRate);
        let payPeriod = getPayslipRange(details.paymentStartDate);
        let response = {
            name: `${details.firstname} ${details.lastname}`,
            payPeriod: payPeriod,
            grossIncome: grossIncome, 
            incomeTax: incomeTax,
            netIncome: netIncome,
            superAmount: superAmount
        }
        resolve(response);
    });
}
let roundingOf = (val) => {
    if( val % 1 >= 0.5){
        return Math.ceil(val);
    }else{
        return Math.floor(val);
    }
}
let getMonthlyOf = (val) => {
    return (val/12);
}
let getGrossIncome = (annualSalary) => {
    let monthlySal = getMonthlyOf(annualSalary);
    return roundingOf(monthlySal);
}
let getIncomeTax = (annualSalary, taxTableData) => {
    let response  = taxTableData.filter((range) => ((annualSalary>=range.minsal && annualSalary <=range.maxsal) ||  (annualSalary>=range.minsal && range.maxsal === null))).map((taxCol)=>{
        let moreThanExtra = annualSalary - taxCol.minsal;
        let totalExtraTaxUSD = moreThanExtra * taxCol.extraPerUSD;
        let totalIncomeTax = totalExtraTaxUSD + taxCol.basicTax;
        let monthlyTotalIncomeTax = getMonthlyOf(totalIncomeTax);
        return roundingOf(monthlyTotalIncomeTax);
    });
    return response[0];
}
let getNetIncome = (grossIncome, incomeTax) => {
    return (grossIncome - incomeTax);
}
let getSuperAmount = (grossIncome, superRate) => {
    return roundingOf(grossIncome * superRate/100);
}
let getPayslipRange = (startDate) => {
    let today = new Date(startDate);
    let lastday = getLastDay(today.getFullYear(), today.getMonth());
    let maxRange = `${today.getMonth()+1}-${lastday}-${today.getFullYear()}`;
    let newDate = new Date(maxRange);
    return `${today.toLocaleDateString()} - ${newDate.toLocaleDateString()}`;
}
let getLastDay = function(y,m){
    return  new Date(y, m+1, 0).getDate();
}

module.exports = calculatePaySlip;