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
        title: 'artist-song-cell',
        marqueeStyle: '',
        maskshow: false,
      };
    },
    methods: {
      onclickcell() {
        if (this.enableListen) {
          location.href = `musixise://play?id=${this.workObj.id}`;
        } else {
          alert('just preview');
        }
      },
      onhovercell() {
        this.maskshow = true;
        console.log('showon');
      },
      onleavecell() {
        this.maskshow = false;
        console.log('showoff');
      },
      getImageColorCSS(imgurl) {
        const self = this;
        console.log('aiyoyo', imgurl);
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
          }).catch((err) => console.log(err));
      },
    },
    computed: {
    },
    created() {
    },
    mounted() {
      this.marqueeStyle = '';
      this.getImageColorCSS(this.workObj.cover ? this.workObj.cover : this.workObj.owner.smallAvatar);
      if (this.$refs.insider && this.$refs.outsider && (this.$refs.insider.offsetWidth > this.$refs.outsider.offsetWidth)) {
        const t = `${(this.$refs.insider.offsetWidth) / MARQUEE_SPEED}s;`;
        this.marqueeStyle += `-webkit-animation:marquee linear infinite;-o-animation:marquee linear infinite;animation:  marquee linear infinite;-webkit-animation-duration:${t}-o-animation-duration:${t}animation-duration:${t};`;
      } else {
        this.marqueeStyle += '';
        console.log(this.$refs.insider.offsetWidth);
      }
    },
    updated() {

    },
  };
</script>




<template>
    <div v-if="musixiserObj.userId" class="info" @click="onclickcell" @mouseover="onhovercell" @mouseleave="onleavecell">
        <img class="user-cover" :src="musixiserObj.smallAvatar"></img>
        <transition name="fade">
          <div v-show="maskshow" class="user-mask">
            <span ref="outsider" class="user-body-desc"><p ref="insider" :style="marqueeStyle">{{musixiserObj.description?musixiserObj.description:'这家伙很屌什么都没写hlibeurig seuigs sgh ud skeh ugs sdj gkshrgksuygrsu g k sgv '}}</p></span>
          </div>
        </transition>
        <div class="user-body">
          <span class="user-body-title">{{musixiserObj.realname}}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>

  .info {
    display: flex;
    cursor: pointer;
    align-items:stretch;
    font-size: 16px;
    line-height: 30px;
    height: 150px;
    border-radius: 5px;
    justify-content: space-between;
    background-color: #fff;
    margin-bottom:20px;
    color: #000;
    /*margin: .4rem 0 .6rem;*/
    .user-cover {
      /*width:2.2rem;*/
      /*height: 2.2rem;*/
      width:150px;
    }
    .user-body {
      position: absolute;;
      width: 150px;
      height: 150px;
      display:flex;
      // flex-direction: column;
      justify-content:center;
      align-items: center;
      padding: 0 .3rem;
      color:white;
      z-index:2;
      .user-body-title {
        white-space: nowrap;
      }
    }
    .user-mask {
      position: absolute;;
      width: 150px;
      height: 150px;
      background-color:rgba(0,0,0,.6);
      z-index:1;
      .user-body-desc {
        text-align: center;
        position:relative;
        white-space: nowrap;
        line-height: 28px;
        height: 28px;
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


    // transition
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
      opacity: 0
    }
  }
</style>
