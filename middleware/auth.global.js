import { useUserStore } from "~/store/useUser";

export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore();
  const { user} = storeToRefs(userStore);
  const { fetchSelf } = userStore;
  
  const token = useCookie("token");
  if (token.value && user.value === null) {
    await fetchSelf();
  }
  if (token.value) {
    if (to.path === "/login" || to.path === "/register") {
      return navigateTo("/");
    }
  } else if (!token.value) {
    if (to.path === "/jobs" || to.path === "/application") {
      return navigateTo("/");
    }
  } else {
    return;
  }
});
