<template>
  <v-container class="d-flex flex-column align-center">
    <h2>Add character to session</h2>
    <v-container>
      <v-simple-table fixed-header height="300px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Name</th>
              <th class="text-left">inSession</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(c, index) in characters"
              :index="index"
              :key="c._id"
              @click="joinSession(c)"
            >
              <td>{{ c.name }}</td>
              <td>{{ c.inSession }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'addcharactersession',
  components: {},
  data() {
    return {
      session: {},
      newChar: {},
    };
  },
  async created() {
    const { id: sessionId } = this.$route.params;
    this.session.id = sessionId;
    this.findChars({
      query: {
        sessionId: this.session.id,
        userId: this.user._id,
      },
    });
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters('characters', { findCharsInStore: 'find' }),
    characters() {
      return this.findCharsInStore({
        query: {
          sessionId: null,
          userId: this.user._id,
        },
      }).data;
    },
  },
  methods: {
    ...mapActions('characters', { findChars: 'find' }),
    ...mapActions('characters', { patchChar: 'patch' }),
    async joinSession(r) {
      const { _id: characterId } = r;
      await this.patchChar([
        characterId,
        { sessionId: this.session.id, inSession: true },
      ]);
      this.$router.push(`/session/${this.session.id}/character/${characterId}`);
    },
  },
};
</script>

<style scoped>
.create-character {
  display: flex;
  align-self: flex-end;
  margin-bottom: 10px;
}

.create-char-input {
  width: 250px;
  margin-right: 10px;
  margin-top: 10px;
}

.create-char-button {
  width: 100px;
  margin-top: 10px;
}
</style>