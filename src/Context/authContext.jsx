import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { local_url } from '../constent.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userData, setUserData] = useState(""); 
  // console.log("🚀 ~ AuthProvider ~ userData:", userData)

  const storeToken = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };


  const navigate = useNavigate()

  const authData = async () => {
    try {
      const response = await axios.get(`${local_url}/api/v1/userdata`, {
        headers: {
          Authorization: `Bearer ${token}` // Pass token in the Authorization header
        }
      });
      setUserData(response.data.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle error (e.g., redirect to login page)
    }
  };

  useEffect(() => {
    if (token) {
      authData();
    }
  }, [token]);
  

  const isLogin = !!token;

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
    setUserData(null); // Clear userData on logout
  };

  return (
    <AuthContext.Provider value={{ storeToken, isLogin, logout, userData }}>
      {children}
    </AuthContext.Provider>
  );
};