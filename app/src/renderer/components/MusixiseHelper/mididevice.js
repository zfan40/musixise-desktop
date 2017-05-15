function plugin(Vue) {

  if (plugin.installed) return

  var midiAccess = null; //global MIDIAccess object

  const MIDIDevice = new Vue({
    data(){
      return {
        activeDevices:[],
      }
    },
    created(){
      if (navigator.requestMIDIAccess) {
        navigator.requestMIDIAccess().then(this.onMIDISuccess, this.onMIDIFailure);
      } else {
        console.warn('WEB MIDI ISN\'T WORKING.');
      }
    },
    methods: {
      onMIDISuccess(midi){
        let self = this;
        console.log('web midi inited');
        midiAccess = midi;
        let inputs = midiAccess.inputs.values();
        self.activeDevices = [];
        for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
          self.activeDevices.push(input);
          input.value.onmidimessage = function(event){self.$emit('midiMsg',event)}
        }
        // console.log(self.activeDevices);
        self.$emit('midiStateChange');
        midiAccess.onstatechange = function(event){

          console.log(event);
          let inputs = midiAccess.inputs.values();
          self.activeDevices = [];
          for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
            self.activeDevices.push(input);
            input.value.onmidimessage = function(event){self.$emit('midiMsg',event)}
          }
          self.$emit('midiStateChange');
        }
      },
      onMIDIFailure(msg){
        console.log('web midi rejected');
      },
    }
  })

  // Extend `Vue.prototype` to include our global event bus.
  Object.defineProperty(Vue.prototype, '$MIDIDevice', {
    get() {
      return MIDIDevice
    }
  })
}

// Check for `window.Vue`
if (typeof window !== 'undefined' && window.Vue) {
  // Install plugin automatically.
  window.Vue.use(plugin)
}

export default plugin
