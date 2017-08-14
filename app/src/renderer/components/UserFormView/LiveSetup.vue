<template>
  <el-dialog title="演出准备" v-model="liveSetupFormVisible" :before-close="handleClose" :show-close="showclose">
    <el-form :model="liveSetupForm">
      <el-form-item label="演出名称" :label-width="formLabelWidth">
        <el-input v-model="liveSetupForm.name" auto-complete="off"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="goLive">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        liveSetupForm: {
          name:''
        },
        showclose:false,
        formLabelWidth: '120px',
      };
    },
    computed: {
      liveSetupFormVisible() {
        return this.$store.state.dialog.setuplive;
      },
    },

    methods: {
      hideDialog() {
        this.$store.commit('HIDE_DIALOG', { type: 'setuplive' });
      },
      goLive(e) {
        const userInfo = {
              name: this.$store.state.user.userInfo.username,
              realname: this.$store.state.user.userInfo.realname,
              uid: this.$store.state.user.userInfo.userId,
              userAvatar: this.$store.state.user.userInfo.largeAvatar,
              stageTitle: this.liveSetupForm.name,
              audienceNum: 0, // 此处可造假数据...
            };
        this.$socket.emit('create stage', userInfo);
        this.$store.commit('UPDATE_LIVE_STATUS', { status: true });
        this.hideDialog();
      },
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
