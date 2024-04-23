<script setup>
import axios from "axios";
const jobs = ref([]);
const fetchLatestJob = async () => {
  const responce = await axios.get("/jobs");
  jobs.value = responce.data.data;
};
onMounted(async () => {
  await fetchLatestJob();
});
// onMounted(fetchLatestJob());
</script>
<template>
  <div class="mt-5">
    <VContainer>
      <div class="d-flex align-center justify-between">
        <div class="text-h3 ma-5">
          <h1
            class="text-indigo-darken-4 font-weight-bold text-shades-black tracking-wide font-mono"
          >
            Featured<span class="text-blue-lighten-2 mt-2">Jobs</span>
          </h1>
        </div>
        <div>
          <NuxtLink to="/jobs" class="text-blue-700"
            >Show all jobs <VIcon>mdi-arrow-right</VIcon></NuxtLink
          >
        </div>
      </div>
      <div v-if="jobs.length === 0">No jobs available</div>
      <div v-else>
        <v-row>
          <v-col
            v-for="(job, index) in jobs"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card class="pa-3 mb-3 elevation-0 border-gray-500 border">
              <VCardTitle class="d-flex justify-between">
                <div>
                  <VAvatar color="red">
                    <img
                      :src="`http://127.0.0.1:8000/storage/logos/${job.company.logo_url}`"
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
                    {{ job.company.name }}
                    <span>{{ job.company.location }}</span>
                  </div>
                </VCardText>
              </div>
              <VCardText>
                <div>Description: {{ job.description }}</div>

                <div>Salary: {{ job.salary }}</div>
                <div>Employment Type: {{ job.employment_type }}</div>
                <div>
                  Required Experience:
                  <ul>
                    <li
                      v-for="(experience, index) in job.required_experience"
                      :key="index"
                    >
                      {{ experience }}
                    </li>
                  </ul>
                </div>
                <div>
                  Required Skills:
                  <ul>
                    <li
                      v-for="(skill, index) in job.required_skills"
                      :key="index"
                    >
                      {{ skill }}
                    </li>
                  </ul>
                </div>
                <div>Posted Date: {{ job.posted_date }}</div>
                <div>Expiry Date: {{ job.expiry_date }}</div>
              </VCardText>
              <!-- Add other job details here -->

              <!-- Add action buttons, if needed -->
            </v-card>
          </v-col>
        </v-row>
      </div>
    </VContainer>
  </div>
</template>
