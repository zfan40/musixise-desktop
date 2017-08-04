<template>
  <div class="perform-page-wrapper">
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple chats">
          {{currentAudienceAmount}}
          <chats></chats>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple requests">
          <requests></requests>        
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple gifts">
          <gifts></gifts>
        </div>
      </el-col>

    </el-row>
  </div>
</template>

<script>
  import Chats from './PerformPageView/Chats';
  import Gifts from './PerformPageView/Gifts';
  import Requests from './PerformPageView/Requests';

  export default {
    components: {
      'chats': Chats,
      'gifts': Gifts,
      'requests': Requests,
    },
    data() {
      return {
        currentAudienceAmount:0,

      };
    },
    computed: {
      midiDevices() { // midi devices lists
        console.log('lllll');
        // return this.$MIDIDevice.activeDevices
        return this.$store.state.perform.deviceList;
      },
      performState() { //state of performing (recordMode/liveMode)
        return this.$store.state.perform;
      },
      gifts() { // gifts received

      },
      chats() { // chats during performance

      },
      requests() { // music requests during performance

      }
    },

    methods: {
      setupSocketListener() {
        let self = this;
        //not socket on...
        this.$options.sockets.AudienceCome = (data) => {
            // this.currentAudienceAmount++
            this.$store.commit('AUDIENCE_COME')
        }
        this.$options.sockets.AudienceLeave = (data) => {
          // if (this.currentAudienceAmount <= 0) {
          //     this.currentAudienceAmount = 0;
          // } else {
          //     this.currentAudienceAmount--;
          // }
          this.$store.commit('AUDIENCE_LEAVE')
        }
        this.$options.sockets.res_AudienceComment = (data) => {
          console.log(data)
            this.$store.commit('PUSH_CHATS', { data })
        }
        this.$options.sockets.res_AudienceOrderSong = (data) => {
            console.log(data)
            this.$store.commit('PUSH_REQUESTS', { data })
        }
        this.$options.sockets.res_AudienceGiveGift = (data) => {
            this.$store.commit('PUSH_GIFTS', { data })
        }
      },
      responseChat() {
        this.$socket.emit('req_MusixiserComment', 'content');
      },
      respondRequestMusic() {
        this.$socket.emit('req_MusixiserPickSong', { type: 1, audienceName: 's', songName: '世界的约束' });
      },
    },
    created() {
      const self = this;
      self.setupSocketListener();
      MIDI.loadPlugin({
        soundfontUrl: '/soundfont/',
        instrument: 'acoustic_grand_piano',
        onprogress(state, progress) {
          console.log(state, progress);
        },
        onsuccess() {
          MIDI.setVolume(0, 127);
          self.$MIDIDevice.$on('midiMsg', (e) => {
            console.log(e);
            if (e.data[0]!=254) { //active sensing
              // to temporarily use MIDI object to make sound locally.
              if (e.data[0] == 144) {
                MIDI.noteOn(0, e.data[1], e.data[2], 0);
              } else if (e.data[0] == 128) {
                MIDI.noteOff(0, e.data[1], 0);
              }
              // while recording
              if (self.performState.recordMode) {
                self.$store.commit('PUSH_RECORDER',{data:[e.data[0],e.data[1],e.data[2],e.timeStamp-self.performState.recordStartTime]})
              }
              // while on live
              if (self.performState.liveMode) {
                console.log('to emit',JSON.stringify({midi_msg:e.data,time:e.timeStamp,from:46,timbre:'sine'}));
                self.$socket.emit('mmsg', JSON.stringify({midi_msg:e.data,time:e.timeStamp,from:46,timbre:'sine'}));
              }
            }

          });
        },
      });

      this.$store.commit('UPDATE_DEVICE', { device: this.$MIDIDevice.activeDevices });
      this.$MIDIDevice.$on('midiStateChange', (e) => {
        console.log('!!!!!!!!!!!!!!!!');
        console.log(self.$MIDIDevice.activeDevices);
        self.$store.commit('UPDATE_DEVICE', { device: self.$MIDIDevice.activeDevices });
      });
    },
  };
</script>

<style scoped lang="scss">
  .perform-page-wrapper { position: relative;height:100%;
    .el-row { position: relative;height:100%;
      .el-col { position: relative;height:100%;
        .grid-content {position: relative;height:100%;}
        .chats {background-color:white}
        .requests {background-color:green}
        .gifts {background-color:purple}
      }
    }
  }
</style>
