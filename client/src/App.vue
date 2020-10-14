<template>
  <div id="app">
    <h2>Dice Roller</h2>
    <router-view />
  </div>
</template>

<script>
import configs from '../configs';
import firebase from 'firebase';
import 'firebase/functions';

export default {
  name: 'App',
  components: {},
  async created() {
    firebase.initializeApp(configs.firebaseConfig);
    let functions = firebase.functions();
    let ping = functions.httpsCallable('ping');
    ping().then((res) => {
      console.log(res.data);
    });
    console.log('world');
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
