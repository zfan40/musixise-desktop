<template>
  <el-dialog title="更新信息" v-model="UploadRecordFormVisible" :before-close="handleClose">
    <el-form :model="uploadRecordForm">
      <!-- <el-form-item label="头像更新" :label-width="formLabelWidth">
        <vue-core-image-upload :class="['btn', 'btn-primary']" inputOfFile="file" :crop="false" :header="updateFormHeader" @imageuploaded="imageuploaded" :max-file-size="5242880" url="//api.musixise.com/api/picture/uploadPic" ></vue-core-image-upload>
      </el-form-item> -->
      <el-form-item label="作品名称" :label-width="formLabelWidth">
        <el-input placeholder="为你的作品起个名..." v-model="uploadRecordForm.brief"></el-input>
      </el-form-item>
      <el-form-item label="作品介绍" :label-width="formLabelWidth">
        <el-input placeholder="为你的作品加点介绍..." type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="uploadRecordForm.brief"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hideUploadRecordDialog">取消</el-button>
      <el-button type="primary" @click="submitUploadRecordForm">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        updateFormHeader: {
          dataType: 'json',
          type: 'POST',
        },
        updateRecordForm: {
          tel: '',
          email: '',
          gender: '',
          birth: '',
          nation: '',
          smallAvatar: '',
          largeAvatar: '',
          brief: '',
        },
        formLabelWidth: '120px',
      };
    },
    computed: {
      UploadRecordFormVisible() {
        return this.$store.state.dialog.uploadrecord;
      },
      updateFormPlaceholder() {
        return this.$store.state.user.userInfo;
      },
    },

    methods: {
      handleClose() {
        // cuz registerrFormVisible is bind with state, it cannot close automatically, we need to close in this before-close event
        this.hideUploadRecordDialog();
      },
      hideUploadRecordDialog() {
        this.$store.commit('HIDE_DIALOG', { type: 'uploadrecord' });
      },
      submitUploadRecordForm() {
        const self = this;
        this.$store.dispatch('updateUser', { updateInfo: this.uploadRecordForm }).then(() => {
          self.hideUploadRecordDialog();
          self.$message({ message: '更新信息成功', type: 'success' });
        }, () => { self.$message({ message: '更新信息失败', type: 'error' }); });
      },
      imageuploaded() {},
    },
    mounted() {
      // others can use placeholder, no interference with two-way binding, but radio, v-model is annoying..
      this.uploadRecordForm.gender = this.updateFormPlaceholder.gender;
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
