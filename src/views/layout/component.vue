<template>
  <router-view :key="key" v-slot="{ Component }">
    <transition appear name="fade-transform" mode="out-in">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    key() {
      return this.$route.path;
    },
  },
  methods: {},
};
</script>

<style>
</style>