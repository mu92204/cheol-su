import {addUser} from '../models/user.model.js';
import { v4 as uuidv4 } from'uuid';
import { handleConnection, handleDisconnect } from './helper.js';

const registerHandler = (io) => {
io.on('connection', (socket) => {



  const userUUID = uuidv4();
  addUser({uuid: userUUID, socketId: socket.id});

  handleConnection(socket, userUUID);

  socket.on('event', (data) =>handlerEvent(io, socket, data));
  socket.on('disconnect', (socket) => handleDisconnect(socket, userUUEd));
})
}

export default registerHandler

