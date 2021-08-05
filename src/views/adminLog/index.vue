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
            <el-form-item label="标题" prop="title" size="small">
              <el-input placeholder="请输入标题" v-model="searchForm.title" clearable :style="{ width: '100%' }" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item label="操作Url" prop="path_url" size="small">
              <el-input placeholder="请输入操作Url" v-model="searchForm.path_url" clearable :style="{ width: '100%' }" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item label="IP" prop="ip" size="small">
              <el-input placeholder="请输入IP" v-model="searchForm.ip" clearable :style="{ width: '100%' }" />
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
          <searchBtn @resetSearchForm="resetSearchForm" @submitSearchForm="submitSearchForm" />
        </el-row>
      </el-form>
    </div>
    <!-- 工具栏 -->
    <toolBar :toolShow="toolShow" :tableColumns="tableColumns" @handleCheckAllChange="handleCheckAllChange" @handleCheckChange="handleCheckChange" @changeSearchShow="changeSearchShow" @refresh="refresh">
    </toolBar>
    <div style="flex: 1">
      <el-table ref="tables" v-loading="loadingStatus" :data="tableData" border stripe style="width: 100%">
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column v-if="showColumns.id" prop="id" label="ID" min-width="180" sortable></el-table-column>
        <el-table-column v-if="showColumns.username" prop="username" label="用户名" min-width="180"></el-table-column>
        <el-table-column v-if="showColumns.title" prop="title" label="标题" min-width="180"></el-table-column>
        <el-table-column v-if="showColumns.path_url" prop="path_url" label="操作Url" min-width="180"></el-table-column>
        <el-table-column v-if="showColumns.ip" prop="ip" label="IP" min-width="180"></el-table-column>
        <el-table-column v-if="showColumns.status" prop="status" label="状态" :filters="statusFilters" :filter-method="statusFilterTag" filter-placement="bottom-end" min-width="180">
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
  </div>
</template>

<script>
import toolBar from "@/components/crud/toolBar.vue";
import searchBtn from "@/components/crud/searchBtn.vue";
import crud from "@/components/crud";
import pagination from "@/components/crud/pagination.vue";
import operate from "@/components/crud/operate.vue";

export default {
  components: {
    toolBar,
    searchBtn,
    pagination,
    operate,
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
          label: "标题",
          property: "title",
          visible: true,
        },
        {
          label: "操作Url",
          property: "path_url",
          visible: true,
        },
        {
          label: "IP",
          property: "ip",
          visible: true,
        },
        {
          label: "状态",
          property: "status",
          visible: true,
        },
      ],
      //状态筛选数据
      statusFilters: [
        { text: "正常", value: "1" },
        { text: "禁用", value: "2" },
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
    return {};
  },
  created() {},
  methods: {
    statusFilterTag(value, row) {
      return row.status === value;
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
</style>
