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
export const refreshPage = ({ dispatch, state },{ path }) => {
  // refresh the page, based on passed-in path (cannot get current path in action...)
  switch (path.split('/')[1]) {
    case 'recommend':
      dispatch('loadRecommend');
      break;
    case 'musixiser':
      dispatch('loadMusixiserDetail',{userId:path.split('/')[2]})
      break;
    case 'favorite-musixisers':
      // dispatch('loadFavMusixisers',{userId:this.userInfo.userId})
      console.log('refreshing: ',state)
      dispatch('loadFavMusixisers',{userId:state.user.userInfo.userId})
      break;
    case 'favorite-works':
      dispatch('loadFavWorks',{userId:state.user.userInfo.userId})
      break;
    default:
      break;
  }
}

export const loadRecommend = ({ commit }) => {
  Vue.axios.post('//api.musixise.com/api/home', '', req_config)
    .then((response) => {
      commit(types.RECOMMEND_LOADED, { data: response.data.data });
    });
};

export const loadFavMusixisers = ({ commit }, {userId,page}) => {
  if (!userId) {
    commit(types.REFRESH_FAV_MUSIXISERS, { data: {content:[]}})
    return
  }
  Vue.axios.post('//api.musixise.com/api/follow/followings/' + userId, '', req_config)
    .then(function(response) {
      commit(types.REFRESH_FAV_MUSIXISERS, { data: response.data.data})
    })
    .catch(function(err) {

    });
}

export const loadFavWorks = ({ commit }, {userId,page}) => {
  if (!userId) {
    commit(types.REFRESH_FAV_WORKS, { data: {content:[]}})
    return
  }
  Vue.axios.post('//api.musixise.com/api/favorite/getWorkList/' + userId, '', req_config)
    .then(function(response) {
      commit(types.REFRESH_FAV_WORKS, { data: response.data.data})
    })
    .catch(function(err) {

    });
}

export const followMusixiser = ({commit},{userId}) => {
  let param = {followId:userId,status:0};//0 is code to follow
  Vue.axios.post('//api.musixise.com/api/follow/add',JSON.stringify(param),req_config)
    .then(function(response){
      // commit(types.UPDATE_MUSIXISER_RELATION,{data:})
    })
    .catch(function(err) {

    })
}

export const unfollowMusixiser = ({commit},{userId}) => {
  let param = {followId:userId,status:1};//1 is code to unfollow
  Vue.axios.post('//api.musixise.com/api/follow/add',JSON.stringify(param),req_config)
    .then(function(response){
      // commit(types.UPDATE_MUSIXISER_RELATION,{data:})
    })
    .catch(function(err) {

    })
}

export const updateRecord = ({commit},{status}) => {

}

export const uploadRecord = ({commit},{record,info}) => {
  return new Promise((resolve, reject) => {
    let form_req_config = {headers:{'Content-Type':'multipart/form-data','processData':false}}
    let blob = new Blob([JSON.stringify(record)]);
    let reader = new FileReader();
    reader.onload = function(event) {
        let fd = new FormData();
        fd.append('fname', 'test.txt');
        fd.append('data', event.target.result);
        Vue.axios.post('//api.musixise.com/api/uploadAudio',fd,form_req_config)
          .then(function(response){
            // commit(types.UPDATE_MUSIXISER_RELATION,{data:})
            let workURL = 'http://oiqvdjk3s.bkt.clouddn.com/' + response.data.data;
            console.log(workURL)
            let param = {
              ...info,
              url: workURL
            }
            Vue.axios.post('//api.musixise.com/api/work/create',JSON.stringify(param),req_config)
              .then(function(response){
                // commit(types.UPDATE_MUSIXISER_RELATION,{data:})
                resolve()
              })
              .catch(function(err) {
                reject()
              })
          })
          .catch(function(err) {
            reject()
          })
      }
      // trigger the read from the reader...
      reader.readAsDataURL(blob);
  })
}

export const loadMusixiserDetail = ({commit},{userId}) => {
  console.log('load musixiser detail!!!' + userId);
  Vue.axios.post('//api.musixise.com/api/user/detail/' + userId, '',req_config)
    .then(function(response){
      commit(types.GET_MUSIXISER_DETAIL,{data:response.data.data})
    })
    .catch(function(err) {

    })
  //get musixiser works
  Vue.axios.post('//api.musixise.com/api/work/getListByUid/' + userId, '', req_config)
    .then(function(response) {
      commit(types.GET_MUSIXISER_DETAIL_OWN_WORK,{data:response.data.data.content});
        console.log('--- own songlist ---',self.songlist);
    })
    .catch(function(err) {

    });
  // get musixiser favorite list
  Vue.axios.post('//api.musixise.com/api/favorite/getWorkList/' + userId, '', req_config)
    .then(function(response) {
      commit(types.GET_MUSIXISER_DETAIL_FAV_WORK,{data:response.data.data.content});
        console.log('--- fav songlist ---',self.favsonglist);
    })
    .catch(function(err) {

    });
}
