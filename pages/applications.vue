<script setup>
import axios from "axios";

const jobApplications = ref(null);

const fetchApplications = async () => {
  console.log("hii");
  const response = await axios.get(`/job_applications/my_application`);
  jobApplications.value = response.data.data;
};
onMounted(async () => {
  await fetchApplications();
});
</script>
<template>
  <div>
    <v-container> job applications {{ jobApplications }} </v-container>
  </div>
</template>
