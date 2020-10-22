<template>
  <div class="header-component">
      <el-header style="display: inline-block">
        <h2>Dice Roller</h2>
        <label for="username" v-if="user">{{ user.username }}</label>
        <el-button v-if="user" @click="logout">Logout</el-button>
        <el-button v-if="!user" @click="login">Login</el-button>
      </el-header>
  </div>
</template>

<script>
import axios from 'axios';
import { Header, Button } from 'element-ui';

export default {
    name: 'Header',
    components: {
        'el-header': Header,
        'el-button': Button,
    },
    data() {
        return {
            user: {}
        }
    },
    async created() {
        axios.get('/api/user')
            .then((res) => {
                this.user = res.data;
            })
            .catch(() => {
                this.user = null;
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

<style scoped>

</style>