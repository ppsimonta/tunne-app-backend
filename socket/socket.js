const { Server } = require('socket.io');
const uuid = require("uuid");
const { createRoom, joinRoom, leaveRoom, sendMessage, handleEmojis, emojiCounts } = require('./rooms');

let io;

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.corsOrigin,
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    


    io.on('connection', (socket) => {
        console.log('user connected');

        //create room
        socket.on('createRoom', (roomName) => {
            createRoom(roomName);
        })

        //join room
        socket.on('joinRoom', (roomName) => {
            joinRoom(roomName, socket);
        })

        //leave room
        socket.on('leaveRoom', (roomName) => {
            leaveRoom(roomName, socket);
        })

        //send message 
        socket.on('emoji_reaction', (roomName, emoji) => {
            handleEmojis(roomName, emoji);
            io.to(roomName).emit('emoji_reaction', { emoji, count: emojiCounts[roomName][emoji] });
        })

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};

module.exports = { initializeSocket, io };