export class Word {
  #localToken;
  #tokenExists;
  static ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  static BASE_URL = "https://pokeapi.co/api/v2/pokemon";
  static maxPokemons = 150 ;

  constructor() {
    this.pokemons = null;
    this.#localToken = "PROJETO__GRUPO-LETSCODE";
    this.#tokenExists = localStorage.getItem(this.#localToken);
  }

  async init(playerName) {

    const gameState = JSON.parse(localStorage.getItem("gameState") ?? "null");
    
    if(gameState){
      this.playerName = gameState.playerName;
      this.literal = gameState.literal;
      this.wrongGuesses = gameState.wrongGuesses;
      this.letters = gameState.letters;
      this.timerStart = gameState.timerStart;

      return
    }

    this.pokemons = JSON.parse(localStorage.getItem(this.#localToken));
    const randomPokemon = this.pokemons[Math.floor(Math.random() * (Word.maxPokemons - 1))].name.toUpperCase();

    this.playerName = playerName;

    this.literal = randomPokemon;

    this.wrongGuesses = 0;

    this.letters = Array.from(randomPokemon).map((letter) => {
      return {
        char: letter,
        isGuessed: false,
      };
    });

    this.timerStart = Date.now();

  }

  async loadPokemons () {
    if (!this.#tokenExists) {
      const poke = [];

      for (let i = 1, len = Word.maxPokemons; i < len; i++) {
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

  calculateScore() {
   this.score = (this.literal.length - this.wrongGuesses) * (Date.now() - this.timerStart) / 1000; 
  }

  printScore() {
    this.calculateScore();
    this.highScoreList.innerHTML = `<li class="game__highScore--list--item">${this.playerName} - ${this.score}</li>`;
  }

  saveState() {
    localStorage.setItem("gameState", JSON.stringify({
      literal: this.literal,
      wrongGuesses: this.wrongGuesses,
      letters: this.letters,
      timerStart: this.timerStart, 
      playerName: this.playerName
    }));
  }

  clearState(){
    localStorage.removeItem("gameState");
  }

}
