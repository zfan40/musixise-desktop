<template>
  <div class="recommend-page">

    <div class="banner">
      <h2 class="section-title">热门活动</h2>
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in renderer.banners" :key="item">
          <img :src="item.img" class="carousel-img">
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="hotsongs">
      <h2 class="section-title">高山流水</h2>
      <el-row :gutter="10">
        <el-col v-for="item in renderer.hosSongs" :xs="8" :sm="6" :md="6" :lg="4">
          <musixiser-song-grid-cell :workObj="item"></musixiser-song-grid-cell>
        </el-col>
      </el-row>
    </div>

    <div class="hotmusixisers">
      <h2 class="section-title">琅琊榜</h2>
      <el-row :gutter="10">
        <el-col v-for="item in renderer.hotMusixisers" :xs="8" :sm="6" :md="6" :lg="4">
          <musixiser-grid-cell :musixiserObj="item"></musixiser-grid-cell>
        </el-col>
      </el-row>
    </div>

    <div class="latestsongs">
      <h2 class="section-title">新晋作品</h2>
      <el-row :gutter="10">
        <el-col v-for="item in renderer.latestSongs" :xs="8" :sm="6" :md="6" :lg="4">
          <musixiser-song-grid-cell :workObj="item"></musixiser-song-grid-cell>
        </el-col>
      </el-row>
    </div>

    <div class="latestmusixisers">
      <h2 class="section-title">初生牛犊</h2>
      <el-row :gutter="10">
        <el-col v-for="item in renderer.latestMusixisers" :xs="8" :sm="6" :md="6" :lg="4">
          <musixiser-grid-cell :musixiserObj="item"></musixiser-grid-cell>
        </el-col>
      </el-row>
    </div>

    <div class="ad">
      <h2 class="section-title">广而告之</h2>
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in renderer.ads" :key="item">
          <img :src="item.img" class="carousel-img">
        </el-carousel-item>
      </el-carousel>
    </div>

  </div>
</template>

<script>
  import MusixiserSongGridCell from './CommonComponent/MusixiserSongGridCell';
  import MusixiserGridCell from './CommonComponent/MusixiserGridCell';

  export default {
    components: {
      MusixiserSongGridCell,
      MusixiserGridCell,
    },
    computed: {
      renderer() {
        return this.$store.state.recommendpage.renderer;
      },
      user() {
        return this.$store.state.user.userInfo;
      }
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
    updated() {
      console.log('--- Recommend Page Update ---')
    }
  };
</script>

<style scoped lang="scss">
.recommend-page {
  position:relative;
  .section-title {
    font-size:24px;
    margin-bottom:24px;
    padding-left:10px;
    border-left:5px solid #ffcc33;
  }
  .banner {
    padding:20px 35px;
    .el-carousel__item h3 {color: #475669;font-size: 14px;opacity: 0.75;line-height: 200px;margin: 0;}
    .el-carousel__item:nth-child(2n) {display:flex;align-items:center;justify-content:center}
    .el-carousel__item:nth-child(2n+1) {display:flex;align-items:center;justify-content:center}
    .carousel-img {width:325px;height:200px;}
  }
  .latestsongs {
    padding:20px 35px;
  }
  .latestmusixisers {
    padding:20px 35px;
  }
  .hotsongs {
    padding:20px 35px;
  }
  .hotmusixisers {
    padding:20px 35px;
  }
  .ad {
    padding:20px 35px;
    .el-carousel__item h3 {color: #475669;font-size: 14px;opacity: 0.75;line-height: 200px;margin: 0;}
    .el-carousel__item:nth-child(2n) {display:flex;align-items:center;justify-content:center}
    .el-carousel__item:nth-child(2n+1) {display:flex;align-items:center;justify-content:center}
    .carousel-img {width:325px;height:200px;position: relative;}
  }
}

</style>
