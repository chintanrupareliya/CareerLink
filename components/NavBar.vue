<script setup>
const drawer = ref(false);
</script>

<template>
  <div>
    <VAppBar class="elevation-0 bg-transparent backdrop-blur-lg">
      <VContainer>
        <div class="d-flex justify-space-between align-center">
          <div class="d-flex align-center">
            <div class="d-flex align-center">
              <VAvatar size="avatarSize" color="red">
                <img src="/Frame.png" alt="alt" />
              </VAvatar>
              <VToolbarTitle class="ml-2">Career Link</VToolbarTitle>
            </div>
            <div class="ml-6">
              <NuxtLink to="/">Home</NuxtLink>
            </div>
          </div>
          <div class="d-flex">
            <div>
              <NuxtLink to="/login">
                <VBtn color="white" class="text-none bg-primary"> Login </VBtn>
              </NuxtLink>
            </div>
            <VDivider class="ms-3" inset vertical></VDivider>
            <div>
              <NuxtLink to="/register">
                <VBtn color="white" class="text-none bg-primary">
                  Register
                </VBtn>
              </NuxtLink>
            </div>
          </div>
        </div>
      </VContainer>
    </VAppBar>
  </div>
</template>
