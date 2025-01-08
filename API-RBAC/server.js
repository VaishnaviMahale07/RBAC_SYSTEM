const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Frontend URL
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("A user connected: ", socket.id);

    // Listen for incoming messages
    socket.on("sendMessage", (data) => {
        console.log(data);
        // Broadcast message to other clients
        io.emit("receiveMessage", data);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected: ", socket.id);
    });
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
