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
        group_name: true,
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
          label: "角色组",
          property: "group_name",
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
