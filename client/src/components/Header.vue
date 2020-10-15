<template>
  <div class="header-component">
      <h1>Dice Roller</h1>
      <label for="username" v-if="user">{{ user.username }}</label>
      <button v-if="user" @click="logout">Logout</button>
      <button v-if="!user" @click="login">Login</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'Header',
    components: {},
    data() {
        return {
            user: {}
        }
    },
    async created() {
        axios.get('/api/user')
            .then((res) => {
                this.user = res.data;
            });
    },
    methods: {
        logout() {
            axios.post('/auth/logout')
                .then(() => {
                    this.$router.push('/login');
                });
        },
        login() {
            this.$router.replace({ name: 'login' });
        }
    }
}
</script>

<style>

</style>