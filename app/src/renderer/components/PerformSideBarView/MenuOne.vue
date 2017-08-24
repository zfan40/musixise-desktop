<template>


  <el-menu-item-group title="Musixise" class="menu">
    <el-menu-item index="1"><span class="switch-name">Live</span><el-switch v-model="livemode" :disabled="!performState.deviceList.length" @change="updateLiveMode" on-color="#13ce66" off-color="#ff4949"></el-switch></el-menu-item>
    <el-menu-item index="2"><span class="switch-name">Record</span><el-switch v-model="recordmode" :disabled="!performState.deviceList.length" @change="updateRecordMode" on-color="#13ce66" off-color="#ff4949"></el-switch></el-menu-item>
    <el-menu-item index="3">
      <div class="" v-for="(device,index) in performState.deviceList" v-if="performState.deviceList.length">
        {{device.value.name}}
        <!-- <sup class="detonator" :class={active:}></sup> -->
      </div>
      <div class="" v-if="!performState.deviceList.length">
        插上乐器
      </div>
    </el-menu-item>
  </el-menu-item-group>
</template>

<script>
  export default {
    data() {
      return {
        livemode: false,
        recordmode: false,
      };
    },
    computed: {
      userInfo() {
        return this.$store.state.user.userInfo;
      },
      performState() {
        return this.$store.state.perform;
      },
    },
    methods: {
      updateLiveMode(e) {
        // const userInfo = {
        //       name: this.$store.state.user.userInfo.username,
        //       realname: this.$store.state.user.userInfo.realname,
        //       uid: this.$store.state.user.userInfo.userId,
        //       userAvatar: this.$store.state.user.userInfo.largeAvatar,
        //       stageTitle: 'sdfndsfn',
        //       audienceNum: 0, // 此处可造假数据...
        //     };
        // if (e) {this.$socket.emit('create stage', userInfo);}

        //go to setup live
        if (e) { this.$store.commit('SHOW_DIALOG',{type:'setuplive'})}
        else {this.$socket.emit('destroy stage');this.$store.commit('UPDATE_LIVE_STATUS', { status: e });}
      },
      updateRecordMode(e) {
        this.$store.commit('UPDATE_RECORD_STATUS', { status: e });
        if (e) {
          console.log('start record')
        } else {
          console.log('stop record')
          this.$store.commit('SHOW_DIALOG',{type:'uploadrecord'})
        }
      },
    },
  };
</script>

<style scoped lang="scss">
  .menu {
    .switch-name {display:inline-block; width:70px;}
  }
</style>
