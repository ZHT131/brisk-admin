<template>
  <div class="brisk-main">
    <!-- 搜索框 -->
    <div class="brisk-search-box" v-if="showSearch">
      <el-form ref="searchForm" :model="searchForm" :rules="searchRules" size="medium" label-width="100px" label-position="left" style="margin-bottom: 20px">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item label="ID" prop="id">
              <el-input placeholder="ID" v-model="searchForm.id" clearable :style="{ width: '100%' }" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item label="用户名" prop="username">
              <el-input placeholder="用户名" v-model="searchForm.username" clearable :style="{ width: '100%' }" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item label="昵称" prop="nickname">
              <el-input placeholder="昵称" v-model="searchForm.nickname" clearable :style="{ width: '100%' }" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item label="组别ID" prop="group_id">
              <el-input placeholder="组别ID" v-model="searchForm.group_id" clearable :style="{ width: '100%' }" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item label="组别名称" prop="group.name">
              <el-input placeholder="组别名称" v-model="searchForm.group.name" clearable :style="{ width: '100%' }" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item label="状态" prop="status">
              <el-select v-model="searchForm.status" :style="{ width: '100%' }">
                <el-option v-for="item in statusFilters" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 搜索操作 -->
          <briskSearchBtn @resetSearchForm="resetSearchForm" @submitSearchForm="submitSearchForm" />
        </el-row>
      </el-form>
    </div>
    <!-- 工具栏 -->
    <briskToolbar :toolShow="toolShow" :tableColumns="tableColumns" :exportLoading="exportLoading" @handleAdd="handleAdd" @handleSelectEdit="handleSelectEdit" @handleSelectDel="handleSelectDel" @handleExport="handleExport" @handleCheckAllChange="handleCheckAllChange" @handleCheckChange="handleCheckChange" @changeSearchShow="changeSearchShow" @refresh="refresh">
    </briskToolbar>
    <!-- 新增弹窗 -->
    <briskDialogcom title="新增" :device="$store.state.app.device" :showDialog="addDialogFormVisible" @cancle="addCancle" @submit="addSubmit" @close="addCancle">
      <template #form>
        <el-form ref="addForm" :model="addForm" label-width="80px" label-position="left" size="medium">
          <el-form-item label="用户名">
            <el-input v-model="addForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="addForm.nickname" placeholder="昵称"></el-input>
          </el-form-item>
          <el-form-item label="组别ID">
            <el-select v-model="addForm.group_id">
              <el-option v-for="item in groupFilters" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="addForm.status">
              <el-radio v-for="item in statusFilters" :key="item.value" label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </template>
    </briskDialogcom>
    <!-- 表格 -->
    <div style="flex: 1">
      <el-table ref="tables" v-loading="loadingStatus" :data="tableData" @selection-change="selectionChange" border stripe style="width: 100%;">
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column v-if="showColumns.id" prop="id" label="ID" min-width="180" sortable></el-table-column>
        <el-table-column v-if="showColumns.username" prop="username" label="用户名" min-width="180"></el-table-column>
        <el-table-column v-if="showColumns.nickname" prop="nickname" label="昵称" min-width="180"></el-table-column>
        <el-table-column v-if="showColumns.group_id" prop="group_id" label="组别ID" min-width="180"></el-table-column>
        <el-table-column v-if="showColumns.group_dot_name" prop="group.name" label="组别名称" min-width="180">
          <template #default="scope">
            <el-tag>{{ scope.row.group.name }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column v-if="showColumns.status" prop="status" label="状态" min-width="180">
          <template #default="scope">
            <el-tag :type="scope.row.status == '1' ? 'success' : 'danger'" disable-transitions>{{ scope.row.status_text }}</el-tag>
          </template>
        </el-table-column>
        <!--操作栏-->
        <briskOperate :device="$store.state.app.device" :showOperate="showOperate" @handleView="handleView" @handleEdit="handleEdit" @handleDel="handleDel"></briskOperate>
      </el-table>
    </div>
    <!--分页组件-->
    <briskPagination :device="$store.state.app.device" :currentPage="currentPage" :pageSize="pageSize" :pageSizes="pageSizes" :pageTotal="pageTotal" :pageMobileLayout="pageMobileLayout" :pageDesktopLayout="pageDesktopLayout" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" />
    <!-- 详情弹窗组件 -->
    <briskDialogcom title="详情" :device="$store.state.app.device" :showDialog="detailDialogFormVisible" @cancle="detailCancle" @submit="detailSubmit" @close="detailCancle">
      <template #form>
        <el-table :data="detailData" style="width: 100%">
          <el-table-column prop="name" label="标题" width="180">
            <template #default="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="内容">
          </el-table-column>
        </el-table>
      </template>
    </briskDialogcom>
    <!-- 编辑弹窗组件 -->
    <briskDialogcom title="编辑" :device="$store.state.app.device" :showDialog="editDialogFormVisible" @cancle="editCancle" @submit="editSubmit" @close="editCancle">
      <template #form>
        <el-form ref="editForm" :model="editForm" label-width="80px" label-position="left" size="medium">
          <el-form-item label="用户名">
            <el-input v-model="editForm.username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="editForm.nickname" placeholder="昵称"></el-input>
          </el-form-item>
          <el-form-item label="组别ID">
            <el-select v-model="editForm.group_id">
              <el-option v-for="item in groupFilters" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="editForm.status">
              <el-radio v-for="item in statusFilters" :key="item.value" :label="item.value">{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </template>
    </briskDialogcom>
  </div>
</template>

<script>
import briskToolbar from "~/components/crud/brisk-toolbar.vue";
import briskSearchBtn from "~/components/crud/brisk-search-btn.vue";
import crud from "~/components/crud";
import briskPagination from "~/components/crud/brisk-pagination.vue";
import briskOperate from "~/components/crud/brisk-operate.vue";
import briskDialogcom from "~/components/crud/brisk-dialogcom.vue";
export default {
  name: "admin",
  components: {
    briskToolbar,
    briskSearchBtn,
    briskPagination,
    briskOperate,
    briskDialogcom,
  },
  mixins: [
    crud({
      url: "api/adminUser",
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
      //搜索规则
      searchRules: {},
      //显示、隐藏列
      showColumns: {
        id: true,
        username: true,
        nickname: true,
        group_id: true,
        group_dot_name: true,
        status: true,
      },
      //列筛选数据
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
          label: "组别ID",
          property: "group_id",
          visible: true,
        },
        {
          label: "组别名称",
          property: "group_dot_name",
          visible: true,
        },
        {
          label: "状态",
          property: "status",
          visible: true,
        },
      ],
    }),
  ],
  data() {
    return {
      //状态筛选数据
      statusFilters: [
        { label: "正常", value: "1" },
        { label: "禁用", value: "2" },
      ],
      groupFilters: [
        { label: "超级管理员", value: "1" },
        { label: "管理员", value: "2" },
      ],
      addForm: {
        username: "",
        nickname: "",
        group_id: "",
        status: "",
      },
      editForm: {
        username: "",
        nickname: "",
        group_id: "",
        status: "",
      },
      detailData: [
        {
          name: "ID",
          content: "1",
        },
        {
          name: "用户名",
          content: "zhangsan",
        },
        {
          name: "昵称",
          content: "张三",
        },
        {
          name: "组别ID",
          content: "1",
        },
        {
          name: "组别名称",
          content: "管理员",
        },
        {
          name: "状态",
          content: "正常",
        },
      ],
    };
  },
  created() { },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
