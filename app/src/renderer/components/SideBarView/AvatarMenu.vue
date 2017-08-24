<template>
  <div class="">
    <div class="" v-if="!userInfo.userId">
      <el-popover ref="user-popover" placement="bottom" title="" width="200" trigger="hover" v-model="popoverVisible">
        <div style="text-align: center; margin:20px 0;">
          <el-button size="mini" type="text" @click="register">register</el-button>
          <el-button size="mini" type="primary"  @click="login">login</el-button>
        </div>
      </el-popover>
      <el-menu-item-group title="">
        <div class="AvatarMenu">
          <img class="avatar" v-popover:user-popover src="/image/default-avatar.png" alt="]v[">
          <p class="name">Howdy Musixiser</p>
        </div>
      </el-menu-item-group>
    </div>
    <div class="" v-else>
      <el-popover ref="user-popover" placement="bottom" title="" width="200" trigger="hover">
        <div style="text-align: center; margin:20px 0;">
          <el-button size="mini" type="text" @click="logout">logout</el-button>
          <el-button size="mini" type="primary"  @click="update">update</el-button>
        </div>
      </el-popover>
      <el-menu-item-group title="">
        <div class="AvatarMenu">
          <img class="avatar" v-popover:user-popover :src="userInfo.smallAvatar" alt="]v[">
          <p class="name">{{userInfo.realname}}</p>
          <el-button size="mini" type="primary"  @click="perform">请开始你的表演</el-button>
        </div>
      </el-menu-item-group>

    </div>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        popoverVisible: false,
      };
    },
    computed: {
      userInfo() {
        return this.$store.state.user.userInfo;
      },
    },
    methods: {
      hidePopOver() {
        this.popoverVisible = false;
      },
      perform() {
        this.$router.push('/perform');
      },
      register() {
        this.hidePopOver();
        // pop register dialog (this is a sync, no need for dispatch)
        this.$store.commit('SHOW_DIALOG', { type: 'registeruser' });
      },
      login() {
        this.hidePopOver();
        // pop login dialog
        this.$store.commit('SHOW_DIALOG', { type: 'loginuser' });
      },
      update() {
        this.hidePopOver();
        // pop update dialog
        this.$store.commit('SHOW_DIALOG', { type: 'updateuser' });
      },
      logout() {
        this.hidePopOver();
        // directly logout
        this.$store.dispatch('logoutUser')
          .then(() => {
            const path = this.$router.history.current.fullPath
            this.$store.dispatch('refreshPage',{path})
          });
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
