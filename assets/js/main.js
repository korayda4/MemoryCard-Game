
    let cards = [];
    let score = 0;

    const cardValues = ['😀', '😇', '🤬', '👨🏼‍💻', '👻', '🤯', '🤭', '😷', '👽', '🙂', '👿', '🥶'];
    const allCardValues = cardValues.concat(cardValues);

    function restartGame() {
      cards.forEach(card => card.removeEventListener('click', flipCard));
      cards = [];
      score = 0;
      updateScore();
      generateBoard();
    }

    function updateScore() {
      const scoreElement = document.querySelector('#score');
      scoreElement.textContent = `Skor: ${score}`;
    }

    function flipCard() {
      if (this.classList.contains('flipped') || this.classList.contains('matched')) return;
      this.classList.add('flipped');

      if (cards.length > 1) {
        const [card1, card2] = cards;
        const value1 = card1.textContent;
        const value2 = card2.textContent;

        if (value1 === value2) {
          cards.forEach(card => card.classList.add('matched'));
          score += 10;
        } else {
          cards.forEach(card => card.classList.remove('flipped'));
        }
        cards = [];
        updateScore();

      } else {
        cards.push(this);
        if (cards.length > 1) {
          const [card1, card2] = cards;
          const value1 = card1.textContent;
          const value2 = card2.textContent;

          if (value1 === value2) {
            cards.forEach(card => card.classList.add('matched'));
            score += 15;
          } else {
            score -= 5;
            cards.forEach(card => card.classList.remove('flipped'));
          }
          cards = [];
          updateScore();
        }
      }
    }

    function generateBoard() {
      const gameBoard = document.querySelector('#game-board');
      gameBoard.innerHTML = '';

      const shuffledCardValues = [...allCardValues];
      for (let i = shuffledCardValues.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCardValues[i], shuffledCardValues[j]] = [shuffledCardValues[j], shuffledCardValues[i]];
      }

      shuffledCardValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.textContent = value;
        gameBoard.appendChild(card);
      });

      const allCards = document.querySelectorAll('.card');
      allCards.forEach(card => {
        card.addEventListener('click', flipCard);
      });
    }

                                                       
    generateBoard();