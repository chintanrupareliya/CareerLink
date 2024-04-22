<script setup>
const drawer = ref(false);
</script>

<template>
  <div>
    <!-- Navigation bar -->
    <VAppBar>
      <div class="d-flex ma-2">
        <VAvatar size="avatarSize" color="red">
          <img src="/Frame.png" alt="alt" />
        </VAvatar>
        <VToolbarTitle class="ml-2">My Company</VToolbarTitle>
      </div>
    </VAppBar>
  </div>
</template>
