import { ApiError } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/asynchandler.js";
import {Chat} from "../models/chat.model.js"
import { User } from "../models/user.model.js";

const createChat=asyncHandler(async(req,res)=>{
    const senderId=req.user._id
    const receiverId=req.params.id
    const {content}=req.body

    if(!senderId || !receiverId || !content){
        throw new ApiError(400,"Data missing")
    }

    if(senderId==receiverId) throw new ApiError(400,"Sender and receiver are same")

    const senderCheck=await User.findById(senderId)
    const receiverCheck=await User.findById(receiverId)

    if(!senderCheck||!receiverCheck)throw new ApiError(400,"Invalid User IDs")

    const newChat=await Chat.create({
        sender:senderId,
        receiver:receiverId,
        content
    })

    if(!newChat) throw new ApiError(500,"Chat creation failed")
    
    return res.status(200).send(newChat)
})

const showChats=asyncHandler(async(req,res)=>{
    const senderId=req.user._id
    const receiverId=req.params.id
    const {content}=req.body

    if(!senderId || !receiverId){
        throw new ApiError(400,"Data missing")
    }

    if(senderId==receiverId) throw new ApiError(400,"Sender and receiver are same")

    const senderCheck=await User.findById(senderId)
    const receiverCheck=await User.findById(receiverId)
    
    if(!senderCheck||!receiverCheck)throw new ApiError(400,"Invalid User IDs")

    const query={}
    query.sender=senderId
    query.receiver=receiverId

    const chats=await Chat.find(query).populate("sender").populate("receiver").sort({ createdAt: -1 });
    
    return res.status(200).send(chats)
})

export {createChat,showChats}