<template>
  <el-row type="flex" justify="space-between" align="middle" style="margin-bottom: 10px">
    <el-button-group>
      <!-- 左侧插槽 -->
      <slot name="left" />
      <el-button v-if="toolShow.add" type="primary" :icon="Plus" size="small" @click="$emit('handleAdd')">
        {{$t("toolBar.add")}}
      </el-button>
      <el-button v-if="toolShow.edit" type="success" :icon="Edit" size="small" @click="$emit('handleSelectEdit')">
        {{$t("toolBar.edit")}}
      </el-button>
      <el-button v-if="toolShow.del" type="danger" :icon="Delete" size="small" @click="$emit('handleSelectDel')">
        {{$t("toolBar.delete")}}
      </el-button>
      <el-popover v-if="toolShow.export" placement="bottom-end" trigger="click">
        <template #reference>
          <el-button type="warning" :icon="Download" size="small" :loading="exportLoading">
            {{$t("toolBar.export")}}
          </el-button>
        </template>
        <div class="ym-column">
          <div class="export-item" @click="$emit('handleExport','xlsx')">xlsx</div>
          <div class="export-item" @click="$emit('handleExport','csv')">csv</div>
          <div class="export-item" @click="$emit('handleExport','txt')">txt</div>
        </div>
      </el-popover>
      <!-- 右侧插槽 -->
      <slot name="right" />
    </el-button-group>
    <el-button-group>
      <el-button plain type="info" :icon="Search" size="small" @click="changeSearchShow" />
      <el-button :icon="Refresh" size="small" @click="refresh" />
      <el-popover placement="bottom-end" trigger="click">
        <template #reference>
          <el-button size="small" :icon="Grid"></el-button>
        </template>
        <div class="ym-column">
          <el-checkbox v-model="allColumnsSelected" :indeterminate="allColumnsSelectedIndeterminate" @change="checkAllChange">
            {{$t("toolBar.select_all")}}
          </el-checkbox>
          <el-checkbox v-for="item in tableColumns" :key="item.property" v-model="item.visible" @change="checkChange(item)">
            {{ $t(item.label) }}
          </el-checkbox>
        </div>
      </el-popover>
    </el-button-group>
  </el-row>
</template>

<script>
import { Plus, Edit, Delete, Download, Search, Refresh, Grid } from "@element-plus/icons-vue";
import { tools } from "~/components/crud/index";
export default {
  mixins: [tools],
  setup() {
    return {
      Plus,
      Edit,
      Delete,
      Download,
      Search,
      Refresh,
      Grid
    }
  }
};
</script>

<style lang="scss" scoped>
.ym-column {
  display: flex;
  flex-direction: column;
  line-height: 30px;
  .export-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    background: #f8f8f8;
    margin: 2px;
    cursor: pointer;
  }
}
</style>
