<template>
  <div class="brisk-main">
    <!-- 搜索框 -->
    <div class="brisk-search-box" v-if="showSearch">
      <el-form ref="searchForm" :model="searchForm" :rules="searchRules" size="medium" label-width="100px" label-position="left" style="margin-bottom: 20px">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item :label="$t('adminLog.field.id')" prop="id">
              <el-input :placeholder="$t('adminLog.field.id')" v-model="searchForm.id" clearable :style="{ width: '100%' }" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item :label="$t('adminLog.field.username')" prop="username">
              <el-input :placeholder="$t('adminLog.field.username')" v-model="searchForm.username" clearable :style="{ width: '100%' }" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item :label="$t('adminLog.field.title')" prop="title">
              <el-input :placeholder="$t('adminLog.field.title')" v-model="searchForm.title" clearable :style="{ width: '100%' }" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item :label="$t('adminLog.field.path_url')" prop="path_url">
              <el-input :placeholder="$t('adminLog.field.path_url')" v-model="searchForm.path_url" clearable :style="{ width: '100%' }" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item :label="$t('adminLog.field.ip')" prop="ip">
              <el-input :placeholder="$t('adminLog.field.ip')" v-model="searchForm.ip" clearable :style="{ width: '100%' }" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item :label="$t('adminLog.field.status')" prop="status">
              <el-select v-model="searchForm.status" :placeholder="$t('adminLog.component.select_placeholder')" :style="{ width: '100%' }">
                <el-option v-for="item in statusFilters" :key="item.value" :label="$t('adminLog.field.'+item.label)" :value="item.value" />
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
    <briskDialogcom :title="$t('adminLog.component.addlog_add_title')" :device="$store.state.app.device" :showDialog="addDialogFormVisible" @cancle="addCancle" @submit="addSubmit" @close="addCancle">
      <template #form>
        <el-form ref="addForm" :model="addForm" label-width="80px" label-position="left" size="medium">
          <el-form-item :label="$root.$t('adminLog.field.username')">
            <el-input v-model="addForm.username" :placeholder="$root.$t('adminLog.field.username')"></el-input>
          </el-form-item>
          <el-form-item :label="$root.$t('adminLog.field.title')">
            <el-input v-model="addForm.title" :placeholder="$root.$t('adminLog.field.title')"></el-input>
          </el-form-item>
          <el-form-item :label="$root.$t('adminLog.field.path_url')">
            <el-input v-model="addForm.path_url" :placeholder="$root.$t('adminLog.field.path_url')"></el-input>
          </el-form-item>
          <el-form-item :label="$root.$t('adminLog.field.ip')">
            <el-input v-model="addForm.ip" :placeholder="$root.$t('adminLog.field.ip')"></el-input>
          </el-form-item>
          <el-form-item :label="$root.$t('adminLog.field.status')">
            <el-radio-group v-model="addForm.status">
              <el-radio v-for="item in statusFilters" :key="item.value" :label="item.value">{{$root.$t('adminLog.field.'+item.label)}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </template>
    </briskDialogcom>
    <div style="flex: 1">
      <el-table ref="tables" v-loading="loadingStatus" @selection-change="selectionChange" :data="tableData" border stripe style="width: 100%">
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column v-if="showColumns.id" prop="id" :label="$t('adminLog.field.id')" min-width="180" sortable></el-table-column>
        <el-table-column v-if="showColumns.username" prop="username" :label="$t('adminLog.field.username')" min-width="180"></el-table-column>
        <el-table-column v-if="showColumns.title" prop="title" :label="$t('adminLog.field.title')" min-width="180"></el-table-column>
        <el-table-column v-if="showColumns.path_url" prop="path_url" :label="$t('adminLog.field.path_url')" min-width="180"></el-table-column>
        <el-table-column v-if="showColumns.ip" prop="ip" :label="$t('adminLog.field.ip')" min-width="180"></el-table-column>
        <el-table-column v-if="showColumns.status" prop="status" :label="$t('adminLog.field.status')" min-width="180">
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
    <briskDialogcom :title="$t('adminLog.component.addlog_detail_title')" :device="$store.state.app.device" :showDialog="detailDialogFormVisible" @cancle="detailCancle" @submit="detailSubmit" @close="detailCancle">
      <template #form>
        <el-table :data="detailData" style="width: 100%">
          <el-table-column prop="name" :label="$root.$t('adminLog.component.detail_title')" width="180">
            <template #default="scope">
              <span>{{ $root.$t(scope.row.name) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="content" :label="$root.$t('adminLog.component.detail_content')">
          </el-table-column>
        </el-table>
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
  name:"adminLog",
  components: {
    briskToolbar,
    briskSearchBtn,
    briskPagination,
    briskOperate,
    briskDialogcom,
  },
  mixins: [
    crud({
      url: "api/adminLog",
      // 搜索数据
      searchForm: {
        id: "",
        username: "",
        title: "",
        ip: "",
        path_url: "",
        status: "",
      },
      //搜索规则
      searchRules: {},
      //显示、隐藏列
      showColumns: {
        id: true,
        username: true,
        title: true,
        path_url: true,
        ip: true,
        status: true,
      },
      //列筛选数据
      tableColumns: [
        {
          label: "adminLog.field.id",
          property: "id",
          visible: true,
        },
        {
          label: "adminLog.field.username",
          property: "username",
          visible: true,
        },
        {
          label: "adminLog.field.title",
          property: "title",
          visible: true,
        },
        {
          label: "adminLog.field.path_url",
          property: "path_url",
          visible: true,
        },
        {
          label: "adminLog.field.ip",
          property: "ip",
          visible: true,
        },
        {
          label: "adminLog.field.status",
          property: "status",
          visible: true,
        },
      ],
      // 主页操作栏显示哪些按钮
      toolShow: {
        add: true,
        edit: false,
        del: true,
        export: true,
      },
      //操作栏显示按钮
      showOperate: {
        view: true,
        edit: false,
        del: true,
      },
    }),
  ],
  data() {
    return {
      //状态筛选数据
      statusFilters: [
        { label: "status_1", value: "1" },
        { label: "status_2", value: "2" },
      ],
      addForm: {
        username: "",
        title: "",
        path_url: "",
        ip: "",
        status: "",
      },
      detailData: [
        {
          name: "adminLog.field.id",
          content: "1",
        },
        {
          name: "adminLog.field.username",
          content: "zhangsan",
        },
        {
          name: "adminLog.field.title",
          content: "操作后台",
        },
        {
          name: "adminLog.field.ip",
          content: "127.0.0.1",
        },
        {
          name: "adminLog.field.path_url",
          content: "/adminLog/auth/index",
        },
        {
          name: "adminLog.field.status",
          content: "正常",
        },
      ],
    };
  },
  created() {},
  methods: {
   
  },
};
</script>

<style lang="scss" scoped>

</style>
