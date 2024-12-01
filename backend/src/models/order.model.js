import mongoose,{mongo, Schema} from "mongoose";

const orderSchema=new mongoose.Schema({
    buyer:{
        type:mongoose.ObjectId,
        ref:"User",
        required:true
    },
    products:[
        {
            type:mongoose.ObjectId,
            ref:"Product"
        }
    ],
    status:{
        type:String,
        default:"Processing",
        enum:["Processing","Out for Delivery","Deliverd"]
    }
},{timestamps:true})

export const Order=mongoose.model("Order",orderSchema)