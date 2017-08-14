<template>
  <div class="">
      <login></login>
      <register></register>
      <update></update>
      <upload-record></upload-record>
      <live-setup></live-setup>
  </div>
</template>

<script>
  import Login from './Login';
  import Register from './Register';
  import Update from './Update';
  import UploadRecord from './UploadRecord';
  import LiveSetup from './LiveSetup';

  export default {
    components: {
      login: Login,
      register: Register,
      update: Update,
      uploadRecord: UploadRecord,
      liveSetup: LiveSetup,
    },
    created() {
      console.log('--- UserFormView Init ---');
    },
  };
</script>

<style scoped>

</style>
