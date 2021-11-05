export class Word {
  #localToken;
  #tokenExists;
  static ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  static BASE_URL = "https://pokeapi.co/api/v2/pokemon";

  constructor() {
    this.pokemons = null;
    this.#localToken = "PROJETO__GRUPO-LETSCODE";
    this.#tokenExists = localStorage.getItem(this.#localToken);
  }

  async init() {
    this.pokemons = await this.loadPokemons();

    const randomPokemon = this.pokemons[Math.floor(Math.random() * (898 - 1))];

    this.#save(randomPokemon.name);
  }

  async loadPokemons () {
    if (!this.#tokenExists) {
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
      return JSON.parse(this.#tokenExists);
    }
  }

  bindLettersListChange(handler) {
    this.onLettersListChange = handler;
  }

  #commit() {
    this.onLettersListChange(this.letters);
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
