<template>
  <div class="home-view">
      <Header />
      <h1>Find or create a session</h1>
      <div class="session-name">
          <label for="session-name">Session name:</label>
          <input type="text" v-model="session.name" placeholder="name">
      </div>
      <div class="session-password">
          <label for="session-password">Password:</label>
          <input type="password" v-model="session.password" placeholder="password">
      </div>
      <button @click="joinSession">Join Session</button>
      <button @click="createSession">Create Session</button>
  </div>
</template>

<script>
import Header from '../components/Header.vue';

export default {
    name: 'Home',
    components: {
        Header,
    },
    data() {
        return {
            session: {
                name: '',
                password: '',
            },
        };
    },
    async created() {
        fetch('/api/session', {
            method: 'GET',
        })
        .then((res) => {
            if (res.status === 401) {
                this.$router.push('/login');
            }
        })
        .catch((e) => {
            console.log(e);
        });
    },
    methods: {
        joinSession() {
            console.log('join');
            // service.join session
            //   session.name
            //   session.password
            // then
            //   $router /session/:id/characters
        },
        createSession() {
            console.log('create');
            // service.create session
            //   session.name
            //   session.password
            // then
            //    $router /sessoin/:id/characters
        },
    }
}
</script>

<style>

</style>