import { useEffect } from "react";

const Vapi = () => {
  useEffect(() => {
    // Create and load the Vapi script
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js";
    script.defer = true;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Basic configuration
      const apiKey = "815deafd-f807-46c0-933f-e39c9a8e787e";
      const assistant = {
        model: {
          provider: "openai",
          model: "gpt-3.5-turbo",
          systemPrompt: "You are an AI shopping assistant for this e-commerce store. Your goal is to help users find the best products, answer product-related questions, and guide them through the shopping process. Stay focused only on shopping assistance and do not respond to unrelated questions",
        },
        voice: {
          provider: "11labs",
          voiceId: "paula",
        },
        firstMessage: "Welcome! How can I assist you today? Are you looking for a specific product or need recommendations?",
      };

      // Minimal button config - just the essentials
      const buttonConfig = {
        position: "bottom-right",
        offset: "40px"
      };

      // Initialize Vapi
      const vapiInstance = window.vapiSDK.run({ 
        apiKey, 
        assistant, 
        config: buttonConfig 
      });
      
      // Basic event logging
      vapiInstance.on("message", (msg) => {
        if (msg.transcriptType && msg.transcriptType !== "final") return;
        console.log("Message received:", msg);
      });
      
      vapiInstance.on('error', (e) => {
        console.error('Vapi error:', e);
      });
    };

    return () => {
      // Clean up script on unmount
      const scriptElement = document.querySelector('script[src="https://cdn.jsdelivr.net/gh/VapiAI/html-script-tag@latest/dist/assets/index.js"]');
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, []);

  return null;
};

export default Vapi;