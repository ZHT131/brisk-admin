import { comReq } from "~/api/common.js";
import { ElMessage } from "element-plus";
function curd(options) {
  return {
    data() {
      return {
        //显示/隐藏搜索栏
        showSearch: false,
        // 主页操作栏显示哪些按钮
        toolShow: {
          add: true,
          edit: true,
          del: true,
          export: true,
        },
        //显示/隐藏列数据
        showColumns: {},
        //表格加载状态
        loadingStatus: false,
        //表格列筛选数据
        tableColumns: [],
        //表格列选中状态
        allColumnsSelected: true,
        allColumnsSelectedIndeterminate: false,
        //分页组件属性
        pageMobileLayout: "total, prev, pager, next",
        pageDesktopLayout: "total, sizes, prev, pager, next, jumper",
        currentPage: 1,
        pageTotal: 0,
        pageSize: 10,
        pageSizes: [10, 20, 30, 40, 50],
        //表格数据
        tableData: [],
        //请求url
        url: "",
        //操作栏显示按钮
        showOperate: {
          view: true,
          edit: true,
          del: true,
        },
        addDialogFormVisible: false,
        editDialogFormVisible: false,
        detailDialogFormVisible: false,
        multipleSelection: [],
        exportLoading: false, //导出按钮动画
        filename: "", //导出文件名
        autoWidth: true, //导出自动宽度
        bookType: "xlsx", //导出文件类型
        //导入并合并初始化数据
        ...options,
      };
    },
    created() {
      // 加载数据
      this.getList();
    },
    methods: {
      // 请求查询列表数据
      getList() {
        this.loadingStatus = true;
        comReq(this.url, "post", {
          page: this.currentPage,
          size: this.pageSize,
        })
          .then((res) => {
            this.loadingStatus = false;
            this.tableData = res.rows;
            this.pageTotal = res.total;
          })
          .catch(() => {
            this.loadStatus = false;
          });
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
      //更新列
      updateColumnVisible(item) {
        this.showColumns[item.property] = item.visible;
      },
      // 显示/隐藏搜索
      changeSearchShow() {
        this.showSearch = !this.showSearch;
      },
      // 刷新表格数据
      refresh() {
        this.getList();
      },
      //提交搜索
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
      //重置搜索
      resetSearchForm() {
        this.$refs.searchForm.resetFields();
      },
      //每页条数变化
      handleSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1;
        this.getList();
      },
      //页码变化
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getList();
      },
      //表格选择变化
      selectionChange(val) {
        this.multipleSelection = val;
      },
      //新增
      handleAdd() {
        this.addDialogFormVisible = true;
      },
      //选择编辑
      handleSelectEdit() {
        if (this.multipleSelection.length === 0) {
          return ElMessage("请先选择需要编辑的数据");
        }
        this.editForm = this.multipleSelection[0];
        this.editDialogFormVisible = true;
      },
      //选择删除
      handleSelectDel() {
        if (this.multipleSelection.length === 0) {
          return ElMessage("请先选择需要删除的数据");
        }
        this.$confirm(
          this.$t("delConfirm.delmsg"),
          this.$t("delConfirm.title"),
          {
            confirmButtonText: this.$t("delConfirm.comfirm"),
            cancelButtonText: this.$t("delConfirm.cancle"),
            type: "warning",
          }
        )
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      },
      //导出
      handleExport(type) {
        this.bookType = type;
        this.exportLoading = true;
        let tHeader = [];
        let filterVal = [];
        this.tableColumns.map((item) => {
          tHeader.push(this.$t(item.label));
          filterVal.push(item.property);
        });
        import("~/vendor/Export2Excel").then((excel) => {
          const list = this.tableData;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename,
            autoWidth: this.autoWidth,
            bookType: this.bookType,
          });
          this.exportLoading = false;
        });
      },
      //处理并获取导出数据
      formatJson(filterVal, jsonData) {
        return jsonData.map((v) =>
          filterVal.map((j) => {
            if (j.indexOf("_dot_") != -1) {
              let arr = j.split("_dot_");
              let val = this.exportTreeFilter(v, arr);
              return val;
            } else {
              return v[j];
            }
          })
        );
      },
      //递归处理关联嵌套数据
      exportTreeFilter(v, arr) {
        if (arr.length > 0) {
          let newarr = arr;
          for (let index = 0; index < arr.length; index++) {
            const item = arr[index];
            newarr.splice(index, 1);
            return this.exportTreeFilter(v[item], newarr);
          }
        } else {
          return v;
        }
      },
      //查看
      handleView(row) {
        this.detailDialogFormVisible = true;
      },
      //编辑
      handleEdit(row) {
        this.editForm = row;
        this.editDialogFormVisible = true;
      },
      //删除
      handleDel(row) {
        console.log(row);
        this.$confirm(
          this.$t("delConfirm.delmsg"),
          this.$t("delConfirm.title"),
          {
            confirmButtonText: this.$t("delConfirm.comfirm"),
            cancelButtonText: this.$t("delConfirm.cancle"),
            type: "warning",
          }
        )
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      },
      //提交新增
      addSubmit() {
        console.log(this.addForm);
        ElMessage.success({
          message: "演示执行新增提交",
          type: "success",
        });
        this.addDialogFormVisible = false;
      },
      //取消新增
      addCancle() {
        this.$refs.addForm.resetFields();
        this.addDialogFormVisible = false;
      },
      //提交编辑
      editSubmit() {
        console.log(this.addForm);
        ElMessage.success({
          message: "演示执行编辑提交",
          type: "success",
        });
        this.editDialogFormVisible = false;
      },
      //取消编辑
      editCancle() {
        this.$refs.editForm.resetFields();
        this.editDialogFormVisible = false;
      },
      //详情确认
      detailCancle() {
        this.detailDialogFormVisible = false;
      },
      //详情取消
      detailSubmit() {
        this.detailDialogFormVisible = false;
      },
    },
  };
}

