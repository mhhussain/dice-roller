<template>
  <div class="login-view">
      <div class="error" v-if="error">{{ error.message }}</div>
      <h1>Login</h1>
      <div class="email">
        <label for="email">Email:</label>
        <input type="email" v-model="email" placeholder="email">
      </div>
      <div class="password">
        <label for="password">Password:</label>
        <input type="password" v-model="password" placeholder="password">
      </div>
      <button @click="login">Login</button>
      <button @click="register">Register</button> 
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'login',
  components: {},
  data() {
    return {
      error: '',
      email: '',
      password: '',
    };
  },
  async created() {},
  methods: {
    login() {
      if (!this.email || !this.password) {
        return;
      }

      const data = {
        email: this.email,
        password: this.password,
      };

      axios.post('/auth/login', data)
        .then((res) => {
          if(res.status === 200) {
            this.$router.replace({ name: 'home' });
          }
        })
        .catch((err) => {
          this.error = err;
        });
    },
    register() {
      if (!this.email || !this.password) {
        return;
      }

      fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      })
      .then((res) => {
        if (res.status === 200) {
          this.$router.replace({ name: 'home' });
        }
      });
    }
  }
}
</script>

<style>

</style>