import * as types from '../mutation-types';
import Vue from 'vue';

const state = {
  deviceList:[],
  ready:false,
  liveMode:false,
  isRecording:false,
};

const mutations = {
  [types.UPDATE_DEVICE](state, {device}) { //{a}相当于{'a':a}
    // console.log('mutation: update-user',userInfo)
    state.deviceList = [];
    for (var i = 0;i<=device.length-1;i++) {
      console.log('gndjxbfkcn,jxv',device[i].value.name)
      state.deviceList.push(device[i]);
    }
  },
  [types.UPDATE_LIVE_STATUS](state, {status}) {
    state.liveMode = status;
  },
  [types.UPDATE_RECORD_STATUS](state, {status}) {
    state.isRecording = status;
  },
  // [types.HANDLE_MIDIDEVICE_RECEIVE_SIGNAL](state,{midimsg}) {
  //
  // }
};

export default {
  state,
  mutations,
};
