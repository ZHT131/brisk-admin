<template>
  <div class="ym-main">
    <!-- 搜索框 -->
    <div class="ym-search-box" v-if="showSearch">
      <el-form
        ref="searchForm"
        size="medium"
        label-width="100px"
        label-position="left"
        style="margin-bottom: 20px"
      >
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item label="表名" prop="table_name" size="small">
              <el-input
                placeholder="请输入表名"
                clearable
                :style="{ width: '100%' }"
              />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :md="6">
            <el-form-item label="测试选择" prop="table_name" size="small">
              <el-select
                v-model="searchFormData.ceshiValue"
                placeholder="请选择"
                :style="{ width: '100%' }"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- 搜索操作 -->
          <el-col :xs="24" :sm="12" :md="6">
            <div
              style="
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
              "
            >
              <el-button size="small" type="primary">查询</el-button>
              <el-button size="small">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row
      type="flex"
      justify="space-between"
      align="middle"
      style="margin-bottom: 10px"
    >
      <el-button-group>
        <el-button
          v-if="toolShow.add"
          type="primary"
          icon="el-icon-plus"
          size="small"
        >
          新增
        </el-button>
        <el-button
          v-if="toolShow.edit"
          type="success"
          icon="el-icon-edit"
          size="small"
        >
          编辑
        </el-button>
        <el-button
          v-if="toolShow.del"
          type="danger"
          icon="el-icon-delete"
          size="small"
        >
          删除
        </el-button>
        <el-button
          v-if="toolShow.export"
          type="warning"
          icon="el-icon-download"
          size="small"
        >
          导出
        </el-button>
      </el-button-group>
      <el-button-group>
        <el-button
          plain
          type="info"
          icon="el-icon-search"
          size="small"
          @click="changeSearchShow"
        />
        <el-button icon="el-icon-refresh" size="small" @click="refresh" />
        <el-popover placement="bottom-end" width="150" trigger="click">
          <template #reference>
            <el-button size="small" icon="el-icon-s-grid"></el-button>
          </template>
          <div class="ym-column">
            <el-checkbox
              v-model="allColumnsSelected"
              :indeterminate="allColumnsSelectedIndeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <el-checkbox
              v-for="item in tableColumns"
              :key="item.property"
              v-model="item.visible"
              @change="handleCheckChange(item)"
            >
              {{ item.label }}
            </el-checkbox>
          </div>
        </el-popover>
      </el-button-group>
    </el-row>
    <el-table ref="tables" :data="tableData" border stripe style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column
        prop="id"
        label="ID"
        min-width="180"
        sortable
      ></el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        min-width="180"
      ></el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        min-width="180"
      ></el-table-column>
      <el-table-column prop="group_id" label="所属组别" min-width="180">
        <template #default="scope">
          <el-tag size="medium">{{ scope.row.group.name }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        min-width="180"
        :filters="[
          { text: '正常', value: '1' },
          { text: '禁用', value: '2' },
        ]"
        :filter-method="filterTag"
        filter-placement="bottom-end"
      >
        <template #default="scope">
          <el-tag
            :type="scope.row.status === '1' ? 'success' : 'danger'"
            disable-transitions
            >{{ scope.row.status_text }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" min-width="150">
        <template #default="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="ym-page">
       <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
    </div>
  </div>
</template>

<script>
import { adminUser } from "@/api";
import { mapState } from "vuex";

export default {
  data() {
    return {
      // 搜索数据
      searchFormData: {
        table_name: undefined,
        ceshiValue: undefined,
      },
      showSearch: false,
      // 主页操作栏显示哪些按钮
      toolShow: {
        add: true,
        edit: true,
        del: true,
        export: true,
        reset: true,
      },
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
        {
          label: "操作",
          property: "tools",
          visible: true,
        },
      ],
      allColumnsSelected: true,
      allColumnsSelectedIndeterminate: false,
      // 忽略下次表格列变动
      ignoreNextTableColumnsChange: false,
      currentPage4: 4,
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      tableData: [
        {
          id: "1",
          nickname: "小张",
          username: "xiaozhang",
          group_id: 1,
          group: {
            name: "管理员组",
          },
          status: "1",
          status_text: "正常",
        },
        {
          id: "2",
          nickname: "小李",
          username: "xiaoli",
          group_id: 1,
          group: {
            name: "管理员组",
          },
          status: "1",
          status_text: "正常",
        },
        {
          id: "3",
          nickname: "小王",
          username: "xiaowang",
          group_id: 1,
          group: {
            name: "管理员组",
          },
          status: "1",
          status_text: "正常",
        },
        {
          id: "4",
          nickname: "小刘",
          username: "xiaoliu",
          group_id: 1,
          group: {
            name: "管理员组",
          },
          status: "2",
          status_text: "禁用",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      device: (state) => state.app.device,
    }),
  },
  created() {
    adminUser().then((res) => {
      console.log(res);
    });
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 显示/隐藏搜索
    changeSearchShow() {
      this.showSearch = !this.showSearch;
    },
    // 刷新表格数据
    refresh() {
      // this.loadStatus = true;
    },
    filterTag(value, row) {
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
    // 更新表格列
    updateColumnVisible(item) {
      const table = this.$refs.tables;
      const columns = table.store.states.columns.value;
      const vm = columns.find((e) => e.property === item.property);
      table.store.commit("removeColumn", vm, null);
      console.log(table);
      // this.ignoreNextTableColumnsChange = true;
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
</style>