<template>
  <el-dialog title="加入Musixise" v-model="registerFormVisible" :before-close="handleClose">
    <el-form :model="registerForm">
      <el-form-item label="登录名" :label-width="formLabelWidth">
        <el-input placeholder="仅限英文数字字符" v-model="registerForm.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户名" :label-width="formLabelWidth">
        <el-input placeholder="可中文" v-model="registerForm.realname" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input type="password" placeholder="请输入密码" v-model="registerForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="重复密码" :label-width="formLabelWidth">
        <el-input type="password" placeholder="请确认密码" v-model="verifypassword" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="国籍" :label-width="formLabelWidth">
        <el-select v-model="registerForm.region" placeholder="请选择">
          <el-option label="中国" value="China"><flag iso="cn" /> China</el-option>
          <el-option label="日本" value="Japan"><flag iso="jp" /> Japan</el-option>
          <el-option label="美国" value="America"><flag iso="us" /> America</el-option>
          <el-option label="德国" value="Germany"><flag iso="de" /> Germany</el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hideRegisterDialog">取消</el-button>
      <el-button type="primary" @click="submitRegisterForm">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        registerForm: {
          username: '',
          password: '',
          realname: '',
          tel: null,
          email: '',
          gender: null,
          birth: null,
          nation: null,
          smallAvatar: '',
          largeAvatar: '',
          brief: null,
        },
        verifypassword: '',
        formLabelWidth: '120px',
      };
    },
    computed: {
      registerFormVisible() {
        return this.$store.state.dialog.registeruser;
      },
    },
    methods: {
      handleClose() {
        // cuz registerrFormVisible is bind with state, it cannot close automatically, we need to close in this before-close event
        this.hideRegisterDialog();
      },
      hideRegisterDialog() {
        this.$store.commit('HIDE_DIALOG', { type: 'registeruser' });
      },
      submitRegisterForm() {
        const self = this;
        if (!self.registerForm.username || !self.registerForm.password || !self.verifypassword || !self.registerForm.realname) {
          self.$message({ message: '请填入必要信息', type: 'error' });
          return;
        }
        if (!(self.registerForm.username).match(/^[\w\.@]{6,20}$/)) {
          self.$message({ message: '用户名为6-20位数字字母', type: 'error' });
          return;
        }
        if (self.verifypassword != self.registerForm.password) {
          self.$message({ message: '两次密码输入不一致', type: 'error' });
          return;
        }
        this.$store.dispatch('registerUser', { registerInfo: this.registerForm }).then(() => {
          self.hideRegisterDialog();
        }, (errmsg) => { self.$message({ message: errmsg || '注册账号失败', type: 'error' }); });
      },
    },
  };
</script>

<style scoped lang="scss">

</style>
