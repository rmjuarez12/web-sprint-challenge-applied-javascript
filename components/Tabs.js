// STEP 2: Create tabs
// -----------------------
// Using axios send a GET request to the address: https://lambda-times-api.herokuapp.com/topics
// Once the data is resolved use console logs or breakpoints to review the structure.
// Iterate over the topics creating a new tab for each topic, and appending it to the DOM
// under the div.topics element.
//
//  Each tab should look like this:
//    <div class="tab">topic here</div>
//
// NOTE: you do _not_ need to install axios as it's included in the HTML via script element

// Import Dependencies
import axios from "axios";

// Get the data from API Endpoint
const APIUrl = "https://lambda-times-api.herokuapp.com/topics";
const getTabs = axios.get(APIUrl);

// Create a Promise
getTabs
  .then((res) => {
    // Get the tabs from the object
    const allTabs = res.data.topics;

    // Get the DOM element that we will append the tabs to
    const tabDomElement = document.querySelector("div.topics");

    // Use the tabCreator component to append each tab
    allTabs.forEach((tab) => {
      const newTab = tabCreator(tab);

      // Add each tab to the DOM
      tabDomElement.appendChild(newTab);
    });

    // console.log to ensure we are getting data;
    console.log("Tabs Data", res);
  })
  .catch((error) => {
    // Get the element in which we will insert the card
    const errorElement = document.querySelector(".errors-container");
    const errorContainer = document.createElement("p");

    // Add ther error content
    errorContainer.textContent = `${error} for tabs request`;

    // Append error
    errorElement.appendChild(errorContainer);
  });

// Component for creating tab elements
function tabCreator(tab) {
  // Create the main tab container
  const tabContainer = document.createElement("div");

  // Add attributes to the main container
  tabContainer.classList.add("tab");

  // Add the content for the tab
  tabContainer.textContent = tab;

  // Add event listener when a tab is clicked
  tabContainer.addEventListener("click", (e) => {
    // Get all tabs
    const allTabs = document.querySelectorAll(".tabs .tab");

    // First, ensure to remove the active class from all tabs
    allTabs.forEach((element) => {
      element.classList.remove("active-tab");
    });

    // Then, add the active class to the element clicked
    tabContainer.classList.add("active-tab");

    // Get all cards
    const allCards = document.querySelectorAll(".cards-container .card");

    // if a certain card contains a the class of the clicked tab, keep it. Otherwise, hide it
    allCards.forEach((element) => {
      // For node.js, remove the js
      let tabName = tab;

      if (tabName.includes(".")) {
        tabName = tabName.substr(0, tab.lastIndexOf("."));
      }

      if (element.classList.contains(tabName)) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    });
  });

  // Return the tab element
  return tabContainer;
}
