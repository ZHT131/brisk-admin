<template>
  <div class="brisk-imgbox">
    <el-image :src="img404"></el-image>
  </div>
</template>

<script>
import img404 from "~/assets/images/404.png";
export default {
  name:"404",
  data() {
    return {
      img404,
    };
  },
};
</script>

<style lang="scss" scoped>
.brisk-imgbox {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>