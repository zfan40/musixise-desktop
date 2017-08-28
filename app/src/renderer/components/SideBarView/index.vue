<template>
  <div class="sidebar-wrapper">
    <el-menu mode="vertical" :default-active="activeIndex" class="el-menu-vertical-demo">
      <avatar-menu></avatar-menu>
      <menu-one></menu-one>
      <menu-two></menu-two>
    </el-menu>
  </div>
</template>

<script>
  import AvatarMenu from './AvatarMenu';
  import MenuOne from './MenuOne';
  import MenuTwo from './MenuTwo';

  export default {
    data() {
      return {
        activeIndex:'1'
      }
    },
    watch: {
      '$route' (to, from) {
        // react to route changes...
        if (to.path == '/recommend') {this.activeIndex = 1;console.log(1)}
        else if (to.path == '/live') {this.activeIndex = 2;console.log(2)}
        else if (to.path == '/shop') {this.activeIndex = 3;console.log(3)}
        else if (to.path == '/favorite-musixisers') {this.activeIndex = 4}
        else if (to.path == '/favorite-works') {this.activeIndex = 5}
      }
    },
    components: {
      'avatar-menu': AvatarMenu,
      'menu-one': MenuOne,
      'menu-two': MenuTwo,
    },
    created() {
      console.log('--- SideBarView Init ---');
      // active based on router /path
      // this.activeIndex = this.$router.history.fullPath
    },
  };
</script>

<style scoped lang="scss">

</style>
