<template>
  <baidu-map :center="center" :zoom="zoom" @ready="handler" class="map">
    <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
  </baidu-map>

</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        center: {lng: 0, lat: 0},
        zoom: 3
      };
    },
    components: {
    },

    methods: {
      handler ({BMap, map}) {
        console.log(BMap, map);
        this.center.lng = 116.404;
        this.center.lat = 39.915;
        this.zoom = 15;
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../assets/mixin";

  .map {
    width: 100%;
    height: 100%;
  }
</style>
