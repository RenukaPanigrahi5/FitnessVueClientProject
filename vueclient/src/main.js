// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Toaster from 'v-toaster'
require("../node_modules/bootstrap/dist/css/bootstrap.css")
import 'vuetify/dist/vuetify.min.css'
import VeeValidate from 'vee-validate';
import Vuetify from 'vuetify' // Import Vuetify to your project
import VueShareSocial from 'vue-share-social'
import DataTable from 'v-data-table'
import vSelect from 'vue-select';


Vue.use(DataTable)
Vue.use(VueShareSocial)
Vue.use(Vuetify) // Add Vuetify as a plugin
Vue.use(VeeValidate);
Vue.component('v-select',vSelect);
import 'v-toaster/dist/v-toaster.css'
Vue.use(Toaster, {timeout: 5000})
import "chart.js";
import "hchs-vue-charts";
Vue.use(window.VueCharts);
import ActivityGraph from './components/ActivityGraph/ActivityGraph.vue'
Vue.component('activity-graph',ActivityGraph)
import facebookLogin from 'facebook-login-vuejs';
Vue.config.productionTip = false
Vue.prototype.$BASE_URL = 'http://localhost:8082/fitnessapp/'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
