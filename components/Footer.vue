<script setup>
//// Initial data for the component
const Email = ref("");
</script>

<template>
  <div class="foo text-white pa-10">
    <VContainer class="h-100">
      <VRow class="h-full">
        <VCol class="" cols="12" sm="6" md="4" lg="3">
          <div class="d-flex align-center">
            <VAvatar size="avatarSize" color="red">
              <img src="/Frame.png" alt="alt" />
            </VAvatar>

            <VToolbarTitle class="ml-2 text-white"> Career Link </VToolbarTitle>
          </div>
          <div>
            <p class="text-gray-400 mt-10">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </p>
          </div>
        </VCol>

        <VCol cols="12" sm="6" md="4" lg="3">
          <ul class="space-y-5">
            <li class="font-bold">About</li>
            <div class="text-gray-400 space-y-3">
              <li>Companies</li>
              <li>Pricing</li>
              <li>Advice</li>
              <li>Privacy Policy</li>
            </div>
          </ul>
        </VCol>

        <VCol cols="12" sm="6" md="4" lg="3">
          <ul class="space-y-5">
            <li class="font-bold">Resources</li>
            <div class="text-gray-400 space-y-3">
              <li>Help Docs</li>
              <li>Guide</li>
              <li>Updates</li>
              <li>Contact Us</li>
            </div>
          </ul>
        </VCol>

        <VCol cols="12" sm="6" md="4" lg="3">
          <div class="font-bold mb-5">Get job notifications</div>

          <div class="text-gray-400 my-5">
            The latest job news, articles, sent to your inbox weekly.
          </div>

          <div class="d-flex justify-between">
            <VTextField v-model="Email" placeholder="Email Address" />

            <VBtn
              color="blue"
              rounded="0"
              class="text-white font-bold text-none"
              height="55"
              >Subscribe</VBtn
            >
          </div>
        </VCol>
      </VRow>

      <VDivider class="my-5" />

      <VRow class="d-flex justify-lg-between my-5">
        <VCol class="text-gray-500" cols="12" lg="6"
          >2021 @ TeamTrack. All rights reserved.</VCol
        >

        <VCol align="end" class="d-flex justify-between" cols="12" lg="6">
          <VBtn icon="mdi-facebook" size="small" class="bg-transparent"></VBtn>

          <VBtn icon="mdi-instagram" size="small" class="bg-transparent"></VBtn>

          <VBtn icon="mdi-slack" size="small" class="bg-transparent"></VBtn>

          <VBtn icon="mdi-whatsapp" size="small" class="bg-transparent"></VBtn>

          <VBtn icon="mdi-twitter" size="small" class="bg-transparent"></VBtn>
        </VCol>
      </VRow>
    </VContainer>
  </div>
</template>

<style>
.foo {
  background-color: rgba(32, 36, 48, 1);
}
</style>
