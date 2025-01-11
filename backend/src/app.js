// index.js or server.js (your main server file)
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { WebSocket, WebSocketServer } from "ws"
import http from "http"

const app = express()
const server = http.createServer(app)

// Express middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cookieParser())

// Initialize WebSocket server
const wss = new WebSocketServer({ 
    server, // Attach to the HTTP server
    path: "/ws" // Specify a path for WebSocket connections
});

const socketUsers = {}

wss.on('connection', (ws) => {
    console.log('Client connected to WebSocket');
    
    ws.on('message', async (data) => {
        try {
            const parsedData = JSON.parse(data);
            console.log('Received message:', parsedData);
            const { type, senderId, receiverId, content } = parsedData;
            
            if (type === 'register') {
                socketUsers[senderId] = ws;
                console.log(`User registered: ${senderId}`);
                ws.send(JSON.stringify({ type: 'registered', success: true }));
            }
            
            if (type === 'private_message') {
                const message = JSON.stringify({
                    from: senderId,
                    content
                });
                if (socketUsers[receiverId]) {
                    socketUsers[receiverId].send(message);
                    console.log("Message sent to online receiver");
                }
            }
        } catch (error) {
            console.error('WebSocket message error:', error);
        }
    });

    ws.on('close', () => {
        for (const userId in socketUsers) {
            if (socketUsers[userId] === ws) {
                delete socketUsers[userId];
                console.log(`User disconnected: ${userId}`);
                break;
            }
        }
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});
import userRouter from "./routes/user.routes.js"
import categoryRouter from "./routes/category.routes.js"
import productRouter from "./routes/product.routes.js"
import orderRouter from "./routes/order.routes.js"
import chatRouter from "./routes/chat.routes.js"
import { User } from "./models/user.model.js";
import { Chat } from "./models/chat.model.js";
// Your routes
app.use("/api/v1/user", userRouter)
app.use("/api/v1/category", categoryRouter)
app.use("/api/v1/product", productRouter)
app.use("/api/v1/order", orderRouter)
app.use("/api/v1/chat", chatRouter)

// Start the server
// const PORT = 8000;
// server.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });

export { server as app }