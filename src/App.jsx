import Layout from "./Layout/AppLayout";
import { BrowserRouter, json, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import HomePage from "./Pages/HomePage";
import OrderForm from "./Pages/OrderForm";
import OrderList from "./Pages/OrdersList";
import Recommendations from "./pages/Recommendations";
import Chat from "./Pages/Chat.jsx";
import Profile from "./Pages/Profile";
import NotFound from "./Pages/PageNotFound";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import StartShipment from "./Pages/StartShipment";
import LayoutAdmin from "./Admin/LayoutAdmin.jsx";
import Tracing from "./Admin/Tracing.jsx";
import Users from "./Admin/Users.jsx";
import Dashboard from "./Admin/Dashboard/Dashboard.jsx";
import Orders from "./Admin/Orders.jsx";
import Chatbot from "./Admin/Chatbot.jsx";
import { useEffect,useState } from "react";
import Checkout from "./Components/Payment.jsx";
import Success from "./Components/Success.jsx";
import axios from "axios";

function App() {
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="orderForm" element={<OrderForm />} />
          <Route path="orderList" element={<OrderList />} />
          <Route path="recommendations" element={<Recommendations />} />
          <Route path="chatbot" element={<Chatbot />} /> 
          <Route path="profile" element={<Profile />} />
          <Route path="startshipment" element={<StartShipment />} />
          <Route path="startshipment/:orderId" element={<StartShipment />} />
          <Route path="/:orderId/success" element={<Success />} />
        </Route>
            <Route element={<LayoutAdmin />}>
              <Route path="tracing" element={<Tracing />} />
              <Route path="users" element={<Users />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
              <Route path="chat" element={<Chat />} />
            </Route>
          
        <Route path="*" element={<NotFound />} />
        <Route path="signup" element={<Signup />} />
        <Route path="signin" element={<Signin  />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
