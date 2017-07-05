<template>
  <div style="position:relative;height:100%;">
    <div class="favsongs">
      <div v-if="favWorks&&favWorks.length">
        <h2 class="section-title">我收藏的Works</h2>
        <el-row :gutter="10">
          <el-col v-for="item in favWorks" :xs="8" :sm="6" :md="6" :lg="4">
            <musixiser-song-grid-cell :workObj="item"></musixiser-song-grid-cell>
          </el-col>
        </el-row>
      </div>
      <empty-page v-if="!favWorks||!favWorks.length" :text="emptyText"></empty-page>
    </div>
  </div>
</template>

<script>
  import MusixiserSongGridCell from './CommonComponent/MusixiserSongGridCell';
  import EmptyPage from './CommonComponent/empty';
  export default {
    components: {
      MusixiserSongGridCell,
      EmptyPage,
    },
    computed: {
      favWorks() {
        return this.$store.state.favorite.works;
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
      if (this.userInfo.userId) {
        this.$store.dispatch('loadFavWorks',{userId:this.userInfo.userId})
          .then(() => { console.log('loadload success'); });
      }
    },
  };
</script>

<style scoped lang="scss">
.favsongs {
  position: relative;
  height:100%;
}
</style>
