

register_sockets = []

const start = function (http) {

    var io = require('socket.io').listen(http);

   // io.set('origins', 'http://localhost:4200');
    //io.set('origins', '*localhost:4200');
    console.log("starting real time...");
    // io.origins((origin, callback) => {
    //     console.log(origin);
    //     if (origin !== 'http://localhost:4200') {
    //         return callback('origin not allowed', false);
    //     }
    //     callback(null, true);
    //   });
    /*
socket.io
*/

    io.of('/user').on('connection', function (socket) {
        console.log("connection");
        register_sockets.push(socket);
        //send stream to client/browser

  

        socket.on('disconnect', function () {
            console.log('disconnect')
            //clearInterval(timer);
        })

    });

    /* socket.io end*/


}


const emit = function(data){

    for (let index = 0; index < register_sockets.length; index++) {
        
        const socket = register_sockets[index];
        socket.emit('message', data)
        
        
    }


}


module.exports.realtimestart = start; 
module.exports.realtimeemit = emit;