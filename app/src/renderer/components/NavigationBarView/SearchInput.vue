<template>
  <div class="">
    <el-input class="search" placeholder="search" size="small" icon="search" v-model="input" :on-icon-click="search"></el-input>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        input: '',
      };
    },
    computed: {

    },
    methods: {
      search() {
        console.log(`to search with key: ${this.input}`);
      },
    },
  };
</script>

<style scoped lang="scss">

</style>
