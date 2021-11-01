export class Word {
  static ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  constructor() {
    // TODO: load game state from localStorage if any.
  }

  async init() {
    // TODO: fetch word from external resource (JSON/API) and save it
    // as an array of objects { char: string, isGuessed: boolean },
    // see the method `#save` below.
  }

  bindLettersListChange(handler) {
    this.onLettersListChange = handler;
  }

  // This method must be called after every change to the current word state.
  #comit() {
    // TODO: persist current game state/result in localStorage

    this.onLettersListChange();
  }

  #save(fetchedWord) {
    this.literal = fetchedWord;

    this.letters = Array.from(fetchedWord).map((letter) => {
      return {
        char: letter,
        isGuessed: false,
      };
    });
  }
}
