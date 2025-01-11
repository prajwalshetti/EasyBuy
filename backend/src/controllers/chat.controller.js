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

    if(!senderId || !receiverId){
        throw new ApiError(400,"Data missing")
    }

    if(senderId==receiverId) throw new ApiError(400,"Sender and receiver are same")

    const senderCheck=await User.findById(senderId)
    const receiverCheck=await User.findById(receiverId)
    
    if(!senderCheck||!receiverCheck)throw new ApiError(400,"Invalid User IDs")

        const query = {
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId }
            ]
        };

    const chats=await Chat.find(query).populate("sender").populate("receiver").sort({ createdAt: 1 });
    
    return res.status(200).send(chats)
})

const getPeopleWhoChattedWithMe=asyncHandler(async(req,res)=>{
    const myid=req.user._id
    const myname=req.user.username

    if(!myid) throw new ApiError(400,"Please Log in")

    const query={
        $or:[
            {sender:myid},
            {receiver:myid}
        ]
    }

    const chatswithMe=await Chat.find(query).populate("sender").populate("receiver").sort({createdAt:1});
    const set=new Set()
    for(const i in chatswithMe){
        const s=chatswithMe[i].sender
        const r=chatswithMe[i].receiver

        console.log(`iteration - ${i}`)
        console.log(s.username)
        console.log(r.username)
        console.log(myname)
        if(s.username!=myname){
            console.log("notsame")
            set.add(s._id.toString())
        }
        if(r.username!=myname){
            console.log("notsame")
            set.add(r._id.toString())
        }
    }

    set.forEach((id)=>{
        console.log(id)
    })

    return res.status(200).json([...set])
})

export {createChat,showChats,getPeopleWhoChattedWithMe}