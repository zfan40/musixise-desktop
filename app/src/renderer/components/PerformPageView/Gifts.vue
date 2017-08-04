<template>
  <div class="">
    <ul>
      <li v-for="gift in gifts">
        {{gift.sender}}: {{gift.body}}
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
      gifts() {
        return this.$store.state.perform.gifts;
      },
    },
    methods: {

    },
  };
</script>

<style scoped lang="scss">

</style>
