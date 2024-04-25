<script setup>
import { useUserStore } from "~/store/useUser";
const userStore = useUserStore();
const { logout } = userStore;
const { user } = storeToRefs(userStore);
const isLoggedIn = computed(() => user.value !== null);
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
          <div class="ml-6">
            <ul class="d-flex justify-space-around">
              <li class="mx-2"><NuxtLink to="/">Home</NuxtLink></li>
              <li>
                <NuxtLink to="/jobs" v-if="isLoggedIn">Jobs</NuxtLink>
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
                <v-menu class="elevation-0">
                  <template v-slot:activator="{ props }">
                    <v-btn
                      color="sky"
                      v-bind="props"
                      icon="mdi-account-circle"
                    ></v-btn>
                  </template>

                  <v-list class="elevation-0">
                    <v-list-item class="bg-sky-500">
                      <v-list-item-title
                        >{{ user.first_name }}
                        {{ user.last_name }}</v-list-item-title
                      >
                      <v-list-item-title>{{ user.email }}</v-list-item-title>
                      <VDivider class="my-3" :thickness="3" />
                      <v-list-item-title
                        ><VBtn
                          @click="logout()"
                          color="success w-100 text-none"
                        >
                          Log out</VBtn
                        ></v-list-item-title
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </template>
          </div>
        </div>
      </VContainer>
    </VAppBar>
  </div>
</template>
