import express from "express"
import { app } from "../app.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { isAdmin } from "../middlewares/isAdmin.middleware.js"
import { create_category, delete_category, get_all_categories, get_single_category, update_category } from "../controllers/category.controller.js"

const router=express()

router.route("/createCategory").post(verifyJWT,isAdmin,create_category)
router.route("/updateCategory/:id").post(verifyJWT,isAdmin,update_category)
router.route("/deleteCategory/:id").delete(verifyJWT,isAdmin,delete_category)
router.route("/getAllCategories").get(get_all_categories)
router.route("/getSingleCategory/:id").get(get_single_category)

export default router