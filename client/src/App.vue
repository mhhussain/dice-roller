<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon v-if="isAuthorized" @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer
      app
      v-model="drawer"
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
          v-for="(item, index) in drawerItems"
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

export default {
  name: 'App',
  data: () => ({
    drawer: false,
    drawerItems: [
      { name: 'home', title: 'Home' },
      { name: 'home', title: 'Sessions' },
      { name: 'findcreatesession', title: 'Find or create session' },
    ]
  }),
  computed: {
    ...mapState(['error', 'isAuthorized']),
  }
};
</script>

<style scoped>

</style>