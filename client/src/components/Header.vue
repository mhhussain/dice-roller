<template>
  <div class="header-component">
    <router-link to="/" class="header-label">{{ appName }}</router-link>
    <p v-if="user.email">{{ user.email }}</p>
    <el-button v-if="user.email" type="danger" @click="logoutButon">Logout</el-button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { Button } from 'element-ui';

export default {
    name: 'Header',
    components: {
      'el-button': Button,
    },
    computed: {
      ...mapState(['appName', 'user']),
    },
    async created() {},
    methods: {
      ...mapActions(['userLogout']),
      ...mapActions('auth', ['logout']),
      async logoutButon() {
        await this.logout();
        await this.userLogout();
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