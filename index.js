const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);

const socketIo = require('socket.io');

const io = socketIo.listen(server);

server.listen(process.env.PORT || 3000, () => {
    console.log('running')
})

app.use(express.static(__dirname + '/public'))

const historic = [];

io.on('connection', (socket) => {
    console.log(`${socket.id} connected`)

    historic.forEach(line => {
        socket.emit('draw', line)
    })

    socket.on('draw', (line) => {
        historic.push(line);
        io.emit('draw', line)
    })
})