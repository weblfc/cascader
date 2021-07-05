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
            :layerTabs="layerTabs"
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
import feijiImg from "../../assets/layler-img/feiji.png";
import tankeImg from "../../assets/layler-img/tanke.png";
import dapaoImg from "../../assets/layler-img/dapao.png";
import { feiji, tanke, dapao } from "./geojson";

export default {
  data() {
    return {
      currentTab: "source",
      tabs: [
        { name: "图源", components: "source" },
        { name: "图层", components: "cascading" },
        { name: "工具", components: "tool" },
      ],
      layerTabs: [
        {
          name: "飞机",
          data: feiji,
          isActive: true,
          mark: feijiImg,
          layler: undefined,
        },
        {
          name: "坦克",
          data: tanke,
          isActive: false,
          mark: tankeImg,
          layler: undefined,
        },
        {
          name: "大炮",
          data: dapao,
          isActive: false,
          mark: dapaoImg,
          layler: undefined,
        },
      ],
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
    creatLayler(imgUrl, data) {
      return new L.GeoJSON(data, {
        pointToLayer: (geoJsonPoint, latlng) => {
          const myIcon = L.icon({
            iconUrl: imgUrl,
            iconSize: [48, 48],
            iconAnchor: [24, 48],
          });
          return L.marker(latlng, {
            icon: myIcon,
          });
        },
      });
    },
    // 切换地图
    currentMap(mapSource) {
      this.map.eachLayer((layler) => {
        layler.remove();
      });
      L.tileLayer(mapSource.mapUrl).addTo(this.map);
      this.layerTabs.forEach((ele) => {
        if (ele.isActive) {
          ele.layler.addTo(this.map);
        }
      });
    },
    // 添加标记
    addMark(item) {
      if (item.isActive) {
        if (item.layler != undefined) {
          item.layler.removeFrom(this.map);
        }
        item.layler = this.creatLayler(item.mark, item.data);
        item.layler.addTo(this.map);
      } else {
        item.layler.removeFrom(this.map);
      }
    },
    // 初始化地图
    initMap() {
      this.map = L.map("map", {
        center: [39.9, 116.39],
        zoom: 6,
      });
      L.PM.setOptIn(true);
      L.tileLayer(
        "http://rt0.map.gtimg.com/realtimerender?z={z}&x={x}&y={-y}&type=vector&style=0"
      ).addTo(this.map);
      this.layerTabs.forEach((ele) => {
        if (ele.isActive) {
          ele.layler = this.creatLayler(ele.mark, ele.data);
          ele.layler.addTo(this.map);
        }
      });
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
