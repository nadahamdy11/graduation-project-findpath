import { createChatBotMessage } from 'react-chatbot-kit';
const botName = 'Triple S';
const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: "#FFCD00",
    },
    chatButton: {
      backgroundColor: '#FFCD00;',
    },
    
  },
};

export default config;