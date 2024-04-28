import { useUserStore } from "~/store/useUser";

export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore();
  const { user } = storeToRefs(userStore);
  const { fetchSelf } = userStore;

  const token = useCookie("token");
  if (token.value && user.value === null) {
    await fetchSelf();
  }
});
