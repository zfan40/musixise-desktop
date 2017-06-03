<script>
  const Vibrant = require('node-vibrant');// img color exteracter
  const MARQUEE_SPEED = 30;
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
        marqueeStyle: '',
      };
    },
    methods: {
      onclickcell() {
        // this.musixiserObj.userId
      },
      getImageColorCSS(imgurl) {
        const self = this;
        Vibrant.from(imgurl).getPalette()
          .then((palette) => {
            console.log(palette);
            if (palette.Vibrant) {
              self.marqueeStyle += `color:rgb(${palette.Vibrant._rgb.toString()});`;
            } else if (palette.LightVibrant) {
              self.marqueeStyle += `color:rgb(${palette.LightVibrant._rgb.toString()});`;
            } else if (palette.LightMuted) {
              self.marqueeStyle += `color:rgb(${palette.LightMuted._rgb.toString()});`;
            }
          });
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
      this.marqueeStyle = '';
      this.getImageColorCSS(this.musixiserObj.smallAvatar);
      console.log('a musixiser-min cell mounted');
      if (this.$refs.insider && this.$refs.outsider && (this.$refs.insider.offsetWidth > this.$refs.outsider.offsetWidth)) {
        const t = `${(this.$refs.insider.offsetWidth) / MARQUEE_SPEED}s;`;
        this.marqueeStyle += `-webkit-animation:marquee linear infinite;-o-animation:marquee linear infinite;animation:  marquee linear infinite;-webkit-animation-duration:${t}-o-animation-duration:${t}animation-duration:${t}`;
      } else {

      }
    },
    updated() {
      // this.marqueeStyle = '';
      // this.getImageColorCSS(this.musixiserObj.smallAvatar);
      // console.log('a musixiser-min cell updated');
      // if (this.$refs.insider&&this.$refs.outsider&&(this.$refs.insider.offsetWidth>this.$refs.outsider.offsetWidth)) {
      //   var t = (this.$refs.insider.offsetWidth)/MARQUEE_SPEED +'s;';
      //   this.marqueeStyle +=  '-webkit-animation:marquee linear infinite;-o-animation:marquee linear infinite;animation:  marquee linear infinite;-webkit-animation-duration:'+t+'-o-animation-duration:'+t+'animation-duration:'+t;
      // } else {
      //
      // }
    },
  };
</script>

<template>
    <div v-if="musixiserObj.userId" class="info" @click="onclickcell">
        <img class="user-cover" :src="musixiserObj.smallAvatar"></img>
        <div class="user-body">
          <span class="user-body-title">{{musixiserObj.realname}}</span>
          <span ref="outsider" class="user-body-desc"><p ref="insider" :style="marqueeStyle">{{musixiserObj.description?musixiserObj.description:'这家伙很屌什么都没写hlibeurig seuigs sgh ud skeh ugs sdj gkshrgksuygrsu g k sgv '}}</p></span>
        </div>
    </div>
</template>

<style lang="scss" scoped>

  .info {
    margin:.2rem .2rem .2rem .5rem;
    display: flex;
    align-items:stretch;
    font-size: .373rem;
    line-height: .75rem;
    height: 2.2rem;
    border-radius: .2rem;
    justify-content: space-between;
    background-color: #fff;
    color: #000;
    /*margin: .4rem 0 .6rem;*/
    .user-cover {
      /*width:2.2rem;*/
      /*height: 2.2rem;*/
      width:2.2rem;
      border-radius:1.1rem;
    }
    .user-body {
      width: 7.8rem;
      display:flex;
      border-bottom:1px solid #e2e2e2;
      flex-direction: column;
      justify-content:center;
      margin: 0 .3rem;
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
