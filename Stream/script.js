// Define the API endpoint
const apiEndpoint = "https://sheetdb.io/api/v1/6x3oefyh8ltuz";

// Set the number of items to load at once
let itemsPerLoad = 20;

// Initialize the starting index and data array
var startIndex = 0;
let data = [];

// Function to load data from the API
async function loadData() {
  const response = await fetch(`${apiEndpoint}?limit=${itemsPerLoad}&offset=${startIndex}`);
  const jsonData = await response.json();
  data = [...jsonData]; // Append new data to existing data
  startIndex += itemsPerLoad;
}

// Function to render the movie data as HTML elements
function renderData() {
    const movieList = document.querySelector(".container");
    data.forEach(movie => {
      const movieDiv = document.createElement("div");
      movieDiv.classList.add("item");
      movieDiv.innerHTML = `
      <a href="${movie.link}" target="_blank">
      <img src="${movie.poster}" alt="${movie.name} poster">
    <p>${movie.name}</p>
  </div>
      `;
      movieList.appendChild(movieDiv);
  });
}

// Load the first set of data and render it
loadData().then(() => renderData());

// Add an event listener to the "Load More" button
const loadMoreButton = document.querySelector("#loadMoreButton");
loadMoreButton.addEventListener("click", () => {
  // Load more data and render it
  loadData().then(() => renderData());
});


