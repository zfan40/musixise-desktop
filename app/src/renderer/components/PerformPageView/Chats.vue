<template>
  <div class="">
    <ul>
      <li v-for="chat in chats">
        {{chat.username}}: {{chat.msg}}
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
      chats() {
        return this.$store.state.perform.chats;
      },
    },
    methods: {

    },
  };
</script>

<style scoped lang="scss">

</style>
