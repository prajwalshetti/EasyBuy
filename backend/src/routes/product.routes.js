import express from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { isAdmin } from "../middlewares/isAdmin.middleware.js"
import { createProduct, deleteProduct, getAllProducts, getSimilarProducts, getSingleProduct, updateProduct } from "../controllers/product.controller.js"
import { upload } from "../middlewares/multer.middleware.js"
import formidable from "express-formidable"

const router=express()

router.route("/createProduct").post(verifyJWT,isAdmin,
    upload.fields([
        {
            name:"photo",
            maxCount:1
        }
    ]),createProduct)
router.route("/deleteProduct/:id").delete(verifyJWT,isAdmin,deleteProduct)
router.route("/getAllProducts").get(getAllProducts)
router.route("/getSingleProduct/:id").get(getSingleProduct)
router.route("/updateProduct/:id").post(verifyJWT,isAdmin,updateProduct)
router.route("/getSimilarProducts/:id").get(getSimilarProducts)

export default router