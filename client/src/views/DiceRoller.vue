<template>
  <v-container>
    <h1>{{ session.name }}</h1>
    <v-divider class="mt-2 mb-8"></v-divider>
    <CharacterList :session="session" :currentCharacter="currentCharacter" />
    <v-container class="mt-auto">
      <v-bottom-navigation :value="0" color="primary">
        <v-dialog v-model="dialog">
          <template v-slot:activator="{ on, attr }">
            <v-btn v-bind="attr" v-on="on"> Roll </v-btn>
          </template>
          <v-container class="grey d-flex flex-wrap">
            <v-btn
              class="ma-2"
              color="purple"
              v-for="(val, i) in [2, 4, 6, 8, 10, 12, 20]"
              :key="i"
              @click="rollDie(val)"
            >
              {{ val }}
            </v-btn>
          </v-container>
        </v-dialog>
      </v-bottom-navigation>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import CharacterList from '../components/CharacterList';

export default {
  name: 'diceroller',
  components: {
    CharacterList,
  },
  data() {
    return {
      error: '',
      dialog: false,
      session: {},
      currentCharacter: {},
    };
  },
  async created() {
    const { sessionId, characterId } = this.$route.params;
    this.currentCharacter._id = characterId;

    const res = await this.findSession({
      query: {
        _id: sessionId,
      },
    });

    this.session = await res.data[0];
  },
  methods: {
    ...mapActions('rolls', { createRoll: 'create' }),
    ...mapActions('sessions', { findSession: 'find' }),
    async rollDie(val) {
      const newRoll = {
        sessionId: this.session._id,
        characterId: this.currentCharacter._id,
        dvalue: val,
        name: 'roll',
      };
      await this.createRoll(newRoll);
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
</style>
