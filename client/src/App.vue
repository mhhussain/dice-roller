<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import firebase from 'firebase/app';
import 'firebase/functions';
import 'firebase/analytics';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  async created() {
    const firebaseConfig = {
      apiKey: 'AIzaSyClrNOXnAsLnRFZxj-WJRG9FbQoBhoAq3I',
      authDomain: 'iammoo-dice-roller.firebaseapp.com',
      databaseURL: 'https://iammoo-dice-roller.firebaseio.com',
      projectId: 'iammoo-dice-roller',
      storageBucket: 'iammoo-dice-roller.appspot.com',
      messagingSenderId: '1094719742577',
      appId: '1:1094719742577:web:2d348a30e369b37d8331d0',
      measurementId: 'G-PWQHV5S6FB',
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    let functions = firebase.functions();
    let ping = functions.httpsCallable('ping');
    console.log('ifjewaoifejw');
    ping().then((res) => {
      console.log(res.data);
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
