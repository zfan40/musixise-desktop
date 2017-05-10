import * as types from './mutation-types';
import Vue from 'vue';

let req_config = {headers:{"Accept": "application/json","Content-Type": "application/json"}};

export const decrementMain = ({ commit }) => {
  commit(types.DECREMENT_MAIN_COUNTER);
};

export const incrementMain = ({ commit }) => {
  commit(types.INCREMENT_MAIN_COUNTER);
};

export const loginUser = ({ commit },{ loginInfo }) => {
  console.log('sdfsdf',loginInfo);
  Vue.axios.post('//api.musixise.com/api/user/authenticate',JSON.stringify(loginInfo),req_config)
    .then((response) => {
      console.log('authenticate user:', response.data);
      req_config.headers.Authorization = 'Bearer ' + response.data.id_token;//验证通过
      return Vue.axios.post('//api.musixise.com/api/user/getInfo','',req_config)
    })
    .then((response)=>{
      console.log('action: login result:', response.data);
      commit(types.UPDATE_USER,{userInfo:response.data.data});
    })
};

export const registerUser = ({ commit,dispatch },{ registerInfo }) => {
  console.log('sdfsdf',registerInfo);
  Vue.axios.post('//api.musixise.com/api/user/register',JSON.stringify(registerInfo),req_config)
    .then((response) => {
      console.log('action: register result:', response.data);
      dispatch('loginUser',{loginInfo:registerInfo})
    })
};

export const updateUser = ({ commit },{ updateInfo }) => {
  console.log('sdfsdf',registerInfo);
  Vue.axios.post('//api.musixise.com/api/user/authenticate',JSON.stringify(registerInfo),req_config)
    .then((response) => {
      console.log('authenticate user:', response.data);
      req_config.headers.Authorization = 'Bearer ' + response.data.id_token;//验证通过
      return Vue.axios.post('//api.musixise.com/api/user/getInfo','',req_config)
    })
    .then((response)=>{
      console.log('login user:', response.data);
      commit(types.UPDATE_USER,{userInfo:response.data.data});
    })
};

export const logoutUser = ({ commit }) => {
  req_config = {headers:{"Accept": "application/json","Content-Type": "application/json"}};
  commit(types.LOGOUT_USER);
};
// export const updateUser =
