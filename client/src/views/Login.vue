<template>
  <div class="login-view">
    <div class="error" v-if="error">{{ error.message }}</div>
    <h1>Login</h1>
    <div>
      <el-input v-model="email" placeholder="email" />
    </div>
    <div>
      <el-input v-model="password" placeholder="password" show-password />
    </div>
    <div class="button">
      <el-button type="primary" @click="login">Login</el-button>
    </div>
    <div class="button">
      <el-button type="success" @click="register">Register</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Input, Button } from 'element-ui';

export default {
  name: 'login',
  components: {
    'el-input': Input,
    'el-button': Button,
  },
  data() {
    return {
      error: '',
      email: '',
      password: '',
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
    async login() {
      if (!this.email || !this.password) {
        return;
      }

      const data = {
        strategy: 'local',
        email: this.email,
        password: this.password,
      };

      const user = await this.authenticate(data);
      this.userLogin(user.user);
      this.$router.push({ name: 'home' });
    },
    async register() {
      if (!this.email || !this.password) {
        return;
      }
      const newUser = {
        email: this.email,
        password: this.password,
      };

      const u = await this.createUser(newUser);

      console.dir('feiojfe');
      console.dir(u);
      this.$router.replace({ name: 'home' });
    }
  }
}
</script>

<style scoped>
.login-view {
  display: flex;
  flex-direction: column;
}

.el-input {
  min-width: 250px;
  width: 25vw;
  margin: 5px;
}

.el-button {
  min-width: 250px;
  width: 25vw;
  margin: 5px;
  text-transform: uppercase;
}

</style>