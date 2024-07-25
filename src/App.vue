<template>
  <modal-factory-index />
  <router-view />
</template>

<script>
import ModalFactoryIndex from "./components/ModalFactory/ModalFactoryIndex.vue";

export default {
  components: { ModalFactoryIndex },
};
</script>
