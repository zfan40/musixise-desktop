<template>
  <div class="">
      <login></login>
      <register></register>
      <update></update>
  </div>
</template>

<script>
  import Login from './Login';
  import Register from './Register';
  import Update from './Update';

  export default {
    components:{
      'login':Login,
      'register':Register,
      'update':Update,
    },
    created() {
      console.log('--- UserFormView Init ---');
    },
  };
</script>

<style scoped>

</style>
