<template>
  <div class="contenr">
    <div id="map"></div>
    <div class="select">
      <ul>
        <li
          @click="currentTab = tab.components"
          :class="{ active: currentTab == tab.components }"
          v-for="(tab, index) of tabs"
          :key="index"
        >
          {{ tab.name }}
        </li>
      </ul>
      <div>
        <keep-alive>
          <component
            :is="currentTabComponent"
            @currentMap="currentMap"
            @addMark="addMark"
            :map="map"
          ></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import sourceCpn from "./children/source.vue";
import cascadingCpn from "./children/cascading.vue";
import toolCpn from "./children/tool.vue";

export default {
  data() {
    return {
      currentTab: "source",
      tabs: [
        { name: "图源", components: "source" },
        { name: "图层", components: "cascading" },
        { name: "工具", components: "tool" },
      ],
      addd: [],
      map: "",
      geoLayer: undefined,
    };
  },
  components: {
    sourceCpn,
    cascadingCpn,
    toolCpn,
  },
  computed: {
    currentTabComponent() {
      return `${this.currentTab.toLowerCase()}-cpn`;
    },
  },
  methods: {
    // 切换地图
    currentMap(mapSource) {
      this.map.eachLayer((layer) => {
        layer.remove();
      });
      L.tileLayer(mapSource.mapUrl).addTo(this.map);
      if (this.geoLayer) {
        this.geoLayer.addTo(this.map);
      }
    },
    addMark(geoLayer) {
      this.geoLayer = geoLayer;
      geoLayer.addTo(this.map);
    },
    // 初始化地图
    initMap() {
      this.map = L.map("map", {
        center: [39.9, 116.39],
        zoom: 8,
      });
      L.tileLayer(
        "http://rt0.map.gtimg.com/realtimerender?z={z}&x={x}&y={-y}&type=vector&style=0"
      ).addTo(this.map);
    },
  },
  mounted() {
    this.initMap();
  },
};
</script>

<style lang="less" scoped>
@import url("../../../node_modules/leaflet/dist/leaflet.css");
.contenr {
  width: 100%;
  height: 100%;
}
#map {
  width: 100%;
  height: 100%;
}
.selectMap {
  position: absolute;
  top: 20px;
  right: 22%;
  width: 100px;
  z-index: 1000;
}
.active {
  color: dodgerblue;
}
.select {
  position: absolute;
  top: 30px;
  right: 100px;
  width: 300px;
  height: 32px;
  z-index: 1000;
  background: #fff;
  ul > li {
    float: left;
    width: 100px;
    text-align: center;
    line-height: 32px;
    border: 1px solid #c1c1c1;
    border-left: none;
    cursor: pointer;
    &:first-child {
      border-left: 1px solid #c1c1c1;
    }
  }
}
</style>
