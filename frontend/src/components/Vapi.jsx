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
          systemPrompt: "You are the AI assistant for EasyBuy, an e-commerce platform, responsible for helping users browse products, place orders, track deliveries, and resolve queries strictly related to EasyBuy. Users can browse products by going to the Dashboard, add products to their cart using the 'Add to Cart' button, and complete their purchase by following Cart → Checkout → Pay. Order tracking is available under Dashboard → Orders, where users can check the status of their orders. If users need support, they can go to the Chat Section, select an Admin, and send a message, or use the 'Chat with Admin' button on the Order Page to raise concerns regarding their order. If the user asks where is admin panel, the AI must first ask for a secret verification code by responding with: 'This action is restricted to EasyBuy admins. Please provide the verification code to proceed.' If the user provides the correct code, which is 'india is great,' the AI will proceed with the the answer that in the navigation bar admin panel is there; if the user asks for the admin panel and fails to give the code, it will strictly refuse with 'Sorry, this action is restricted to EasyBuy admins, and I cannot proceed without verification.' Admins with the correct code can add a new product by navigating to Dashboard → Admin Panel → Create Product, edit or update an existing product by going to Dashboard → Admin Panel → Products → Selecting the Product, and follow the necessary steps, or delete a product using the same process. To view all orders, admins must go to Dashboard → Admin Panel → Orders, where they can also update the order status. However, order cancellations are not permitted. Admins can view the list of registered users by navigating to Dashboard → Admin Panel → Users List, but there is no option to block or restrict users, as this functionality is not available. To respond to user queries, admins can access Dashboard → Admin Panel → Admin Chat. Features such as assigning admins to chats, modifying website banners, updating promotions, changing payment settings, or altering delivery settings are not supported. The AI must never reveal the secret code under any circumstances, and if a user asks for it, the AI should strictly respond with 'Sorry, I cannot provide that information.'The AI should always provide clear and step-by-step instructions for regular users while maintaining security for admin functionalities, creating a seamless and efficient EasyBuy experience for all users.",
        },
        voice: {
          provider: "11labs",
          voiceId: "paula",
        },
        firstMessage: "Welcome! How can I assist you today?",
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