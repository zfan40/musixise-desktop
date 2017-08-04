import * as types from '../mutation-types';
import Vue from 'vue';

const state = {
  musixiserObj: {},
  ownWorks:[],
  favWorks:[]
};

const mutations = {
  [types.GET_MUSIXISER_DETAIL](state, { data }) { // {a}相当于{'a':a}
    if (data) {
      Object.keys(data).forEach((key) => {
        Vue.set(state.musixiserObj, key, data[key]);// use set,instead of value assignment
      });
    } else {
      Vue.set(state.musixiserObj,{});
    }
  },
  [types.GET_MUSIXISER_DETAIL_OWN_WORK](state, { data }) { // {a}相当于{'a':a}
    // console.log('mutation: update-user',userInfo)
    state.ownWorks = data;
    // Object.keys(userInfo).forEach((key) => {
      // Vue.set(state.userInfo, key, userInfo[key]);// use set,instead of value assignment

    // });

  },
  [types.GET_MUSIXISER_DETAIL_FAV_WORK](state, { data }) { // {a}相当于{'a':a}
    // console.log('mutation: update-user',userInfo)
    state.favWorks = data;
    // Object.keys(userInfo).forEach((key) => {
      // Vue.set(state.userInfo, key, userInfo[key]);// use set,instead of value assignment

    // });

  },
};

export default {
  state,
  mutations,
};
