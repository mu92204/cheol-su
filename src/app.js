import express from 'express';
import { createServer } from 'http';
import initSocket from './init/socket.js';
import {loadGameAssets} from './init/assets.js'
// : 이렇게 강의 화면에 나온 것은 타입 추론이라서 코드가 아니에요. 코드로 치시면 안돼요
// 이제 에러는 다 없어졌어요. 실행을 해볼게요
const app = express();
const server = createServer(app);

// 빨간줄이 나올 때는 해결하고 넘어가야합니다! 계속 타이핑 진행하지 마세요!
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
initSocket(server);
app.get('/', (req , res) => {
  // res.send(body: "Hello World!");
  res.send({body: "Hello World!"});
})

server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    const assets = await loadGameAssets();
    console.log(assets);
    console.log('Assets loaded successfully');
  } catch(e) {
    console.error('Failed to load game assets: ', e);
  }
});