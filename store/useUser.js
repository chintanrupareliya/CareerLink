import axios from "axios";
import { defineStore } from "pinia";
export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  const handleLogin = async (formdata) => {
    const response = await axios.post("auth/login", formdata);
    const token = useCookie("token");
    token.value = response.data.data.token;
    user.value = response.data.data.user;
  };

  const fetchSelf = async () => {
    try {
      const response = await axios.get("auth/user");
      user.value = response.data.data.user;
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const handleRegister = async (formData) => {
    const response = await axios.post("/auth/register", formData);
    const token = useCookie("token");
    token.value = response.data.data.token;
    user.value = response.data.data.user;
  };

  const logout = async () => {
    try {
      console.log("hii");
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
