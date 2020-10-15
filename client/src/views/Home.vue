<template>
  <div class="home-view">
      <Header />
      <h1>Find or create a session</h1>
      <div class="error" v-if="error">{{ error.message }}</div>
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
import axios from 'axios';
import Header from '../components/Header.vue';

export default {
    name: 'Home',
    components: {
        Header,
    },
    data() {
        return {
            error: '',
            session: {
                name: '',
                password: '',
            },
        };
    },
    async created() {},
    methods: {
        joinSession() {
            const data = {
                name: this.session.name,
                password: this.session.password,
            };
            axios.post('/api/session/search', data)
                .then((res) => {
                    if (res.data.length > 0) {
                        const session = res.data[0];
                        this.$router.push(`/session/${session._id}/character`);
                    } else {
                        this.error = { message: 'no session found' };
                    }
                });
            // service.join session
            //   session.name
            //   session.password
            // then
            //   $router /session/:id/characters
        },
        createSession() {
            const data = {
                name: this.session.name,
                password: this.session.password,
            };
            axios.post('/api/session', data)
                .then((res) => {
                    const { _id: id } = res.data;
                    this.$router.push(`/session/${id}/character`);
                });
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