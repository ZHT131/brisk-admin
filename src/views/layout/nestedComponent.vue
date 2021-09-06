<template>
  <div>
    <router-view v-slot="{ Component }">
      <transition appear name="fade-transform" mode="out-in">
        <keep-alive v-if="keepAliveRoutes" :include="keepAliveRoutes">
          <component :is="Component" :key="key" />
        </keep-alive>
        <component v-else :is="Component" :key="key" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "nestedComponent",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      keepAliveRoutes: (state) => state.user.keepAliveRoutes,
    }),
    key() {
      return this.$route.path;
    },
  },
  methods: {},
};
</script>

<style>
</style>