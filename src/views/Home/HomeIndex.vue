<template>
  <custom-header @create-account="handleAccountCreate" @login="handleLogin" />
  <contact />
  <div class="flex justify-center py-10 bg-brand-gray">
    <p class="font-medium text-center text-gray-800">feedbacker 2024</p>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import Contact from "./Contact.vue";
import CustomHeader from "./CustomHeader.vue";
import useModal from "../../hooks/useModal";

export default {
  name: "HomeIndex",
  components: { CustomHeader, Contact },
  setup() {
    const router = useRouter();
    const modal = useModal();

    onMounted(() => {
      const token = window.localStorage.getItem("token");
      if (token) {
        router.push({ name: "Feedbacks" });
      }
    });

    function handleLogin() {
      modal.open({
        component: "ModalLogin",
      });
    }

    function handleAccountCreate() {
      modal.open({
        component: "ModalAccountCreate",
      });
    }

    return {
      handleLogin,
      handleAccountCreate,
    };
  },
};
</script>
