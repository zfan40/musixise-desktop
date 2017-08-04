<template>
<div class="">
  <i class="el-icon-arrow-left back" @click="goBack()"></i>
  <i class="el-icon-arrow-right forth" @click="goForth()"></i>
</div>
</template>

<script>
  export default {
    data() {
      return {};
    },
    computed: {

    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      goForth() {
        this.$router.go(1);
      }
    },
  };
</script>

<style scoped lang="scss">
 .back,.forth {font-size:14px;padding-left:16px;cursor:pointer;}
 .back:hover,.forth:hover {color:#bcbcbc;}
</style>
