import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

let gameAssets = {};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basePath  = path.join(__dirname, '../../assets');
const readFileAsync = (filename) => {
  return new Promise((resolve, reject) => {
  fs.readFile(path.join(basePath, filename), 'utf8', (err, data) => {
  if (err) {
  reject(err);
  return;
  }
  resolve(JSON.parse(data));
  })
})
}
//Promise.all()
export const loadGameAssets = async () => {
  try {
    // 아래 파일 3개의 json 이 없어서 에러가 발생하네요. 파일 경로 일치 잘 시키고 파일 만들어주시면 될 것 같아요
    // 다시 강의 보고 따라해보시면 될 것 같아요. 
    // 빨간 줄이 날 때는 바로 해결을 해야해요
    // 저는 일정이 있어서 여기까지 하도록 하겠습니다!
    const [stages, items, itemUnlocks] = await Promise.all([
      readFileAsync('stage.json'),
      readFileAsync('item.json'),
      readFileAsync('item_unlock.json'),
      ]);
    gameAssets = { stages, items, itemUnlocks };
    return gameAssets;
  } catch(e) {
    throw new Error('Failed to load game assets: '+ e.message)
  }
}

export const getGameAssets = () => {
  return gameAssets;
  };