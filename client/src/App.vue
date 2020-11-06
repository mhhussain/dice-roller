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
          :to="{ name: 'home' }"
          link
        >
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          :to="{ name: 'findcreatesession' }"
          link
        >
          <v-list-item-content>
            <v-list-item-title>Find or create session</v-list-item-title>
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
  }),
  computed: {
    ...mapState(['error', 'isAuthorized']),
  }
};
</script>

<style scoped>

</style>