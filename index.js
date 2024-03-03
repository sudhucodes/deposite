document.getElementById('customAmount').addEventListener('input', function () {
    // Automatically add ₹ symbol before the custom amount
    var customAmountInput = document.getElementById('customAmount');
    var customAmountValue = customAmountInput.value;

    // Remove existing ₹ symbol (if any)
    customAmountValue = customAmountValue.replace('₹', '');

    // Add ₹ symbol before the amount
    customAmountInput.value = '₹' + customAmountValue;
});

document.querySelector('input[name="amount"]').addEventListener('change', function () {
    // If a radio button is selected, clear custom amount
    var customAmountInput = document.getElementById('customAmount');
    customAmountInput.value = "";
    // Reset error message
    var errorMessage = document.getElementById('error-message');
    errorMessage.textContent = "";
    errorMessage.style.color = '';
});

// Clear custom amount when radio button is selected
document.querySelectorAll('input[name="amount"]').forEach(function (radio) {
    radio.addEventListener('click', function () {
        var customAmountInput = document.getElementById('customAmount');
        customAmountInput.value = "";
        // Reset error message
        var errorMessage = document.getElementById('error-message');
        errorMessage.textContent = "";
        errorMessage.style.color = '';
    });
});

// Clear selected radio button when custom amount is entered
document.getElementById('customAmount').addEventListener('input', function () {
    document.querySelectorAll('input[name="amount"]:checked').forEach(function (radio) {
        radio.checked = false;
    });

    // Reset error message
    var errorMessage = document.getElementById('error-message');
    errorMessage.textContent = "";
    errorMessage.style.color = '';
});

document.getElementById('depositButton').addEventListener('click', function () {
    var selectedAmount = getSelectedAmount();

    if (selectedAmount !== null) {
        // Reset custom amount input if a predefined option is selected
        var customAmountInput = document.getElementById('customAmount');
        customAmountInput.value = "";

        // Reset selected radio button if custom amount is entered
        document.querySelectorAll('input[name="amount"]:checked').forEach(function (radio) {
            radio.checked = false;
        });

        // Reset error message
        var errorMessage = document.getElementById('error-message');
        errorMessage.textContent = "";
        errorMessage.style.color = '';

        // Display the modal with deposit details
        document.getElementById('selectedAmount').textContent = "₹" + selectedAmount;
        document.getElementById('upiModal').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    }
});


document.getElementById('closeModal').addEventListener('click', function () {
    // Close the modal
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('upiModal').style.display = 'none';
});

function getSelectedAmount() {
    var customAmountInput = document.getElementById('customAmount');
    var radioAmount = document.querySelector('input[name="amount"]:checked');

    if (customAmountInput.value !== "") {
        // If custom amount is entered, validate and return
        var customAmount = parseInt(customAmountInput.value.replace('₹', ''));
        if (customAmount >= 50 && customAmount <= 50000) {
            return customAmount;
        } else {
            displayErrorMessage("Custom amount must be between ₹50 and ₹50,000");
            return null;
        }
    } else if (radioAmount) {
        // If radio button is selected, return its value
        return parseInt(radioAmount.value);
    } else {
        // If no amount is selected, display error message
        displayErrorMessage("Please select or enter an amount");
        return null;
    }
}

function displayErrorMessage(message) {
    var errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
    errorMessage.style.color = 'red';
}
function copyUPI() {
    var upiIdElement = document.getElementById('upiId');
    var textArea = document.createElement('textarea');
    textArea.value = upiIdElement.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    // Display a confirmation message
    alert('UPI ID copied to clipboard!');
}
