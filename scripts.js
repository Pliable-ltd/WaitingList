document.addEventListener('DOMContentLoaded', function() {
    // All JavaScript code goes here
    const BEARER_AUTH = "sadkjd3i3w32iio2p31oiwq2io3uio234uyu42jhj4h22"; 
    const SHEETY_URL = "https://api.sheety.co/fae400a0ae60239e95d37107d53c84f5/pliableResponses/sheet1";

    // Get the form and output elements
    const form = document.getElementById('waitListForm');
    const output = document.getElementById('output');

    console.log(form);  // This should log the form element. If it logs `null`, the form id might be incorrect.
    console.log(output);  // This should log the output element.

    if (!form) {
        console.error("Form element with id 'waitingListForm' not found.");
        return;  // Exit if the form is not found to prevent further errors
    }

    // Function to validate email format
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    // Function to handle form submission and make an API call
    form.addEventListener('submit', async function(event) {
        event.preventDefault();  // Prevent default form submission

        // Gather form data
        const companyName = document.getElementById('company_name').value;
        const email = document.getElementById('email').value.trim();

        // Clear previous output messages
        output.textContent = "";
        output.style.color = "";

        // Validate required fields
        let isValid = true;
        if (!companyName) {
            isValid = false;
            showMessage("Company name is required.", "red");
        }
        if (!email) {
            isValid = false;
            showMessage("Email is required.", "red");
        } else if (!isValidEmail(email)) {
            isValid = false;
            showMessage("Please enter a valid email address.", "red");
        }

        // If form is valid, proceed with API call
        if (isValid) {
            try {
                // Make API call to submit data
                const response = await fetch(SHEETY_URL, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${BEARER_AUTH}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        sheet1: {
                            company: companyName,
                            email: email
                        }
                    })
                });

                // Handle API response
                if (response.ok) {
                    showMessage(`Thank you, ${companyName}! You've joined the waiting list.`, "white");
                    form.reset();  // Clear form fields
                } else {
                    showMessage("Error: Unable to submit. Please try again later.", "red");
                }
            } catch (error) {
                // Handle fetch error
                showMessage("Network error: Please check your connection and try again.", "red");
                console.error("Error:", error);
            }
        }
    });

    // Helper function to show messages
    function showMessage(message, color) {
        output.textContent = message;
        output.style.color = color;
    }
});