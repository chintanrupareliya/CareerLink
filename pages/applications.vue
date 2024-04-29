<script setup>
import axios from "axios";
import { VCardSubtitle } from "vuetify/components";

const jobApplications = ref(null);

const fetchApplications = async () => {
  console.log("hii");
  const response = await axios.get(`/job_applications/my_application`);
  jobApplications.value = response.data.data;
};

const getStatusDisplay = (statusCode) => {
  let status = "";
  let color = "";

  switch (statusCode) {
    case "P":
      status = "Pending";
      color = "error";
      break;
    case "A":
      status = "Approved";
      color = "primary";
      break;
    case "R":
      status = "Rejected";
      color = "success";
      break;
    default:
      status = "Unknown";
      color = "success";
  }

  return { status, color };
};

const avatarText = (value) => {
  if (!value) return "";
  const nameArray = value.split(" ");

  return nameArray.map((word) => word.charAt(0).toUpperCase()).join("");
};

const fetchImage = (url) => {
  const BASEURL = "http://127.0.0.1:8000/storage/";
  const image = BASEURL + `${url}`;

  return image;
};

const formatDateToTimeAgo = (dateString) => {
  const currentDate = new Date();
  const previousDate = new Date(dateString);
  const elapsedMilliseconds = currentDate - previousDate;

  const seconds = Math.floor(elapsedMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  }
};

onMounted(async () => {
  await fetchApplications();
});
</script>
<template>
  <div class="application">
    <v-container>
      <v-row>
        <v-col
          v-for="application in jobApplications"
          :key="application.id"
          cols="12"
        >
          <v-card class="mb-4" outlined>
            <vContainer>
              <v-card-title>Job Title:{{ application.job.title }}</v-card-title>
              <VCardSubtitle
                ><VIcon>mdi-map-marker</VIcon
                >{{ application.job.company.location }}</VCardSubtitle
              >
              <v-card-text class="d-flex w-100 justify-space-around flex-wrap">
                <div class="ma-4">{{ application.cover_letter }}</div>
                <div class="ma-4">
                  <VChip :color="getStatusDisplay(application.status).color">{{
                    getStatusDisplay(application.status).status
                  }}</VChip>
                </div>
                <div class="ma-4">
                  <VChip color="success" prepend-icon="mdi-clock">
                    {{ formatDateToTimeAgo(application.application_date) }}
                  </VChip>
                </div>
                <div class="text-blue-700 ma-4">
                  <a
                    :href="fetchImage(application.resume)"
                    target="_blank"
                    class="hover:underline"
                  >
                    View Resume
                  </a>
                </div>
              </v-card-text>
              <div class="d-flex align-center">
                <!-- 👉  Avatar -->
                <VAvatar
                  size="32"
                  :color="application.job.company.logo_url ? '' : 'primary'"
                  :class="
                    application.job.company.logo_url
                      ? ''
                      : 'v-avatar-light-bg primary--text'
                  "
                  :variant="
                    !application.job.company.logo_url ? 'tonal' : undefined
                  "
                >
                  <VImg
                    v-if="application.job.company.logo_url"
                    :src="
                      fetchImage(`logos/${application.job.company.logo_url}`)
                    "
                  />
                  <span v-else>{{
                    avatarText(application.job.company.name)
                  }}</span>
                </VAvatar>

                <!--👉  Name and location -->
                <div class="d-flex flex-column ms-3">
                  <span
                    class="d-block font-weight-medium text--primary text-truncate"
                    >{{ application.job.company.name }}</span
                  >
                  <small>{{ application.job.company.location }}</small>
                </div>
              </div>
            </vContainer>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped>
.application {
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
