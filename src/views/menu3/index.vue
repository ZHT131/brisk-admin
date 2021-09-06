<template>
  <div>menu3
    <el-input v-model="input" placeholder="请输入内容"></el-input>
  </div>
</template>

<script>
export default {
  name:"menu3",
  data() {
    return {
      input:'',
    };
  },
  created() {
    console.log("menu3缓存了吗？");
  },
};
</script>

<style>
</style>