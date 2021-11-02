export class Word {
  #localToken;
  #tokenExists;
  static ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  static BASE_URL = "https://pokeapi.co/api/v2/pokemon";

  constructor() {
    this.pokemons = null;
    // TODO: load game state from localStorage if any.
    this.localToken = "PROJETO__GRUPO-LETSCODE";

    this.tokenExists = localStorage.getItem(this.#localToken);
  }

  async init() {
    // TODO: fetch word from external resource (JSON/API) and save it
    // as an array of objects { char: string, isGuessed: boolean },
    // see the method `#save` below.

    this.pokemons = await this.loadPokemons();
  }

  async loadPokemons () {
    if (!this.tokenExists) {
      const poke = [];

      for (let i = 1, len = 898; i < len; i++) {
        poke.push(
          fetch(`${Word.BASE_URL}/${i}`)
            .then(response => response.json())
            .then(pokemon => ({
              id: i, name: pokemon.name
            }))
        );
      }

      const pokemons = await Promise.all(poke);

      localStorage.setItem(this.#localToken, JSON.stringify(pokemons));

      return pokemons;
    } else {
      return JSON.parse(this.tokenExists);
    }
  }

  bindLettersListChange(handler) {
    this.onLettersListChange = handler;
  }

  // This method must be called after every change to the current word state.
  #commit() {
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
