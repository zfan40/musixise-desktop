import * as types from '../mutation-types';
import Vue from 'vue';

const state = {
  deviceList:[],
};

const mutations = {
  [types.UPDATE_DEVICE](state, {device}) { //{a}相当于{'a':a}
    // console.log('mutation: update-user',userInfo)
    state.deviceList = [];
    for (var i = 0;i<=device.length-1;i++) {
      state.deviceList.push(device[i]);
    }
  }
};

export default {
  state,
  mutations,
};
