<script>
  export default {
    props: {
      musixiserObj: {
        type: Object,
        default() {
          return { id: 29, username: 'anonymousUser', realname: '零零柒', tel: null, email: '3108679268@gmail.com', birth: null, gender: null, smallAvatar: 'http://oaeyej2ty.bkt.clouddn.com/CcwtD1PN_dfg.jpg', largeAvatar: 'http://oaeyej2ty.bkt.clouddn.com/CcwtD1PN_dfg.jpg', nation: null, isMaster: null, followStatus: 0, followNum: 0, fansNum: 0, songNum: 0, userId: 40, createdDate: '2017-03-14 13:53:00' };
        },
      },
    },
    data() {
      return {
      };
    },
    methods: {
    },
    computed: {
    },
    created() {

    },
    updated() {

    },
  };
</script>

<template>
  <div class="musixiser-intro">
    <div class="avatar">
      <img :src="musixiserObj.smallAvatar" alt="">
    </div>
    <div class="text-info">
      <div class="name">
        <p>{{musixiserObj.realname}}</p>
      </div>
      <div class="basic-info">
        <span v-if="musixiserObj.nation">国籍:{{musixiserObj.nation}}</span>
        <span v-if="musixiserObj.birth">生日:{{musixiserObj.birth | birthDay}}</span>
        <span v-if="musixiserObj.gender">性别:{{musixiserObj.gender}}</span>
        <span></span>
      </div>
      <div class="description">
        <p>介绍: {{musixiserObj.brief}}</p>
      </div>
      <div class="interact">
        <el-button type="success">播放{{musixiserObj.realname}}的作品 <i class="el-icon-caret-right el-icon-right"></i></el-button>
        <el-button type="primary">关注({{musixiserObj.fansNum}}) <i class="el-icon-plus el-icon-right"></i></el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .musixiser-intro {
    display:flex;
    justify-content:space-around;
    align-items:center;
    height:200px;
    width:90%;
    margin:0 auto;
    .avatar {
      width:150px;
      height:150px;
      img { width:100%;border-radius:100px; }
    }
    .text-info {
      // background-color:green;
      width:600px;
      .name {
        font-size:30px;
        font-weight: 500;
        line-height:60px;
      }
      .basic-info {
        color:#888;
        font-size:14px;
        padding-bottom:10px;
      }
      .description {
        color:#888;
        font-size:14px;
        padding-bottom:10px;
      }
      .interact {

      }
    }
  }
</style>
