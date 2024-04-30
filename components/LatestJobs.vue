<script setup>
//Imports
import axios from "axios";

// Initial data for the component
const jobs = ref([]);
const loading = ref(false);
const router = useRouter();

// Fetching data from the API
const fetchLatestJob = async () => {
  loading.value = true;
  const responce = await axios.get("/latest_jobs");
  jobs.value = responce.data.data;
  loading.value = false;
};

// covert array to experience Required string
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

//redirect user to login it try to access jobs
const handleShowJob = () => {
  const token = useCookie("token");
  if (token.value) {
    router.push("/jobs");
  } else {
    router.push("/login");
  }
};

// Call the fetchLatestJob function when the component is mounted
onMounted(async () => {
  await fetchLatestJob();
});
</script>
<template>
  <div class="mt-5 Jobs">
    <!-- Show a loading spinner while the jobs are being fetched -->

    <div v-if="loading" class="d-flex align-center justify-center">
      <VProgressCircular :size="40" color="primary" indeterminate />
    </div>

    <!-- Show the jobs when they have been fetched -->
    <VContainer v-else>
      <div class="d-flex align-center justify-between">
        <div class="text-h3 ma-5">
          <h1
            class="text-indigo-darken-4 font-weight-bold text-shades-black tracking-wide font-mono"
          >
            Featured<span class="text-blue-lighten-2 mt-2">Jobs</span>
          </h1>
        </div>
        <div>
          <VBtn
            class="text-blue-700 elevation-0 text-none bg-transparent"
            @click="handleShowJob"
          >
            Show all jobs <VIcon>mdi-arrow-right</VIcon>
          </VBtn>
        </div>
      </div>
      <div v-if="jobs.length === 0">No jobs available</div>
      <div v-else>
        <VRow>
          <VCol
            v-for="(job, index) in jobs"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <VCard
              class="pa-3 mb-3 elevation-0 border-gray-500 border h-100 rounded-lg"
            >
              <VCardTitle class="d-flex justify-between">
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
                  <VChip color="primary" rounded="0" variant="outlined">{{
                    job.employment_type
                  }}</VChip>
                </div>
              </VCardTitle>

              <div>
                <VCardTitle>{{ job.title }}</VCardTitle>

                <VCardText>
                  <div>
                    {{ job.company.name }} <VDivider vertical />
                    <span>{{ job.company.location }}</span>
                  </div>
                </VCardText>
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
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </div>
    </VContainer>
  </div>
</template>

<style scoped>
.Jobs {
  background-position: center;
  background-size: cover;
  background-image: url("../public/Desktop1.jpg");
}
</style>
