<template>
  <div class="shop-wrapper">
    <empty-page :text="emptyText"></empty-page>
  </div>
</template>

<script>
  import EmptyPage from './CommonComponent/empty';
  export default {
    components: {
      EmptyPage,
    },
    computed: {

    },
    data() {
      return {
        emptyText:'hehe并无商品可卖'
      };
    },

    methods: {

    },
    created() {

    },
  };
</script>

<style scoped lang="scss">
  .shop-wrapper {position: relative;height:100%;}
</style>
