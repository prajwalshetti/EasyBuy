import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express()

// app.use(cors())
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,                 // Allow cookies to be sent
}));
app.options('/api/*', cors());
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded())
app.use(express.static("public"))
app.use(cookieParser())

//web socket logic
import {WebSocket,WebSocketServer} from "ws"
import http from "http"
const server=http.createServer(app)
const wss=new WebSocketServer({server})

const socketUsers={}

wss.on('connection',(ws)=>{
    ws.on('message',async (data)=>{
        const {type,senderId,receiverId,content}=JSON.parse(data)
        try {
            if(type=='register'){
                socketUsers[senderId]=ws
                console.log(`User added ${senderId}`)
            }
    
            if(type=='private_message'){
                const message=JSON.stringify({
                    from:senderId,
                    content
                })
                if(socketUsers[receiverId]){
                    socketUsers[receiverId].send(message)
                    console.log("Receiver online")
                }
                else{
                    console.log("Receiver does not exist")
                    const senderCheck=await User.findById(senderId)
                    const receiverCheck=await User.findById(receiverId)
                
                    if(!senderCheck||!receiverCheck)throw new ApiError(400,"Invalid User IDs")
                
                    const newChat=await Chat.create({
                        sender:senderId,
                        receiver:receiverId,
                        content
                    })
                    if(newChat)
                        console.log("Chat directly sent to db")
                }
            }
        } catch (error) {
            console.log(error)
        }
    })
    ws.on('close',()=>{
        console.log(`User left`)
        for (const userId in socketUsers) {
            if (socketUsers[userId] === ws) {
              delete socketUsers[userId];
              console.log(`User disconnected: ${userId}`);
              break;
            }
          }
    })

    ws.on('error',(error)=>{
        console.log(error)
    })
})


import userRouter from "./routes/user.routes.js"
import categoryRouter from "./routes/category.routes.js"
import productRouter from "./routes/product.routes.js"
import orderRouter from "./routes/order.routes.js"
import chatRouter from "./routes/chat.routes.js"
import { User } from "./models/user.model.js";
import { Chat } from "./models/chat.model.js";

app.use("/api/v1/user",userRouter)
app.use("/api/v1/category",categoryRouter)
app.use("/api/v1/product",productRouter)
app.use("/api/v1/order",orderRouter)
app.use("/api/v1/chat",chatRouter)

export {app}