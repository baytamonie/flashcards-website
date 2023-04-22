async function fetchFlashcards() {
    const response = await fetch('/api/flashcards');
    const flashcards = await response.json();
    displayFlashcards(flashcards);
}

function displayFlashcards(flashcards) {
    const container = document.querySelector('.flashcards-container');
    container.innerHTML = '';
    flashcards.forEach((flashcard) => {
        const card = createFlashcardElement(flashcard);
        container.appendChild(card);
    });
}

function createFlashcardElement(flashcard) {
    const card = document.createElement('div');
    card.className = 'flashcard';
    card.onclick = () => flipCard(card);

    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';

    const question = document.createElement('p');
    question.className = 'question';
    question.textContent = flashcard.question;

    const answer = document.createElement('div');
    answer.className = 'answer';

    if (flashcard.type === 'code') {
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.className = 'language-' + flashcard.language; // Prism.js uses language-xxxx format for language classes
        code.textContent = flashcard.answer;
        pre.appendChild(code);
        answer.appendChild(pre);
    } else {
        const p = document.createElement('p');
        p.textContent = flashcard.answer;
        answer.appendChild(p);
    }

    cardContent.appendChild(question);
    cardContent.appendChild(answer);
    card.appendChild(cardContent);

    return card;
}


function flipCard(card) {
    card.classList.toggle('flipped');
}

fetchFlashcards();
