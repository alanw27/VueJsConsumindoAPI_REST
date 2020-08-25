import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import Conta from './components/Conta.vue'
import Home from './components/Home.vue'

Vue.use(VueRouter)

const router = new VueRouter({
	mode:"history",
	routes: [
		{
			path: '/conta',
			component: Conta,
			name: 'conta'
		},
		{
			path: '/',
			component: Home,
			name: 'home'
		}
	]
})

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
