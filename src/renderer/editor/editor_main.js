import Vue from 'vue'
import axios from 'axios'

import Editor from './Editor'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { Editor },
  store,
  template: '<Editor/>'
}).$mount('#editor')
