<template>
  <div class="header-component">
    <h2 class="header-label">Dice Roller</h2>
    <label for="username" v-if="user">{{ user.username }}</label>
    <el-button class="header-btn" v-if="user" @click="logout">Logout</el-button>
    <el-button class="header-btn" v-if="!user" @click="login">Login</el-button>
  </div>
</template>

<script>
import axios from 'axios';
import { Button } from 'element-ui';

export default {
    name: 'Header',
    components: {
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
.header-component {
  height: 10vh;
  color: #D8DBE2;
  background-color: #373F51;
  display: flex;
  justify-content: space-between;
  padding-left: 10vw;
  padding-right: 10vw;
}

.header-label {
    align-self: center;
}

.header-btn {
    align-self: center;
}
</style>