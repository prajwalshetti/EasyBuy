import {asyncHandler} from "../utils/asynchandler.js";
import {ApiError} from "../utils/ApiErrors.js"
import jwt from "jsonwebtoken"
import {User} from "../models/user.model.js"

export const isAdmin=async(req,res,next)=>{
    try {
        const user=await User.findById(req.user._id);
        if(user.role==1)next();
        else throw new ApiError(400,"Unauthorized access")
    } catch (error) {
        console.log(error)
        throw new ApiError(400,"Unauthorized access")
    }
}