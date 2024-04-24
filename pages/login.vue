<script setup>
import axios from "axios";
import { emailValidator, requiredValidator } from "../utils/validation";
const email = ref("");
const password = ref("");
const router = useRouter();
const onsubmit = async () => {
  const validate = await formRef.value.validate();
  if (validate.valid) {
    const formdata = {
      email: email.value,
      password: password.value,
    };
    const response = await axios.post("auth/login", formdata);
    const token = response.data.data.token;
    localStorage.setItem("token", token);
    router.push("/jobs");
  }
};
</script>
<template>
  <div class="h-screen flex justify-center items-center">
    <VCard class="w-full md:max-w-md p-10 border rounded-xl">
      <v-container>
        <VCardText class="w-full">
          <VCardTitle class="text-h5 mb-5">Login To Team Track</VCardTitle>
          <VForm @submit.prevent="onsubmit" ref="refForm">
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
              type="password"
              :rules="[requiredValidator]"
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
