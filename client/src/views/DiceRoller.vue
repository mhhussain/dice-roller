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
            <label for="character-name">{{ index }}</label>
            <ul>
              <li v-for="(roll, rindex) in character"
                v-bind:value="roll"
                v-bind:item="roll"
                v-bind:index="rindex"
                v-bind:key="rindex"
              >
                <div class="card">
                  {{ roll.roll }} / {{ roll.dvalue }}
                  {{ roll.name }}
                </div>
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
      characters: [],
    }
  },
  async created() {
    const { sessionId, characterId } = this.$route.params;
    const res = await api.getSession(sessionId);
    this.session = res.data[0];
    this.currentCharacter._id = characterId;

    // Get roll list
    const rolls = await api.getRolls(this.session._id, this.currentCharacter._id);
    const x = _.groupBy(rolls.data, (r) => {
      return r.characterId;
    });

    this.characters = x;
    console.log(JSON.stringify(x));
  },
  methods: {
    async roll() {
      const res = await api.rollDie(this.session._id, this.currentCharacter._id, 20)
      console.log(res.data);
    },
    async get() {
      const res = await api.getRolls(this.session._id, this.currentCharacter._id);
      console.log(res.data);
    },
  },
}
</script>

<style>

</style>