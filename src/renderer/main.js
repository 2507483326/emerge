import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import HeyUi from 'heyui'
import VueBus from 'vue-bus'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(HeyUi)
Vue.use(VueBus)

/* eslint-disable no-new */
new Vue({
	components: {App},
	router,
	store,
	template: '<App/>'
}).$mount('#app')
