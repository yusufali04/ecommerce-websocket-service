import { createServer } from "http";
import { Server } from "socket.io";

const wsServer = createServer();
// Move origin value to env/config
const io = new Server(wsServer, { cors: { origin: 'http://localhost:5173' } });

io.on("connection", (socket) => {
    console.log("Client connected: ", socket.id);
    socket.on('join', (data) => {
        socket.join(String(data.tenantId));
        socket.emit("join", { roomId: String(data.tenantId) })
    })
})

export default { wsServer, io };