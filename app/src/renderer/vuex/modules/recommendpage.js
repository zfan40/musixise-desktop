import * as types from '../mutation-types';
import Vue from 'vue';

const state = {
  renderer: {},
};

const mutations = {
  [types.RECOMMEND_LOADED](state, { data }) { // {a}相当于{'a':a}
    // console.log('mutation: update-user',userInfo)
    Object.keys(data).forEach((key) => {
      Vue.set(state.renderer, key, data[key]);// use set,instead of value assignment
    });
  },
};

export default {
  state,
  mutations,
};
