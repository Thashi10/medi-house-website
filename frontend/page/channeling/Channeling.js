// for side bar

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("main-content");
    sidebar.classList.toggle("active");
    mainContent.classList.toggle("shifted");
}


document.addEventListener('scroll', function () {
    const contactContainer = document.querySelector('.contact-container');

    // Check if the contact container is in view
    const rect = contactContainer.getBoundingClientRect();

    if (rect.top < window.innerHeight && rect.bottom > 0) {
        contactContainer.classList.add('visible'); // Add class to trigger animations
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            // Remove 'active' class from all links
            navLinks.forEach(nav => nav.classList.remove('active'));
            // Add 'active' class to the clicked link
            this.classList.add('active');
        });
    });

    // Optionally set active state based on current URL
    const currentURL = window.location.href;
    navLinks.forEach(link => {
        if (link.href === currentURL) {
            link.classList.add('active');
        }
    });
});
function toggleDropdown(dropdownId) {
    document.getElementById(dropdownId).classList.toggle("show");
 }
 
 function toggleDropdown(dropdownId) {
    document.getElementById(dropdownId).classList.toggle("show");
 }
 

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            dropdowns[i].classList.remove('show');
        }
    }
};

// Mapping of categories to doctors
const doctorsByCategory = {
    Ayurvedic: ["Muditha Gothami", "Saman Wijayarathna"],
    Cardiologist: ["Champika Vithanagama", "Rasika Sovis"],
    Physician: ["Buddhi Mohotti", "Chaminda Kottage", "Navoda Chathurya", "Tharindu Jothirathna"],
    Surgeon: ["Dilrukshi de Silava","Kasun Kumara"]
};

// Function to update doctors based on selected category
function updateDoctors() {
    const categorySelect = document.getElementById('category');
    const doctorSelect = document.getElementById('doctors');
    
    // Clear previous options
    doctorSelect.innerHTML = '<option value="" disabled selected>Select a Doctor</option>';

    const selectedCategory = categorySelect.value;
    
    if (selectedCategory && doctorsByCategory[selectedCategory]) {
        // Populate the doctor dropdown based on selected category
        doctorsByCategory[selectedCategory].forEach(doctor => {
            const option = document.createElement('option');
            option.value = doctor;
            option.textContent = doctor;
            doctorSelect.appendChild(option);
        });
    }
}

// Event listener for category selection
document.getElementById('category').addEventListener('change', updateDoctors);

// Get references to the modal and close button
const paymentModal = document.getElementById('paymentModal');
const closeButton = document.querySelector('.close-button');

// Function to open the payment modal
function openPaymentModal() {
    paymentModal.style.display = 'block';
}

// Function to close the payment modal
function closePaymentModal() {
    paymentModal.style.display = 'none';
}

// Event listener for closing the modal when clicking on the close button
closeButton.addEventListener('click', closePaymentModal);

// Event listener for closing the modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === paymentModal) {
        closePaymentModal();
    }
});

// Event listener for adding selections to results table
document.getElementById('show-selection').addEventListener('click', function() {
    // Get selected values from dropdowns
    const category = document.getElementById('category').value;
    const doctor = document.getElementById('doctors').value;

    // Reference to the warning message div
    const warningMessageDiv = document.getElementById('warning-message');
    warningMessageDiv.textContent = ''; // Clear any previous messages

    // Check if both selections are made
    if (!category || !doctor) {
        warningMessageDiv.textContent = "Please select both a category and a doctor.";
        return; // Exit the function if selections are not made
    }

    // Check for duplicates
    const resultsBody = document.getElementById('results-body');
    const rows = resultsBody.getElementsByTagName('tr');
    
    for (let row of rows) {
        const existingCategory = row.cells[0].textContent; // Get existing category
        const existingDoctor = row.cells[1].textContent;   // Get existing doctor
        
        // If both category and doctor match, show warning and exit
        if (existingCategory === category && existingDoctor === doctor) {
            warningMessageDiv.textContent = "Your selection already exists.";
            return; // Exit the function to prevent adding the duplicate row
        }
    }

    // Create a new row for the table
    const newRow = document.createElement('tr');

    // Create cells for category and doctor
    const categoryCell = document.createElement('td');
    const doctorCell = document.createElement('td');
    const actionCell = document.createElement('td'); // Cell for booking and cancel actions

	// Set cell text content
	categoryCell.textContent = category;
	doctorCell.textContent = doctor;

	// Create a booking button and apply the class
	const bookButton = document.createElement('button');
	bookButton.textContent = 'Book';
	bookButton.classList.add('book-button'); // Add class for styling

	// Create a cancel button and apply the class
	const cancelButton = document.createElement('button');
	cancelButton.textContent = 'Cancel';
	cancelButton.classList.add('cancel-button'); // Add class for styling

	// Append cells to the new row
	newRow.appendChild(categoryCell);
	newRow.appendChild(doctorCell);
	newRow.appendChild(actionCell);

	// Append the booking and cancel buttons to the action cell
	actionCell.appendChild(bookButton);
	actionCell.appendChild(cancelButton);

	// Append the new row to the results body
	resultsBody.appendChild(newRow);

	// Add event listener to the booking button to open payment modal with selected info
	bookButton.addEventListener('click', function() {
	    // Set selected category and doctor in the modal
	    document.getElementById('selectedCategory').textContent = category; 
	    document.getElementById('selectedDoctor').textContent = doctor; 

	    openPaymentModal(); // Open payment modal when Book is clicked
	});

	// Add event listener to the cancel button to remove the row
	cancelButton.addEventListener('click', function() {
	    newRow.remove(); // Remove the row when Cancel is clicked
	    warningMessageDiv.textContent = ''; // Clear warning message when row is removed
	});
});


// Event listener for form submission
document.getElementById('paymentForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect patient information from form fields
    const patientName = document.getElementById('patientName').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;

    // Get the selected category and doctor
    const category = document.getElementById('selectedCategory').textContent;
    const doctor = document.getElementById('selectedDoctor').textContent;

    // Prepare data to send to the server
    const data = {
        patientName: patientName,
        email: email,
        phoneNumber: phoneNumber,
        gender: gender,
        category: category,
        doctor: doctor
    };

    try {
        // Send data to the server using a POST request
        const response = await fetch('http://127.0.0.1:5000/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Booking saved successfully!');
            closePaymentModal(); // Close the modal after successful booking
        } else {
            alert('Failed to save booking.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while saving the booking.');
    }

    // Reset form fields after submission
    document.getElementById('paymentForm').reset();
});
