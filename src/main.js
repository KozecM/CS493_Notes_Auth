import Vue from 'vue'
import App from './App.vue'
import router from "./routes";
import  "./firebase";
import store from "./store";

require('dotenv').config()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");