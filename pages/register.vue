<script setup>
// Imports
import {
  requiredValidator,
  emailValidator,
  passwordValidator,
  confirmedValidator,
} from "../utils/validation";
import { useUserStore } from "~/store/useUser";

// References
const email = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");
const formRef = ref();
const passwordConfirmation = ref("");
const userStore = useUserStore();
const router = useRouter();
const visible = ref(false);
const comfirmvisible = ref(false);

// Destructuring handleRegister method from user store
const { handleRegister } = userStore;

// Function to handle form submission
const onSubmit = async () => {
  const validate = await formRef.value.validate();
  if (validate.valid) {
    const formData = {
      first_name: firstName.value,
      last_name: lastName.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    };
    await handleRegister(formData);
    router.push("/jobs");
  }
};
</script>

<template>
  <div class="flex justify-center items-center">
    <VContainer class="flex flex-col justify-center items-center">
      <VCard class="w-full md:max-w-md p-10 border rounded-xl">
        <VContainer>
          <VCardText class="w-full">
            <VCardTitle class="text-h5 mb-5">Register To Team Track</VCardTitle>
            <VForm @submit.prevent="onSubmit" ref="formRef">
              <VTextField
                v-model="firstName"
                label="First Name"
                :rules="[requiredValidator]"
                variant="outlined"
                class="my-4"
              />

              <VTextField
                v-model="lastName"
                label="Last Name"
                :rules="[requiredValidator]"
                variant="outlined"
                class="my-4"
              />

              <VTextField
                v-model="email"
                label="Email"
                variant="outlined"
                :rules="[requiredValidator, emailValidator]"
                class="my-4"
              />

              <VTextField
                v-model="password"
                label="Password"
                variant="outlined"
                :rules="[requiredValidator, passwordValidator]"
                :type="visible ? 'text' : 'password'"
                @click:append-inner="visible = !visible"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                class="my-4"
              />

              <VTextField
                v-model="passwordConfirmation"
                label="Confirm Password"
                variant="outlined"
                :rules="[
                  requiredValidator,
                  confirmedValidator(passwordConfirmation, password),
                ]"
                :type="comfirmvisible ? 'text' : 'password'"
                @click:append-inner="comfirmvisible = !comfirmvisible"
                :append-inner-icon="comfirmvisible ? 'mdi-eye-off' : 'mdi-eye'"
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

          <VCardActions>
            <p class="flex items-center">
              <span class="mr-auto">Already have an account?</span>
              <NuxtLink to="/login" class="text-blue-600">Login</NuxtLink>
            </p>
          </VCardActions>

          <div class="flex justify-center items-center my-5">
            <div class="border w-1/4 h-0"></div>
            <p class="mx-2">or</p>
            <div class="border w-1/4 h-0"></div>
          </div>
        </VContainer>
      </VCard>
    </VContainer>
  </div>
</template>
