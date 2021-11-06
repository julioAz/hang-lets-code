export class GameController {
  constructor(word, view) {
    this.word = word;
    this.view = view;

    this.word.bindLettersListChange(this.handleLettersListChange);

    this.view.bindPlay(this.handlePlay);
    this.view.bindLetterGuess(this.handleLetterGuess);
    this.view.bindWordGuess(this.handleWordGuess);
  }

  handleLettersListChange = (letters, wrongGuesses) => {
    this.view.displayGame(letters, wrongGuesses);
  };

  handlePlay = async (level) => {
    await this.word.init(level);

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
    //this.handleLettersListChange(this.word.letters, this.word.wrongGuesses);

    this.view.displayResult(wordGuess === this.word.literal, this.word.literal);
  };

  #evaluateGame = () => {
    // No more guesses remaining? Lost.
    if (this.word.wrongGuesses >= 5) {
      this.view.displayResult(false, this.word.literal);
    }

    // All letters were guessed? Won.
    if (this.word.letters.every((letter) => letter.isGuessed)) {
      this.view.displayResult(true, this.word.literal);
    }
  };
}
