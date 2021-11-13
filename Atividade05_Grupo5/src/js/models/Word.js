import { randomPokemon } from "../services/loadPokemons.js";

export class Word {
  static SCORE_TOKEN = "grupo5-egjkw_score";
  static STATE_TOKEN = "grupo5-egjkw_state";

  constructor() {
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
