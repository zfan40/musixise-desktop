<template>
  <div class="sidebar-wrapper">
    <el-menu mode="vertical" default-active="1" class="el-menu-vertical-demo">
      <avatar-menu></avatar-menu>
      <menu-one></menu-one>
    </el-menu>
  </div>
</template>

<script>
  import AvatarMenu from './AvatarMenu';
  import MenuOne from './MenuOne';

  export default {
    components:{
      'avatar-menu':AvatarMenu,
      'menu-one':MenuOne,
    },
    created() {
      console.log('--- Perform SideBarView Init ---');
    },
  };
</script>

<style scoped lang="scss">

</style>
