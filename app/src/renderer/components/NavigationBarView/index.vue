<template>
  <div class="navigationbar">
    <div class="history-nav-wrapper">
      <history-nav></history-nav>
    </div>
    <div class="search-input-wrapper">
      <search-input></search-input>
    </div>
    <div class="setting-wrapper">
      <setting></setting>
    </div>
  </div>
</template>

<script>
  import HistoryNav from './HistoryNav';
  import SearchInput from './SearchInput';
  import Setting from './Setting';

  export default {
    components: {
      'history-nav': HistoryNav,
      'search-input': SearchInput,
      setting: Setting,
    },
    created() {
      console.log('--- NavigationBarView Init ---');
    },
  };
</script>

<style scoped lang="scss">
  .navigationbar {position:relative;height:100%;color:white;display:flex;align-items:center;
    .history-nav-wrapper {width:150px;}
    .search-input-wrapper {width:200px;}
    .setting-wrapper {flex:1;text-align:right;padding-right:18px;}
  }
</style>
