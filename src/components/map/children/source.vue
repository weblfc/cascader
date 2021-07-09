<template>
  <div class="content">
    <ul>
      <li
        v-for="(item, index) of tabs"
        :key="index"
        :class="{ active: isActive == item.name }"
        @click="onChange(item)"
      >
        <img :src="item.imgUrl" alt="" />
        <p>{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
// import L from "leaflet";

export default {
  data() {
    return {
      isActive: "腾讯地图",
      tabs: [
        {
          name: "腾讯地图",
          imgUrl: require("../../../assets/map/mapbase.png"),
          mapUrl:
            "http://rt0.map.gtimg.com/realtimerender?z={z}&x={x}&y={-y}&type=vector&style=0",
        },
        {
          name: "高德地图",
          imgUrl: require("../../../assets/map/mapstandard.png"),
          mapUrl:
            "http://wprd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
        },
        {
          name: "谷歌地图",
          imgUrl: require("../../../assets/map/mapsenior.png"),
          mapUrl: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
        },
      ],
    };
  },
  methods: {
    onChange(item) {
      this.isActive = item.name;
      this.$emit("currentMap", item);
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  background: #fff;
  ul {
    &:after {
      content: "";
      clear: both;
      display: block;
    }
    li {
      cursor: pointer;
      float: left;
      width: 100px;
      padding: 10px;
      &:first-child {
        padding-right: 0;
      }
      &:last-child {
        padding-left: 0;
      }
      p {
        margin: 5px 0 0 0;
      }
      font-size: 13px;
      color: #666666;
      text-align: center;
    }
  }
}
.active {
  img {
    border: 1px solid dodgerblue;
  }
  p {
    color: dodgerblue;
  }
}
</style>
