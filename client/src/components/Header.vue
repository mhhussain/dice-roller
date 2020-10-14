<template>
  <div class="header-component">
    <el-row style="background-color: #373F51; line-height: 60px">
      <el-col :span="10">
        <h1>Dice Roller</h1>
      </el-col>
      <el-col :span="2">
        <div v-if="loggedIn" class="logged-in">
          <label for="username">{{ username }}</label>
          <el-button v-if="loggedIn" @click="logout">Log out</el-button>
        </div>
        <el-button v-if="!loggedIn" @click="login">Log in</el-button></el-col
      >
    </el-row>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import { Button, Row, Col } from 'element-ui';

export default {
  name: 'Header',
  components: {
    'el-button': Button,
    'el-row': Row,
    'el-col': Col,
  },
  data() {
    return {
      loggedIn: false,
      userId: '',
      username: '',
    };
  },
  async created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.loggedIn = true;
        this.username = user.email;
        this.userId = user.uid;
      } else {
        this.loggedIn = false;
      }
    });
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(
          (user) => {
            console.log(user);
            this.$router.replace({ name: 'login' });
          },
          (err) => {
            console.log(err);
          }
        );
    },
    login() {
      this.$router.replace({ name: 'login' });
    },
  },
};
</script>

<style>
.header-component {
  color: #d8dbe2;
}
</style>
