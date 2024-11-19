


let rooms = {};
let emojiCounts = {};

const createRoom = (roomName) => {
    if (!rooms[roomName]) {
        rooms[roomName] = [];
        emojiCounts[roomName] = {};
        console.log(`Room ${roomName} created`);
    }
}

const joinRoom = (roomName, socket) => {
    if (rooms[roomName]) {
        rooms[roomName].push(socket.id);
        socket.join(roomName);
        console.log(`${socket.id} joined room ${roomName}`);
        socket.emit('past_reactions', emojiCounts[roomName] || {});
    } else {
        console.log`Room ${roomName} does not exist`;
    }
}

const leaveRoom = (roomName, socket) => {
    if (rooms[roomName]) {
        rooms[roomName] = rooms[roomName].filter(id => id !== socket.id);
        socket.leave(roomName);
        console.log(`${socket.id} left room ${roomName}`);
    }
}

const handleEmojis = (roomName, emoji) => {
    if (!emojiCounts[roomName]) {
        emojiCounts[roomName] = {};
    }

    if (!emojiCounts[roomName][emoji]) {
        emojiCounts[roomName][emoji] = 0;
    }

    emojiCounts[roomName][emoji] += 1;
};

module.exports = { createRoom, joinRoom, leaveRoom, handleEmojis, emojiCounts };