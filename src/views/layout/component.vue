<template>
  <router-view v-slot="{ Component }">
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
    
  },
  methods: {},
};
</script>

<style>
</style>