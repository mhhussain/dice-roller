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
import axios from 'axios';
import api from '../api/diceroller';
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
      this.$router.replace({ name: 'home' });
    }
  },
  methods: {
    async login() {
      if (!this.email || !this.password) {
        return;
      }

      const data = {
        email: this.email,
        password: this.password,
      };

      axios.post('/auth/login', data)
        .then(async (res) => {
          if(res.status === 200) {
            const user = await api.getUser();
            localStorage.user = JSON.stringify(user);
            this.$emit('userLoggedIn', user);
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