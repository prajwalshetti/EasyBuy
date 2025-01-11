import express from "express"
import { app } from "../app.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { isAdmin } from "../middlewares/isAdmin.middleware.js"
import { createChat, getPeopleWhoChattedWithMe, showChats } from "../controllers/chat.controller.js"

const router=express()

router.route("/createChat/:id").post(verifyJWT,createChat)
router.route("/showChats/:id").get(verifyJWT,showChats)
router.route("/getPeopleWhoChattedWithMe").get(verifyJWT,getPeopleWhoChattedWithMe)

export default router