import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config.js';
import { createServer } from 'http';
import { Server as WebSocketServer } from 'socket.io';
import { connectDB } from './src/database/connection.js'

const app = express();
const server = createServer(app);

app.use(cors());
app.use(morgan('dev'));


const io = new WebSocketServer(server, {
    cors: {
        origin: '*',
    },
});

const messages = [];

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.emit('history_chat', messages);

    socket.on('msg', (data) => {
        messages.push(data);
        socket.broadcast.emit('msg', data);
    })

    socket.on('typing', (data)=>{
        socket.broadcast.emit('typing', data);
    })

    socket.on('stop_typing', (data)=>{
        console.log('stop typing')
        socket.broadcast.emit('stop_typing');
    })
});

server.listen(3000, () => {
    connectDB();   
    console.log('Server running on port 3000')
})