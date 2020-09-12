// STEP 3: Create article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-api.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a card for each article in the response.
// This won't be as easy as just iterating over an array though.
//
// Write a function that takes a single article object and returns the following markup:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {author's name}</span>
//   </div>
// </div>
//
// Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
//
// Use your function to create a card for each of the articles, and append each card to the DOM.

// Import Dependencies
import axios from "axios";

// Get the data from API Endpoint
const APIUrl = "https://lambda-times-api.herokuapp.com/articles";
const getArticles = axios.get(APIUrl);

// Create a Promise
getArticles.then((res) => {
  // Get all articles by category
  const allArticlesByCat = res.data.articles;

  // Get the element in which we will insert the card
  const cardContainer = document.querySelector(".cards-container");

  // Do a for loop to cycle through each object property in allArticlesByCat
  for (const articles in allArticlesByCat) {
    // Cycle through each object that has an array of article
    allArticlesByCat[articles].forEach((article) => {
      const newCard = cardCreator(article, articles);
      cardContainer.appendChild(newCard);
    });
  }

  // Console.log the response
  console.log("Cards Data", res);
});

// Create a component to create a card
function cardCreator(card, category) {
  // Create the card's main container
  const cardContainer = document.createElement("div");

  // Add attributes to main container
  cardContainer.classList.add("card", category);

  // Create the card's child elements
  const cardHeadline = document.createElement("div");
  const cardAuthor = document.createElement("div");
  const authorImgContainer = document.createElement("div");
  const authorImg = document.createElement("img");
  const authorName = document.createElement("span");

  // Add attributes to card's children
  cardHeadline.classList.add("headline");
  cardAuthor.classList.add("author");
  authorImgContainer.classList.add("img-container");

  // Add content to the elements
  cardHeadline.textContent = card.headline;
  authorImg.src = card.authorPhoto;
  authorName.textContent = `By ${card.authorName}`;

  // Append children of Author
  authorImgContainer.appendChild(authorImg);
  const authorChildren = [authorImgContainer, authorName];

  authorChildren.forEach((element) => {
    cardAuthor.appendChild(element);
  });

  // Append all children to the card container
  const cardChildren = [cardHeadline, cardAuthor];

  cardChildren.forEach((element) => {
    cardContainer.appendChild(element);
  });

  // Add an event listener to console.log headline when user clicks card
  cardContainer.addEventListener("click", (e) => {
    console.log(card.headline);
  });

  // Return the created card element
  return cardContainer;
}
