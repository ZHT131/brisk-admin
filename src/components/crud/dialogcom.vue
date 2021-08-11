<!--编辑弹窗-->
<template>
  <el-dialog :title="title" top="10vh" :fullscreen="device=='mobile'?true:false" :model-value="showDialog">
    <el-scrollbar :max-height="device=='mobile'?'70vh':'55vh'">
      <slot name="form"></slot>
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <slot name="btn"></slot>
        <el-button v-if="showBtn.submit" type="primary" @click="$emit('submit')" size="small">确 定</el-button>
        <el-button v-if="showBtn.cancle" @click="$emit('cancle')" size="small">取 消</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
export default {
  name: "dialogcom",
  emits: ["submit", "cancle"],
  props: {
    title: {
      type: String,
      default: "",
    },
    device: {
      type: String,
      default: "",
    },
    showDialog: {
      type: Boolean,
      default: false,
    },
    showBtn: {
      type: Object,
      default: {
        submit: true,
        cancle: true,
      },
    },
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
</style>
