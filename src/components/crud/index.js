import { comReq } from "@/api/common.js";
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
        //状态数据
        statusFilters: [],
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
      //查看
      handleView(row) {
        console.log(row);
      },
      //编辑
      handleEdit(row) {
        console.log(row);
      },
      //删除
      handleDel(row) {
        console.log(row);
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