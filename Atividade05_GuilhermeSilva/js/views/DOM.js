export class DOM {
  constructor() {
    this.btnPlay = document.querySelector("#btnPlay");
    this.btnPlayAgain = document.querySelector("#btnPlayAgain");

    this.frameStart = document.querySelector(".frame--start");
    this.frameGame = document.querySelector(".frame--game");
    this.frameEnd = document.querySelector(".frame--end");
    this.frameEndResult = document.querySelector("#frameEndResult");
    this.frameEndCorrectWord = document.querySelector(".frame__correctWord");

    this.gameWord = document.querySelector(".game__word");
    this.gameKeyboard = document.querySelector(".game__keyboard");
    this.gameGuesses = document.querySelector("#gameGuesses");

    this.createKeyboard();
  }

  bindPlay(handler) {
    [this.btnPlay, this.btnPlayAgain].forEach((button) => {
      button.addEventListener("click", async (event) => {
        event.preventDefault();

        if (button.id === 'btnPlayAgain') {
          this.#resetGame();
        }

        await handler();
      });
    });
  }

  bindLetterGuess(handler) {
    // TODO: addEventListener to listen for letter guesses
    // handler(guessedLetter);
  }

  bindWordGuess(handler) {
    // TODO: addEventListener to listen for word guesses
    // handler(guessedWord);
  }

  createKeyboard() {
    const letras = "abcdefghijklmnopqrstuvwxyz".split("");

    letras.forEach(letra => {
      let botao = document.createElement("button");
      botao.setAttribute('class', 'btn btn-dark')
      let letraTexto = document.createTextNode(letra);
      
      botao.appendChild(letraTexto);
      botao.setAttribute('id', letras);

      this.gameKeyboard.appendChild(botao);
    });
  }

  displayFrame(frame) {
    switch (frame) {
      case "start":
        this.frameStart.style.display = "flex";
        this.frameGame.style.display = "none";
        this.frameEnd.style.display = "none";
        break;
      case "end":
        this.frameStart.style.display = "none";
        this.frameGame.style.display = "none";
        this.frameEnd.style.display = "flex";
        break;
      case "game":
        this.frameStart.style.display = "none";
        this.frameGame.style.display = "flex";
        this.frameEnd.style.display = "none";
        break;
    }
  }

  displayWord(letters) {
    console.log(letters);

    this.gameWord.innerHTML = letters.map((letter) => {
        return `
          <li class="game__letter">${letter.isGuessed ? letter.char : ""}</li>
        `;
      }, "")
      .join('');
  }

  displayHangman(wrongGuesses) {
    // TODO: display the gallows pole and hangman parts based 
    // on the number of wrong guesses, `wrongGuesses`
  }

  displayGame(letters, wrongGuesses) {
    this.displayFrame("game");

    this.displayWord(letters);

    this.displayHangman(wrongGuesses);
  }

  displayResult(won, correctWordLiteral) {
    this.displayFrame("end");

    this.frameEndResult.innerHTML = won ? "YOU WON" : "YOU LOSE";
    this.frameEndResult.classList.add(`game__result--${won ? 'won' : 'lost'}`);
    this.frameEndCorrectWord.innerHTML = correctWordLiteral;
  }

  #resetGame () {
    this.frameEndResult.classList.remove('game__result--won', 'game__result--lost');
  }
}
