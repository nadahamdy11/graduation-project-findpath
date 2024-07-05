import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../Styles/Admin/ChatBot.module.css';
import botAvatar from '../Assets/bot.png'; // Use the appropriate path for the bot avatar image
import userAvatar from '../Assets/user.png'; // Use the appropriate path for the user avatar image
import Avatar from '../Assets/chatwith.png'; // Use the appropriate path for the user avatar image
import {SendOutlined} from '@ant-design/icons';
const ChatBot = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const chatBotToken = 'app-KJy7kth77oBZutepy0S4UFiw';

  useEffect(() => {
    const initialMessage = {
      id: 1,
      text: 'Hi! How can I assist you today?',
      sender: 'bot',
    };
    setMessages([initialMessage]);
  }, []);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!query.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: query,
      sender: 'user',
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      const response = await axios.post(
        'https://api.dify.ai/v1/chat-messages',
        {
          inputs: {},
          query: query,
          user: 'abc-123',
        },
        {
          headers: {
            Authorization: `Bearer ${chatBotToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const botResponse = {
        id: response.data.id,
        text: response.data.answer,
        sender: 'bot',
      };

      setMessages((prevMessages) => [...prevMessages, botResponse]);
      setQuery('');
    } catch (error) {
      console.error('Error fetching response:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: 'Error fetching response. Please try again.',
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.flex}>
        <div className={style.one}>
          <h2>Meet Our ChatBot <span style={{color:"#ebb129"}}>Solution</span> </h2>
          <div className={style.window}>
            {messages.map((message) => (
              <div key={message.id} className={`${style.chatmessage} ${style[message.sender]}`}>
                <img
                  src={message.sender === 'user' ? userAvatar : botAvatar}
                  alt={`${message.sender} avatar`}
                  className={style.heavatar}
                />
                <div className={style.messagecontent}>{message.text}</div>
              </div>
            ))}
          </div>
          <form className={style.chatinput} onSubmit={handleSubmit}>
            <input
              type="text"
              value={query}
              onChange={handleQueryChange}
              placeholder="Type your message..."
            />
            <button type="submit"><SendOutlined /></button>
          </form>
        </div>
        <div className={style.two}>
          <img src={Avatar} alt="Chatbot" className={style.avatarimg} />
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
