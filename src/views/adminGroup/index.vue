<template>
  <div class="ym-main">
    <!-- 搜索框 -->
    <div class="ym-search-box" v-if="showSearch">
      <el-form ref="searchForm" :model="searchForm" :rules="searchRules" size="medium" label-width="100px" label-position="left" style="margin-bottom: 20px">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item :label="$t('adminGroup.field.id')" prop="id" size="small">
              <el-input :placeholder="$t('adminGroup.field.id')" v-model="searchForm.id" clearable :style="{ width: '100%' }" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item :label="$t('adminGroup.field.pid')" prop="pid" size="small">
              <el-input :placeholder="$t('adminGroup.field.pid')" v-model="searchForm.pid" clearable :style="{ width: '100%' }" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item :label="$t('adminGroup.field.name')" prop="name" size="small">
              <el-input :placeholder="$t('adminGroup.field.name')" v-model="searchForm.name" clearable :style="{ width: '100%' }" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item :label="$t('adminGroup.field.status')" prop="status" size="small">
              <el-select v-model="searchForm.status" :placeholder="$t('adminGroup.component.select_placeholder')" :style="{ width: '100%' }">
                <el-option v-for="item in statusFilters" :key="item.value" :label="$t('adminGroup.field.'+item.label)" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 搜索操作 -->
          <searchBtn @resetSearchForm="resetSearchForm" @submitSearchForm="submitSearchForm" />
        </el-row>
      </el-form>
    </div>
    <!-- 工具栏 -->
    <toolBar :toolShow="toolShow" :tableColumns="tableColumns" :exportLoading="exportLoading" @handleAdd="handleAdd" @handleSelectEdit="handleSelectEdit" @handleSelectDel="handleSelectDel" @handleExport="handleExport" @handleCheckAllChange="handleCheckAllChange" @handleCheckChange="handleCheckChange" @changeSearchShow="changeSearchShow" @refresh="refresh">
    </toolBar>
    <!-- 新增弹窗 -->
    <dialogcom :title="$t('admin.component.addlog_add_title')" :device="$store.state.app.device" :showDialog="addDialogFormVisible" @cancle="addCancle" @submit="addSubmit">
      <template #form>
        <el-form ref="addForm" :model="addForm" label-width="80px" label-position="left" size="medium">
          <el-form-item :label="$root.$t('adminGroup.field.name')">
            <el-input v-model="addForm.name" :placeholder="$root.$t('adminGroup.field.name')"></el-input>
          </el-form-item>
          <el-form-item :label="$root.$t('adminGroup.field.pid')">
            <el-select v-model="addForm.pid" :placeholder="$root.$t('adminGroup.component.select_placeholder')">
              <el-option v-for="item in groupFilters" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$root.$t('adminGroup.field.status')">
            <el-radio-group v-model="addForm.status">
              <el-radio v-for="item in statusFilters" :key="item.value" :label="item.value">{{$root.$t('adminGroup.field.'+item.label)}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </template>
    </dialogcom>
    <div style="flex: 1">
      <el-table ref="tables" v-loading="loadingStatus" :data="tableData" @selection-change="selectionChange" border stripe row-key="id" default-expand-all :tree-props="{children: 'children'}" style="width: 100%">
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column v-if="showColumns.id" prop="id" :label="$t('adminGroup.field.id')" min-width="180" sortable></el-table-column>
        <el-table-column v-if="showColumns.pid" prop="pid" :label="$t('adminGroup.field.pid')" min-width="180"></el-table-column>
        <el-table-column v-if="showColumns.name" prop="name" :label="$t('adminGroup.field.name')" min-width="180"></el-table-column>
        <el-table-column v-if="showColumns.status" prop="status" :label="$t('adminGroup.field.status')" min-width="180">
          <template #default="scope">
            <el-tag :type="scope.row.status == '1' ? 'success' : 'danger'" disable-transitions>{{ scope.row.status_text }}</el-tag>
          </template>
        </el-table-column>
        <!--操作栏-->
        <operate :device="$store.state.app.device" :showOperate="showOperate" @handleView="handleView" @handleEdit="handleEdit" @handleDel="handleDel"></operate>
      </el-table>
    </div>
    <!--分页组件-->
    <pagination :device="$store.state.app.device" :currentPage="currentPage" :pageSize="pageSize" :pageSizes="pageSizes" :pageTotal="pageTotal" :pageMobileLayout="pageMobileLayout" :pageDesktopLayout="pageDesktopLayout" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" />
    <!-- 编辑弹窗组件 -->
    <dialogcom :title="$t('adminGroup.component.addlog_edit_title')" :device="$store.state.app.device" :showDialog="editDialogFormVisible" @cancle="editCancle" @submit="editSubmit">
      <template #form>
        <el-form ref="editForm" :model="editForm" label-width="80px" label-position="left" size="medium">
          <el-form-item :label="$root.$t('adminGroup.field.name')">
            <el-input v-model="editForm.name" :placeholder="$root.$t('adminGroup.field.name')"></el-input>
          </el-form-item>
          <el-form-item :label="$root.$t('adminGroup.field.pid')">
            <el-select v-model="editForm.pid" :placeholder="$root.$t('adminGroup.component.select_placeholder')">
              <el-option v-for="item in groupFilters" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$root.$t('adminGroup.field.status')">
            <el-radio-group v-model="editForm.status">
              <el-radio v-for="item in statusFilters" :key="item.value" :label="item.value">{{$root.$t('adminGroup.field.'+item.label)}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </template>
    </dialogcom>
  </div>
</template>

<script>
import toolBar from "@/components/crud/toolBar.vue";
import searchBtn from "@/components/crud/searchBtn.vue";
import crud from "@/components/crud";
import pagination from "@/components/crud/pagination.vue";
import operate from "@/components/crud/operate.vue";
import dialogcom from "@/components/crud/dialogcom.vue";

export default {
  components: {
    toolBar,
    searchBtn,
    pagination,
    operate,
    dialogcom,
  },
  mixins: [
    crud({
      url: "api/adminGroup",
      // 搜索数据
      searchForm: {
        id: "",
        pid: "",
        name: "",
        status: "",
      },
      //搜索规则
      searchRules: {},
      //显示、隐藏列
      showColumns: {
        id: true,
        pid: true,
        name: true,
        status: true,
      },
      //列筛选数据
      tableColumns: [
        {
          label: "adminGroup.field.id",
          property: "id",
          visible: true,
        },
        {
          label: "adminGroup.field.pid",
          property: "pid",
          visible: true,
        },
        {
          label: "adminGroup.field.name",
          property: "name",
          visible: true,
        },
        {
          label: "adminGroup.field.status",
          property: "status",
          visible: true,
        },
      ],
      //操作栏显示按钮
      showOperate: {
        view: false,
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
      groupFilters: [
        { label: "超级管理员", value: "1" },
        { label: "管理员", value: "2" },
      ],
      addForm: {
        name: "",
        pid: "",
        status: "",
      },
      editForm: {
        name: "",
        pid: "",
        status: "",
      },
    };
  },
  created() {},
  methods: {},
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
</style>
