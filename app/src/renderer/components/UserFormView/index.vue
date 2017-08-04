<template>
  <div class="">
      <login></login>
      <register></register>
      <update></update>
      <upload-record></upload-record>
  </div>
</template>

<script>
  import Login from './Login';
  import Register from './Register';
  import Update from './Update';
  import UploadRecord from './UploadRecord';

  export default {
    components: {
      login: Login,
      register: Register,
      update: Update,
      uploadRecord: UploadRecord,
    },
    created() {
      console.log('--- UserFormView Init ---');
    },
  };
</script>

<style scoped>

</style>
