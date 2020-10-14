<template>
  <div>
    <div v-if="error" class="error">{{ error.message }}</div>
    <form @submit.prevent="pressed">
      <div class="email">
        <label for="email">Email:</label>
        <input type="email" v-model="email" placeholder="email" />
      </div>
      <div class="password">
        <label for="password">Password:</label>
        <input type="password" v-model="password" placeholder="password" />
      </div>
      <button type="submit">Login</button>
    </form>
    <span
      >Need an account? Click here to
      <router-link to="/register">register</router-link></span
    >
  </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      error: '',
      email: '',
      password: '',
    };
  },
  methods: {
    pressed() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            console.log(`User signed in: ${user.email}`);
            this.$router.replace({ name: 'home' });
          },
          (err) => {
            this.error = err;
          }
        );
    },
  },
};
</script>

<style></style>
