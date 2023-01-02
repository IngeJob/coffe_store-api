const express = require('express')
const cors = require('cors');
const { Server } = require('socket.io')
const http = require('http');
const { getTokenData } = require('./config/jwt.config')

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
      origin: '*'
  }
})

//Settings
app.set('port', process.env.PORT || 8000);
app.use(cors({
  origin: '*'
}))

//Middleware
io.use( async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
  if (!token) {
    console.log('Acceso denegado')
    return next(new Error("Acceso denegado, no existe token"));
  }

  const userData = getTokenData(token)
  console.log(userData.data)
  if (userData.data.role !== 'DELIVER' && userData.data.role !== 'MANAGER' && userData.data.role !== 'USER') {
    console.log('Rol denegado')
    return next(new Error("Acceso denegado"));
  }

  socket.userId = userData.data.userId;
  next();
  } catch (error) {
    next(new Error("Acceso denegado: ", error));
  }
  
});

io.on('connection', (socket) => {
  socket.on('join', data => {
    socket.join(data.email)
      console.log('a user connected to: ', data.email, ' room');
  })
  socket.on('sendmail', function (data) {
    io.sockets.in(data.email).emit('new_msg', { msg: data.message });
    console.log(data.email);
  });
  socket.on('deliveryPosition', (coords, data) => {
    console.log(coords)
    io.sockets.in(data).emit('drt_position', { coords });
    //socket.broadcast.emit('deliveryCoords', coords)
  })
});

io.sockets.in('user1@example.com').emit('new_msg', {msg: 'hello'});


//Server is listening
server.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port')) 
  })
module.exports = io