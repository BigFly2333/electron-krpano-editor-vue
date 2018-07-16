import Vue from 'vue'
import axios from 'axios'
import _ from 'lodash'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Editor from './Editor'
import store from './store'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(_)

/* eslint-disable no-new */
const vm = new Vue({
  components: { Editor },
  store,
  template: '<Editor ref="editor"/>',
  el: '#editor'
})

window.onload = function () {
  vm.$refs.editor.onready()
}
