<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  async created() {
    /*fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": "test@test.com",
        "password": "password"
      })
    })
    .then((res) => {
      console.log(res);
      fetch('/api/session', {
        method: 'GET',
      })
      .then((res) => {
        console.log(res);
      });
    });*/
    /*fetch('/api/session', {
      method: 'GET',
    })
    .then((res) => {
      console.log(res);
    });*/
  }
}
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
