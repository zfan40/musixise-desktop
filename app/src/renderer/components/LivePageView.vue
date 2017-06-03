<template>
  <div class="">
    LivePage  currently as perform page
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
    computed: {
      midiDevices() {
        console.log('lllll');
        // return this.$MIDIDevice.activeDevices
        return this.$store.state.mididevice.deviceList;
      },
    },
    methods: {

    },
    created() {
      const self = this;
      MIDI.loadPlugin({
        soundfontUrl: '/soundfont/',
        instrument: 'acoustic_grand_piano',
        onprogress(state, progress) {
          console.log(state, progress);
        },
        onsuccess() {
          MIDI.setVolume(0, 127);
          self.$MIDIDevice.$on('midiMsg', (e) => {
            if (e.data[0] == 144) {
              MIDI.noteOn(0, e.data[1], e.data[2], 0);
            } else if (e.data[0] == 128) {
              MIDI.noteOff(0, e.data[1], 0);
            }
            console.log(e);
          });
        },
      });
      // this.$MIDIDevice.$on('midiMsg',function(e){console.log(e)})
      this.$MIDIDevice.$on('midiStateChange', (e) => {
        console.log('!!!!!!!!!!!!!!!!');
        console.log(self.$MIDIDevice.activeDevices);
        self.$store.commit('UPDATE_DEVICE', { device: self.$MIDIDevice.activeDevices });
      });
    },
  };
</script>

<style scoped lang="scss">
</style>
