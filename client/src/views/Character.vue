<template>
  <div class="character-view">
      Character View
      <div class="create-character">
        <input type="text" v-model="newChar.name" placeholder="character name">
        <button @click="createCharacter">New</button>
      </div>
      <div class="character-list">
        <ul>
          <li v-for="(character, index) in characters"
            v-bind:value="character"
            v-bind:item="character"
            v-bind:index="index"
            v-bind:key="index"
          >
            {{ character.name }}
            in session: {{ character.inSession }}
            <button @click="joinSession(character._id)">Join</button>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import api from '../api/diceroller';

export default {
  name: 'character',
  components: {},
  data() {
    return {
      session: {},
      characters: [],
      newChar: {}
    };
  },
  async created() {
    const { id: sessionId } = this.$route.params;
    this.session.id = sessionId;
    this.characters = await api.getCharacters(this.session.id);
  },
  methods: {
    async createCharacter() {
      await api.createCharacter(this.newChar.name, this.session.id);
      this.characters = await api.getCharacters(this.session.id);
      this.newChar = {};
    },
    async joinSession(characterId) {
      this.$router.push(`/session/${this.session.id}/character/${characterId}`);
    }
  }
}
</script>

<style>

</style>