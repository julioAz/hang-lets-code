export class GameController {
  constructor(word, view) {
    this.word = word;
    this.view = view;

    this.view.bindPlay(this.handlePlay);
    this.view.bindLetterGuess(this.handleLetterGuess);
    this.view.bindWordGuess(this.handleWordGuess);

    this.view.displayHighScore(this.word.score);
  }

  handleLettersListChange = (letters, wrongGuesses) => {
    this.view.displayGame(letters, wrongGuesses);
    this.word.saveState();
  };

  handlePlay = async (playerName) => {
    await this.word.init(playerName);

    this.handleLettersListChange(this.word.letters, this.word.wrongGuesses);
  };

  handleLetterGuess = (letterGuess) => {
    let guessed = false;
    for (let letter of this.word.letters) {
      if (letter.char === letterGuess) {
        guessed = true;
        letter.isGuessed = true;
      }
    }

    if (!guessed) {
      this.word.wrongGuesses++;
    }

    this.handleLettersListChange(this.word.letters, this.word.wrongGuesses);

    this.#evaluateGame();
  };

  handleWordGuess = (wordGuess) => {
    this.handleGameResult(wordGuess === this.word.literal);
  };

  handleGameResult = (won) => {
    const score = this.word.calculateScore(won);
    this.view.displayResult(won, this.word.literal, score);
    this.word.clearState();
  };

  #evaluateGame = () => {
    if (this.word.wrongGuesses >= 5) {
      this.handleGameResult(false);
    }

    if (this.word.letters.every((letter) => letter.isGuessed)) {
      this.handleGameResult(true);
    }
  };
}
