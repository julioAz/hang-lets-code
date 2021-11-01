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
  }

  bindPlay(handler) {
    // TODO: determine game `level`
    // const level = ...;

    [this.btnPlay, this.btnPlayAgain].forEach((button) => {
      button.addEventListener("click", async (event) => {
        event.preventDefault();

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

  /**
   * Display the game frame, `gameFrame`, with the current game state.
   *
   * @param {Array<{ char: string, isGuessed: boolean}>} letters array of letters composing the game `word`
   * @param {number} wrongGuesses number of wrong guesses
   */
  displayGame(letters, wrongGuesses) {
    // TODO
  }

  /**
   * Display the final frame, `endFrame`, with the game result.
   *
   * @param {boolean} won `true` if game won, `false` otherwise
   * @param {string} correctWordLiteral the correct word
   */
  displayResult(won, correctWordLiteral) {
    // TODO
  }
}
