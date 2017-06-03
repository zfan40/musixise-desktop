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
        title: 'musixiser-min-cell',
  
      };
    },
    methods: {
      onclickcell() {
        // this.musixiserObj.userId
      },
    },
    computed: {

    },
    created() {

    },
    updated() {
      // console.log(this.musixiserObj);
    },
    mounted() {

    },
    updated() {

    },
  };
</script>

<template>
    <div v-if="musixiserObj.userId" class="musixise-grid" @click="onclickcell">
        <img class="user-cover" :src="musixiserObj.smallAvatar"></img>
        <div class="user-body">
          <span class="user-body-title">{{musixiserObj.realname}}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>

  .musixise-grid {
    /*margin:.2rem .2rem .2rem .5rem;*/
    width:3rem;
    font-size: .373rem;
    line-height: .75rem;
    height: 3.8rem;
    border-radius: .2rem;
    background-color: #fff;
    color: #000;
    text-align: center;
    /*margin: .4rem 0 .6rem;*/
    .user-cover {
      width:2.2rem;
      height:2.2rem;
      border-radius:1.1rem;
    }
    .user-body {
      width: 3rem;
      display:flex;
      /*border-bottom:1px solid #e2e2e2;*/
      flex-direction: column;
      justify-content:center;
      .user-body-title {
        white-space: nowrap;
      }
      .user-body-desc {
        position:relative;
        white-space: nowrap;
        line-height: .8rem;
        height: .8rem;
        overflow:hidden;
        color:#3d3d3d;
        p {
          position:absolute;
        }
      }
      /*-100%正好到边*/
      @keyframes marquee {
        0%   { transform: translate(10%, 0); }
        50% { transform: translate(-70%, 0); }
        100% { transform: translate(10%, 0); }
      }
    }
    .user-extra {
      width: 1rem;
    }
  }
</style>
