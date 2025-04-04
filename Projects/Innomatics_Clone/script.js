document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".menu");
    hamburger.addEventListener("click", function() {
      menu.classList.toggle("active");
    });
  });

  
  document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('.banner-img img');
    let currentIndex = 0;
    
    // Initially display the first image
    if (images.length > 0) {
      images[currentIndex].classList.add('active');
    }
    
    // Change image every 5 seconds
    setInterval(() => {
      images[currentIndex].classList.remove('active');
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.add('active');
    }, 5000);
  });

  document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".review-slider");
    const slides = document.querySelectorAll(".review-card");
    let currentIndex = 0;
  
    function showNextSlide() {
      slides[currentIndex].style.display = "none";
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].style.display = "block";
    }
  
    slides.forEach((slide, index) => {
      if (index !== 0) slide.style.display = "none";
    });
  
    setInterval(showNextSlide, 5000); // Change slide every 5 seconds
  });
  
  