<script setup>
const drawer = ref(false);
</script>

<template>
  <div>
    <VAppBar class="bg-transparent elevation-0">
      <VContainer>
        <div class="d-flex justify-space-between align-center">
          <div class="d-flex align-center">
            <VAvatar size="avatarSize" color="red">
              <img src="/Frame.png" alt="alt" />
            </VAvatar>
            <VToolbarTitle class="ml-2">Career Link</VToolbarTitle>
          </div>

          <div class="d-flex">
            <VBtn color="white" class="text-none bg-primary"> Login </VBtn>
            
            <VBtn color="white" class="text-none bg-primary"> Sign Up </VBtn>
          </div>
        </div>
      </VContainer>
    </VAppBar>
  </div>
</template>
