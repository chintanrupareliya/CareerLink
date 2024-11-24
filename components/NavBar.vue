<script setup>
// Import the required modules
import { useUserStore } from "~/store/useUser";

// Initialize the data for the component
const userStore = useUserStore(); //useUserStore
const { logout } = userStore;
const { user } = storeToRefs(userStore);
const isLoggedIn = computed(() => user.value !== null);
const router = useRouter();

//logout function
const Logout = async () => {
  await logout();
  router.push("/");
};
</script>

<template>
  <div>
    <VAppBar class="elevation-0 bg-transparent backdrop-blur-lg">
      <VContainer>
        <div class="d-flex justify-space-between align-center">
          <div class="d-flex align-center">
            <NuxtLink to="/">
              <div class="d-flex align-center">
                <VAvatar size="avatarSize" color="red">
                  <img src="/Frame.png" alt="alt" />
                </VAvatar>

                <VToolbarTitle class="ml-2">Career Link</VToolbarTitle>
              </div>
            </NuxtLink>
          </div>

          <div>
            <ul class="d-flex">
              <li class="mx-2">
                <NuxtLink to="/" exact-active-class="active">Home</NuxtLink>
              </li>

              <li class="mx-2">
                <NuxtLink
                  to="/jobs"
                  v-if="isLoggedIn"
                  exact-active-class="active"
                  >Jobs</NuxtLink
                >
              </li>

              <li class="mx-2">
                <NuxtLink
                  to="/applications"
                  v-if="isLoggedIn"
                  exact-active-class="active"
                >
                  Applications
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="d-flex">
            <!-- Conditionally render login/register or user info -->
            <template v-if="!isLoggedIn">
              <div>
                <NuxtLink to="/login">
                  <VBtn color="white" class="text-none bg-primary">Login</VBtn>
                </NuxtLink>
              </div>

              <VDivider class="ms-3" inset vertical></VDivider>

              <div>
                <NuxtLink to="/register">
                  <VBtn color="white" class="text-none bg-primary"
                    >Register</VBtn
                  >
                </NuxtLink>
              </div>
            </template>

            <template v-else>
              <!-- Render user info -->
              <div class="text-center">
                <VMenu class="elevation-0">
                  <template v-slot:activator="{ props }">
                    <VBtn
                      color="sky"
                      v-bind="props"
                      icon="mdi-account-circle"
                    ></VBtn>
                  </template>

                  <VList class="elevation-0">
                    <VListItem class="bg-sky-500">
                      <VListItemTitle>
                        {{ user.first_name }}
                        {{ user.last_name }}
                      </VListItemTitle>

                      <VListItemTitle>
                        {{ user.email }}
                      </VListItemTitle>

                      <VDivider class="my-3" :thickness="3" />

                      <VListItemTitle>
                        <VBtn
                          @click="Logout()"
                          color="primary"
                          class="w-100 text-none"
                        >
                          Log out
                        </VBtn>
                      </VListItemTitle>
                    </VListItem>
                  </VList>
                </VMenu>
              </div>
            </template>
          </div>
        </div>
      </VContainer>
    </VAppBar>
  </div>
</template>
<style scoped>
.active {
  color: blue;
}
</style>
