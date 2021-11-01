import { GameController } from "./controllers/GameController.js";
import { Word } from "./models/Word.js";
import { DOM } from "./views/DOM.js";

new GameController(new Word(), new DOM());
