import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
import fs from 'fs-extra'
import path from 'path'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import './log'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false
Vue.use(ViewUI)
/* eslint-disable no-new */
window.globbalVue = new Vue({
	components: { App },
	router,
	store,
	template: '<App/>'
}).$mount('#app')
