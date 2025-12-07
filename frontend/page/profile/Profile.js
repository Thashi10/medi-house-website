
// for side bar

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("main-content");
    sidebar.classList.toggle("active");
    mainContent.classList.toggle("shifted");
}


document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the card is visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once the card is visible
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card); // Observe each card
    });
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


let activeSection = 'profileSection';
const userInfo = {
    fullName: "Thashini Dinethma",
    email: "thashinidinethma@gmail.com",
    profilePicture: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg",
    verified: true
};

function switchActiveComponent(section) {
    activeSection = section;
    document.querySelectorAll('.custom-sidebar button').forEach((btn) => {
        btn.classList.remove('active-btn');
    });
    document.querySelector(`.custom-sidebar button[onclick="switchActiveComponent('${section}')"]`).classList.add('active-btn');
    updateContent();
}

function updateContent() {
    const container = document.getElementById('dynamicComponentContainer');

    if (activeSection === 'profileSection') {
        container.innerHTML = `
        <div class="bg-white rounded-2xl shadow-xl p-4 w-100">
          <h2 class="text-center text-primary mb-4">User Profile</h2>
          <div class="d-flex justify-content-center mb-4">
            <div class="position-relative">
              <img 
                src="${userInfo.profilePicture}" 
                alt="User Profile" 
                class="rounded-circle border border-3 ${userInfo.verified ? 'border-warning' : 'border-secondary'
            }" 
                style="width: 150px; height: 150px;"
              />
              ${userInfo.verified
                ? `<span class="position-absolute top-100 start-50 translate-middle badge rounded-pill bg-success">Verified</span>`
                : ""
            }
            </div>
          </div>
          <h3 class="text-center">${userInfo.fullName}</h3>
          <p class="text-center text-muted">${userInfo.email}</p>
          <div class="d-flex justify-content-center gap-2 mt-3">
            <button class="btn btn-primary" onclick="handleEditProfile()">Edit Profile</button>
            <button class="btn btn-danger" onclick="handleLogout()">Logout</button>
          </div>
        </div>`;
    } else if (activeSection === 'settingsSection') {
        container.innerHTML = `
        <div class="container mt-5">
          <h1 class="text-2xl font-semibold mb-6">General Settings</h1>
          
          <!-- Avatar Section -->
          <div class="mb-6">
            <h2 class="text-lg font-semibold mb-2">Avatar</h2>
            <div class="d-flex align-items-center">
              <img src="${userInfo.profilePicture}" alt="User avatar" class="avatar-img">
              <div class="ml-3">
                <br/><br/><br/>
                <label class="text-primary cursor-pointer" for="avatar-upload">Change</label>
                <input type="file" id="avatar-upload" class="hidden" accept="image/*">
                <br/><br/>
                <button class="btn btn-link text-primary ml-4" onclick="document.getElementById('avatar-upload').value = ''">Remove</button>
              </div>
            </div>
          </div>
  
          <!-- Cover Photo Section -->
          <div class="mb-6 p">
            <h2 class="text-lg font-semibold mb-2">Cover photo</h2>
            <div class="cover-container">
              <img id="cover-photo" src="" alt="Cover" class="cover-photo d-none">
              <div id="cover-placeholder" class="d-flex flex-column align-items-center" 
                   ondrop="handleDrop(event)" ondragover="allowDrop(event)">
                <i class="fas fa-camera fa-2x mb-2"></i>
                <p>Drag image here, or 
                  <label class="text-primary cursor-pointer" for="cover-upload">Browse Files</label>
                </p>
                <input type="file" id="cover-upload" accept="image/*" onchange="handleFileSelect(event)">
              </div>
            </div>
  
            <button class="btn btn-link text-primary mt-2" onclick="document.getElementById('cover-photo').src=''; document.getElementById('cover-placeholder').style.display='flex';">Remove</button>
          </div>
  
          <!-- Form Section -->
          <h2 class="text-lg font-semibold mb-4">Basic information</h2>
          <p class="text-sm text-muted mb-4">
            Update some personal information. Your address will never be publicly available.
          </p>
  
          <form class="space-y-4">
            <div class="row mb-3">
              <div class="col-md-6">
                <input type="text" class="form-control" placeholder="First name">
              </div>
              <div class="col-md-6">
                <input type="text" class="form-control" placeholder="Last Name">
              </div>
            </div>
            <div class="mb-3">
              <input type="text" class="form-control" placeholder="Username">
            </div>
            <div class="mb-3">
              <input type="email" class="form-control" placeholder="Email">
            </div>
            <div class="mb-3">
              <input type="tel" class="form-control" placeholder="Phone">
            </div>
            <div class="row mb-3">
              <div class="col-md-6">
                <input type="text" class="form-control" placeholder="City">
              </div>
              <div class="col-md-6">
                <input type="text" class="form-control" placeholder="Province">
              </div>
            </div>
            <button type="submit" class="w-100 btn btn-primary">Save Changes</button>
          </form>
        </div>`;
    } else if (activeSection === 'bookingSection') {
        container.innerHTML = `
        <div class="container cont2 my-6">
          <header class="bg-purple-600 text-white py-20">
            <div class="container text-center">
              <h1 class="display-4 text-black  font-weight-bold">Your Bookings </h1>
            </div>
          </header>
  
          <main class="container my-6">
            <div class="row">
              <!-- Repeat this for each booked event -->
              <div class="col-12 col-sm-6 col-lg-4 mb-4">
                <div class="event-card bg-white p-4 rounded-lg">
                  <div class="text-gray-600 text-center event-info">Booking Date: 20 Dec 2024</div>
                  <div class="text-gray-600 text-center event-info">Doctor Name: Thashini</div>
                  <div class="text-gray-600 text-center event-info">Channeling number: #05</div>

                </div>
              </div>
              <!-- Add more booked event cards here -->
            </div>
          </main>
        </div>`;
    }
}

// Ensure content is loaded when the page is refreshed
document.addEventListener('DOMContentLoaded', function() {
    updateContent();
  });

function handleEditProfile() {
    alert("Edit Profile Clicked");
}

function handleLogout() {
    alert("Logout Clicked");
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        displayCoverPhoto(file);
    }
}

// Handle file selection via file input
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        displayCoverPhoto(file);
    }
}

// Allow the drop event
function allowDrop(event) {
    event.preventDefault();
}

// Handle the drop event
function handleDrop(event) {
    event.preventDefault();
    const file = event.dataTransfer.files[0]; // Get the dropped file
    if (file) {
        displayCoverPhoto(file);
    }
}

// Display the cover photo after it's selected or dropped
function displayCoverPhoto(file) {
    const reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('cover-photo').src = e.target.result;
        document.getElementById('cover-photo').classList.remove('d-none');
        document.getElementById('cover-placeholder').style.display = 'none';
    };
    reader.readAsDataURL(file);
}