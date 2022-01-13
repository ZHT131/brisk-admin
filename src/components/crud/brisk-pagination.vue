<template>
  <div class="brisk-page">
    <el-pagination :small="device == 'mobile' ? true : false" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :page-sizes="pageSizes" :layout="
          device == 'mobile'
            ? pageMobileLayout
            : pageDesktopLayout
        " :total="pageTotal"></el-pagination>
  </div>
</template>

<script>
import { pagination } from "~/components/Crud/index";
export default {
  mixins: [pagination],
};
</script>

<style lang="scss" scoped>
.brisk-page {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>

