<template>
  <el-menu-item-group title="My Favorite">
    <router-link to="/favorite-musixisers"><el-menu-item index="4"><i class="el-icon-message"></i>Musixiser</el-menu-item></router-link>
    <router-link to="/favorite-works"><el-menu-item index="5"><i class="el-icon-message"></i>Work</el-menu-item></router-link>
  </el-menu-item-group>
</template>

<script>
  export default {
    data() {
      return {};
    },
    computed: {
      userInfo() {
        return this.$store.state.user.userInfo;
      },
    },
  };
</script>

<style scoped lang="scss">

</style>
