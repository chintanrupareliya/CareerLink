<script setup>
//Imports
import { emailValidator, requiredValidator } from "../utils/validation";
import { useUserStore } from "@/store/useUser";
import { toast } from "vue3-toastify";

// References
const email = ref("");
const password = ref("");
const router = useRouter();
const refForm = ref();
const visible = ref(false);

// Accessing user store
const userStore = useUserStore();

const { handleLogin } = userStore;

// Function to handle form submission
const onSubmit = async () => {
  try {
    const validate = await refForm.value.validate();
    if (validate.valid) {
      const formData = {
        email: email.value,
        password: password.value,
      };
      await handleLogin(formData);
      router.push("/jobs");
    }
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
</script>

<template>
  <div class="h-screen flex justify-center items-center">
    <VCard class="w-full md:max-w-md p-10 border rounded-xl">
      <v-container>
        <VCardText class="w-full">
          <VCardTitle class="text-h5 mb-5">Login To Team Track</VCardTitle>
          <!-- Login form  -->
          <VForm @submit.prevent="onSubmit" ref="refForm">
            <VTextField
              v-model="email"
              label="Email"
              variant="outlined"
              :rules="[emailValidator, requiredValidator]"
              class="my-4"
            />

            <VTextField
              v-model="password"
              label="Password"
              variant="outlined"
              :rules="[requiredValidator]"
              :type="visible ? 'text' : 'password'"
              @click:append-inner="visible = !visible"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              class="my-4"
            />

            <VBtn
              color="blue"
              type="submit"
              class="text-none w-full mt-5 font-bold"
              >Submit</VBtn
            >
          </VForm>
        </VCardText>
        <VCardActions class="">
          <p class="flex items-center">
            <span class="mr-auto">Don't have an account?</span>
            <NuxtLink to="/register" class="text-blue-600">Register</NuxtLink>
          </p>
        </VCardActions>
        <div class="flex justify-center items-center my-5">
          <div class="border w-1/4 h-0"></div>
          <p class="mx-2">or</p>
          <div class="border w-1/4 h-0"></div>
        </div>
      </v-container>
    </VCard>
  </div>
</template>
