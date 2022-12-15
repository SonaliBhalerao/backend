
const EMICalculator= async(req, res)=>{
    const {amount, interest, tenure} = req.body;
    const R = (interest/12/100);
    const a = amount*R;
    const b = 1+R*tenure;
    const EMI = a*b/(b-1);
    const total = EMI * tenure;
    const InterestPayable = total - amount;
    res.send({'EMI': EMI, "InterestPayable": InterestPayable,
    "TotalPayment": total,})

}


module.exports = { EMICalculator }