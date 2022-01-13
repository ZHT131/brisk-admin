<!--搜索与重置-->
<template>
  <el-col :xs="24" :sm="12" :md="6">
    <div class="brisk-row-cen">
      <el-button type="primary" @click="submitSearchForm">{{$t('searchBtn.query')}}</el-button>
      <el-button @click="resetSearchForm">{{$t('searchBtn.reset')}}</el-button>
    </div>
  </el-col>
</template>
<script>
import { search } from "~/components/Crud/index";
export default {
  mixins: [search],
};
</script>
<style lang="scss" scoped>
.brisk-row-cen {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
