import mongoose,{mongo, Schema} from "mongoose";

const chatSchema=new mongoose.Schema({
    sender:{
        type:mongoose.ObjectId,
        ref:"User",
        required:true
    },
    receiver:{
        type:mongoose.ObjectId,
        ref:"User",
        required:true
    },
    content:{
        type:String,
        required:true,
    },
},{timestamps:true})

export const Chat=mongoose.model("Chat",chatSchema)