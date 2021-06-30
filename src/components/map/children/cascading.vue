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
          v-for="(item, index) of tabs"
          :key="index"
          @click="toggleMark(item, index)"
          :class="{ active: item.isActive }"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import mark from "@/assets/marker-icon.png";
import feijiImg from "@/assets/layler-img/feiji.png";
import tankeImg from "@/assets/layler-img/tanke.png";
import dapaoImg from "@/assets/layler-img/dapao.png";
import { feiji, tanke, dapao } from "../geojson";

export default {
  props: {
    map: {
      type: Object,
    },
  },
  data() {
    return {
      tabs: [
        {
          name: "飞机",
          data: feiji,
          isActive: false,
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
      add: [],
      geoLayler: undefined,
      isSelect: false,
    };
  },
  methods: {
    toggleMark(item, index) {
      this.tabs[index].isActive = !item.isActive;
      const isChecked = this.tabs.every((ele) => ele.isActive == true);
      if (isChecked) {
        this.isSelect = true;
        this.tabs.forEach((ele) => {
          this.geoLayler.addData(ele.data);
        });
      } else {
        this.isSelect = false;
        if (this.geoLayler) {
          this.geoLayler.removeFrom(this.map);
        }
        this.geoLayler = this.creatLayler();
        this.tabs.forEach((ele) => {
          if (ele.isActive) {
            this.geoLayler.addData(ele.data);
          }
        });
      }
      this.$emit("addMark", this.geoLayler);
    },
    onChange() {
      // 判断是否满足条件
      if (!this.geoLayler) {
        this.geoLayler = this.creatLayler();
      }
      if (this.isSelect) {
        this.tabs.forEach((ele) => {
          this.geoLayler.addData(ele.data);
        });
      } else {
        this.geoLayler.removeFrom(this.map);
        this.geoLayler = this.creatLayler();
      }
      const isChecked = this.tabs.every((ele) => ele.isActive == true);
      if (isChecked) {
        this.tabs.forEach((ele, index) => {
          this.tabs[index].isActive = this.isSelect;
        });
      } else {
        this.tabs.forEach((ele, index) => {
          this.tabs[index].isActive = this.isSelect;
        });
      }
      this.$emit("addMark", this.geoLayler);
    },
    creatLayler(data) {
      console.log(data);
      const myIcon = L.icon({
        iconUrl: mark,
        iconSize: [25, 41],
        iconAnchor: [12.5, 41],
      });
      const Layler = new L.GeoJSON(data, {
        // style: (features) => ({ color: features.properties.color }),
        pointToLayer: (geoJsonPoint, latlng) => {
          this.add.push(geoJsonPoint);
          return L.marker(latlng, {
            icon: myIcon,
          });
        },
      });
      return Layler;
    },
  },
  mounted() {
    // this.$emit("addMark", this.creatLayler(feiji));
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
