export class GameController {
  constructor(word, view) {
    this.word = word;
    this.view = view;

    this.view.bindPlay(this.handlePlay);
    this.view.bindLetterGuess(this.handleLetterGuess);
    this.view.bindWordGuess(this.handleWordGuess);
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
    this.view.displayResult(wordGuess === this.word.literal, this.word.literal);
  };

  handleGameWon = () => {
    this.view.displayResult(true, this.word.literal);
    this.word.calculateScore();
    this.word.clearState();
  }

  handleGameLost = () => {
    this.view.displayResult(false, this.word.literal);
    this.word.clearState();
  }

  #evaluateGame = () => {
    
    if (this.word.wrongGuesses >= 5) {
      this.handleGameLost();
    }

    if (this.word.letters.every((letter) => letter.isGuessed)) {
      this.handleGameWon();
    }
  };
}
