<template>
  <div class="">
    Perform page
    {{midiDevices.length}}
  </div>
</template>

<script>

  export default {
    components: {

    },
    computed: {

    },
    data() {
      return {};
    },
    computed:{
      midiDevices() {
        console.log('lllll');
        // return this.$MIDIDevice.activeDevices
        return this.$store.state.perform.deviceList;
      }
    },
    methods: {

    },
    created(){
      let self = this;
      let userInfo = {
          name: this.$store.state.user.userInfo.username,
          realname: this.$store.state.user.userInfo.realname,
          uid: this.$store.state.user.userInfo.userId,
          userAvatar: this.$store.state.user.userInfo.largeAvatar,
          stageTitle: 'sdfndsfn',
          audienceNum: 0 //此处可造假数据...
      }
      self.$socket.emit('create stage', userInfo);
      MIDI.loadPlugin({
        soundfontUrl: "/soundfont/",
        instrument: "acoustic_grand_piano",
        onprogress: function(state, progress) {
          console.log(state, progress);
        },
        onsuccess: function() {
          MIDI.setVolume(0, 127);
          self.$MIDIDevice.$on('midiMsg',function(e){
            if (e.data[0]==144) {
              MIDI.noteOn(0, e.data[1], e.data[2], 0);
            } else if (e.data[0]==128) {
              MIDI.noteOff(0,e.data[1],0);
            }
            console.log(e)
          })
        }
      });
      // this.$MIDIDevice.$on('midiMsg',function(e){console.log(e)})
      this.$MIDIDevice.$on('midiStateChange',function(e){
        console.log('!!!!!!!!!!!!!!!!');
        console.log(self.$MIDIDevice.activeDevices);
        self.$store.commit('UPDATE_DEVICE',{device:self.$MIDIDevice.activeDevices})
      })
    }
  };
</script>

<style scoped lang="scss">
</style>
