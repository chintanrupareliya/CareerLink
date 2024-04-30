<script setup>
//
import axios from "axios";
import { VCardSubtitle } from "vuetify/components";

const jobApplications = ref(null);
const loading = ref(false);

//Fetch data from API
const fetchApplications = async () => {
  loading.value = true;
  const response = await axios.get(`/job_applications/my_application`);
  jobApplications.value = response.data.data;
  loading.value = false;
};

//return status and color for status field
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

//return image url of backend
const fetchImage = (url) => {
  const BASEURL = "http://127.0.0.1:8000/storage/";
  const image = BASEURL + `${url}`;

  return image;
};

//formate apply date it Today,1 day ago...
const formatDateToTimeAgo = (dateString) => {
  const currentDate = new Date();
  const previousDate = new Date(dateString);

  // Check if the dates are the same day
  if (currentDate.toDateString() === previousDate.toDateString()) {
    return "today";
  }

  const elapsedMilliseconds = currentDate - previousDate;
  const days = Math.floor(elapsedMilliseconds / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""} ago`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }
};

//fetch data of application on load of page
onMounted(async () => {
  await fetchApplications();
});
</script>

<template>
  <div class="application">
    <div v-if="loading" class="d-flex align-center justify-center">
      <VProgressCircular :size="40" color="primary" indeterminate />
    </div>

    <VContainer v-else-if="jobApplications && jobApplications.length > 0">
      <VRow>
        <VCol cols="12" class="text-center text-h4"> Job Applications </VCol>
      </VRow>

      <VRow>
        <v-col
          v-for="application in jobApplications"
          :key="application.id"
          cols="12"
        >
          <v-card class="mb-4" outlined>
            <VContainer>
              <v-card-title>
                Job Title:{{ application.job.title }}
              </v-card-title>

              <VCardSubtitle>
                <VIcon>mdi-map-marker</VIcon>
                {{ application.job.company.location }}
              </VCardSubtitle>

              <VCardText class="d-flex w-100 justify-space-around flex-wrap">
                <VRow>
                  <VCol cols="12" lg="3" md="3" sm="3">
                    <div>
                      {{ application.cover_letter }}
                    </div>
                  </VCol>

                  <VCol cols="12" lg="3" md="3" sm="3">
                    <div>
                      <VChip
                        :color="getStatusDisplay(application.status).color"
                      >
                        {{ getStatusDisplay(application.status).status }}
                      </VChip>
                    </div>
                  </VCol>

                  <VCol cols="12" lg="3" md="3" sm="3">
                    <div>
                      <VChip color="success" prepend-icon="mdi-clock">
                        {{
                          formatDateToTimeAgo(
                            new Date(application.application_date)
                          )
                        }}
                      </VChip>
                    </div>
                  </VCol>

                  <VCol cols="12" lg="3" md="3" sm="3">
                    <div class="text-blue-700 ma-4">
                      <a
                        :href="fetchImage(application.resume)"
                        target="_blank"
                        class="hover:underline"
                      >
                        View Resume
                      </a>
                    </div>
                  </VCol>
                </VRow>
              </VCardText>
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
            </VContainer>
          </v-card>
        </v-col>
      </VRow>
    </VContainer>
    <div v-else class="h-full">
      <div
        cols="12"
        class="text-center d-flex align-center justify-center h-full"
      >
        <h1 class="text-h3">No job applications found.</h1>
      </div>
    </div>
  </div>
</template>

//style for background
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
