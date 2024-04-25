<script setup>
import axios from "axios";
import { VCardSubtitle } from "vuetify/components";
const jobs = ref(null);
const loading = ref(false);
const fetchCompany = async () => {
  loading.value = true;
  const token = useCookie("token");
  if (token.value) {
    const response = await axios.get("/jobs");
    jobs.value = response.data.data;
  }
  loading.value = false;
};

function experienceRequired(experienceLevels) {
  if (experienceLevels.length === 0) {
    return "No experience required";
  }

  const sortedLevels = experienceLevels.slice().sort((a, b) => a - b);

  if (new Set(sortedLevels).size === 1) {
    return `${sortedLevels[0]} years of experience required`;
  }

  const minExperience = sortedLevels[0];
  const maxExperience = sortedLevels[sortedLevels.length - 1];
  return `Experience required: ${minExperience}-${maxExperience} years`;
}
onMounted(async () => {
  await fetchCompany();
});
</script>
<template>
  <div class="jobpage">
    <VContainer>
      <v-row>
        <v-col
          v-for="(job, index) in jobs"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card
            class="pa-3 mb-3 elevation-0 border-gray-500 border h-100 rounded-lg"
          >
            <VCardTitle class="d-flex align-center">
              <div>
                <VAvatar color="red">
                  <img
                    :src="
                      job.company.logo_url
                        ? `http://127.0.0.1:8000/storage/logos/${job.company.logo_url}`
                        : '/Frame.png'
                    "
                    alt="alt"
                  />
                </VAvatar>
              </div>
              <div>
                <VCardTitle>{{ job.title }}</VCardTitle>
                <VCardSubtitle>
                  <div>
                    {{ job.company.name }}
                    <VIcon>mdi-circle-small</VIcon>
                    <span>{{ job.company.location }}</span>
                  </div>
                </VCardSubtitle>
              </div>
            </VCardTitle>
            <div>
              <VChip color="primary">{{ job.employment_type }}</VChip>
            </div>
            <div>
              <div>
                <VChip
                  v-for="(skill, index) in job.required_skills"
                  :key="index"
                  class="mx-1 my-1"
                  size="small"
                >
                  {{ skill }}
                </VChip>
              </div>
            </div>
            <VCardText>
              <div class="my-3">{{ job.description }}</div>
              <div><VIcon>mdi-currency-usd</VIcon>{{ job.salary }}</div>
              <div>
                Required Experience:
                <p class="font-bold">
                  {{ experienceRequired(job.required_experience) }}
                </p>
              </div>
            </VCardText>
            <VCardText class="d-flex justify-center align-center">
              <VBtn
                color="blue-lighten-3"
                class="text-none text-white text-lg text-bold elevation-0 rounded-2xl w-75 bottom-2 position-absolute"
                append-icon="mdi-open-in-new"
                >Apply Now</VBtn
              >
            </VCardText>
          </v-card>
        </v-col>
      </v-row>
    </VContainer>
  </div>
</template>

<style scoped>
.jobpage {
  width: 100%;
  height: 100%;
  /* Add your background pattern here */
  background-color: #ffffff;
  background-image: radial-gradient(rgba(12, 12, 12, 0.171) 2px, transparent 0);
  background-size: 30px 30px;
  background-position: -5px -5px;
  background-repeat: repeat;
}
</style>
