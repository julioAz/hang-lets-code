import { GameController } from "./controllers/GameController.js";
import { Word } from "./models/Word.js";
import { DOM } from "./views/DOM.js";

import { loadPokemons } from "./services/loadPokemons.js";

async function main() {
  const game = new GameController(new Word(), new DOM());

  await loadPokemons();

  const { btnPlay, btnPlayAgain } = game.view;

  [btnPlay, btnPlayAgain].forEach((el) => (el.disabled = 0));

  if (localStorage.getItem("gameState")) {
    btnPlay.click();
  }
}

main();
