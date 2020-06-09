import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import VueGoogleApi from 'vue-google-api'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

const config = {
  apiKey: 'AIzaSyDjbJY4K_bdo89iFCFMq52vZVmWYU7CFn8',
  clientId: '472089821824-q6nm065imv0716vevj3mpgp8pflidq9g.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/android_partner_over_the_air',
  discoveryDocs: ['https://androidovertheair.googleapis.com/$discovery/rest?version=v1&labels=ENABLED_PARTNERS']
}
Vue.use(VueGoogleApi, config)

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
