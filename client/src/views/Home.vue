<template>
  <v-container class="d-flex flex-column">
    <h1 class="mb-10">Dashboard</h1>
    <v-container class="d-flex flex-column align-end">
      <v-btn color="success" @click="navigateSession"
        >Find or Create Session</v-btn
      >
    </v-container>
    <v-container class="d-flex flex-column">
      <h3>Characters:</h3>
      <v-simple-table fixed-header>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">Class</th>
              <th class="text-left">Edit</th>
              <th class="text-left">Session</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(c, index) in characters" :index="index" :key="c._id">
              <td>{{ c.name }}</td>
              <td>{{ c.class }}</td>
              <td>
                <v-icon @click="$router.push(`/character/${c._id}`)"
                  >mdi-magnify</v-icon
                >
              </td>
              <td>
                <v-btn
                  color="primary"
                  v-if="c.inSession"
                  @click="joinSession(c)"
                  >Join</v-btn
                >
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </v-container>
</template>

<script>
//import { models } from 'feathers-vuex';
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: {},
  async created() {
    await this.findChars({
      query: {
        userId: this.user._id,
      },
    });
  },
  computed: {
    ...mapGetters('characters', { findCharsInStore: 'find' }),
    ...mapState(['user']),
    characters() {
      return this.findCharsInStore({
        query: {
          userId: this.user._id,
        },
      }).data;
    },
  },
  methods: {
    ...mapActions('characters', { findChars: 'find' }),
    navigateSession() {
      this.$router.push({ name: 'findcreatesession' });
    },
    joinSession(r) {
      const { _id: characterId, sessionId } = r;
      this.$router.push(`/session/${sessionId}/character/${characterId}`);
    },
  },
};
</script>

<style scoped>
</style>
