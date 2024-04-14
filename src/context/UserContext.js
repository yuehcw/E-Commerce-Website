import React, { createContext, useReducer, useContext } from "react";
import * as UserService from "../services/userService";

const ADD_USER = "ADD_USER";
const LOGIN_USER = "LOGIN_USER";

const initialState = {
  users: [],
  currentUser: null,
  isAuthenticated: false,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    case LOGIN_USER:
      return { ...state, currentUser: action.payload, isAuthenticated: true };
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Actions
  const addUser = async (firstname, lastname, email, username, password) => {
    try {
      const response = await UserService.addUser(
        firstname,
        lastname,
        email,
        username,
        password,
      );
      // Check for success
      if (response.status === 200) {
        console.log("API call successful. User added.");
        dispatch({ type: ADD_USER, payload: response.data });
      } else {
        // Handle non-successful response
        console.error("API call unsuccessful.");
      }
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  const loginUser = (user) => {
    dispatch({ type: LOGIN_USER, payload: user });
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        addUser,
        loginUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
