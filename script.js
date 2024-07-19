document.addEventListener('DOMContentLoaded', (event) => {
  const links = document.querySelectorAll('.links a');

  links.forEach(link => {
      link.addEventListener('click', (event) => {
          // Uncomment this line if you want to allow navigation
          // event.preventDefault();

          // Remove 'clicked' class from all links
          links.forEach(link => link.classList.remove('clicked'));
          // Add 'clicked' class to the clicked link
          link.classList.add('clicked');
      });
  });
});


let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 3000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 3000);

    
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};




const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    
    // Handle scrollbar thumb drag
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumbPosition = scrollbarThumb.offsetLeft;
        const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
        
        // Update thumb position on mouse move
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumbPosition + deltaX;
            // Ensure the scrollbar thumb stays within bounds
            const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
            const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
            
            scrollbarThumb.style.left = `${boundedPosition}px`;
            imageList.scrollLeft = scrollPosition;
        }
        // Remove event listeners on mouse up
        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        }
        // Add event listeners for drag interaction
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    });
    // Slide images according to the slide button clicks
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1 : 1;
            const scrollAmount = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    });
     // Show or hide slide buttons based on scroll position
    const handleSlideButtons = () => {
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
    }
    // Update scrollbar thumb position based on image scroll
    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumbPosition}px`;
    }
    // Call these two functions when image list scrolls
    imageList.addEventListener("scroll", () => {
        updateScrollThumbPosition();
        handleSlideButtons();
    });
}
window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);



let currentIndex = 1;
const cards = document.querySelectorAll('.card');

function showSlide(index) {
  currentIndex = index;
  const carousel = document.querySelector('.carousel');
  const cardWidth = cards[0].clientWidth + 40; // card width + margin
  carousel.style.transform = `translateX(${-cardWidth * (index - 1)}px)`;

  cards.forEach((card, i) => {
    if (i === index - 1) {
      card.classList.add('visible');
      card.classList.remove('blurred');
    } else {
      card.classList.add('blurred');
      card.classList.remove('visible');
    }
  });

  updateDots();
}

function prevSlide() {
  if (currentIndex > 1) {
    showSlide(currentIndex - 1);
  } else {
    showSlide(cards.length); // Go to the last card if at the first card
  }
}

function nextSlide() {
  if (currentIndex < cards.length) {
    showSlide(currentIndex + 1);
  } else {
    showSlide(1); // Go to the first card if at the last card
  }
}

function currentSlide(index) {
  showSlide(index);
}

function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex - 1].classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
  showSlide(currentIndex);
});




var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});







//   all ------------------
function initParadoxWay() {
  "use strict";
 
  if ($(".testimonials-carousel").length > 0) {
      var j2 = new Swiper(".testimonials-carousel .swiper-container", {
          preloadImages: false,
          slidesPerView: 1,
          spaceBetween: 20,
          loop: true,
          grabCursor: true,
          mousewheel: false,
          centeredSlides: true,
          pagination: {
              el: '.tc-pagination',
              clickable: true,
              dynamicBullets: true,
          },
          navigation: {
              nextEl: '.listing-carousel-button-next',
              prevEl: '.listing-carousel-button-prev',
          },
          breakpoints: {
              1024: {
                  slidesPerView: 3,
              },
              
          }
      });
  }
  
// bubbles -----------------
  
  
  setInterval(function () {
      var size = randomValue(sArray);
      $('.bubbles').append('<div class="individual-bubble" style="left: ' + randomValue(bArray) + 'px; width: ' + size + 'px; height:' + size + 'px;"></div>');
      $('.individual-bubble').animate({
          'bottom': '100%',
          'opacity': '-=0.7'
      }, 4000, function () {
          $(this).remove()
      });
  }, 350);
  
}

//   Init All ------------------
$(document).ready(function () {
  initParadoxWay();
});


document.addEventListener('DOMContentLoaded', () => {
  
  //------ Slider Begin
	const CaroS = document.querySelector('.Carousel-slider');
	const CaroSlider = new MicroSlider(CaroS, { indicators: true, indicatorText: '' });
	const hammer = new Hammer(CaroS);
	const CaroSTimer = 2000;
	let CaroAutoplay = setInterval(() => CaroSlider.next(), CaroSTimer);
    
  //------- Mouseenter Event
	CaroS.onmouseenter = function(e) {
		clearInterval(CaroAutoplay); 
		console.log(e.type + ' mouse detected');
	}
  
  //----- Mouseleave Event
	CaroS.onmouseleave = function(e) {
		clearInterval(CaroAutoplay); 
		CaroAutoplay = setInterval(() => CaroSlider.next(), CaroSTimer);
		console.log(e.type + ' mouse detected');
	}
  
  //----- Mouseclick Event
	CaroS.onclick = function(e) {
		clearInterval(CaroAutoplay); 
		console.log(e.type + ' mouse detected');
	}
  
  //------ Gesture Tap Event
	hammer.on('tap', function(e) {
		clearInterval(CaroAutoplay);
		console.log(e.type + ' gesture detected');
	});
  
  //----- Gesture Swipe Event
	hammer.on('swipe', function(e) {
		clearInterval(CaroAutoplay); 
		CaroAutoplay = setInterval(() => CaroSlider.next(), CaroSTimer);
		console.log(e.type + ' gesture detected');
	});

  let slideLink = document.querySelectorAll('.slider-item');
  if (slideLink && slideLink !== null && slideLink.length > 0){
    slideLink.forEach( el => el.addEventListener('click', e => {
      e.preventDefault();
      let href = el.dataset.href;
      let target = el.dataset.target;
      if (href !== '#') window.open(href, target);
    }));
  }
  
  //---- Slider End
  
});







document.addEventListener('DOMContentLoaded', () => {
  
  //------ Slider Begin
	const customSlider = document.querySelector('.carousel-slider.custom-slider');
	const CaroSlider = new MicroSlider(customSlider, { indicators: true, indicatorText: '' });
	const hammer = new Hammer(customSlider);
	const CaroSTimer = 2000;
	let CaroAutoplay = setInterval(() => CaroSlider.next(), CaroSTimer);
    
  //------- Mouseenter Event
	customSlider.onmouseenter = function(e) {
		clearInterval(CaroAutoplay); 
		console.log(e.type + ' mouse detected');
	}
  
  //----- Mouseleave Event
	customSlider.onmouseleave = function(e) {
		clearInterval(CaroAutoplay); 
		CaroAutoplay = setInterval(() => CaroSlider.next(), CaroSTimer);
		console.log(e.type + ' mouse detected');
	}
  
  //----- Mouseclick Event
	customSlider.onclick = function(e) {
		clearInterval(CaroAutoplay); 
		console.log(e.type + ' mouse detected');
	}
  
  //------ Gesture Tap Event
	hammer.on('tap', function(e) {
		clearInterval(CaroAutoplay);
		console.log(e.type + ' gesture detected');
	});
  
  //----- Gesture Swipe Event
	hammer.on('swipe', function(e) {
		clearInterval(CaroAutoplay); 
		CaroAutoplay = setInterval(() => CaroSlider.next(), CaroSTimer);
		console.log(e.type + ' gesture detected');
	});

  let slideLink = document.querySelectorAll('.slider-item');
  if (slideLink && slideLink !== null && slideLink.length > 0){
    slideLink.forEach( el => el.addEventListener('click', e => {
      e.preventDefault();
      let href = el.dataset.href;
      let target = el.dataset.target;
      if (href !== '#') window.open(href, target);
    }));
  }
  
  //---- Slider End
  
});








document.addEventListener('DOMContentLoaded', () => {
  // Select all paragraphs with the class 'clickable-para'
  const paragraphs = document.querySelectorAll('.clickable-para');

  paragraphs.forEach(paragraph => {
      paragraph.addEventListener('click', function() {
          // Remove underline from all paragraphs
          paragraphs.forEach(p => p.style.textDecoration = 'none');
          // Add underline to the clicked paragraph
          this.style.textDecoration = 'underline';
      });
  });
});








// email

// function emailSend(event) {
//   event.preventDefault();

//   var firstName = document.getElementById('firstName').value;
//   var lastName = document.getElementById('lastName').value;
//   var email = document.getElementById('email').value;
//   var phoneNumber = document.getElementById('phoneNumber').value;
//   var address = document.getElementById('adress').value;
//   var typeOfService = document.getElementById('typeOfService').value;
//   var description = document.getElementById('description').value;
//   var emergencyService = document.getElementById('emergencyService').checked ? 'Yes' : 'No';

//   var messageBody = "First name: " + firstName +
//       "<br/> Last name: " + lastName +
//       "<br/> Email: " + email +
//       "<br/> Phone number: " + phoneNumber +
//       "<br/> Address: " + address +
//       "<br/> Type Of Service: " + typeOfService +
//       "<br/> Description: " + description +
//       "<br/> Emergency Service: " + emergencyService;

//   Email.send({
//       Host: "smtp.elasticemail.com",
//       Username: "dhanuchandu1232@gmail.com",
//       Password: "F4F02329E1DC9FDCEDD7E74DA82B0F2F0050",
//       To: 'dhanushchandu123@gmail.com',
//       From: email,
//       Subject: "Service Request",
//       Body: messageBody
//   }).then(
//       message => {
//           if (message == 'OK') {
//               swal("Successful", "Your request has been sent!", "success");
//               document.querySelector('form').reset();
//           } else {
//               swal("Error", "There was an issue sending your request.", "error");
//           }
//       }
//   );
// }




// function emailSend(event) {
//   event.preventDefault();

//   var firstName = document.getElementById('firstName').value;
//   var lastName = document.getElementById('lastName').value;
//   var email = document.getElementById('email').value;
//   var phoneNumber = document.getElementById('phoneNumber').value;
//   var address = document.getElementById('adress').value;
//   var typeOfService = document.getElementById('typeOfService').value;
//   var description = document.getElementById('description').value;
//   var emergencyService = document.getElementById('emergencyService').checked ? 'Yes' : 'No';

//   var messageBody = "First name: " + firstName +
//       "<br/> Last name: " + lastName +
//       "<br/> Email: " + email +
//       "<br/> Phone number: " + phoneNumber +
//       "<br/> Address: " + address +
//       "<br/> Type Of Service: " + typeOfService +
//       "<br/> Description: " + description +
//       "<br/> Emergency Service: " + emergencyService;

//   Email.send({
//     Host: "smtp.elasticemail.com",
//     Username: "dhanuchandu1232@gmail.com",
//     Password: "F4F02329E1DC9FDCEDD7E74DA82B0F2F0050",
//     To: 'dhanushchandu123@gmail.com',
//     From: email,
//     Subject: "Service Request",
//     Body: messageBody
//   }).then(
//       message => {
//           if (message == 'OK') {
//               swal("Successful", "Your request has been sent!", "success");
//               document.querySelector('form').reset();
//           } else {
//               swal("Error", "There was an issue sending your request.", "error");
//           }
//       }
//   ).catch(error => {
//       swal("Error", "There was an issue sending your request: " + error.message, "error");
//   });
// }






document.addEventListener("DOMContentLoaded", function() {
  const vacuumImages = [
      "./images/main.jpeg", // Replace with actual image paths
      "./images/main2.jpeg",
      // Add more images as needed
  ];

  const spareImages = [
      "./images/main2.jpeg", // Replace with actual image paths
      "./images/main.jpeg",
       // Example additional image
      // Add more images as needed
  ];

  const carousel = document.querySelector(".carousel");
  const paginationContainer = document.querySelector(".pagination");
  let currentImages = vacuumImages; // Default to vacuum images
  let currentIndex = 0;

  document.querySelectorAll(".clickable-para").forEach(para => {
      para.addEventListener("click", function() {
          const category = para.getAttribute("data-category");
          currentImages = category === "vacuum" ? vacuumImages : spareImages;
          currentIndex = 0; // Reset index when category changes
          loadImages();
          updatePagination();
      });
  });

  function loadImages() {
      carousel.innerHTML = "";
      currentImages.forEach((src, index) => {
          const img = document.createElement("img");
          img.src = src;
          img.style.position = 'absolute'; // Ensure images are positioned absolutely
          img.style.left = `${index * 100}%`; // Adjust based on the total width of carousel
          img.style.width = '100%'; // Ensure each image takes full width of carousel container
          carousel.appendChild(img);
      });
      updateCarousel();
  }

  function updatePagination() {
      paginationContainer.innerHTML = "";
      currentImages.forEach((_, index) => {
          const span = document.createElement("span");
          span.addEventListener("click", () => {
              currentIndex = index;
              updateCarousel();
          });
          paginationContainer.appendChild(span);
      });
      updateActivePagination();
  }

  function updateCarousel() {
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`; // Adjust based on image width
      updateActivePagination();
  }

  function updateActivePagination() {
      const spans = paginationContainer.querySelectorAll("span");
      spans.forEach((span, index) => {
          span.classList.toggle("active", index === currentIndex);
      });
  }

  document.querySelector(".prev-btn").addEventListener("click", () => {
      if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
      }
  });

  document.querySelector(".next-btn").addEventListener("click", () => {
      if (currentIndex < currentImages.length - 1) {
          currentIndex++;
          updateCarousel();
      }
  });

  // Load vacuum images by default
  loadImages();
  updatePagination();
});















document.addEventListener('DOMContentLoaded', () => {
  const vacuumImages = [
      './images/v1.png',
      './images/v1.png',
      './images/v1.png',
      './images/v1.png'
  ];
  
  const spareImages = [
      './images/a1.jpeg',
      './images/a1.jpeg',
      './images/a1.jpeg',
      './images/a1.jpeg'
  ];
  
  const sliderContainer = document.querySelector('#slider1 .slider-container');
  
  function updateSliderImages(images) {
      sliderContainer.innerHTML = ''; // Clear current images
      images.forEach(src => {
          const li = document.createElement('li');
          const img = document.createElement('img');
          img.src = src;
          img.alt = '...';
          li.appendChild(img);
          sliderContainer.appendChild(li);
      });
  }
  
  document.getElementById('vacuum-button').addEventListener('click', () => {
      updateSliderImages(vacuumImages);
  });
  
  document.getElementById('spare-button').addEventListener('click', () => {
      updateSliderImages(spareImages);
  });

  // Optionally, initialize with the vacuum images
  updateSliderImages(vacuumImages);
});





