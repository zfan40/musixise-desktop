<template>
  <div class="perform-page-wrapper">
    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple chats">1</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple requests">2</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple gifts">3</div></el-col>
    </el-row>
  </div>
</template>

<script>
  window.recorder = [];
  export default {
    components: {

    },
    data() {
      return {};
    },
    computed: {
      midiDevices() {
        console.log('lllll');
        // return this.$MIDIDevice.activeDevices
        return this.$store.state.perform.deviceList;
      },
      performState() {
        return this.$store.state.perform;
      },
    },

    methods: {

    },
    created() {
      const self = this;
      const userInfo = {
        name: this.$store.state.user.userInfo.username,
        realname: this.$store.state.user.userInfo.realname,
        uid: this.$store.state.user.userInfo.userId,
        userAvatar: this.$store.state.user.userInfo.largeAvatar,
        stageTitle: 'sdfndsfn',
        audienceNum: 0, // 此处可造假数据...
      };
      self.$socket.emit('create stage', userInfo);
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
                // recorder.push(e.data[0],e.data[1],e.data[2],e.timeStamp-self.performState.recordStartTime);
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
