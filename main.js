import App from './App'
import * as api from '@/config/api.js'
import uView from "uview-ui";
import * as utils from '@/utils/utils.js'
import {store} from './store/index'
Vue.use(uView);
// #ifndef VUE3
import Vue from 'vue' 
Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$utils = utils
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
	store
  }
}
// #endif