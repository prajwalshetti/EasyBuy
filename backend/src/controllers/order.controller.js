import { ApiError } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { Order } from "../models/order.model.js";


const createOrder=asyncHandler(async(req,res)=>{
    const buyer=req.user._id
    const {products}=req.body

    if(!buyer||!products) throw new ApiError(400,"All fields are required")
    
    const order=await Order.create({
        buyer,
        products
    })

    if(!order) throw new ApiError(500,"Order Creation failed")

    return res.status(200).send(order)
})

const changeStatus=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const {status}=req.body
    if(!id||!status) throw new ApiError(400,"Id is required")

    const order=await Order.findByIdAndUpdate(id,{status},{new:true})
    if(!order) throw new ApiError(500,"Order status updation failed")

    res.status(200).send(order)
})

const showOrders=asyncHandler(async(req,res)=>{
    const buyerid=req.user._id
    const query={}
    query.buyer=buyerid
    const orders=await Order.find(query).populate('products').sort({createdAt:-1})

    if(!orders) throw new ApiError(500,"No orders")

    res.status(200).send(orders)
})

const getAllOrders=asyncHandler(async(req,res)=>{
    const orders=await Order.find().populate('products').populate('buyer').sort({createdAt:-1})
    if(!orders) throw new ApiError(500,"Order not found")
    res.status(200).send(orders)
})

export {createOrder,changeStatus,showOrders,getAllOrders}