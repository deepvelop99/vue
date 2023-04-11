<template>
  <router-view />
</template>

<script>
import { mixin } from "lodash-es";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  title: mixin,
});
</script>
