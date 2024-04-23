<script setup></script>
<template>
  <div>
    <div class="hero d-flex align-center justify-center">
      <VContainer>
        <div class="display-text">
          <VRow>
            <VCol cols="12" lg="6">
              <div class="text-bold text-h2 drop-shadow-xl">
                <h1
                  class="text-indigo-darken-4 font-weight-bold text-shades-black drop-shadow-xl tracking-wide font-serif"
                >
                  Discover
                  <span class="my-2 d-block drop-shadow-xl">More Than</span>
                  <span class="text-blue-lighten-2 mt-2 drop-shadow-xl d-block">
                    5000+ Jobs
                  </span>
                </h1>
              </div>
              <div>
                <img src="/Group.png" class="my-5 mx-2" />
              </div>
              <p class="text-gray-500 text-2xl">
                Great platform for the job seeker that searching for new career
                heights and passionate about startups.
              </p>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="12" lg="6">
              <div class="search-bar">
                <VForm
                  @submit.prevent="() => {}"
                  class="d-flex align-center justify-center flex-wrap"
                >
                  <div class="w-75 mt-5">
                    <VTextField
                      placeholder="Job Title or Keyword"
                      prepend-icon="mdi-magnify"
                      class="elevation-0 bg-transparent rounded-none"
                    ></VTextField>
                  </div>

                  <VBtn
                    color="primary"
                    type="submit"
                    class="elevation-0 text-none ma-2"
                    >Search</VBtn
                  >
                </VForm>
                <p class="text-gray-500">
                  Popular : UI Designer, UX Researcher, Android, Admin
                </p>
              </div>
            </VCol>
          </VRow>
        </div>
      </VContainer>
    </div>
    <div>
      <VContainer>
        <p class="text-gray-400 text-2xl">Companies we helped grow</p>
        <div class="mt-10">
          <VImg src="/Featured Company.jpg" />
        </div>
      </VContainer>
    </div>
  </div>
</template>

<style scoped>
.hero {
  height: 100vh;
  width: 100vw;
  background-position: center;
  background-size: cover;
  position: relative;
  top: -63px;
  background-image: url("../public/Desktop.jpg");
}
</style>
