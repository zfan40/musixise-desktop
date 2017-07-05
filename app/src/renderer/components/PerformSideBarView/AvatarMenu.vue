<template>
  <div class="">
    <el-menu-item-group title="">
      <div class="AvatarMenu">
        <img class="avatar" :src="userInfo.smallAvatar" alt="]v[">
        <p class="name">{{userInfo.realname}}</p>
        <el-button size="mini" type="primary"  @click="terminate">别演了好吗</el-button>
      </div>
    </el-menu-item-group>
  </div>

</template>

<script>
  export default {
    data() {
      return {
      };
    },
    computed: {
      userInfo() {
        return this.$store.state.user.userInfo;
      },
    },
    methods: {
      terminate() {
        // this.$socket.emit('disconnect');
        this.$router.push('/live');
      },
    },
  };
</script>

<style scoped lang="scss">
  .AvatarMenu {display:flex;flex-direction:column;align-items:center;justify-content:center;
    .avatar {width:50px;height:50px;border-radius: 25px;background-color: white;cursor:pointer;}
    .name {padding:5px 0;font-size:13px;}
  }
</style>
