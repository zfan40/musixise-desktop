import * as types from '../mutation-types';
import Vue from 'vue';

const state = {
  registeruser: false,
  loginuser: false,
  updateuser: false,
  uploadrecord: false,
};

const mutations = {
  [types.SHOW_DIALOG](state, { type }) {
    if (type != 'registeruser' && type != 'loginuser' && type != 'updateuser' && type!= 'uploadrecord') {
      console.warn('还tm没有这种弹窗，请传入registeruser／loginuser／updateuser/uploadrecord');
      return;
    }
    Vue.set(state, type, true); // means state[type] = true
  },
  [types.HIDE_DIALOG](state, { type }) {
    if (type != 'registeruser' && type != 'loginuser' && type != 'updateuser' && type!= 'uploadrecord') {
      console.warn('还tm没有这种弹窗，请传入registeruser／loginuser／updateuser/uploadrecord');
      return;
    }
    Vue.set(state, type, false); // means state[type] = false
  },
};

export default {
  state,
  mutations,
};
