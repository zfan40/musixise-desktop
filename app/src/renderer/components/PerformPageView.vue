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

        <el-submenu index="4" style="float:right;" v-if="userInfo.userId">
          <template slot="title"><img style="height:100%;display:inline" :src="userInfo.smallAvatar"></template>
          <el-menu-item index="4-1" @click="updateUser">更新头像</el-menu-item>
          <el-menu-item index="4-2" @click="logout">登出</el-menu-item>
        </el-submenu>
        <el-menu-item index="4" style="float:right;" v-if="!userInfo.userId" @click="login">登录</el-menu-item>
        <el-menu-item index="5" style="float:right;" v-if="!userInfo.userId" @click="register">注册</el-menu-item>
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
          <el-input placeholder="仅限英文数字字符" v-model="registerForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input placeholder="可中文" v-model="registerForm.realName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" placeholder="请输入密码" v-model="registerForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" :label-width="formLabelWidth">
          <el-input type="password" placeholder="请确认密码" auto-complete="off"></el-input>
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
          <el-input v-model="loginForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input type="password" placeholder="" v-model="loginForm.password" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="loginFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitLoginForm">确认</el-button>
      </span>
    </el-dialog>
    <!-- upload avatar dialog -->
    <el-dialog title="上传头像" v-model="updateFormVisible">
      <vue-core-image-upload :class="['btn', 'btn-primary']" inputOfFile="file" :crop="false" :header="updateFormHeader" @imageuploaded="imageuploaded" :max-file-size="5242880" url="//api.musixise.com/api/picture/uploadPic" ></vue-core-image-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="loginFormVisible = false">取消</el-button>
        <el-button type="primary" @click="submitUpdateForm">确认</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
  import VueCoreImageUpload from 'vue-core-image-upload';

  //test
  import {song} from './MusixiseHelper/songs/her'

  export default {
    components: {
      'vue-core-image-upload': VueCoreImageUpload,
    },
    computed:{
      userInfo() {
        if (this.$store.state.user.userInfo.userId) {
          this.$message({
            message: '登录成功',
            type: 'success'
          });
        }
        return this.$store.state.user.userInfo
      }
    },
    data() {
      return {
        activeIndex: '1',
        // userInfo: {
        //   id:1,
        //   avatar:'http://oaeyej2ty.bkt.clouddn.com/CcwtD1PN_dfg.jpg',
        // },
        loginFormVisible: false,
        registerFormVisible: false,
        updateFormVisible:false,
        updateFormHeader:{
          dataType: 'json',
          type: 'POST',
        },
        updateForm:{
          url:'',
        },
        loginForm: {
          username: '',
          password: '',
        },
        registerForm: {
          username:'',
          password:'',
          realname:'',
          tel:null,
          email:'',
          gender:null,
          birth:null,
          nation:null,
          smallAvatar:'',
          largeAvatar:'',
          brief:null,
        },
        formLabelWidth: '120px',
      };
    },
    // created(){console.log('qwe',this.$store.state.user.userInfo)},//user is vuex module
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      },
      login() { this.loginFormVisible = true; },
      logout() {
        this.$store.dispatch('logoutUser')
        .then(()=>{this.$message({message: '登出成功',type: 'success',});})
      },
      register() { this.registerFormVisible = true; },
      updateInfo() { this.updateFormVisible = true; },
      submitLoginForm() {
        let self = this;
        // console.log(this.loginForm);
        this.$store.dispatch('loginUser',{loginInfo:this.loginForm}).then(()=>{
          self.loginFormVisible = false;
          //TODO TO FIGURE OUT....
          // console.log('after login, state=>user:',self.$store.state.user);//WHY I CAN SEE VALUE HERE!!!!!?????
          // console.log('2',self.userInfo);
          // console.log('3',self.userInfo.id);//WHY NO VALUE!!!!!??????
          //
          // setTimeout(function(){console.log('intimeout',self.userInfo.id)},1000) //WHY VALUE HERE!!!!!!!??????
        });
      },
      submitRegisterForm() {
        this.$store.dispatch('registerUser',{registerInfo:this.registerForm}).then(()=>{
          self.registerFormVisible = false;
        });
      },
      submitUpdateForm() {
        this.$store.dispatch('updateUser',{updateInfo:this.updateForm}).then(()=>{
          self.updateFormVisible = false;
        });
      },
      imageuploaded(){},
    },
    created(){
      console.log('inital state=>user:',this.$store.state.user);
      console.log('test mudcube midi',MIDI);
      MIDI.loadPlugin({
        soundfontUrl: "/soundfont/",
        instrument: "acoustic_grand_piano",
        onprogress: function(state, progress) {
          console.log(state, progress);
        },
        onsuccess: function() {
          var delay = 0; // play one note every quarter second
          var note = 50; // the MIDI note
          var velocity = 127; // how hard the note hits
          MIDI.setVolume(0, 127);
          // MIDI.noteOn(0, note, velocity, delay);
          // MIDI.noteOff(0, note, delay + 0.75);
          let tune = JSON.parse(song);
          console.log('xiaoquz',tune.length);
          let counter = tune.length;

          for (var i =0;i<=counter-1;i++) {
            (function(i) {
              setTimeout(function(){
                if (tune[i][0]==144) {
                  MIDI.noteOn(0,tune[i][1],tune[i][2],0)
                } else if (tune[i][0]==128) {
                  MIDI.noteOff(0,tune[i][1],tune[i][2],0)
                }
              },tune[i][3])
            })(i);
          }

        }
      });
    }
  };
</script>
