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

import userRouter from "./routes/user.routes.js"
import categoryRouter from "./routes/category.routes.js"
import productRouter from "./routes/product.routes.js"
import orderRouter from "./routes/order.routes.js"

app.use("/api/v1/user",userRouter)
app.use("/api/v1/category",categoryRouter)
app.use("/api/v1/product",productRouter)
app.use("/api/v1/order",orderRouter)

export {app}