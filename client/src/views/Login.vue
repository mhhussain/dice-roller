<template>
  <v-container class="d-flex flex-column align-center">
    <h1>Login</h1>
    <div>
      <v-text-field length="250px" label="email" v-model="email" />
    </div>
    <div>
      <v-text-field
        label="password"
        v-model="password"
        :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
        :type="show ? 'text' : 'password'"
        @click:append="show = !show"
      />
    </div>
    <div class="button">
      <v-btn class="mb-2" color="primary" @click="login">Login</v-btn>
    </div>
    <div class="button">
      <v-btn @click="register">Register</v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'login',
  components: {},
  data() {
    return {
      error: '',
      email: '',
      password: '',
      show: false,
    };
  },
  async created() {
    if (localStorage.user) {
      localStorage.removeItem('feathers-jwt');
    }
  },
  methods: {
    ...mapActions(['userLogin']),
    ...mapActions('auth', ['authenticate']),
    ...mapActions('users', { createUser: 'create' }),
    ...mapActions(['raiseError']),
    async login() {
      if (!this.email || !this.password) {
        return;
      }

      const data = {
        strategy: 'local',
        email: this.email,
        password: this.password,
      };

      try {
        
        const user = await this.authenticate(data);
        this.userLogin(user.user);
        this.$router.push({ name: 'home' });

      } catch (e) {
        
        this.raiseError(e);
        return;
      }
    },
    async register() {
      if (!this.email || !this.password) {
        return;
      }
      const newUser = {
        email: this.email,
        password: this.password,
      };
      
      await this.createUser(newUser);

      this.$router.replace({ name: 'home' });
    }
  }
}
</script>

<style scoped>
.v-text-field {
  width: 300px;
}

.v-btn {
  width: 300px;
}

</style>