export default curd;

// 分页mixins
var pagination = {
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default: [],
    },
    pageTotal: {
      type: Number,
      default: 0,
    },
    pageMobileLayout: {
      type: String,
      default: "",
    },
    pageDesktopLayout: {
      type: String,
      default: "",
    },
    device: {
      type: String,
      default: "",
    },
  },
  methods: {
    //每页条数变化
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    //当前页码变化
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
  },
};
// 搜索mixins
var search = {
  props: {},
  methods: {
    // 提交搜索
    submitSearchForm(val) {
      this.$emit("submitSearchForm", val);
    },
    // 重置搜索
    resetSearchForm(item) {
      this.$emit("resetSearchForm", item);
    },
  },
};
// 工具栏mixins
var tools = {
  props: {
    toolShow: {
      type: Object,
      default: {},
    },
    tableColumns: {
      type: Array,
      default: [],
    },
    allColumnsSelected: {
      type: Boolean,
      default: true,
    },
    allColumnsSelectedIndeterminate: {
      type: Boolean,
      default: false,
    },
    exportLoading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // 全选列
    checkAllChange(val) {
      this.$emit("handleCheckAllChange", val);
    },
    // 单选列
    checkChange(item) {
      this.$emit("handleCheckChange", item);
    },
    changeSearchShow() {
      this.$emit("changeSearchShow");
    },
    refresh() {
      this.$emit("refresh");
    },
  },
};

// 操作栏mixins
var operate = {
  props: {
    width: {
      type: Number,
      default: 180,
    },
    device: {
      type: String,
      default: "",
    },
    showOperate: {
      type: Object,
      default: {},
    },
  },
  methods: {
    handleView(row) {
      this.$emit("handleView", row);
    },
    handleEdit(row) {
      this.$emit("handleEdit", row);
    },
    handleDel(row) {
      this.$emit("handleDel", row);
    },
  },
};

export { pagination, search, tools, operate };
