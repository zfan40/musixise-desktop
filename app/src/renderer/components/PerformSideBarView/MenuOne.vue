<template>


  <el-menu-item-group title="Musixise">
    <el-menu-item index="1">Live<el-switch v-model="livemode" @change="updateLiveMode" on-color="#13ce66" off-color="#ff4949"></el-switch></el-menu-item>
    <el-menu-item index="2">Record<el-switch v-model="recordmode" @change="updateRecordMode" on-color="#13ce66" off-color="#ff4949"></el-switch></el-menu-item>
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
        livemode:false,
        recordmode:false,
      };
    },
    computed:{
      userInfo() {
        return this.$store.state.user.userInfo;
      },
      performState() {
        return this.$store.state.perform;
      },
    },
    methods:{
      updateLiveMode(e){this.$store.commit('UPDATE_LIVE_STATUS',{status:e})},
      updateRecordMode(e){this.$store.commit('UPDATE_RECORD_STATUS',{status:e})}
    }
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
