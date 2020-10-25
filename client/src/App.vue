<template>
  <div id="app">
    <Header :user="user" @userLoggedOut="userLogout" />
    <el-main>
      <router-view @userLoggedIn="userLogin" />
    </el-main>
  </div>
</template>

<script>
import { Main } from 'element-ui'
import Header from './components/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
    'el-main': Main,
  },
  data() {
    return {
      user: {},
    }
  },
  async created() {},
  methods: {
    async userLogin(user) {
      this.user = user;
    },
    async userLogout() {
      this.user = {};
    }
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #373F51;
  background-color: #D8DBE2;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}

.el-main {
  padding: 0;
}
</style>
