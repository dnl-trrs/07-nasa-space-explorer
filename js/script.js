// Find our date picker inputs on the page
const startInput = document.getElementById('startDate');
const endInput = document.getElementById('endDate');

// Call the setupDateInputs function from dateRange.js
// This sets up the date pickers to:
// - Default to a range of 9 days (from 9 days ago to today)
// - Restrict dates to NASA's image archive (starting from 1995)

setupDateInputs(startInput, endInput);

// Your NASA API key
const API_KEY = 'YJsZJTT8iAbJjghbU0JwdZJuJyI4EbV2O3u3xAgm';

// Select gallery container, get images button, and loading message element
const galleryContainer = document.getElementById('gallery');
const getImagesButton = document.getElementById('getImages');
const loadingMessage = document.getElementById('loadingMessage');

// Function to fetch NASA images for a date range
async function fetchNASAImages(startDate, endDate) {
  const url = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;

  // Show loading message
  loadingMessage.textContent = '🚀 Loading space photos...';

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Remove loading message
    loadingMessage.textContent = '';

    displayGallery(data);
  } catch (error) {
    console.error('Error fetching NASA images:', error);
    loadingMessage.textContent = 'Failed to load images. Please try again.';
  }
}

// Function to display images in the gallery
function displayGallery(images) {
  // Clear previous gallery items
  galleryContainer.innerHTML = '';

  images.forEach((image) => {
    const item = document.createElement('div');
    item.classList.add('gallery-item');

    item.innerHTML = `
      <img src="${image.url}" alt="${image.title}" />
      <h3>${image.title}</h3>
      <p>${image.date}</p>
    `;

    // Event listener to open modal (to be implemented next)
    item.addEventListener('click', () => openModal(image));

    galleryContainer.appendChild(item);
  });
}

// Placeholder modal function
function openModal(image) {
  // TODO: Build modal view with image.url, image.title, image.date, image.explanation
  alert(`Modal view placeholder for:\n${image.title}`);
}

// Event listener for Get Images button
getImagesButton.addEventListener('click', () => {
  const startDate = startInput.value;
  const endDate = endInput.value;
  fetchNASAImages(startDate, endDate);
});
