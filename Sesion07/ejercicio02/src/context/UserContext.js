import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState({
    isAuthenticated: false,
    user: null,
  });

  const login = (userData) => {
    setUserState({
      isAuthenticated: true,
      user: userData,
    });
  };

  const logout = () => {
    setUserState({
      isAuthenticated: false,
      user: null,
    });
  };

  return (
    <UserContext.Provider value={{ ...userState, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
