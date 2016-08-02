var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var clients = [];
var PORT = 8088;

app.use('/public', express.static('public'));
app.use('/admin', express.static('admin'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.info('Client connesso... (id=' + socket.id + ').');
    clients.push(socket);
    
//Inizio logica
/*    var parole = ""
    clients.forEach( function (entry) {
        entry.on('client', function (data) {
            console.log(data);
            parole = data;
        });
//        parole =1;
        entry.emit('server', parole);

    });*/
    socket.on('client', function(data){
        console.log(data)
        clients.forEach(function(cli) {
            cli.emit('server', data)
        })
    });
//Fine logica    

    //Disconnessione
    socket.on('disconnect', function () {
        var index = clients.indexOf(socket);
        if (index != -1) {
            clients.splice(index, 1);
            console.info('Client disconnesso (id=' + socket.id + ').');
        }
    });
});

http.listen(8088);
