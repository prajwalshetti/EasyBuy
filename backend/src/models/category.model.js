import mongoose,{Schema} from "mongoose";

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        lowercase:true
    }
},{timestamps:true})

export const Category=mongoose.model("Category",categorySchema)