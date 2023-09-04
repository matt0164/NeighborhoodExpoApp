//image_array.js file to import images and create randome function

// Import your image files with corrected relative paths
import backgroundImage1 from '../assets/pexels-david-mcbee-1486785.jpg';
// Import other background images as needed

// Create an array with the imported image objects
const backgroundImages = [
  require('../assets/pexels-david-mcbee-1486785.jpg'),
  // Add other images using 'require' as needed
];

export function getRandomBackgroundImage() {
  const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  return backgroundImages[randomIndex];
}
