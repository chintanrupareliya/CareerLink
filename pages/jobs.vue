<script setup>
//Imports
import axios from "axios";
import { requiredValidator } from "../utils/validation";
import { toast } from "vue3-toastify";

//// Initial data for the component
const jobs = ref(null);
const loading = ref(false);
const dialog = ref(false);
const formRef = ref();
const resume = ref(null);
const selectedJobId = ref(null);
const coverLetter = ref(null);

// Fetch data from the API
const fetchJobs = async () => {
  loading.value = true;
  const token = useCookie("token");
  if (token.value) {
    const response = await axios.get("/job");
    jobs.value = response.data.data;
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  }
};

// Function to initiate the job application process
const applyForJob = (jobId) => {
  selectedJobId.value = jobId;
  dialog.value = true;
};

// Function to handle form submission for job application
const handleSubmit = async () => {
  try {
    const formData = new FormData();

    formData.append("job_id", selectedJobId.value);
    formData.append("resume", resume.value);
    formData.append("cover_letter", coverLetter.value);
    const response = await axios.post("job_application/create", formData);
    if (response.status === 200) {
      dialog.value = false;
      toast.success("Application submitted successfully");
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.data);
  }
};

// Function to format the required experience levels for a job
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

// Fetch data from the API when the component is mounted
onMounted(async () => {
  await fetchJobs();
});
</script>

<template>
  <div>
    <div class="jobpage">
      <!-- display a loading while the data is fetch from api  -->
      <div v-if="jobs === null" class="d-flex align-center justify-center">
        <VProgressCircular :size="40" color="primary" indeterminate />
      </div>

      <!-- display data after fetched from api  -->
      <VContainer v-else>
        <VRow>
          <VCol
            v-for="(job, index) in jobs"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-skeleton-loader
              type="list-item-avatar-two-line,divider,chip,list-item,list-item-two-line,article,button"
              :loading="loading"
              class="h-100"
            >
              <VCard
                class="pa-3 mb-3 elevation-0 border-gray-500 border h-100 rounded-lg"
              >
                <VCardText class="d-flex justify-between">
                  <div class="d-flex align-center">
                    <!-- 👉  Avatar -->
                    <VAvatar
                      size="32"
                      :color="job.company.logo_url ? '' : 'primary'"
                      :class="
                        job.company.logo_url
                          ? ''
                          : 'v-avatar-light-bg primary--text'
                      "
                      :variant="!job.company.logo_url ? 'tonal' : undefined"
                    >
                      <VImg
                        v-if="job.company.logo_url"
                        :src="fetchImage(`logos/${job.company.logo_url}`)"
                      />
                      <span v-else>{{ avatarText(job.company.name) }}</span>
                    </VAvatar>
                  </div>
                  <div class="d-flex flex-column ms-3">
                    <span class="d-block">{{ job.title }}</span>

                    <span class="text-gray-500">
                      {{ job.company.name }}
                      <span>
                        <VIcon>mdi-circle-small</VIcon>
                        {{ job.company.location }}
                      </span>
                    </span>
                  </div>
                </VCardText>
                <VDivider color="primary" />
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

                  <div class="mb-2">
                    <VChip prepend-icon="mdi-currency-usd">
                      {{ job.salary }}
                    </VChip>
                  </div>

                  <div>
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
                    @click="applyForJob(job.id)"
                    >Apply Now</VBtn
                  >
                </VCardText>
              </VCard>
            </v-skeleton-loader>
          </VCol>
        </VRow>
      </VContainer>
    </div>

    <div class="pa-4 text-center">
      <VDialog v-model="dialog" max-width="600">
        <VCard
          prepend-icon="mdi-application-edit-outline"
          title="Job Application"
        >
          <VForm @submit.prevent="handleSubmit" ref="formRef">
            <VCardText>
              <VRow dense>
                <VCol cols="12">
                  <VFileInput
                    small-chips
                    label="Upload Resume*"
                    show-size
                    prepend-icon="mdi-file-pdf-box"
                    variant="outlined"
                    v-model="resume"
                    :rules="[requiredValidator]"
                  >
                  </VFileInput>
                  <small class="text-caption text-medium-emphasis"
                    >File size must be less than 2MB</small
                  >
                </VCol>
                <VCol cols="12">
                  <VTextarea
                    label="Cover Letter*"
                    v-model="coverLetter"
                    variant="outlined"
                  ></VTextarea>
                </VCol>
              </VRow>

              <small class="text-caption text-medium-emphasis"
                >*indicates required field</small
              >
            </VCardText>

            <VDivider></VDivider>

            <VCardActions>
              <VSpacer></VSpacer>

              <VBtn text="Close" variant="plain" @click="dialog = false"></VBtn>

              <VBtn
                color="primary"
                text="Apply"
                variant="tonal"
                type="submit"
              ></VBtn>
            </VCardActions>
          </VForm>
        </VCard>
      </VDialog>
    </div>
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
