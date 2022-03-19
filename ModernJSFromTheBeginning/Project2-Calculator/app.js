// UI vars
const formCalc = document.getElementById('loan-form');

// Load event listeners
loadEventListeners();

// Load event listeners
function loadEventListeners() {
    // Calculate event
    formCalc.addEventListener('submit', function (e) {

        document.getElementById('results').style.display = 'none';

        document.getElementById('loading').style.display = 'block';

        setTimeout(calculate, 2000);


        e.preventDefault();
    });
}

function calculate() {
    console.log("Calculating...");
    // UI vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const amountValue = parseFloat(amount.value);
    const interestCalc = parseFloat(interest.value) / 100 / 12;
    const paymentsCalc = parseFloat(years.value) * 12;

    //monthly payment calculation
    const monthlyPayAux = Math.pow(1 + interestCalc, paymentsCalc);
    const monthlyPayCalc = (amountValue * monthlyPayAux * interestCalc) / (monthlyPayAux - 1);

    //Check if input is correct
    if (isFinite(monthlyPayCalc)) {
        monthlyPayment.value = monthlyPayCalc.toFixed(2);
        totalPayment.value = (monthlyPayCalc * paymentsCalc).toFixed(2);
        totalInterest.value = ((monthlyPayCalc * paymentsCalc) - amountValue).toFixed(2);

        // Show results
        document.getElementById('results').style.display = 'block';

        // Hide Loader
        document.getElementById('loading').style.display = 'none';
    } else {

        // Hide Loader
        document.getElementById('loading').style.display = 'none';
        // alert("Please check your numbers.");
        showError('Please check your numbers');
    }

}

//Show error message
function showError(error) {
    //Create error container
    const errorDiv = document.createElement('div');

    // Get elements for position
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add classes
    errorDiv.className = 'alert alert-danger';

    // Create and append textNode
    errorDiv.appendChild(document.createTextNode(error));

    //insert error element above heading
    card.insertBefore(errorDiv, heading);

    //Timer to clear message
    setTimeout(clearError, 2000);

}
//Clear error message
function clearError() {
    document.querySelector('.alert').remove();
}