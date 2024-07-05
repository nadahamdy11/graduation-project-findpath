import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage("Hello. Nice to meet you.");

    updateMessages(botMessage);
  };

  const handleFetchUserData = async (userIdOrEvent) => {
    let userId = "";

    // Check if userIdOrEvent is an event object (from input field)
    if (userIdOrEvent.target) {
      userId = userIdOrEvent.target.value.trim();
    } else {
      // If userIdOrEvent is directly the user ID
      userId = userIdOrEvent.trim();
    }

    if (userId) {
      try {
        const response = await axios.get(
          `https://smart-shipment-system.vercel.app/api/v1/admin/user/${userId}`
        );
        const userData = response.data.data.user;
        console.log("User Data:", userData);

        const botMessage = createChatBotMessage(
          formatUserDataMessage(userData)
        );

        updateMessages(botMessage);
      } catch (error) {
        console.error("Error fetching user data:", error);
        const errorMessage =
          "Error fetching user data. Please try again later.";
        const botMessage = createChatBotMessage(errorMessage);

        updateMessages(botMessage);
      }
    } else {
      const errorMessage = "Please provide a valid user ID.";
      const botMessage = createChatBotMessage(errorMessage);

      updateMessages(botMessage);
    }
  };

  const formatUserDataMessage = (userData) => {
    return `Name: ${userData.name} 
      Email: ${userData.email} 
      Phone: ${userData.phone}
      Role: ${userData.role}
      Vehicle Type: ${userData.vehicleType} 
      delivery Approved:${userData.deliveryApproved} 
      vehicle License Img:${userData.vehicleLicenseImg} 
      hir trips :${userData.trip.length} 
      hir trips :${userData.trip.length} 
      trips_id :${userData.trip._id}  
      trips startstate :${userData.trip[0].startState} 
      trips endstate :${userData.trip[0].endState}`;
    // Add more details as needed
  };

  const updateMessages = (botMessage) => {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleFetchUserData,
          },
        });
      })}
    </div>
  );
};

ActionProvider.propTypes = {
  createChatBotMessage: PropTypes.func.isRequired,
  setState: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ActionProvider;
