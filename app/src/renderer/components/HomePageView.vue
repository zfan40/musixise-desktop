<template>
  <div>
    <header>
      <el-menu theme="dark" style="position:fixed;z-index:1;background-color:rgba(0,0,0,0);width:100%;" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1"><img style="height:100%;background-color:#ffcc33;" src="//www.musixise.com/imgs/mainpage/logo.png"></el-menu-item>
        <el-menu-item index="2"><a href="https://www.ele.me" target="_blank">主页</a></el-menu-item>
        <el-submenu index="3">
          <template slot="title">演出</template>
          <el-menu-item index="3-1">录音</el-menu-item>
          <el-menu-item index="3-2">直播</el-menu-item>
        </el-submenu>

        <el-submenu index="4" style="float:right;" v-if="userInfo.id">
          <template slot="title"><img style="height:100%;display:inline" :src="userInfo.avatar"></template>
          <el-menu-item index="4-1" @click="updateAvatar">更新头像</el-menu-item>
          <el-menu-item index="4-2" @click="logout">登出</el-menu-item>
        </el-submenu>
        <el-menu-item index="4" style="float:right;" v-if="!userInfo.id" @click="login">登录</el-menu-item>
        <el-menu-item index="5" style="float:right;" v-if="!userInfo.id" @click="register">注册</el-menu-item>
      </el-menu>
    </header>


    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <img style="width:100%;" src="http://www.musixise.com/imgs/mainpage/1.jpg">
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <img style="width:100%;" src="http://www.musixise.com/imgs/mainpage/6.jpg">
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <img style="width:100%;" src="http://www.musixise.com/imgs/mainpage/3.jpg">
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <img style="width:100%;" src="http://www.musixise.com/imgs/mainpage/4.jpg">
        </div>
      </el-col>
    </el-row>

<!--     <footer style="height:60px;display:flex;align-items: center;justify-content: center;background-color:#ffcc33;">
      京ICP备16027182号
    </footer> -->

    <!-- register dialog -->
    <el-dialog title="加入Musixise" v-model="registerFormVisible">
      <el-form :model="registerForm">
        <el-form-item label="登录名" :label-width="formLabelWidth">
          <el-input placeholder="仅限英文数字字符" v-model="registerForm.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input placeholder="可中文" v-model="registerForm.realName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" placeholder="请输入密码" v-model="registerForm.passWord" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" :label-width="formLabelWidth">
          <el-input type="password" placeholder="请确认密码" v-model="registerForm.passWord" auto-complete="off"></el-input>
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
        <el-button @click="registerFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitRegisterForm">确认</el-button>
      </span>
    </el-dialog>
    <!-- login dialog -->
    <el-dialog title="登录" v-model="loginFormVisible">
      <el-form :model="loginForm">
        <el-form-item label="登录名" :label-width="formLabelWidth">
          <el-input v-model="loginForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" placeholder="" v-model="loginForm.passWord" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="loginFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitLoginForm">确认</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        userInfo:{
          // id:1,
          // avatar:'http://oaeyej2ty.bkt.clouddn.com/CcwtD1PN_dfg.jpg',
        },
        loginFormVisible:false,
        registerFormVisible:false,
        loginForm:{
          userName: '',
          realName: '',
          passWord: '',
          region: '',
        },
        registerForm:{

        },
        formLabelWidth: '120px',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      },
      login(){this.loginFormVisible = true},
      logout(){},
      register(){this.registerFormVisible = true},
      updateAvatar(){},
      submitLoginForm(){},
      submitRegisterForm(){}
    },
  };
</script>
