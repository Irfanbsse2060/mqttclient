/**
 * Created by Irfan on 08-May-17.
 */

module.exports = function(io) {
    var app = require('express');
    var router = app.Router();

    /* GET home page. */
    router.get('/', function(req, res, next) {


        res.render('home', { title: 'Home Automation System' });
    });

    io.on('connection', function(socket) {
        console.log('A user connected in routes');
        console.log('socket ='+socket.id);

        socket.on('chat', function(msg){
            console.log('message: ' + msg);
        });

        socket.on('/test/light', function(msg){
            console.log('light: ' + msg);
            io.sockets.emit('light',msg);
        });

        socket.on('/test/tsi', function(msg){
            console.log('temp: ' + msg);
            io.sockets.emit('temp',msg);

        });

        socket.on('relay', function(msg){
            console.log('relay topic value: ' + msg);
            io.sockets.emit('relay',msg);

        });

        socket.emit('echo','hi back');
    });

    io.on('disconnect', function(){
        console.log('user disconnected');
    });

    return router;
}


