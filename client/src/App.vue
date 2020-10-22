<template>
  <div id="app">
    <Header class="header" />
    <el-main>
      <router-view />
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
  async created() {}
}
</script>

<style>
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #373F51;
  background-color: #D8DBE2;
  height: 100vh;
  width: 100vw;
}

.header {
  text-align: left;
  color: #D8DBE2;
  background-color: #373F51;
  padding: 10px 0 10px 20vw;
}
</style>
