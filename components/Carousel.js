/*
  STRETCH GOAL
  STRETCH GOAL
  STRETCH GOAL

  If You've gotten this far, you're on your own! Although we will give you some hints:
    1. You will need to write a function that creates the carousel component, you will find the HTML below.
    2. You will need to grab a reference to all of the images
    3. Create a current index
    4. Those buttons are gonna need some click handlers
    5. Think of how you would animate this component. Make the cards slide in and out, or fade. It's up to you!
    6. Have fun!
*/

/* HTML:
  <div class="carousel">
    <div class="left-button"> < </div>
    <img src="https://tk-assets.lambdaschool.com/ba687af4-3a1e-43d7-87b2-f30453264c9d_mountains.jpeg" />
    <img src="https://tk-assets.lambdaschool.com/8aa075b0-67cf-47ce-9a7f-8cc9d754675d_computer.jpeg" />
    <img src="https://tk-assets.lambdaschool.com/5b7441c6-6e4b-4feb-a4ec-8dd2eb76238a_trees.jpeg" />
    <img src="https://tk-assets.lambdaschool.com/0b770382-d0eb-4465-8bf2-692a79fcda71_turntable.jpeg" />
    <div class="right-button"> > </div>
  </div>
*/

// Import Dependencies
import { gsap } from "gsap";

// Create a new carousel
const carousenImgs = [
  "https://tk-assets.lambdaschool.com/ba687af4-3a1e-43d7-87b2-f30453264c9d_mountains.jpeg",
  "https://tk-assets.lambdaschool.com/8aa075b0-67cf-47ce-9a7f-8cc9d754675d_computer.jpeg",
  "https://tk-assets.lambdaschool.com/5b7441c6-6e4b-4feb-a4ec-8dd2eb76238a_trees.jpeg",
  "https://tk-assets.lambdaschool.com/0b770382-d0eb-4465-8bf2-692a79fcda71_turntable.jpeg",
];
const newCarousel = createImgCarousel(carousenImgs);

// Insert the carousel in the DOM
const carouselContainer = document.querySelector(".carousel-container");
carouselContainer.appendChild(newCarousel);

function createImgCarousel(images) {
  // Create the main carousel container
  const carouselContainer = document.createElement("div");

  // Add attributes to main carousel container
  carouselContainer.classList.add("carousel");

  // Create carousel's child elements
  const leftBtn = document.createElement("div");
  const rightBtn = document.createElement("div");

  // Add content to child elements
  leftBtn.textContent = "<";
  rightBtn.textContent = ">";

  // Prepend the left button
  carouselContainer.prepend(leftBtn);

  // Use the supplied array of images and append them in an img tag
  images.forEach((img, index) => {
    const newImg = document.createElement("img");
    newImg.src = img;

    if (index === 0) {
      newImg.classList.add("active");
      newImg.style.display = "block";
    }

    carouselContainer.appendChild(newImg);
  });

  // Append the next button
  carouselContainer.appendChild(rightBtn);

  // Helper for carousel arrows
  let isChanging;

  // Add event listener for the left btn
  leftBtn.addEventListener("click", (e) => {
    // Get the current active image
    const activeImg = document.querySelector(".carousel .active");

    // Get the next image
    const prevImg = activeImg.previousElementSibling;

    // Check if next sibling is an image. If not, don't run more code
    if (prevImg.hasAttribute("src") && isChanging !== true) {
      // Set isChanging to true
      isChanging = true;

      gsap.to(activeImg, { opacity: 0, x: 300, scale: 0.5, duration: 0.5 });
      gsap.to(prevImg, { opacity: 1, x: 0, scale: 1, duration: 0 });

      setTimeout(() => {
        // Remove active from old image
        activeImg.style.display = "none";
        activeImg.classList.remove("active");

        // Make new image active
        prevImg.style.display = "block";
        prevImg.classList.add("active");
        gsap.from(prevImg, { opacity: 0, x: -300, scale: 0.5, duration: 0.5 });
      }, 500);

      setTimeout(() => {
        // Revert is changing back to false
        isChanging = false;
      }, 1000);
    } else {
      console.log("Next is NOT an image");
    }
  });

  // Add event listener for the right btn
  rightBtn.addEventListener("click", (e) => {
    // Get the current active image
    const activeImg = document.querySelector(".carousel .active");

    // Get the next image
    const nextImg = activeImg.nextElementSibling;

    // Check if next sibling is an image. If not, don't run more code
    if (nextImg.hasAttribute("src")) {
      // Set isChanging to true
      isChanging = true;

      gsap.to(activeImg, { opacity: 0, x: -300, scale: 0.5, duration: 0.5 });
      gsap.to(nextImg, { opacity: 1, x: 0, scale: 1, duration: 0 });

      setTimeout(() => {
        // Remove active from old image
        activeImg.style.display = "none";
        activeImg.classList.remove("active");

        // Make new image active
        nextImg.style.display = "block";
        nextImg.classList.add("active");
        gsap.from(nextImg, { opacity: 0, x: 300, scale: 0.5, duration: 0.5 });
      }, 500);

      setTimeout(() => {
        // Revert is changing back to false
        isChanging = false;
      }, 1000);
    } else {
      console.log("Next is NOT an image");
    }
  });

  return carouselContainer;
}
