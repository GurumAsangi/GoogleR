import React, { createContext, useState } from "react";

// Create the UserContext
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    name: "",
    userId: "",
    email: "",
    phone: "",
    profileImage: null,
  });

  return (
    <UserContext.Provider value={{ userDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};
