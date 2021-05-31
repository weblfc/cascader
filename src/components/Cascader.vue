<template>
  <div class="cascader" v-click-outside="close">
    <div class="title" @click="toggle">
      {{ this.result }}
    </div>
    <div class="content" v-if="isVisible">
      <cascader-item
        :options="options"
        :value="value"
        :level="0"
        @change="change"
      ></cascader-item>
    </div>
  </div>
</template>

<script>
import clickOutside from "../directivees/clickOutside";
import CascaderItem from "./CascaderItem.vue";

export default {
  props: {
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    level: {
      type: Number,
    },
  },
  components: {
    CascaderItem,
  },
  data() {
    return {
      isVisible: false,
    };
  },
  directives: {
    clickOutside,
  },
  computed: {
    result() {
      return this.value.map((res) => res.label).join("/");
    },
  },
  methods: {
    close() {
      this.isVisible = false;
    },
    toggle() {
      this.isVisible = !this.isVisible;
    },
    change(value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style lang="less" scoped>
.title {
  width: 150px;
  height: 30px;
  border: 1px solid #ccc;
  line-height: 30px;
  padding-left:10px;
}
.cascader {
  display: inline-block;
}
.content{
  height: 200px;
  overflow-y: auto;
}
</style>
