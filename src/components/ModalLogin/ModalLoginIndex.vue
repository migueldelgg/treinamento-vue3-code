<template>
  <div>
    <div class="flex justify-between" id="modal-login">
      <h1 class="text-4xl font-black text-gray-800">Entre na sua conta</h1>
      <button @click="close" class="text-4xl text-gray-600 focus:outline-none">
        &times;
      </button>
    </div>

    <div class="mt-16">
      <form @submit.prevent="handleSubmit">
        <label class="block">
          <span class="text-lg font-medium text-gray-800">E-mail</span>
          <input
            id="email-field"
            v-model="state.email.value"
            type="email"
            :class="{
              'border-brand-danger': !!state.email.errorMessage,
            }"
            class="block w-full px-4 py-3 mt-1 text-xl bg-gray-100 border-2 border-transparent rounded"
            placeholder="jane.dae@gmail.com"
          />

          <span
            id="email-error"
            v-if="!!state.email.errorMessage"
            class="block font-medium text-brand-danger"
          >
            {{ state.email.errorMessage }}
          </span>
        </label>

        <label class="block mt-9">
          <span class="text-lg font-medium text-gray-800">Senha</span>
          <input
            id="password-field"
            v-model="state.password.value"
            type="password"
            :class="{
              'border-brand-danger': !!state.password.errorMessage,
            }"
            class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
            placeholder="Digite sua senha"
          />
          <span
            v-if="!!state.password.errorMessage"
            class="block font-medium text-brand-danger"
          >
            {{ state.password.errorMessage }}
          </span>
        </label>

        <button
          id="submit-button"
          :disabled="state.isLoading"
          type="submit"
          :class="{
            'opacity-50': state.isLoading,
          }"
          class="px-8 py-3 mt-20 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
        >
          <icon v-if="state.isLoading" name="loading" class="animate-spin" />
          <span v-else>Entrar</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useField } from "vee-validate";
import { useToast } from "vue-toastification";
import useModal from "../../hooks/useModal";
import services from "../../services";
import Icon from "../Icon/IconIndex.vue";
/* eslint-disable no-unused-vars */
import { validateEmptyAndLength3 } from "../../utils/validators";
import { validateEmptyAndEmail } from "../../utils/validators";
/* eslint-enable no-unused-vars */

export default {
  components: { Icon },
  setup() {
    const router = useRouter();
    const modal = useModal();
    const toast = useToast();

    const { value: emailValue, errorMessage: emailErrorMessage } = useField(
      "email",
      validateEmptyAndEmail
    );

    const { value: passwordValue, errorMessage: passwordErrorMessage } =
      useField("password", validateEmptyAndLength3);

    const state = reactive({
      hasError: false,
      isLoading: false,
      email: {
        value: emailValue,
        errorMessage: emailErrorMessage,
      },
      password: {
        value: passwordValue,
        errorMessage: passwordErrorMessage,
      },
    });
    async function handleSubmit() {
      try {
        toast.clear();
        state.isLoading = true;
        const { data, errors } = await services.auth.login({
          email: state.email.value,
          password: state.password.value,
        });

        if (!errors) {
          window.localStorage.setItem("token", data.token);
          router.push({ name: "Feedbacks" });
          state.isLoading = false;
          modal.close();
          return;
        }

        if (errors.status == 404) {
          toast.error("Email não encontrado!");
        }
        if (errors.status == 401) {
          toast.error("Email/senha inválidos.");
        }
        if (errors.status == 400) {
          toast.error("Ocorreu um erro ao fazer o login.");
        }

        state.isLoading = false;
      } catch (error) {
        state.isLoading = false;
        state.hasError = !!error;
        toast.error("Ocorreu um erro ao fazer o login.");
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit,
    };
  },
};
</script>
