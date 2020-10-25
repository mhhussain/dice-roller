<template>
  <div class="header-component">
    <router-link to="/" class="header-label">Dice Roller</router-link>
    <p v-if="user.email">{{ user.email }}</p>
    <el-button v-if="user.email" type="danger" @click="logout">Logout</el-button>
  </div>
</template>

<script>
import api from '../api/diceroller';
import { Button } from 'element-ui';

export default {
    name: 'Header',
    props: ['user'],
    components: {
      'el-button': Button,
    },
    async created() {},
    methods: {
      async logout() {
        await api.logout();
        localStorage.removeItem('user');
        this.$emit('userLoggedOut', null);
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