let slideIndex = 0;
showSlides();
    
function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" activee", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " activee";
  setTimeout(showSlides, 4000);
}

// for side bar

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("main-content");
  sidebar.classList.toggle("active");
  mainContent.classList.toggle("shifted");
}


document.addEventListener('DOMContentLoaded', function() {
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