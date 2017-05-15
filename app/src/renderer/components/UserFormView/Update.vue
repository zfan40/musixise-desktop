<template>
  <el-dialog title="上传头像" v-model="updateFormVisible" :before-close="handleClose">
    <vue-core-image-upload :class="['btn', 'btn-primary']" inputOfFile="file" :crop="false" :header="updateFormHeader" @imageuploaded="imageuploaded" :max-file-size="5242880" url="//api.musixise.com/api/picture/uploadPic" ></vue-core-image-upload>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hideUpdateDialog">取消</el-button>
      <el-button type="primary" @click="submitUpdateForm">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        updateFormHeader:{
          dataType: 'json',
          type: 'POST',
        },
        updateForm:{
          url:'',
        },
        formLabelWidth: '120px',
      };
    },
    computed:{
      updateFormVisible() {
        return this.$store.state.dialog.updateuser
      }
    },
    methods:{
      handleClose(){
        //cuz registerrFormVisible is bind with state, it cannot close automatically, we need to close in this before-close event
        this.hideUpdateDialog();
      },
      hideUpdateDialog(){
        this.$store.commit('HIDE_DIALOG',{type:'updateuser'});
      },
      submitUpdateForm(){
        let self = this;
        this.$store.dispatch('updateUser',{updateInfo:this.updateForm}).then(()=>{
          self.hideUpdateDialog();
        });
      },
      imageuploaded(){},
    },
  };
</script>

<style scoped lang="scss">
  .AvatarMenu {
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    .avatar {

    }
    .name {

    }
  }
</style>
