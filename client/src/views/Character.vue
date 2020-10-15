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
            v-bind:key="index">
            {{ character.name }}
            in session: {{ character.inSession }}
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
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
      const { id: sessionId } = this.$route.params;
      const data = {
        name: this.newChar.name,
        sessionId
      };
      await axios.post(`/api/character`, data)
      this.characters = await api.getCharacters(this.session.id);
      this.newChar = {};
    }
  }
}
</script>

<style>

</style>