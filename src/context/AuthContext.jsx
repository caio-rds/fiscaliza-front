import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import axios from "axios";

export const AuthContext = createContext();
const serverURL = import.meta.env.VITE_SERVER_URL;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        console.error("Token inválido", error);
        logout();
      }
    }
  }, []);

  const tryLogin = async (data) => {
    const response = await axios.post(serverURL + "login/", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const token = response.data.token;
    if (token) {
      localStorage.setItem("token", token);
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
      window.location.href = document.referrer;
    }
  };

  const refreshAccessToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.post(
          serverURL + "login/token/refresh",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { token: newToken } = response.data;
        if (newToken) {
          localStorage.setItem("token", newToken);
          const decodedUser = jwtDecode(newToken);
          setUser(decodedUser);
          return newToken;
        }
      } catch (error) {
        console.error("Erro ao atualizar token", error);
      }
    }
    return null;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{ user, logout, tryLogin, refreshAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
