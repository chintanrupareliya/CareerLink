//store for user data and authentication

import axios from "axios";
import { defineStore } from "pinia";
export const useUserStore = defineStore("user", () => {
  const user = ref(null);

  //for login API call
  const handleLogin = async (formdata) => {
    const response = await axios.post("auth/login", formdata);
    const token = useCookie("token");
    token.value = response.data.data.token;
    user.value = response.data.data.user;
  };

  //fetch user using token
  const fetchSelf = async () => {
    try {
      const response = await axios.get("auth/user");
      user.value = response.data.data.user;
    } catch (error) {
      const token = useCookie("token");
      token.value = null;
      user.value = null;
      console.error("Failed to fetch user data:", error.response);
    }
  };

  //for register API call
  const handleRegister = async (formData) => {
    const response = await axios.post("/auth/register", formData);
    const token = useCookie("token");
    token.value = response.data.data.token;
    user.value = response.data.data.user;
  };

  //for logout API call
  const logout = async () => {
    try {
      const response = await axios.post("auth/logout", null);
      if (response.status === 200) {
        const token = useCookie("token");
        token.value = null;
        user.value = null;
      }
    } catch (error) {
      console.log("Logout failed", error);
    }
  };

  return {
    user,
    logout,
    fetchSelf,
    handleLogin,
    handleRegister,
  };
});
