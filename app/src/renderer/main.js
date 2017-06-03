import Vue from 'vue';
import Electron from 'vue-electron';

import Router from 'vue-router';

import App from './App';
import routes from './routes';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
// nation flags (css nation flags)
import FlagIcon from 'vue-flag-icon';
// vue axios (HTTP requests)
import axios from 'axios';
import VueAxios from 'vue-axios';
//  vue resource is seemingly no better than axios
// import Resource from 'vue-resource';

import MIDIDevice from './components/MusixiseHelper/mididevice.js';

Vue.use(Electron);
// Vue.use(Resource);
Vue.use(Router);
Vue.use(ElementUI);
Vue.use(FlagIcon);
Vue.use(VueAxios, axios);
Vue.use(MIDIDevice);

Vue.config.debug = true;

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes,
});

/* eslint-disable no-new */
new Vue({
  router,
  ...App,
}).$mount('#app');
