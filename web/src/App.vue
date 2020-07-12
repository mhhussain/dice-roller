<template>
  <div id="app">
    <GetNameSession />
  </div>
</template>

<script>
import GetNameSession from "./components/GetNameSession.vue";
export default {
  name: "app",
  components: {
    GetNameSession
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Arial, Helvetica, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>