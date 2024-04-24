<script setup>
import axios from "axios";
const jobs = ref([]);
const fetchCompany = async () => {
  const response = await axios.get("/jobs");
  jobs.value = response.data.data;
};
onMounted(async () => {
  await fetchCompany();
});
</script>
<template>
  <div>
    <vContainer>{{ jobs }} </vContainer>
  </div>
</template>
