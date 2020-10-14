<template>
  <div>
    <div class="error" v-if="error">{{ error.message }}</div>
    <form @submit.prevent="pressed">
      <div class="email">
        <label for="email">Email:</label>
        <input type="email" v-model="email" placeholder="email" />
      </div>
      <div class="password">
        <label for="password">Password:</label>
        <input type="password" v-model="password" placeholder="password" />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'Register',
  components: {},
  data() {
    return {
      error: '',
    };
  },
  methods: {
    pressed() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            console.log(`Registered user: ${user}`);
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
