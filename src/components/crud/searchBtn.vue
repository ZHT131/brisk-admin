<!--搜索与重置-->
<template>
  <el-col :xs="24" :sm="12" :md="6">
    <div class="ym-row-cen">
      <el-button size="small" type="primary" @click="submitSearchForm">{{$t('searchBtn.query')}}</el-button>
      <el-button size="small" @click="resetSearchForm">{{$t('searchBtn.reset')}}</el-button>
    </div>
  </el-col>
</template>
<script>
import { search } from "@/components/Crud/index";
export default {
  mixins: [search],
};
</script>
<style lang="scss" scoped>
.ym-row-cen {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
