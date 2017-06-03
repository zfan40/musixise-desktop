<template>
  <div class="recommend-page">
    
    <div class="banner">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in renderer.banners" :key="item">
          <img :src="item.img">
        </el-carousel-item>
      </el-carousel>
    </div>
    
    <div class="latestsongs">
      <el-row :gutter="10">
        <el-col v-for="item in renderer.latestSongs" :xs="8" :sm="6" :md="6" :lg="4">
          <musixiser-song-cell :workObj="item"></musixiser-song-cell>
        </el-col>
      </el-row>
    </div>

    <div class="ad">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in renderer.ads" :key="item">
          <img :src="item.img">
        </el-carousel-item>
      </el-carousel>
    </div>

  </div>
</template>

<script>
  import MusixiserSongCell from './CommonComponent/MusixiserSongCell';
  export default {
    components: {
      MusixiserSongCell,
    },
    computed: {
      renderer() {
        return this.$store.state.recommendpage.renderer;
      },
    },
    data() {
      return {};
    },

    methods: {

    },
    created() {
      console.log('--- Recommend Page Init ---');
      this.$store.dispatch('loadRecommend')
        .then(() => { console.log('loadload success'); });
    },
  };
</script>

<style scoped lang="scss">
.recommend-page {
  position:relative;
  .banner {padding:20px 50px;
    .el-carousel__item h3 {color: #475669;font-size: 14px;opacity: 0.75;line-height: 200px;margin: 0;}
    .el-carousel__item:nth-child(2n) {background-color: #99a9bf;}
    .el-carousel__item:nth-child(2n+1) {background-color: #d3dce6;}
  }
  .ad {padding:20px 50px;
    .el-carousel__item h3 {color: #475669;font-size: 14px;opacity: 0.75;line-height: 200px;margin: 0;}
    .el-carousel__item:nth-child(2n) {background-color: #99a9bf;}
    .el-carousel__item:nth-child(2n+1) {background-color: #d3dce6;}
  }
}

</style>
