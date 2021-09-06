<template>
  <div>menu1
     <el-input v-model="input" placeholder="请输入内容"></el-input>
  </div>
</template>

<script>
export default {
  name:"menu1",
  data() {
    return {
      input:'',
    };
  },
  created() {
    console.log("menu1缓存了吗？");
  },
};
</script>

<style>
</style>