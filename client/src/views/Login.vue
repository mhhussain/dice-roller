<template>
  <div class="login-view">
      <div class="error" v-if="error">{{ error.message }}</div>
      <h1>Login</h1>
      <div>
        <label for="email">Email:</label>
      </div>
      <div>
        <el-input v-model="email" placeholder="email" />
      </div>
      <div>
        <label for="password">Password:</label>
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

<style scoped>
.input {
  width: 25em;
}

.label {
  text-align: right;
  vertical-align: middle;
  padding: 10px;
}

.el-row {
  padding: 10px;
}

.el-input {
  width: 50vw;
  margin: 5px;
}

.el-button {
  width: 50vw;
  margin: 5px
}

</style>