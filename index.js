const express = require('express')
const socketIO = require('socket.io')
const http = require('http')

const app = express()
const port = 3001
const server = http.createServer(app)
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('A user connected ' + socket.id);
    socket.emit('userId', socket.id);
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });

    socket.on('public_mess', (mess) => {
        io.emit('pub_mess', mess);
    });

    // socket.emit('sss', `welcome to the server ${socket.id}`);
    // socket.broadcast.emit('ssss', `${socket.id} joined the server`);
});


app.get('/', (req, res) => res.send('Hello World!'))
server.listen(port, () => console.log(`Example app listening on port ${port}!`))