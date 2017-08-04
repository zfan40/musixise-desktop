<template>
  <div class="stage-list-wrapper">
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
        emptyText:'开发中'
      };
    },

    methods: {

    },
    created() {

    },
  };
</script>

<style scoped lang="scss">
  .stage-list-wrapper {position: relative;height:100%;}
</style>
