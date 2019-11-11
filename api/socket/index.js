import io from 'socket.io-client';
//import { MESSAGE, ERROR, JOIN, LEAVE } from '../../contants/socketEventTypes';
import getEnvVars from '../../environment';
const {apiUrl} = getEnvVars();

const socket = io.connect(apiUrl);

export const connectSocketT = () => {
  io.connect(apiUrl);
}
export const sendMessage = data => {
  socket.emit('chat message', data);
};

export const reciveMessage = msg => {
  socket.on('chat message', msg);
  return msg
}


export const example = () =>{
  const socket = io.connect(apiUrl);

  socket.on('chat message', msg => {

  });

  socket.on('ERROR', function(err) {
    console.log(err);
  });

  const receiveNewMessage = cb => {
    socket.on('MESSAGE', cb);
  };

  const joinRoom = data => {
    socket.emit("JOIN", data);
  };
  

  // const sendMessage = data => {
  //   socket.emit('MESSAGE', data);
  // };
  const sendMessage = data => {
    socket.emit('chat message', data);
  };

  const leaveRoom = roomId => {
    socket.removeListener('MESSAGE');
    socket.removeListener('ERROR');
    socket.emit('LEAVE', roomId);
  };

  return {
    joinRoom,
    sendMessage,
    receiveNewMessage,
    leaveRoom
  };
}