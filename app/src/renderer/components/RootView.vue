<template>
  <div class="mainview">
    <div class="navigation-section">
      <navigation-bar></navigation-bar>
    </div>
    <div class="sidebar-section">
      <router-view name="sidebar-section"></router-view>
    </div>
    <div class="playbar-section">

    </div>
    <div class="content-section">
      <transition>
        <router-view name="content-section"></router-view>
      </transition>
    </div>
    <user-form></user-form>
  </div>
</template>

<script>
import NavigationBar from './NavigationBarView';
import UserForms from './UserFormView';
export default {
  components: {
    'navigation-bar': NavigationBar,
    'user-form': UserForms,
  },
  computed: {

  },
  data() {
    return {

    };
  },
  methods: {

  },
  created() {

  },
};
</script>

<style>
  * {
    box-sizing:border-box;
    margin:0;
    padding:0;
    font-family:"PingFang SC"
  }
  a {
    text-decoration: none;
    color:inherit;
  }
  input:focus, textarea:focus {
    outline: none;
  }
</style>
<style scoped lang="scss">

  .mainview {
    position: relative;
    width:100%;
    height:100%;
    // -webkit-app-region: drag; will enable frameless browser window dragable, so as to move the whole window
    // https://github.com/electron/electron/blob/master/docs/api/frameless-window.md
    .navigation-section {position:fixed;background-color:black;top:0;width:100%;height:50px;padding-left:200px;z-index:2;-webkit-app-region: drag;}
    .playbar-section {position:fixed;background-color:azure;bottom:0;width:100%;height:70px;z-index:2;-webkit-app-region: drag;}
    .sidebar-section {position:fixed;background-color:#eef1f6;left:0;width:200px;height:100%;padding-top:60px;z-index:2;-webkit-app-region: drag;}
    .content-section {position:fixed;background-color:white;width:100%;height:100%;padding:0 0 120px 200px;margin-top:50px;overflow-y:auto;z-index:1;}
  }
</style>
