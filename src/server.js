 const app = require('./config/express');
 const debug = require('debug')('node-sequelize:server');
 const http = require('http');
 const models = require('./models');
 
 models.sequelize.sync()
 
 const port = normalizePort(process.env.PORT || '8000');
 app.set('port', port);
 
const server = http.createServer(app);
 
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
 

function normalizePort(val) {
   const port = parseInt(val, 10);
 
   if (isNaN(port)) {
     return val;
   }
 
   if (port >= 0) {
     return port;
   }
 
   return false;
 }
 
 function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }
 
    const bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;
 
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
 }
 
 /**
  * Event listener for HTTP server "listening" event.
  */
 async function onListening() {
   var addr = server.address();
   var bind = typeof addr === 'string'
     ? 'pipe ' + addr
     : 'port ' + addr.port;
   debug('Listening on ' + bind);
 }