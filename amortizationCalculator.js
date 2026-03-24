button1 = document.getElementById('Button1');
amortization = document.getElementById('amortization');
let loanAmount
let downPayment
let term

button1.addEventListener('click', function() {
    try {
        loanAmount = Number(prompt('How much did you loan? (No commas, please)'));
        downPayment = Number(prompt('What was your down payment as a percentage? (5 = 5%)'));
        term = Number(prompt('How long is your loan term? It must be 15 or 30 years, else wise the program will break.'));
        if (isNaN(loanAmount) || isNaN(downPayment) || term != 15 && term != 30) {
            window.alert('Hey! You did something wrong! Please try again!');
        } else {
            let principalLoan = loanAmount - (loanAmount * (downPayment/100));
            const interestRate = 0.0575;
            const monthlyInterest = interestRate/12 // monthly interest is HERE!
            let months = term*12
            let monthlyPayment = ((monthlyInterest * principalLoan) / (1 - Math.pow(1+monthlyInterest, -months))).toFixed(2);
            let interestPaid = (monthlyPayment * months) - principalLoan;
            let loanCost = (principalLoan + interestPaid);

            header = document.createElement('h2');
            headerText = document.createTextNode('Mortgage Term: ' + String(term) + ' years');
            header.appendChild(headerText);
            document.body.appendChild(header);

            interest = document.createElement('h2');
            interestText = document.createTextNode('Interest Rate: ' + String(interestRate * 100) + '%');
            interest.appendChild(interestText);
            document.body.appendChild(interest);

            loanAmountPostDP = document.createElement('h2');
            loanAmountPostDPText = document.createTextNode('Loan Amount (After Down Payment): ' + String(principalLoan.toLocaleString('en-US', {style: 'currency', currency:'USD'})));
            loanAmountPostDP.appendChild(loanAmountPostDPText);
            document.body.appendChild(loanAmountPostDP);

            totalInterestPaid = document.createElement('h2');
            totalInterestPaidText = document.createTextNode('Total Interest Paid: ');

            totalLoanCost = document.createElement('h2');
            totalLoanCostText = document.createTextNode('Total Loan Cost: ' + String(loanAmount.toLocaleString('en-US', {style: 'currency', currency:'USD'})));
            totalLoanCost.appendChild(totalLoanCostText);
            document.body.appendChild(totalLoanCost);

            monthlyPaymentDoc = document.createElement('h2');
            monthlyPaymentDocText = document.createTextNode('Monthly Payment: ' + String(monthlyPayment.toLocaleString('en-US', {style:'currency', currency:'USD'})));
            monthlyPaymentDoc.appendChild(monthlyPaymentDocText);
            document.body.appendChild(monthlyPaymentDoc);

            let count = 1

            while (principalLoan > 0) {
                principalLoan -= monthlyPayment
                debtBreak = document.createElement('p');
                debtBreakText = document.createTextNode('Month ' + String(count) + ': Payment: $' + String(monthlyPayment) + ' Interest: $' + String((principalLoan * monthlyInterest).toFixed(2)) + ' Pricipal: $' + String(monthlyPayment - interestPaid) + ' Remaining Balance: $')
                debtBreak.appendChild(debtBreakText);
                document.body.appendChild(debtBreakText);
                count++;
            }
        }
    } finally {
        // uhhhh do nothing.
    };
});
