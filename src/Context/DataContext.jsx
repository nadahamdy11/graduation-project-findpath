import axios from "axios";
import { createContext, Children, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const DataContext = createContext("");
export const DataContextProvider = (props) => {
  const { children } = props;

  const navigate = useNavigate();

  let login = (user,pwd) => {
    axios
      .post("https://smart-shipment-system.vercel.app/api/v1/users/login", {
        email: user,
        password: pwd,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.response.data));
  };
  let signup = () => {
    axios
      .post("https://smart-shipment-system.vercel.app/api/v1/users/signup", {
        
          name: "delivery b3ed",
          email: "nehadashraf402@gmail.com",
          phone: "01278416263",
          password: "12345678",
          passwordConfirm: "12345678",
          role: "client"
      })
      .then((res) => {
        console.log(res);
        setSuccess(true);
      })
      .catch((err) => console.log(err.response.data));
  };

  return (
    <DataContext.Provider value={{ login,success }}>
      {children}
    </DataContext.Provider>
  );
};
export default DataContext;
