<template>
  <v-app>
    <Header />
    <SidebarDrawer />
    <v-main>
      <router-view />
      <v-alert v-if="error" type="error">
        {{ error.message }}
      </v-alert>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import Header from './components/Header.vue';
import SidebarDrawer from './components/SidebarDrawer.vue';

export default {
  name: 'App',
  components: {
    Header,
    SidebarDrawer,
  },
  data: () => ({}),
  computed: {
    ...mapState(['error']),
  },
};
</script>

<style scoped>

</style>