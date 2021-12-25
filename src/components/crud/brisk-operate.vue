<template>
  <el-table-column :fixed="device == 'mobile' ? false : 'right'" :label="$t('table.operate')" width="165">
    <template #default="scope">
      <div class="ym-row">
        <!-- 左侧插槽 -->
        <slot name="left" :row="scope.row" />
        <el-button v-if="showOperate.view" type="primary" :icon="View" @click="handleView(scope.row)" size="small"></el-button>
        <el-button v-if="showOperate.edit" type="success" :icon="Edit" @click="handleEdit(scope.row)" size="small"></el-button>
        <el-button v-if="showOperate.del" type="danger" :icon="Delete" @click="handleDel(scope.row)" size="small"></el-button>
        <!-- 右侧插槽 -->
        <slot name="right" :row="scope.row" />
      </div>
    </template>
  </el-table-column>
</template>

<script>
import { View, Edit, Delete } from "@element-plus/icons-vue";
import { operate } from "~/components/Crud/index";
export default {
  mixins: [operate],
  setup() {
    return {
      View,
      Edit,
      Delete
    }
  }
};
</script>

<style lang="scss">
.ym-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  .el-button {
    margin: 2px;
  }
}
</style>