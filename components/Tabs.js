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
    console.log(res);
  })
  .catch((error) => console.log(error));

// Component for creating tab elements
function tabCreator(tab) {
  // Create the main tab container
  const tabContainer = document.createElement("div");

  // Add attributes to the main container
  tabContainer.classList.add("tab");

  // Add the content for the tab
  tabContainer.textContent = tab;

  // Return the tab element
  return tabContainer;
}
