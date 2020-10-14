import Vue from 'vue';
import App from './App.vue';
import router from './router';
import firebase from 'firebase/app';

import configs from '../configs';

Vue.config.productionTip = false;

firebase.initializeApp(configs.firebaseConfig);

let app;

firebase.auth().onAuthStateChanged((user) => {
  console.log(user);
  if (!app) {
    app = new Vue({
      router,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
