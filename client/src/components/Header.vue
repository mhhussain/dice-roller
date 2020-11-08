<template>
  <v-container>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon v-if="isAuthorized" @click="toggleSidebarDrawer(sidebar.drawerOpen)"></v-app-bar-nav-icon>
    </v-app-bar>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: 'Header',
    components: {},
    data: () => ({
      drawer: false,
    }),
    computed: {
      ...mapState(['appName', 'user', 'isAuthorized', 'sidebar']),
    },
    async created() {},
    methods: {
      ...mapActions(['userLogout', 'toggleSidebarDrawer']),
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