export class GameController {
  constructor(word, view) {
    this.word = word;
    this.view = view;
    this.wrongGuesses = 0;

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

    this.handleLettersListChange(this.word.letters, this.wrongGuesses);
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
      this.wrongGuesses++;
    }

    this.#evaluateGame();
  };

  handleWordGuess = (wordGuess) => {
    if (wordGuess === this.word.literal) {
      this.handleGameWon(this.word.literal);
    } else {
      this.handleGameLost(this.word.literal);
    }
  };

  #evaluateGame = () => {
    // No more guesses remaining? Lost.
    const won = this.wrongGuesses < 6 && this.word.letters.some(letter => !letter.isGuessed);

    this.view.displayResult(won, this.word.literal);

    // if (this.wrongGuesses >= 6) {
    //   this.view.displayResult(this.word.literal);

    //   return;
    // }

    // // Won.
    // if (this.word.letters.some(letter => !letter.isGuessed)) {
    //   this.handleGameWon(this.word.literal);
    // }



    // remove below
    // // // All letters were guessed?
    // // let won = true;
    // // for (let letter of this.word.letters) {
    // //   if (!letter.isGuessed) {
    // //     won = false;
    // //   }
    // // }
  };
}
