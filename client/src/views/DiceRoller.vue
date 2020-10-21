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
                  {{ roll.roll }} / {{ roll.dvalue }}
                  {{ roll.name }}
                </div>
              </li>
            </ul>
          </div>
        </li>
      </ul>
  </div>
</template>

<script>
import api from '../api/diceroller';

export default {
  name: 'diceroller',
  components: {},
  data() {
    return {
      error: '',
      session: {},
      characters: [],
    }
  },
  async created() {
    const { sessionId } = this.$route.params;
    const res = await api.getSession(sessionId);
    this.session = res.data[0];
  }
}
</script>

<style>

</style>