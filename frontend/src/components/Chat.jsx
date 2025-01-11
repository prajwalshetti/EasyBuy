import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/auth.jsx';
import axios from 'axios';
import { Send, Loader2, Users, MessageSquare, ArrowLeft } from 'lucide-react';
import { toast } from 'react-toastify';

const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch all admins
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        // Replace with your actual endpoint
        const response = await axios.get('http://localhost:8000/api/v1/user/getAllUsers', {
          params:{role:"1"},
          withCredentials: true
        });
        setAdmins(response.data);
      } catch (error) {
        toast.error('Failed to load admins');
      }
    };
    fetchAdmins();
  }, []);

  // Fetch messages for selected admin
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedAdmin) return;
      
      setLoading(true);
      try {
        // Replace with your actual endpoint
        const response = await axios.get(
          `http://localhost:8000/api/v1/chat/showChats/${selectedAdmin._id}`,
          { withCredentials: true }
        );
        setMessages(response.data);
      } catch (error) {
        toast.error('Failed to load messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
    // const interval = setInterval(fetchMessages, 5000);

    // return () => clearInterval(interval);
  }, [selectedAdmin]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedAdmin) return;

    const messageContent = newMessage;
    setNewMessage('');

    try {
      // Replace with your actual endpoint
      await axios.post(
        `http://localhost:8000/api/v1/chat/createChat/${selectedAdmin._id}`,
        { content: messageContent },
        { withCredentials: true }
      );

      setMessages(prev => [...prev, {
        sender: { _id: user._id },
        content: messageContent,
        createdAt: new Date().toISOString()
      }]);
    } catch (error) {
      toast.error('Failed to send message');
      setNewMessage(messageContent);
    }
  };

  if (!selectedAdmin) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-8 border-b pb-4">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 rounded-xl">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Support Staff</h2>
              <p className="text-sm text-gray-500">Select an agent to start chatting</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {admins.map((admin) => (
              <button
                key={admin._id}
                onClick={() => setSelectedAdmin(admin)}
                className="flex items-center p-4 border border-gray-100 rounded-xl hover:bg-orange-50 hover:border-orange-200 transition-all duration-200 group"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 group-hover:text-orange-600">{admin.username}</h3>
                  <p className="text-sm text-gray-500">{admin.email}</p>
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 rounded-xl">
            <Loader2 className="w-6 h-6 animate-spin text-white" />
          </div>
          <p className="text-gray-600 font-medium">Loading conversation...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-2xl shadow-lg p-4 mb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{selectedAdmin.name || selectedAdmin.username}</h2>
              <p className="text-sm text-gray-500">{selectedAdmin.email}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedAdmin(null)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Change Admin
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-2xl shadow-lg p-4 mb-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender._id === user._id ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] rounded-2xl p-4 ${
                  message.sender._id === user._id
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="leading-relaxed break-words">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.sender._id === user._id
                    ? 'text-orange-100'
                    : 'text-gray-500'
                }`}>
                  {new Date(message.createdAt).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={sendMessage} className="flex gap-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-gray-400"
        />
        <button
          type="submit"
          disabled={!newMessage.trim()}
          className={`px-6 rounded-2xl flex items-center gap-2 transition-all duration-200 ${
            newMessage.trim() 
              ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send className="w-5 h-5" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
};

export default Chat;