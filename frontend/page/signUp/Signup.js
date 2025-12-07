// JavaScript for toggling password visibility and handling form submission

function togglePasswordVisibility(inputId, eyeId) {
    const input = document.getElementById(inputId);
    const eyeIcon = document.getElementById(eyeId);

    if (input.type === "password") {
        input.type = "text";
        eyeIcon.src = "img/eye-slash-fill.svg"; // Change to open eye icon
    } else {
        input.type = "password";
        eyeIcon.src = "img/eye-fill.svg"; // Change to closed eye icon
    }
}

document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const errorMessage = document.getElementById('error-message');
    errorMessage.classList.add('d-none'); // Hide error message initially

    // Example: Check if passwords match (add your own validation logic)
    const password = this.password.value;
    const confirmPassword = this.confirmPassword.value;

    if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match.";
        errorMessage.classList.remove('d-none');
    } else {
        // Submit form or perform further actions here...
        alert("Form submitted successfully!"); // Placeholder action
    }
});