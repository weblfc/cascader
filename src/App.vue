<template>
  <div id="app">
    <Cascader :options="options" v-model="value"></Cascader>
  </div>
</template>

<script>
import Cascader from "./components/Cascader.vue";

const result = [
  {
    id: "00",
    label: "北京市",
    uid: "0",
    children: [
      {
        id: "0001",
        uid: "1",
        label: "朝阳区",
      },
    ],
  },
  {
    id: "01",
    uid: "0",
    label: "广西",
    children: [
      {
        id: "0101",
        uid: "1",
        label: "南宁",
        children: [
          {
            id: "010101",
            uid: "2",
            label: "宾阳",
          },
          {
            id: "010102",
            uid: "2",
            label: "武鸣",
          },
        ],
      },
      {
        id: "0102",
        uid: "1",
        label: "崇左",
        children: [
          {
            id: "010201",
            uid: "2",
            label: "凭祥",
          },
          {
            id: "010202",
            uid: "2",
            label: "宁明",
          },
        ],
      },
    ],
  },
  {
    id: "02",
    uid: "0",
    label: "江苏",
    children: [
      {
        id: "0201",
        uid: "1",
        label: "南京",
        children: [
          {
            id: "020101",
            uid: "2",
            label: "中华门",
          },
        ],
      },
    ],
  },
];
function getDate(uid) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result.filter((res) => res.uid == uid));
    }, 800);
  });
}

export default {
  name: "App",
  components: {
    Cascader,
  },
  data() {
    return {
      value: [],
      options: [],
    };
  },
  mounted() {
    getDate("0").then((res) => {
      this.options = res;
    });
  },
};
</script>

<style lang="less">
</style>
