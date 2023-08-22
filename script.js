const cards = document.querySelectorAll('.card');
const emptyCells = document.querySelectorAll('.empty-cell');
const checkButton = document.querySelector('.check-button');

let cardValues = [...cards].map(card => card.textContent);
shuffleArray(cardValues);

cards.forEach((card, index) => {
  card.textContent = cardValues[index];
  card.addEventListener('click', () => {
    if (!card.classList.contains('placed')) {
      let cellToPlace = Array.from(emptyCells).find(cell => !cell.classList.contains('occupied'));
      if (cellToPlace) {
        cellToPlace.textContent = card.textContent;
        card.classList.add('placed');
        cellToPlace.classList.add('occupied');
      }
    }
  });
});

checkButton.addEventListener('click', () => {
  const placedCards = Array.from(emptyCells).map(cell => cell.textContent).join('');
  const joinedCardValues = cardValues.join('');

  if (placedCards === "ВИШНЯ") {
   // Correct guess
   document.querySelector('.top-section img').style.opacity = '0.5'; // Reduce image opacity
   document.querySelector('.row:first-child').style.backgroundColor = '#28a745'; // Set background color of the first row to green
   checkButton.textContent = 'Следующее'; // Change button text

   // Clear any previous messages
   document.querySelector('.win-message')?.remove();
   document.querySelector('.lose-message')?.remove();
  } else {
    // Incorrect guess
    document.querySelector('.top-section img').style.opacity = '0.5';
    cards.forEach(card => card.classList.add('incorrect'));
    checkButton.textContent = 'Попробовать снова'; // Change button text
    checkButton.addEventListener('click', () => {
      location.reload(); // Reload the page on button click
      
  });
}
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


