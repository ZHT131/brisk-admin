<template>
  <el-row type="flex" justify="space-between" align="middle" style="margin-bottom: 10px">
    <el-button-group>
      <!-- 左侧插槽 -->
      <slot name="left" />
      <el-button v-if="toolShow.add" type="primary" icon="el-icon-plus" size="small">
        新增
      </el-button>
      <el-button v-if="toolShow.edit" type="success" icon="el-icon-edit" size="small">
        编辑
      </el-button>
      <el-button v-if="toolShow.del" type="danger" icon="el-icon-delete" size="small">
        删除
      </el-button>
      <el-button v-if="toolShow.export" type="warning" icon="el-icon-download" size="small">
        导出
      </el-button>
      <!-- 右侧插槽 -->
      <slot name="right" />
    </el-button-group>
    <el-button-group>
      <el-button plain type="info" icon="el-icon-search" size="small" @click="changeSearchShow" />
      <el-button icon="el-icon-refresh" size="small" @click="refresh" />
      <el-popover placement="bottom-end" width="150" trigger="click">
        <template #reference>
          <el-button size="small" icon="el-icon-s-grid"></el-button>
        </template>
        <div class="ym-column">
          <el-checkbox v-model="allColumnsSelected" :indeterminate="allColumnsSelectedIndeterminate" @change="checkAllChange">
            全选
          </el-checkbox>
          <el-checkbox v-for="item in tableColumns" :key="item.property" v-model="item.visible" @change="checkChange(item)">
            {{ item.label }}
          </el-checkbox>
        </div>
      </el-popover>
    </el-button-group>
  </el-row>
</template>

<script>
import { tools } from "@/components/crud/index";
export default {
  mixins: [tools],
};
</script>

<style lang="scss" scoped>
.ym-column {
  display: flex;
  flex-direction: column;
  line-height: 30px;
}
</style>
