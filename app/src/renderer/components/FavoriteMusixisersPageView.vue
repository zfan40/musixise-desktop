<template>
  <div style="position:relative;height:100%;">
    <div class="latestmusixisers">
      <div v-if="favMusixisers&&favMusixisers.length">
        <h2 class="section-title">我关注的Musixisers</h2>
        <el-row :gutter="10">
          <el-col v-for="item in favMusixisers" :xs="8" :sm="6" :md="6" :lg="4">
            <musixiser-grid-cell :musixiserObj="item"></musixiser-grid-cell>
          </el-col>
        </el-row>
      </div>

      <empty-page v-if="!favMusixisers||!favMusixisers.length" :text="emptyText"></empty-page>
    </div>
  </div>
</template>

<script>
  import MusixiserGridCell from './CommonComponent/MusixiserGridCell';
  import EmptyPage from './CommonComponent/empty';
  export default {
    components: {
      MusixiserGridCell,
      EmptyPage,
    },
    computed: {
      favMusixisers() {
        return this.$store.state.favorite.musixisers.content;
      },
      userInfo() {
        return this.$store.state.user.userInfo;
      },
    },
    data() {
      return {
        emptyText:'再不粉个小姐姐就要摔了！',
      };
    },

    methods: {

    },
    created() {
      if (this.userInfo.userId) {
        this.$store.dispatch('loadFavMusixisers',{userId:this.userInfo.userId})
          .then(() => { console.log('loadload success'); });
      }
    },
  };
</script>

<style scoped lang="scss">
.latestmusixisers {
  position: relative;
  height:100%;
}
</style>
