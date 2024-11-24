import { useUserStore } from "~/store/useUser";

//middleware for auth guard and fetch user data on page reload 

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);
  const { fetchSelf } = userStore;

  const token = useCookie("token");
  if (token.value && user.value === null) {
    fetchSelf();
  }
  if (token.value) {
    if (to.path === "/login" || to.path === "/register") {
      return navigateTo("/");
    }
  } else if (!token.value) {
    if (to.path === "/jobs" || to.path === "/applications") {
      return navigateTo("/");
    }
  } else {
    return;
  }
});
