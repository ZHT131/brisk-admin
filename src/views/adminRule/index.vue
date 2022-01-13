<template>
  <div class="brisk-main">
    <!-- 搜索框 -->
    <div class="brisk-search-box" v-if="showSearch">
      <el-form ref="searchForm" :model="searchForm" :rules="searchRules" size="medium" label-width="100px" label-position="left" style="margin-bottom: 20px">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item :label="$t('adminRule.field.id')" prop="id">
              <el-input :placeholder="$t('adminRule.field.id')" v-model="searchForm.id" clearable :style="{ width: '100%' }" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item :label="$t('adminRule.field.title')" prop="title">
              <el-input :placeholder="$t('adminRule.field.title')" v-model="searchForm.title" clearable :style="{ width: '100%' }" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item :label="$t('adminRule.field.rule')" prop="rule">
              <el-input :placeholder="$t('adminRule.field.rule')" v-model="searchForm.rule" clearable :style="{ width: '100%' }" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item :label="$t('adminRule.field.status')" prop="status">
              <el-select v-model="searchForm.status" :placeholder="$t('adminRule.component.select_placeholder')" :style="{ width: '100%' }">
                <el-option v-for="item in statusFilters" :key="item.value" :label="$t('adminRule.field.'+item.label)" :value="item.value" />
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
    <briskDialogcom :title="$t('adminRule.component.addlog_add_title')" :device="$store.state.app.device" :showDialog="addDialogFormVisible" @cancle="addCancle" @submit="addSubmit" @close="addCancle">
      <template #form>
        <el-form ref="addForm" :model="addForm" label-width="80px" label-position="left" size="medium">
          <el-form-item :label="$root.$t('adminRule.field.title')">
            <el-input v-model="addForm.title" :placeholder="$root.$t('adminRule.field.title')"></el-input>
          </el-form-item>
          <el-form-item :label="$root.$t('adminRule.field.rule')">
            <el-input v-model="addForm.rule" :placeholder="$root.$t('adminRule.field.rule')"></el-input>
          </el-form-item>
          <el-form-item :label="$root.$t('adminRule.field.status')">
            <el-radio-group v-model="addForm.status">
              <el-radio v-for="item in statusFilters" :key="item.value" :label="item.value">{{$root.$t('adminRule.field.'+item.label)}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </template>
    </briskDialogcom>
    <div style="flex: 1">
      <el-table ref="tables" v-loading="loadingStatus" :data="tableData" border stripe row-key="id" default-expand-all :tree-props="{children: 'children'}" style="width: 100%">
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column v-if="showColumns.id" prop="id" :label="$t('adminRule.field.id')" min-width="180" sortable></el-table-column>
        <el-table-column v-if="showColumns.title" prop="title" :label="$t('adminRule.field.title')" min-width="180"></el-table-column>
        <el-table-column v-if="showColumns.rule" prop="rule" :label="$t('adminRule.field.rule')" min-width="180"></el-table-column>
        <el-table-column v-if="showColumns.status" prop="status" :label="$t('adminRule.field.status')" min-width="180">
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
    <briskDialogcom :title="$t('adminRule.component.addlog_detail_title')" :device="$store.state.app.device" :showDialog="detailDialogFormVisible" @cancle="detailCancle" @submit="detailSubmit" @close="detailCancle">
      <template #form>
        <el-table :data="detailData" style="width: 100%">
          <el-table-column prop="name" :label="$root.$t('adminRule.component.detail_title')" width="180">
            <template #default="scope">
              <span>{{ $root.$t(scope.row.name) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="content" :label="$root.$t('adminRule.component.detail_content')">
          </el-table-column>
        </el-table>
      </template>
    </briskDialogcom>
    <!-- 编辑弹窗组件 -->
    <briskDialogcom :title="$t('adminRule.component.addlog_edit_title')" :device="$store.state.app.device" :showDialog="editDialogFormVisible" @cancle="editCancle" @submit="editSubmit" @close="editCancle">
      <template #form>
        <el-form ref="editForm" :model="editForm" label-width="80px" label-position="left" size="medium">
          <el-form-item :label="$root.$t('adminRule.field.title')">
            <el-input v-model="editForm.title" :placeholder="$root.$t('adminRule.field.title')"></el-input>
          </el-form-item>
          <el-form-item :label="$root.$t('adminRule.field.rule')">
            <el-input v-model="editForm.rule" :placeholder="$root.$t('adminRule.field.rule')"></el-input>
          </el-form-item>
          <el-form-item :label="$root.$t('adminRule.field.status')">
            <el-radio-group v-model="editForm.status">
              <el-radio v-for="item in statusFilters" :key="item.value" :label="item.value">{{$root.$t('adminRule.field.'+item.label)}}</el-radio>
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
  name:"adminRule",
  components: {
    briskToolbar,
    briskSearchBtn,
    briskPagination,
    briskOperate,
    briskDialogcom,
  },
  mixins: [
    crud({
      url: "api/adminRule",
      // 搜索数据
      searchForm: {
        id: "",
        title: "",
        rule: "",
        status: "",
      },
      //搜索规则
      searchRules: {},
      //显示、隐藏列
      showColumns: {
        id: true,
        title: true,
        rule: true,
        status: true,
      },
      //列筛选数据
      tableColumns: [
        {
          label: "adminRule.field.id",
          property: "id",
          visible: true,
        },
        {
          label: "adminRule.field.title",
          property: "title",
          visible: true,
        },
        {
          label: "adminRule.field.rule",
          property: "rule",
          visible: true,
        },
        {
          label: "adminRule.field.status",
          property: "status",
          visible: true,
        },
      ],
      //操作栏显示按钮
      showOperate: {
        view: true,
        edit: true,
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
        title: "",
        rule: "",
        status: "",
      },
      editForm: {
        title: "",
        rule: "",
        status: "",
      },
      detailData: [
        {
          name: "adminRule.field.id",
          content: "1",
        },
        {
          name: "adminRule.field.title",
          content: "zhangsan",
        },
        {
          name: "adminRule.field.rule",
          content: "adminRule",
        },
        {
          name: "adminRule.field.status",
          content: "正常",
        },
      ],
    };
  },
  created() {},
  methods: {},
};
</script>

<style lang="scss" scoped>

</style>
