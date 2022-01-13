<template>
  <div class="brisk-imgbox">
    <el-image :src="img401"></el-image>
  </div>
</template>

<script>
import img401 from "~/assets/images/401.png";
export default {
  name:"401",
  data() {
    return {
      img401,
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