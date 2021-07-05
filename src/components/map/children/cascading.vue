<template>
  <div class="content">
    <div class="title">
      <a-checkbox class="selectbox" @change="onChange" v-model="isSelect">
        全选
      </a-checkbox>
    </div>
    <div class="optionsMark">
      <ul>
        <li
          v-for="(item, index) of layerTabs"
          :key="index"
          @click="toggleMark(item)"
          :class="{ active: item.isActive }"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    layerTabs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isSelect: false,
    };
  },
  methods: {
    toggleMark(item) {
      item.isActive = !item.isActive;
      this.isSelect = this.layerTabs.every((ele) => ele.isActive == true);
      this.$emit("addMark", item);
    },
    onChange() {
      // 判断是否满足条件
      this.layerTabs.forEach((ele) => {
        ele.isActive = this.isSelect;
        this.$emit("addMark", ele);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  background: #fff;
  border: 1px solid #c1c1c1;
}
.title {
  &:after {
    content: "";
    clear: both;
    display: block;
  }
  width: 100%;
  border-bottom: 1px solid #c1c1c1;
}
.selectbox {
  float: right;
  margin: 5px;
}
.optionsMark {
  ul {
    &:after {
      content: "";
      clear: both;
      display: block;
    }
    li {
      border: 1px solid #c1c1c1;
      cursor: pointer;
      float: left;
      width: 60px;
      margin: 10px;
      text-align: center;
    }
  }
}
li {
  background: #f4f5f7;
}
.active {
  color: dodgerblue;
  background: #dde7fa;
}
</style>
