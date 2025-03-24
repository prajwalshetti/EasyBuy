import React, { useState, useEffect, useRef } from 'react';
import Vapi from './Vapi';

function AIAgent() {
  const [messages, setMessages] = useState([]);
  const conversationRef = useRef(null);

  // Auto-scroll to the bottom of conversation when new messages arrive
  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
      <div className="mb-6 flex justify-between items-center">
        <a href="/dashboard" className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-100 transition-colors shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Return to Dashboard
        </a>
        
        <h1 className="text-2xl font-bold">AI Shopping Assistant</h1>
      </div>
      
      {/* AI Assistant Information Section */}
      <div className="mb-8 text-center">
        <div className="mb-4">
          <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-bold mb-2">Your Intelligent Shopping Partner</h2>
        <p className="max-w-lg mx-auto">
          Our AI assistant is here to help you find the perfect products, compare options, 
          and answer any questions about our inventory. Click the chat button in the bottom 
          right corner to start a conversation.
        </p>
      </div>
      
      {/* Feature Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white bg-opacity-20 p-4 rounded-lg shadow-md">
          <h3 className="font-bold text-lg mb-2">Product Recommendations</h3>
          <p>Get personalized suggestions based on your preferences and shopping history.</p>
        </div>
        <div className="bg-white bg-opacity-20 p-4 rounded-lg shadow-md">
          <h3 className="font-bold text-lg mb-2">Instant Answers</h3>
          <p>Find information about products, availability, and shipping options quickly.</p>
        </div>
        <div className="bg-white bg-opacity-20 p-4 rounded-lg shadow-md">
          <h3 className="font-bold text-lg mb-2">Voice Interaction</h3>
          <p>Talk naturally with our assistant using voice recognition technology.</p>
        </div>
      </div>
      
      <Vapi onNewMessage={(msg) => {
        setMessages(prevMessages => [...prevMessages, msg]);
      }} />
    </div>
  );
}

export default AIAgent;