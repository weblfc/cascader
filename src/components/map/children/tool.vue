<template>
  <div class="content">
    <div class="geomen"></div>
  </div>
</template>

<script>
export default {
  props: {
    map: {
      type: Object,
    },
  },
  mounted() {
    this.map.pm.addControls({
      position: "topright",
      drawCircle: false,
    });
    console.log(this.map.pm.addControls)
    this.map.pm.setLang("zh");
  },
};
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  background: #fff;
  .geomen {
    float: right;
  }
}
</style>
