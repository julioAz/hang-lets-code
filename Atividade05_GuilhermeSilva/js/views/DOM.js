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
    // TODO: determine game `level`
    // const level = ...;

    [this.btnPlay, this.btnPlayAgain].forEach((button) => {
      button.addEventListener("click", async (event) => {
        event.preventDefault();

        if (button.id === 'btnPlayAgain') {
          this.#resetGame();
        }

        // TODO: add `level` parameter;
        // handler(level);
        await handler();
      });
    });
  }

  bindLetterGuess(handler) {
    // TODO: addEventListener to listen for letter guesses
  }

  bindWordGuess(handler) {
    // TODO: addEventListener to listen for word guesses
  }

  createKeyboard () {
    const letras = "abcdefghijklmnopqrstuvwxyz".split("");

    letras.forEach(letra => {
      let botao = document.createElement("button");
      botao.setAttribute('class', 'btn btn-dark')
      let letra = document.createTextNode(letras);
      
      botao.appendChild(letra);
      botao.setAttribute('id', letras);

      this.gameKeyboard.appendChild(botao);
    });
  }

  displayFrame (frame) {
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

  displayWord (letters) {
    this.gameWord.innerHTML = letters
      .reduce((acc, cur) => {
        return `
          <li class="game__letter"> ${cur.isGuessed ? cur.char : ""} </li>
        `;
      }, "")
      .join('');
  }

  displayHangman () {
    // actions
  }

  /**
   * Display the game frame, `gameFrame`, with the current game state.
   *
   * @param {Array<{ char: string, isGuessed: boolean}>} letters array of letters composing the game `word`
   * @param {number} wrongGuesses number of wrong guesses
   */
  displayGame(letters, wrongGuesses) {
    this.displayFrame("game");

    this.displayWord(letters);

    this.displayHangman(wrongGuesses);
  }

  /**
   * Display the final frame, `endFrame`, with the game result.
   *
   * @param {boolean} won `true` if game won, `false` otherwise
   * @param {string} correctWordLiteral the correct word
   */
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
