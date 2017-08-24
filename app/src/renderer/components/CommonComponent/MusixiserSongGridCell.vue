<script>
  const Vibrant = require('node-vibrant');// img color exteracter
  const MARQUEE_SPEED = 30;
  export default {
    props: {
      workObj: {
        type: Object,
        default() { return { id: 29, title: 'demo02', cover: '', content: '丧心病狂 pitchshift,sustain', url: 'http://oiqvdjk3s.bkt.clouddn.com/X9IHwOUm_test.txt', followStatus: 0, createdDate: '2017-03-23 16:45:13', userId: 40, collectNum: null, lastModifiedDate: '2017-03-23 16:45:13', fileHash: 'b730b516a4f34d9344e55288ec3b1245', owner: { uid: 40, nickName: '零零柒', smallAvatar: 'http://oaeyej2ty.bkt.clouddn.com/CcwtD1PN_dfg.jpg', largeAvatar: 'http://oaeyej2ty.bkt.clouddn.com/CcwtD1PN_dfg.jpg' }, status: null }; },
      },
      enableListen: {
        type: Number,
        default: 1,
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
        // console.log(this.$refs.insider.offsetWidth);
      }
    },
    updated() {
      // console.log('a song cell updated.');
      // if (this.$refs.insider&&this.$refs.outsider&&(this.$refs.insider.offsetWidth>this.$refs.outsider.offsetWidth)) {
      //   var t = (this.$refs.insider.offsetWidth)/MARQUEE_SPEED +'s;';
      //   this.marqueeStyle =  '-webkit-animation:marquee linear infinite;-o-animation:marquee linear infinite;animation:  marquee linear infinite;-webkit-animation-duration:'+t+'-o-animation-duration:'+t+'animation-duration:'+t;
      // } else {
      //   console.log('hehe');
      //   this.marqueeStyle = '';
      // }
    },
  };
</script>

<template>
    <div v-if="workObj.id" class="info" @click="onclickcell" @mouseover="onhovercell" @mouseleave="onleavecell">
        <img class="work-cover" :src="workObj.cover?workObj.cover:workObj.owner.smallAvatar"></img>
        <transition name="fade">
          <div v-show="maskshow" class="work-mask">
            <!-- <span ref="outsider" class="work-body-desc"><p ref="insider" :style="marqueeStyle">{{workObj.content}}</p></span> -->
            <img class="right-corner-icon" src="./assets/play.svg" alt="" @click.stop.prevent="play(workObj.id)">
            <img v-if="!workObj.followStatus" class="right-corner-icon" src="./assets/inactive-like.svg" alt="" @click.stop.prevent="followMusixiser(workObj.id)">
            <img v-if="workObj.followStatus" class="right-corner-icon" src="./assets/active-like.svg" alt="" @click.stop.prevent="unfollowMusixiser(workObj.id)">
          </div>
        </transition>
        <div class="work-body">
          <span class="work-body-title">{{workObj.title}}</span>
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
    .work-cover {
      /*width:2.2rem;*/
      /*height: 2.2rem;*/
      width:150px;
    }
    .work-body {
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
      .work-body-title {
        white-space: nowrap;
      }
    }
    .work-mask {
      position: absolute;;
      width: 150px;
      height: 150px;
      background-color:rgba(0,0,0,.6);
      z-index:1;
      .right-corner-icon {
        position: relative;
        display: inline-block;
        float: right;
        top:3px;
        width: 28px;
        height:28px;
      }
      .work-body-desc {
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
    .work-extra {
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
