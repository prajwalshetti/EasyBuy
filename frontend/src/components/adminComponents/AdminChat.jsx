import React, { useEffect, useState,useRef } from 'react';
import { useAuth } from '../../context/auth.jsx';
import axios from 'axios';
import { MessageSquare, Loader2, User, Clock, Send,Users,ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';

const AdminChat = () => {
  const { user } = useAuth();

  const [chats,setChats]=useState([])
  const [chatters,setChatters]=useState([])
  const [newMessage, setNewMessage] = useState('');
  const [singleChatter,setSingleChatter]=useState(null)
  const messagesEndRef = useRef(null);
  
  const fetchAllChatters=async()=>{
    try {
      const response=await axios.get("http://localhost:8000/api/v1/chat/getPeopleWhoChattedWithMe",{withCredentials:true})
      for(let i in response.data){
        console.log(response.data[i])
      }
      const chatterDetails = await Promise.all(
        response.data.map(async (chatterId) => {
          const userResponse = await axios.get(`http://localhost:8000/api/v1/user/getUserById/${chatterId}`, { withCredentials: true });
          return userResponse.data; // Assuming `data` contains the user details
        })
      );
      setChatters(chatterDetails);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchAllChatters()
  },[])

  const fetchChatsWithSingleChatter=async(id)=>{
    try {
      const response=await axios.get(`http://localhost:8000/api/v1/chat/showChats/${id}`,{withCredentials:true})
      setChats(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const sendMessageToSingleChatter=async(id)=>{
    try {
      if(!newMessage)return;
      const messageContent = newMessage;
      const response=await axios.post(`http://localhost:8000/api/v1/chat/createChat/${id}`,{content:newMessage},{withCredentials:true})
            setChats(prev => [...prev, {
        sender: { _id: user._id },
        content: messageContent,
        createdAt: new Date().toISOString()
      }]);
      if(response.status==200){
        setNewMessage("")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(()=>{
    scrollToBottom()
  },[chats])

if (!singleChatter) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-8 border-b pb-4">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 rounded-xl">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Your Conversations</h2>
              <p className="text-sm text-gray-500">Select a user to continue chatting</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {chatters.map((chatter) => (
              <button
                key={chatter._id}
                onClick={() => {setSingleChatter(chatter); fetchChatsWithSingleChatter(chatter._id);}}
                className="flex items-center p-4 border border-gray-100 rounded-xl hover:bg-orange-50 hover:border-orange-200 transition-all duration-200 group"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 group-hover:text-orange-600">{chatter.username}</h3>
                  <p className="text-sm text-gray-500">{chatter.email}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4 bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Chat with {singleChatter.name}</h2>
            <p className="text-gray-600">{singleChatter.email}</p>
          </div>
          <button
            onClick={() => setSingleChatter(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            <div className='flex'>
              <ArrowLeft className="w-4 h-4 mt-1 mr-1" />
              <p>Change Chatter</p>
            </div>
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-lg shadow-lg p-4 mb-4 overflow-y-auto">
        <div className="space-y-4">
          {chats.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender._id === user._id ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.sender._id === user._id
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p>{message.content}</p>
                <p className={`text-xs mt-1 ${
                  message.sender._id === user._id
                    ? 'text-orange-100'
                    : 'text-gray-500'
                }`}>
                  {new Date(message.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={(e)=>{e.preventDefault();sendMessageToSingleChatter(singleChatter._id)}} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition-colors duration-200 flex items-center gap-2"
        >
          <Send className="w-5 h-5" />
          Send
        </button>
      </form>
    </div>
  );
};

export default AdminChat;