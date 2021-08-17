<template>
  <el-drawer :size="220" :model-value="showSet" direction="rtl" :before-close="handleClose" destroy-on-close>
    <span>我来啦!</span>
  </el-drawer>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      showSet: (state) => state.app.showSet,
    }),
  },
  methods: {
    handleClose() {
      this.$store.dispatch("app/setShowSet", !this.showSet);
    },
  },
};
</script>

<style>
</style>