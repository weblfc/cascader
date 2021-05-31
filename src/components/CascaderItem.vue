<template>
  <div class="content">
    <div class="content-left">
      <div
        :class="{ active: weizhi == index ? true : false }"
        class="label"
        v-for="(item, index) of options"
        :key="index"
        @click="select(item, index)"
      >
        <div>{{ item.label }}</div>
      </div>
    </div>
    <div v-if="list && list.length" class="content-right">
      <cascader-item
        :options="list"
        :value="value"
        :level="level + 1"
        @change="change"
      ></cascader-item>
    </div>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";

export default {
  name: "CascaderItem",
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
  data() {
    return {
      weizhi: -1,
    };
  },
  computed: {
    list() {
      return this.value[this.level] && this.value[this.level].children;
    },
  },
  methods: {
    select(item, index) {
      this.weizhi = index;
      const cloneValue = cloneDeep(this.value);
      cloneValue[this.level] = item;
      cloneValue.splice(this.level + 1);
      this.$emit("change", cloneValue);
    },
    change(item) {
      this.$emit("change", item);
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  display: flex;
}
.label {
  padding: 5px 20px;
  text-align: center;
  cursor: pointer;
  &:hover {
    background: #ccc;
  }
}
.content-left {
  border: 1px solid #ccc;
}
.active {
  background: #ccc;
}
</style>
