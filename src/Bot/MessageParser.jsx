import React from "react";
import PropTypes from "prop-types";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message.toLowerCase().includes("hello")) {
      actions.handleHello();
    } else if (message.toLowerCase().startsWith("fetch user")) {
      const userId = message.split("fetch user ")[1].trim(); // Extract user ID from message
      actions.handleFetchUserData(userId); // Trigger fetch user data action with userId
    } else {
      // Handle unrecognized commands or messages
      const botMessage = actions.createChatBotMessage("Sorry, I didn't understand that.");
      actions.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: actions, // Pass actions down to child components
        });
      })}
    </div>
  );
};

MessageParser.propTypes = {
  children: PropTypes.node.isRequired,
  actions: PropTypes.shape({
    handleHello: PropTypes.func.isRequired,
    handleFetchUserData: PropTypes.func.isRequired,
    createChatBotMessage: PropTypes.func.isRequired,
    setState: PropTypes.func.isRequired,
  }).isRequired,
};

export default MessageParser;
