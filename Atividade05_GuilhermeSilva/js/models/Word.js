import { randomPokemon } from "../services/loadPokemons.js";

export class Word {
  static SCORE_TOKEN = "grupo5-egjkw_score";
  static STATE_TOKEN = "grupo5-egjkw_state";
  static POKEMONS_TOKEN = "grupo5-egjkw_pokemons";
  static POKEMONS_API_URL = "https://pokeapi.co/api/v2/pokemon";
  static POKEMONS_MAX_NUMBER = 150;

  constructor() {
    this.pokemons = null;
    this.score = JSON.parse(localStorage.getItem(Word.SCORE_TOKEN) ?? "[]");
  }

  async init(playerName) {
    const gameState = JSON.parse(
      localStorage.getItem(Word.STATE_TOKEN) ?? "null"
    );

    if (gameState) {
      this.playerName = gameState.playerName;
      this.literal = gameState.literal;
      this.wrongGuesses = gameState.wrongGuesses;
      this.letters = gameState.letters;
      this.timerStart = gameState.timerStart;

      return;
    }

    this.playerName = playerName;

    this.literal = await randomPokemon();

    this.wrongGuesses = 0;

    this.letters = Array.from(this.literal).map((letter) => {
      return {
        char: letter,
        isGuessed: false,
      };
    });

    this.timerStart = Date.now();
  }

  // async loadPokemons() {
  //   let pokemons = JSON.parse(
  //     localStorage.getItem(Word.POKEMONS_TOKEN) ?? "[]"
  //   );

  //   if (pokemons.length) {
  //     return pokemons;
  //   }

  //   const pokemonsJobs = [];

  //   for (let i = 1; i < Word.POKEMONS_MAX_NUMBER; ++i) {
  //     pokemonsJobs.push(
  //       fetch(`${Word.POKEMONS_API_URL}/${i}`)
  //         .then((response) => response.json())
  //         .then((pokemon) => ({
  //           id: i,
  //           name: pokemon.name,
  //         }))
  //     );
  //   }

  //   pokemons = await Promise.all(pokemonsJobs);

  //   localStorage.setItem(Word.POKEMONS_TOKEN, JSON.stringify(pokemons));

  //   return pokemons;
  // }

  calculateScore(won) {
    if (!won) {
      return this.score;
    }

    this.wordScore = this.literal.length - this.wrongGuesses;

    this.score.push({
      playerName: this.playerName,
      wordScore: this.wordScore,
      wordLiteral: this.literal,
    });

    this.score.sort((a, b) => {
      return b.wordScore - a.wordScore;
    });

    if (this.score.length > 10) {
      this.score.splice(10, 1);
    }

    this.saveScore();

    return this.score;
  }

  saveScore() {
    localStorage.setItem(Word.SCORE_TOKEN, JSON.stringify(this.score));
  }

  saveState() {
    localStorage.setItem(
      Word.STATE_TOKEN,
      JSON.stringify({
        literal: this.literal,
        wrongGuesses: this.wrongGuesses,
        letters: this.letters,
        timerStart: this.timerStart,
        playerName: this.playerName,
      })
    );
  }

  clearState() {
    localStorage.removeItem(Word.STATE_TOKEN);
  }
}
