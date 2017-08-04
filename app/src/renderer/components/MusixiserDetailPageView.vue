<template>
  <div style="position:relative;height:100%;margin-bottom:200px;">
    <div class="general">
      <musixiser-general-info :musixiserObj="musixiserObj"></musixiser-general-info>
    </div>
    <div class="works">
      <h2 class="section-title">TA的作品</h2>
      <el-row :gutter="10">
        <el-col v-for="item in musixiserWorks" :xs="8" :sm="6" :md="6" :lg="4">
          <musixiser-song-grid-cell :workObj="item"></musixiser-song-grid-cell>
        </el-col>
      </el-row>
    </div>
    <div class="following">

    </div>
    <div class="favWorks">
      <h2 class="section-title">TA收藏的作品</h2>
      <el-row :gutter="10">
        <el-col v-for="item in musixiserFavWorks" :xs="8" :sm="6" :md="6" :lg="4">
          <musixiser-song-grid-cell :workObj="item"></musixiser-song-grid-cell>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import MusixiserSongGridCell from './CommonComponent/MusixiserSongGridCell';
  import MusixiserGeneralInfo from './MusixiserDetailPageView/MusixiserGeneralInfo'
  import EmptyPage from './CommonComponent/empty';
  export default {
    components: {
      MusixiserSongGridCell,
      MusixiserGeneralInfo,
      EmptyPage,
    },
    computed: {
      musixiserObj() {
        return this.$store.state.musixiserdetail.musixiserObj;
      },
      musixiserWorks() {
        return this.$store.state.musixiserdetail.ownWorks;
      },
      musixiserFavWorks() {
        return this.$store.state.musixiserdetail.favWorks;
      },
      userInfo() {
        return this.$store.state.user.userInfo;
      },
    },
    data() {
      return {
        emptyText:'再不收藏首歌就摔啦'
      };
    },

    methods: {

    },
    created() {
        this.$store.dispatch('loadMusixiserDetail',{userId:this.$route.params.id})
          .then(() => { console.log('loadload success'); });
    },
  };
</script>

<style scoped lang="scss">
.favsongs {
  position: relative;
  height:100%;
}
.general {background-color:rgba(0,0,0,.05);}
.works,.favWorks {
  padding:10px 40px;
}
.section-title {
  font-size:16px;
  line-height:40px;
}
</style>
