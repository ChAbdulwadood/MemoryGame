let clickedCard = null;
let preventClick = false;
let combosFound = 0;

function onCardClicked(event) {
    const targetCard = event.currentTarget;

    // Check if interaction should be prevented
    if (preventClick || targetCard === clickedCard || targetCard.classList.contains('done')) {
        return;
    }

    // Reveal the clicked card
    targetCard.classList.remove('color-hidden');
    targetCard.classList.add('done');

    // Check if this is the first card clicked
    if (!clickedCard) {
        clickedCard = targetCard;
    } else {
        // If another card is already clicked, compare colors
        if (clickedCard.getAttribute('data-color') !== targetCard.getAttribute('data-color')) {
            // Colors do not match, hide both cards after a delay
            preventClick = true;
            setTimeout(() => {
                clickedCard.classList.remove('done');
                clickedCard.classList.add('color-hidden');
                targetCard.classList.remove('done');
                targetCard.classList.add('color-hidden');
                clickedCard = null;
                preventClick = false;
            }, 500);
        } else {
            // Cards match, increase the combo count
            combosFound++;
            clickedCard = null;

            // Check for winning condition
            if (combosFound === 8) {
                alert("YOU WIN");
            }
        }
    }
}

// To use this script, attach onCardClicked as an event listener to your card elements
// Example: cardElement.addEventListener('click', onCardClicked);
