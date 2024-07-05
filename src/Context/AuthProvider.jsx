import { createContext, useState } from "react";
import propTypes from "prop-types";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default AuthContext;
