<template>
  <el-table-column :fixed="device == 'mobile' ? false : 'right'" label="操作" width="165">
    <template #default="scope">
      <div class="ym-row">
        <!-- 左侧插槽 -->
        <slot name="left" :row="scope.row" />
        <el-button v-if="showOperate.view" type="primary" icon="el-icon-view" @click="handleView(scope.row)" size="small"></el-button>
        <el-button v-if="showOperate.edit" type="success" icon="el-icon-edit" @click="handleEdit(scope.row)" size="small"></el-button>
        <el-button v-if="showOperate.del" type="danger" icon="el-icon-delete" @click="handleDel(scope.row)" size="small"></el-button>
        <!-- 右侧插槽 -->
        <slot name="right" :row="scope.row" />
      </div>
    </template>
  </el-table-column>
</template>

<script>
import { operate } from "@/components/Crud/index";
export default {
  mixins: [operate],
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