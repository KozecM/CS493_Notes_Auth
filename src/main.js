import Vue from 'vue'
import App from './App.vue'
import router from "./routes";
import * as firebase from "firebase";
import store from "./store";

require('dotenv').config()

Vue.config.productionTip = false

const configOptions = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "fir-cookbook-e01da.firebaseapp.com",
  databaseURL: "https://fir-cookbook-e01da.firebaseio.com",
  projectId: "fir-cookbook-e01da",
  storageBucket: "fir-cookbook-e01da.appspot.com",
  messagingSenderId: "968230329173",
  appId: "1:968230329173:web:e1258ba4fa8b16a56f6ddc",
  measurementId: "G-TQN4089ZF3"
};

firebase.initializeApp(configOptions);

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("fetchUser", user);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");