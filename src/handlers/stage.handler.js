


import { getStage, setStage } from '../models/stage.model.js';
import { getGameAssets } from '../init/assets.js';

export const moveStageHandler = (userId, payload) => {

  let currentStages = getStage(userId);
  if (!currentStages.length) {
    return { status: 'fail', message: "No stages found for user"}
  }

  currentStages.sort((a, b) => a.id = b.id);
  const currentStage = currentStages[currentStages.length - 1].id;

  if(currentStage.id !== payload.currentStage) {
    return { status: "fail", message: "Current Stage mismatch"}
  }

  const serverTime = Date.now();
  const elapsedTime = (serverTime - currentStage.timestamp) / 1000

  if (elapsedTime < 10 || elapsedTime > 10.5) {
    return { status: 'fail', message: 'Invalid elapsed time' };
  }

  const { stages} = getGameAssets();
  if (!stages.data.some((stage) => stage.id === payload.targetSage)) {
    return { status: 'fail', message: 'Target staage not found'};
  }

  setStage(userId, payload, targetStage, serverTime);
  return { status: "success" };
};