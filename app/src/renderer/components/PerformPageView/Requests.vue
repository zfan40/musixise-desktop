<template>
  <div class="">
    <ul>
      <li v-for="request in requests">
        {{request.username}}点播了: {{request.songname}}
      </li>
    </ul>
  </div>

</template>

<script>
  export default {
    data() {
      return {
      };
    },
    computed: {
      requests() {
        return this.$store.state.perform.requests;
      },
    },
    methods: {

    },
  };
</script>

<style scoped lang="scss">

</style>
