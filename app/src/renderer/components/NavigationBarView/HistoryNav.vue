<template>
<div class="">
  <i class="el-icon-arrow-left back" @click="goBack()"></i>
  <i class="el-icon-arrow-right forth" @click="goForth()"></i>
  <i class="el-icon-loading forth stay" @click="refresh()"></i>
</div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    computed: {
      currentPage() {
        return this.$store.state.user.pageInfo
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      goForth() {
        this.$router.go(1);
      },
      refresh() {
        // alert('refresh')
        console.log(this.$router.history.current.fullPath)
        const path = this.$router.history.current.fullPath
        this.$store.dispatch('refreshPage',{path})

        // this.$store.dispatch(`load${this.currentPage.pageName}`)
      }
    },
  };
</script>

<style scoped lang="scss">
 .back,.forth {font-size:14px;padding-left:16px;cursor:pointer;}
 .back:hover,.forth:hover {color:#bcbcbc;}
 .stay {animation:inherit}
</style>
