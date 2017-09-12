import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import RouterConfig from './routerconfig'
import VueResource from 'vue-resource'
// import VueMask from 'v-mask'
// import VeeValidate from 'vee-validate'
import money from 'v-money'
// import AwesomeMask from 'awesome-mask'
import vSelect from 'vue-select'

Vue.use(VueRouter)
Vue.use(VueResource)
// Vue.use(VueMask)
// Vue.use(VeeValidate)
Vue.use(money, {
  decimal: ',',
  thousands: '.',
  prefix: 'R$ ',
  precision: 2,
  masked: false
})
// Vue.use(AwesomeMask)

Vue.component('v-select', vSelect)

const router = new VueRouter()
router.map(RouterConfig)
router.start(App, 'App')
