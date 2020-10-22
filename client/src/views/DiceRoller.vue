<template>
  <div class="dice-roller-view">
      <h1>{{ session.name }}</h1>
      <ul>
        <li v-for="(character, index) in characters"
          v-bind:value="character"
          v-bind:item="character"
          v-bind:index="index"
          v-bind:key="index"
        >
          <div class="character-section">
            <label for="character-name">{{ character.name }}</label>
            <ul>
              <li v-for="(roll, rindex) in character.rolls"
                v-bind:value="roll"
                v-bind:item="roll"
                v-bind:index="rindex"
                v-bind:key="rindex"
              >
                <div class="card">
                  <i v-if="roll.roll">{{ roll.roll }} / {{ roll.dvalue }}</i>
                  <i v-if="!roll.roll">-- / --</i>
                  <input v-if="character._id === currentCharacter._id" v-model="roll.name" type="text"/>
                  <button v-if="character._id === currentCharacter._id" @click="renameRoll(roll._id, roll.name)">Rename</button>
                  <div v-if="character._id != currentCharacter._id">{{ roll.name }}</div>
                </div>
                <button v-if="!roll.visible && character._id === currentCharacter._id" @click="showRoll(roll._id)">Show</button>
                <button v-if="roll.visible && character._id === currentCharacter._id" @click="hideRoll(roll._id)">Hide</button>
              </li>
            </ul>
          </div>
        </li>
      </ul>
      <button @click="roll">Roll</button>
  </div>
</template>

<script>
import _ from 'lodash';
import api from '../api/diceroller';

export default {
  name: 'diceroller',
  components: {},
  data() {
    return {
      error: '',
      session: {},
      currentCharacter: {},
      characterList: [],
      characters: [],
    }
  },
  async created() {
    const { sessionId, characterId } = this.$route.params;
    const res = await api.getSession(sessionId);
    this.session = res.data[0];
    this.currentCharacter._id = characterId;

    // Get character list
    const chars = await api.getCharacters(this.session._id);
    this.characterList = chars;

    // Get roll list
    const rolls = await api.getRolls(this.session._id, this.currentCharacter._id);
    console.log(rolls);

    this.characters = _.map(this.characterList, (char) => {
      return {
        ...char,
        rolls: _.filter(rolls, (roll) => { return roll.characterId === char._id; })
      };
    });
  },
  methods: {
    async roll() {
      const res = await api.rollDie(this.session._id, this.currentCharacter._id, 20)
      console.log(res.data);
    },
    async showRoll(rollId) {
      await api.showRoll(rollId);

      // Get roll list
      const rolls = await api.getRolls(this.session._id, this.currentCharacter._id);

      this.characters = _.map(this.characterList, (char) => {
        return {
          ...char,
          rolls: _.filter(rolls, (roll) => { return roll.characterId === char._id; })
        };
      });
    },
    async hideRoll(rollId) {
      await api.hideRoll(rollId);

      // Get roll list
      const rolls = await api.getRolls(this.session._id, this.currentCharacter._id);

      this.characters = _.map(this.characterList, (char) => {
        return {
          ...char,
          rolls: _.filter(rolls, (roll) => { return roll.characterId === char._id; })
        };
      });
    },
    async renameRoll(rollId, name) {
      await api.nameRoll(rollId, name);

      // Get roll list
      const rolls = await api.getRolls(this.session._id, this.currentCharacter._id);

      this.characters = _.map(this.characterList, (char) => {
        return {
          ...char,
          rolls: _.filter(rolls, (roll) => { return roll.characterId === char._id; })
        };
      });
    }
  },
}
</script>

<style>

</style>