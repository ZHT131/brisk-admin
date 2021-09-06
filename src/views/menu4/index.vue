<template>
  <div>menu4
     <el-input v-model="input" placeholder="请输入内容"></el-input>
  </div>
</template>

<script>
export default {
  name:"menu4",
  data() {
    return {
      input:'',
    };
  },
  created() {
    console.log("menu4缓存了吗？");
  },
};
</script>

<style>
</style>