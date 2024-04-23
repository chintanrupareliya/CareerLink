<script setup lang="ts"></script>

<template>
  <div>
    <!-- default layout for the website -->
    <VLayout>
      <NavBar />
      <VMain>
        <div class="main">
          <slot />
        </div>
        <Footer />
      </VMain>
    </VLayout>
  </div>
</template>

<style scoped></style>
