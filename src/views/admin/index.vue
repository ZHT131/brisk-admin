<template>
  <div class="ym-main">
    <!-- 搜索框 -->
    <div class="ym-search-box" v-if="showSearch">
      <el-form ref="searchForm" :model="searchForm" :rules="searchRules" size="medium" label-width="100px" label-position="left" style="margin-bottom: 20px">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item label="ID" prop="id" size="small">
              <el-input placeholder="请输入ID" v-model="searchForm.id" clearable :style="{ width: '100%' }" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item label="用户名" prop="username" size="small">
              <el-input placeholder="请输入用户名" v-model="searchForm.username" clearable :style="{ width: '100%' }" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item label="昵称" prop="nickname" size="small">
              <el-input placeholder="请输入昵称" v-model="searchForm.nickname" clearable :style="{ width: '100%' }" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item label="组别ID" prop="group_id" size="small">
              <el-input placeholder="请输入组别ID" v-model="searchForm.group_id" clearable :style="{ width: '100%' }" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item label="角色组" prop="group.name" size="small">
              <el-input placeholder="请输入角色组" v-model="searchForm.group.name" clearable :style="{ width: '100%' }" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item label="状态" prop="status" size="small">
              <el-select v-model="searchForm.status" placeholder="请选择" :style="{ width: '100%' }">
                <el-option v-for="item in statusFilters" :key="item.value" :label="item.text" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 搜索操作 -->
          <el-col :xs="24" :sm="12" :md="6">
            <div class="ym-row-cen">
              <el-button size="small" type="primary" @click="submitSearchForm">查询</el-button>
              <el-button size="small" @click="resetSearchForm">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row type="flex" justify="space-between" align="middle" style="margin-bottom: 10px">
      <el-button-group>
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
      </el-button-group>
      <el-button-group>
        <el-button plain type="info" icon="el-icon-search" size="small" @click="changeSearchShow" />
        <el-button icon="el-icon-refresh" size="small" @click="refresh" />
        <el-popover placement="bottom-end" width="150" trigger="click">
          <template #reference>
            <el-button size="small" icon="el-icon-s-grid"></el-button>
          </template>
          <div class="ym-column">
            <el-checkbox v-model="allColumnsSelected" :indeterminate="allColumnsSelectedIndeterminate" @change="handleCheckAllChange">
              全选
            </el-checkbox>
            <el-checkbox v-for="item in tableColumns" :key="item.property" v-model="item.visible" @change="handleCheckChange(item)">
              {{ item.label }}
            </el-checkbox>
          </div>
        </el-popover>
      </el-button-group>
    </el-row>
    <div style="flex: 1">
      <el-table ref="tables" v-loading="loadingStatus" :data="tableData" border stripe style="width: 100%">
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column v-if="showColumns.id" prop="id" label="ID" min-width="180" sortable></el-table-column>
        <el-table-column v-if="showColumns.username" prop="username" label="用户名" min-width="180"></el-table-column>
        <el-table-column v-if="showColumns.nickname" prop="nickname" label="昵称" min-width="180"></el-table-column>
        <el-table-column v-if="showColumns.group_id" prop="group_id" label="组别ID" min-width="180"></el-table-column>
        <el-table-column v-if="showColumns.group_name" prop="group.name" label="角色组" min-width="180">
          <template #default="scope">
            <el-tag size="medium">{{ scope.row.group.name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="showColumns.status" prop="status" label="状态" :filters="statusFilters" :filter-method="statusFilterTag" filter-placement="bottom-end" min-width="180">
          <template #default="scope">
            <el-tag :type="scope.row.status == '1' ? 'success' : 'danger'" disable-transitions>{{ scope.row.status_text }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column :fixed="$store.state.app.device == 'mobile' ? false : 'right'" label="操作" width="165">
          <template #default="scope">
            <div class="ym-row">
              <el-button type="primary" icon="el-icon-view" @click="handleClick(scope.row)" size="small"></el-button>
              <el-button type="success" icon="el-icon-edit" size="small"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="small"></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="ym-page">
      <el-pagination :small="$store.state.app.device == 'mobile' ? true : false" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pageSize" :page-sizes="[10, 20, 30, 40, 50]" :layout="
          $store.state.app.device == 'mobile'
            ? pageMobileLayout
            : pageDesktopLayout
        " :total="pageTotal"></el-pagination>
    </div>
  </div>
</template>

<script>
import { adminUser } from "@/api";

export default {
  data() {
    return {
      // 搜索数据
      searchForm: {
        id: "",
        username: "",
        nickname: "",
        group: {
          name: "",
        },
        group_id: "",
        status: "",
      },
      searchRules: {},
      showSearch: false,
      // 主页操作栏显示哪些按钮
      toolShow: {
        add: true,
        edit: true,
        del: true,
        export: true,
        reset: true,
      },
      showColumns: {
        id: true,
        username: true,
        nickname: true,
        group_id: true,
        group_name: true,
        status: true,
      },
      loadingStatus: false,
      tableColumns: [
        {
          label: "ID",
          property: "id",
          visible: true,
        },
        {
          label: "用户名",
          property: "username",
          visible: true,
        },
        {
          label: "昵称",
          property: "nickname",
          visible: true,
        },
        {
          label: "所属组别",
          property: "group_id",
          visible: true,
        },
        {
          label: "状态",
          property: "status",
          visible: true,
        },
      ],
      allColumnsSelected: true,
      allColumnsSelectedIndeterminate: false,
      // 忽略下次表格列变动
      ignoreNextTableColumnsChange: false,
      pageMobileLayout: "total, prev, pager, next",
      pageDesktopLayout: "total, sizes, prev, pager, next, jumper",
      currentPage: 1,
      pageTotal: 0,
      pageSize: 10,
      statusFilters: [
        { text: "正常", value: "1" },
        { text: "禁用", value: "2" },
      ],
      tableData: [],
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.loadData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.loadData();
    },
    // 显示/隐藏搜索
    changeSearchShow() {
      this.showSearch = !this.showSearch;
    },
    // 刷新表格数据
    refresh() {
      this.loadData();
    },
    loadData() {
      this.loadingStatus = true;
      adminUser({ page: this.currentPage, size: this.pageSize }).then((res) => {
        this.loadingStatus = false;
        this.tableData = res.rows;
        this.pageTotal = res.total;
      });
    },
    statusFilterTag(value, row) {
      return row.status === value;
    },
    // 全选列
    handleCheckAllChange(val) {
      if (val === false) {
        this.allColumnsSelected = true;
        return;
      }
      this.tableColumns.forEach((column) => {
        if (!column.visible) {
          column.visible = true;
          this.updateColumnVisible(column);
        }
      });
      this.allColumnsSelected = val;
      this.allColumnsSelectedIndeterminate = false;
    },
    // 单选列
    handleCheckChange(item) {
      let totalCount = 0;
      let selectedCount = 0;
      this.tableColumns.forEach((column) => {
        ++totalCount;
        selectedCount += column.visible ? 1 : 0;
      });
      if (selectedCount === 0) {
        console.log("至少选择一项");
        this.$nextTick(function () {
          item.visible = true;
        });
        return;
      }
      this.allColumnsSelected = selectedCount === totalCount;
      this.allColumnsSelectedIndeterminate =
        selectedCount !== totalCount && selectedCount !== 0;
      this.updateColumnVisible(item);
    },
    updateColumnVisible(item) {
      this.showColumns[item.property] = item.visible;
    },
    submitSearchForm() {
      this.$refs.searchForm.validate((valid) => {
        if (valid) {
          console.log("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetSearchForm() {
      this.$refs.searchForm.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.ym-main {
  padding: 20px;
  background: white;
}
.ym-search-box {
  background: white;
}
.ym-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  .el-button {
    margin: 2px;
  }
}
.ym-page {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
}
.ym-column {
  display: flex;
  flex-direction: column;
  line-height: 30px;
}
.ym-row-cen {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
