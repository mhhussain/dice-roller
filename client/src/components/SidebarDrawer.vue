<template>
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

      <v-list nav >
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
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'SidebarDrawer',
    computed: {
        ...mapState(['sidebar'])
    }
}
</script>

<style>

</style>