import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "../Bot/config.js";
import MessageParser from "../Bot/MessageParser.jsx";
import ActionProvider from "../Bot/ActionProvider.jsx";
import lottie from 'lottie-web';
import animationData from "../Assets/rcupLIK7g3.json";
import React, { useEffect, useRef } from 'react';

// eslint-disable-next-line no-unused-vars
const saveMessages = (messages, _HTMLString) => {
  localStorage.setItem("chat_messages", JSON.stringify(messages));
};

// eslint-disable-next-line no-unused-vars
const loadMessages = () => {
  const messages = JSON.parse(localStorage.getItem("chat_messages"));
  return messages;
};


const Chat = () => {
    const container = useRef(null);
    useEffect(() => {
      const anim = lottie.loadAnimation({
        container: container.current,
        animationData: animationData, // This is the animation file you imported
        loop: true, // Set loop to true if the animation should loop
        autoplay: true, // Set autoplay to true to start animation on load
      });
  
  
    return () => {
        anim.destroy(); // Cleanup animation instance when component unmounts
      };
    }, []);
  
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 m-auto ps-5">
          <div
            ref={container}
            style={{ height: 400 }}
          />
        </div>
        <div className="col-md-6 mt-3">
          <Chatbot 
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
          />
        </div>
      </div>
    </div>
  );
};
export default Chat;
