import * as types from './mutation-types';
import Vue from 'vue';

let req_config = { headers: { Accept: 'application/json', 'Content-Type': 'application/json' } };

export const decrementMain = ({ commit }) => {
  commit(types.DECREMENT_MAIN_COUNTER);
};

export const incrementMain = ({ commit }) => {
  commit(types.INCREMENT_MAIN_COUNTER);
};

/** ************ USER AUTH (login,register,update,logout) **************/
export const loginUser = ({ commit }, { loginInfo }) => {
  console.log('sdfsdf', loginInfo);
  // in this way, you can return a value, received by dispatch callback
  // http://stackoverflow.com/questions/40165766/returning-promises-from-vuex-actions
  return new Promise((resolve, reject) => {
    Vue.axios.post('//api.musixise.com/api/user/authenticate', JSON.stringify(loginInfo), req_config)
      .then((response) => {
        console.log('authenticate user:', response.data);
        req_config.headers.Authorization = `Bearer ${response.data.id_token}`;// 验证通过
        return Vue.axios.post('//api.musixise.com/api/user/getInfo', '', req_config);
      }, () => {
        reject();
      })
      .then((response) => {
        console.log('action: login result:', response.data);
        commit(types.UPDATE_USER, { userInfo: response.data.data });
        resolve('hehe');
      }, () => { reject(); });
  });
};

export const registerUser = ({ commit, dispatch }, { registerInfo }) => {
  console.log('sdfsdf', registerInfo);
  return new Promise((resolve, reject) => {
    Vue.axios.post('//api.musixise.com/api/user/register', JSON.stringify(registerInfo), req_config)
      .then((response) => {
        console.log('action: register result:', response.data);
        if (response.data.errmsg) {
          reject(response.data.errmsg);
          return;
        }
        dispatch('loginUser', { loginInfo: registerInfo });
      }, () => { reject(); });
  });
};

export const updateUser = ({ commit }, { updateInfo }) => {
  console.log('sdfsdf', updateInfo);
  return new Promise((resoleve, reject) => {
    Vue.axios.post('//api.musixise.com/api/user/updateInfo', JSON.stringify(updateInfo), req_config)
      .then((response) => {
        console.log('update user successful:', response.data);
        // commit(types.UPDATE_USER,{userInfo:response.data.data});
      }, () => { reject(); });
  });
};

export const logoutUser = ({ commit }) => {
  req_config = { headers: { Accept: 'application/json', 'Content-Type': 'application/json' } };
  commit(types.LOGOUT_USER);
};
/** ******************************************************************/

export const loadRecommend = ({ commit }) => {
  Vue.axios.post('//api.musixise.com/api/home', '', req_config)
    .then((response) => {
      commit(types.RECOMMEND_LOADED, { data: response.data.data });
    });
};

export const loadFavMusixisers = ({ commit }, {userId,page}) => {
  Vue.axios.post('//api.musixise.com/api/follow/followings/' + userId, '', req_config)
    .then(function(response) {
      commit(types.REFRESH_FAV_MUSIXISERS, { data: response.data.data})
    })
    .catch(function(err) {

    });
}

export const loadFavWorks = ({ commit }, {userId,page}) => {

  Vue.axios.post('//api.musixise.com/api/favorite/getWorkList/' + userId, '', req_config)
    .then(function(res) {
      commit(types.REFRESH_FAV_WORKS, { data: response.data.data})
    })
    .catch(function(err) {

    });
}

export const followMusixiser = ({commit},{userId}) => {
  let param = {followId:userId,status:0};//0 is code to follow
  Vue.axios.post('//api.musixise.com/api/follow/add',JSON.stringify(param),req_config)
    .then(function(res){
      // commit(types.UPDATE_MUSIXISER_RELATION,{data:})
    })
    .catch(function(err) {

    })
}

export const unfollowMusixiser = ({commit},{userId}) => {
  let param = {followId:userId,status:1};//1 is code to unfollow
  Vue.axios.post('//api.musixise.com/api/follow/add',JSON.stringify(param),req_config)
    .then(function(res){
      // commit(types.UPDATE_MUSIXISER_RELATION,{data:})
    })
    .catch(function(err) {

    })
}

export const updateRecord = ({commit},{status}) => {

}

export const uploadRecord = ({commit},{record}) => {
  let form_req_config = {headers:{'Content-Type':'multipart/form-data','processData':false}}
  let blob = new Blob([JSON.stringify(record)]);
  let reader = new FileReader();
  reader.onload = function(event) {
      let fd = new FormData();
      fd.append('fname', 'test.txt');
      fd.append('data', event.target.result);
      Vue.axios.post('//api.musixise.com/api/uploadAudio',fd,form_req_config)
        .then(function(res){
          // commit(types.UPDATE_MUSIXISER_RELATION,{data:})
          let workURL = ('http://oiqvdjk3s.bkt.clouddn.com/' + res.data);
          console.log(workURL)
          let param = {
            // title:$('#work-title').val(),
            // content:$('#work-description').val(),
            // cover:workCoverImg,
            url: workURL
          }
          Vue.axios.post('//api.musixise.com/api/work/create',JSON.stringify(param),req_config)
            .then(function(res){
              // commit(types.UPDATE_MUSIXISER_RELATION,{data:})
            })
            .catch(function(err) {

            })
        })
        .catch(function(err) {

        })
    }
    // trigger the read from the reader...
    reader.readAsDataURL(blob);
}
