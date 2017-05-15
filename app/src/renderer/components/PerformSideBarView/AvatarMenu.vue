<template>
  <el-menu-item-group title="">
    <div class="AvatarMenu">
      <img class="avatar" :src="userInfo.smallAvatar" alt="]v[">
      <p class="name">{{userInfo.realname?userInfo.realname:'请登陆'}}</p>
    </div>
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
