import mongoose from "mongoose";
import { Category } from "./category.model.js";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:mongoose.ObjectId,
        ref:"Category",
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    photo:{
        type:String,
        default:"https://res-console.cloudinary.com/dwixyksno/thumbnails/v1/image/upload/v1732525801/ODAwcHgtTm9faW1hZ2VfYXZhaWxhYmxlLnN2Z19odjJ3aTA=/drilldown"
    },
    shipping:{
        type:Boolean,
    }
},{timestamps:true})

export const Product=mongoose.model("Product",productSchema)