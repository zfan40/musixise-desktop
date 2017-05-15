<template>
  <el-menu-item-group title="Musixise">
    <router-link to="/recommend"><el-menu-item index="1"><i class="el-icon-message"></i>Recommend</el-menu-item></router-link>
    <router-link to="/live"><el-menu-item index="2"><i class="el-icon-message"></i>Live</el-menu-item></router-link>
  </el-menu-item-group>
</template>

<script>
  export default {
    data() {
      return {};
    },
    computed:{
      userInfo() {
        return this.$store.state.user.userInfo
      }
    },
  };
</script>

<style scoped lang="scss">
  .AvatarMenu {
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    .avatar {

    }
    .name {

    }
  }
</style>
