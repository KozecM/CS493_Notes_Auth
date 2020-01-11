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
  storageBucket: process.env.VUE_APP_FIREBASE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MESURE_ID
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