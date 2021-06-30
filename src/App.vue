<template>
  <div id="app">
    <!-- <Cascader :options="options" v-model="value"></Cascader> -->
    <Map></Map>
  </div>
</template>

<script>
// import Cascader from "./components/Cascader.vue";
import Map from "./components/map/index.vue";

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
// const markList = [
//   { parentId: 0, name: "航标1", id: "0101" },
//   { parentId: "0101", name: "航标2", id: "0201" },
//   { parentId: "0201", name: "航标3", id: "0301" },
//   { parentId: "0101", name: "航标4", id: "0401" },
//   { parentId: "0401", name: "航标5", id: "0501" },
//   { parentId: "0401", name: "航标6", id: "0601" },
// ];
// let add = {
//   parentId: 0,
//   name: "航标1",
//   id: "0101",
//   children: [
//     {
//       parentId: "0101",
//       name: "航标2",
//       id: "0201",
//       children: [{ parentId: "0201", name: "航标3", id: "0301" }],
//     },
//     {
//       parentId: "0101",
//       name: "航标4",
//       id: "0401",
//       children: [
//         { parentId: "0401", name: "航标5", id: "0501" },
//         { parentId: "0401", name: "航标6", id: "0601" },
//       ],
//     },
//   ],
// };

export default {
  name: "App",
  components: {
    // Cascader,
    Map,
  },
  data() {
    return {
      value: [],
      options: [],
      markList: [
        {
          parentId: 0,
          name: "航标1",
          id: "0101",
          children: [],
        },
        {
          parentId: "0101",
          name: "航标2",
          id: "0201",
          children: [],
        },
        {
          parentId: "0201",
          name: "航标3",
          id: "0301",
          children: [],
        },
        {
          parentId: "0101",
          name: "航标4",
          id: "0401",
          children: [],
        },
        {
          parentId: "0401",
          name: "航标5",
          id: "0501",
          children: [],
        },
        {
          parentId: "0401",
          name: "航标6",
          id: "0601",
          children: [],
        },
        {
          parentId: "0601",
          name: "航标7",
          id: "0701",
          children: [],
        },
      ],
    };
  },
  methods: {
    getTreeList(markList) {
      const menu = [];
      const markMap = {};
      markList.forEach((mark) => {
        markMap[mark.id] = mark;
        if (mark.parentId == 0) {
          menu.push(mark);
        } else if (markMap[mark.parentId]) {
          markMap[mark.parentId].children.push(mark);
        }
      });
      return menu;
    },
  },
  mounted() {
    this.getTreeList(this.markList);
    getDate("0").then((res) => {
      this.options = res;
    });
  },
};
</script>

<style lang="less" scode>
body,
html,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      box-sizing: border-box;
    }
  }
  -webkit-user-select: none;

  -moz-user-select: none;

  -ms-user-select: none;

  user-select: none;
}
</style>
