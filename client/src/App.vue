<template>
  <v-app>
    <Header />
    <v-navigation-drawer
      app
      v-model="sidebar.drawerOpen"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Dice Roller
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        nav
      >
        <v-list-item
          v-for="(item, index) in sidebar.drawerItems"
          :key="index"
          :to="{ name: item.name }"
          link
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
      </v-list>
    </v-navigation-drawer>
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

export default {
  name: 'App',
  components: {
    Header,
  },
  data: () => ({}),
  computed: {
    ...mapState(['error', 'isAuthorized', 'sidebar']),
  }
};
</script>

<style scoped>

</style>