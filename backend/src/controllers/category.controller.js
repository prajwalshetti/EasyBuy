import { ApiError } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/asynchandler.js";
import {Category} from "../models/category.model.js"
import slugify from "slugify"

const create_category=asyncHandler(async(req,res)=>{
    const {name}=req.body;
    if(!name) throw new ApiError(400,"Name is required")

    const existingCategory=await Category.findOne({name});
    if(existingCategory) throw new ApiError(400,"Category is already present")
    
    const newCategory=await Category.create({
        name,
        slug:slugify(name)
    })
    if(!newCategory)throw new ApiError(500,"Category creation failed")
    
    return res.status(200).send(newCategory)
})

const update_category=asyncHandler(async(req,res)=>{
    const {name}=req.body
    const {id}=req.params
    if(!name) throw new ApiError(400,"Name is missing")
    if(!id) throw new ApiError(400,"Id is missing")

    const updatedCategory=await Category.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true})

    return res.status(200).json(updatedCategory)
})

const delete_category=asyncHandler(async(req,res)=>{
    const {id}=req.params
    if(!id) throw new ApiError(400,"id is not present")
    
    const category=await Category.findByIdAndDelete(id)

    if(!category) throw new ApiError(404,"Category doesnt exists")
    
    return res.status(200).json({message:"Category deleted successfully"})
})

const get_all_categories=asyncHandler(async(req,res)=>{
    const categories=await Category.find()
    return res.status(200).send(categories)
})

const get_single_category=asyncHandler(async(req,res)=>{
    const {id}=req.params
    if(!id) throw new ApiError(400,"Id is not present")
    
    const category=await Category.findById(id)
    if(!category) throw new ApiError(404,"No category found")
    
    res.status(200).send(category)
})

export {create_category,update_category,delete_category,get_all_categories,get_single_category}