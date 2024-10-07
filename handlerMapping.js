import { moveStageHandler } from './stage.handler.js';
import { gameEnd, gameStart} from './game.handler.js';

const handlerMappings : {...} = {
2: gameStart,
3: game.End,
11:moveStageHandler,
};

export default handlerMappings;