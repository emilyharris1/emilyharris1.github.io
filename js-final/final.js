let intervalIds = [];

let restartButton = document.getElementById('restartButton');
let direction = 1; // Initial direction: 1 for moving right, -1 for moving left
let position = 0; // Initial position of the button
const speed = 5;

// Function to display numbers in multiple displays
function displayNumbers() {
  const numberDisplays = document.getElementById('numberDisplays');

  // Loop to create 10 number displays
  for (let i = 0; i < 10; i++) {
    const displayId = `display${i}`;
    const displayContainer = document.createElement('div');
    
    displayContainer.innerHTML = `
      <p id="${displayId}">${Math.floor(Math.random() * 10)}</p>
      <button class="stopButton" onclick="stopNumber(${i})">Stop</button>
    `;
    numberDisplays.appendChild(displayContainer);

    // Generate a random starting number for each display
    let number = Math.floor(Math.random() * 10); // Start from a random number between 0 and 9
    const display = document.getElementById(displayId);
    
    const intervalId = setInterval(() => {
      display.textContent = number;
      number = (number + 1) % 10;
    }, 100); // 100 milliseconds
    intervalIds.push(intervalId);
  }
}

// Function to stop a specific number display
function stopNumber(index) {
  clearInterval(intervalIds[index]); // Clear the interval for the specified display
}

// Function to restart all number displays
function restart() {
  intervalIds.forEach((intervalId) => {
    clearInterval(intervalId); // Clear all intervals for number displays
  });
  intervalIds = []; // Reset the intervalIds array
  document.getElementById('numberDisplays').innerHTML = ''; // Clear the number displays
  displayNumbers(); // Re-display the number displays
}

function moveRestartButton() {
    const windowWidth = window.innerWidth;
    const buttonWidth = restartButton.offsetWidth;
  
    const moveInterval = setInterval(() => {
      position += direction * speed;
  
      // Button position
      restartButton.style.left = position + 'px';
  
      // Check if the button has reached the edges of screen
      if (position + buttonWidth >= windowWidth || position <= 0) {
        // Change direction when edge hit
        direction *= -1;
      }
    }, 10);
  }
  
  moveRestartButton();

displayNumbers(); // Initially display  numbers
