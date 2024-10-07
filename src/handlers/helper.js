import { removeUser, getUser } from '../models/user.model.js';
import { v4 as uuidv4 } from'uuid';
import handlerMappings from './handler Mapping.js';
import { getGameAssets } from '../init/assets.js';

export const handleDisconnect = (socket, uuid) => {
  removeUser(socket.id);
  console.log(`User disconnected: ${socket.id}`);
  console.log('Current users: ', getUser());
}

export const handleConnection = (socket, userUUID) => {
  console.log(`New user connected: ${userUUID} with socket ID ${socket.id}`);
  console.log('Current users:', getUser());
  
  socket.emit('connection', { uuid: userUUID });
  };

export const handlerEvent = (io, socket, data) => {
  if (!CLIENT_VERSION.includes(data,clientVersion)) {
    socket.emit('response', { status: 'fail', message: "Client version mismatch" });
    return;
  }

  const handler = handlerMappings[data.handlerId]
  if (handler) {
    socket.emit('response', { status: 'fail', message: "Handler not found"})
    return;
  }

  const response = handler(data.userId, data.payload);

  if (response.broadcast) {
   io.emit('response', 'broadcast');
   return;
  }

  socket.emit('response', response);
}