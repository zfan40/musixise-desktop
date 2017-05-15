<template>
  <div class="">
    <el-menu mode="vertical" default-active="1" class="el-menu-vertical-demo">
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
    components:{
      'avatar-menu':AvatarMenu,
      'menu-one':MenuOne,
      'menu-two':MenuTwo,
    },
    created() {
      console.log('--- SideBarView Init ---');
    },
  };
</script>

<style scoped>

</style>
