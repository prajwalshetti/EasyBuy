import express from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { isAdmin } from "../middlewares/isAdmin.middleware.js"
import { changeStatus, createOrder, getAllOrders, showOrders } from "../controllers/order.controller.js"

const router=express()

router.route("/createOrder").post(verifyJWT,createOrder)
router.route("/changeStatus/:id").post(verifyJWT,isAdmin,changeStatus)
router.route("/showOrders").get(verifyJWT,showOrders)
router.route("/getAllOrders").get(getAllOrders)

export default router