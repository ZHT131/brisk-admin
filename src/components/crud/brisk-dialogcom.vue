<!--编辑弹窗-->
<template>
  <el-dialog :title="title" :top="top" :fullscreen="fullscreen?fullscreen:fullcomd" :width="width" :model-value="showDialog" :destroy-on-close="destroyOnClose" @close="$emit('close')">
    <el-scrollbar :max-height="maxHeight!=''?maxHeight:maxHcomd">
      <slot name="form"></slot>
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <slot name="btn"></slot>
         <el-button v-if="showBtn.submit" type="primary" @click="$emit('submit')">{{$root.$t("dialogcom.comfirm")}}</el-button>
        <el-button v-if="showBtn.cancle" @click="$emit('cancle')">{{$root.$t("dialogcom.cancle")}}</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script>
export default {
  emits: ["submit", "cancle", "close"],
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
    destroyOnClose: {
      type: Boolean,
      default: true,
    },
    top: {
      type: String,
      default: "10vh",
    },
    width: {
      type: String || Number,
      default: "50%",
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    maxHeight: {
      type: String,
      default: "",
    },
  },
  computed: {
    fullcomd: function () {
      if (this.device == "mobile") {
        return true;
      }
      return false;
    },
    maxHcomd: function () {
      if (this.device == "mobile") {
        return "70vh";
      }
      return "60vh";
    },
  },
  methods: {},
};
</script>
<style lang="scss">
.el-dialog__body {
  padding: 10px 20px !important;
}
</style>
