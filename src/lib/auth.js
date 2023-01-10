import React, { createContext, useContext, useEffect, useState } from "react";
import api from "./api";
import cookie from "js-cookie";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

function useAuthProvider() {
  const [user, setUser] = useState(null);

  const handleUser = (user) => {
    if (user) {
      // si tengo sesión activa
      setUser(user);
      cookie.set("auth", true, {
        expires: 1, // dia
      });
      cookie.set("userId", user.itus_codigo, {
        expires: 1, // dia
      });

      return user;
    } else {
      // no tengo sesión activa
      setUser(false);
      cookie.remove("auth");
      cookie.remove("userId");
      return false;
    }
  };

  async function register(data) {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    try {
      const response = await api.post("it/itusuarios/", data);
      console.log("response", response);

      return response;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return Promise.reject(error.response);
        // return error.response;
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  }

  async function login(data) {
    try {
      const response = await api.post("/it/login/", data);
      if (response.data.message == "Success") {
        handleUser(response.data.data);
        return response;
      } else {
        return { error: response.data.message };
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  }

  async function editUser(data) {
    try {
      const userId = cookie.get("userId");
      const response = await api.put(`it/itusuarios/${userId}`, data);
      // handleUser(response.data.user);
      return response;
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return error.response;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
      console.log(error.config);
    }
  }

  async function logout() {
    try {
      handleUser(false);
      return response;
    } catch (error) {}
  }

  async function getAuthenticatedUser() {
    const userId = cookie.get("userId");
    if (userId) {
      try {
        const response = await api.get(`/it/itusuarios/${userId}`);
        // console.log("response user", response);
        handleUser(response.data.data);
        return response;
      } catch (error) {
        handleUser(false);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          return error.response;
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      }
    } else {
      handleUser(false);
    }
  }

  useEffect(() => {
    // console.log("RENDER AUTH", user);
    try {
      getAuthenticatedUser();
    } catch (error) {
      console.log("NO USER");
    }
  }, []);

  return {
    user,
    editUser,
    register,
    login,
    logout,
  };
}
