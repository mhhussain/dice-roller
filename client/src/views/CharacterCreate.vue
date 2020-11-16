<template>
  <v-container class="d-flex flex-column align-center">
    <h2>Create a new character</h2>
    <v-text-field label="character name" v-model="newChar.name"></v-text-field>
    <v-text-field label="level" v-model="newChar.level" required></v-text-field>
    <v-select
      :items="races"
      label="Race"
      v-model="newChar.race"
      required
    ></v-select>
    <v-select
      :items="classes"
      label="Class"
      v-model="newChar.class"
      required
    ></v-select>
    <v-btn @click="createCharacter">Create</v-btn>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'charactecreate',
  data: () => ({
    newChar: {},
    classes: [
      'Barbarian',
      'Bard',
      'Cleric',
      'Druid',
      'Fighter',
      'Monk',
      'Paladin',
      'Ranger',
      'Sorcerer',
      'Warlock',
      'Wizard',
    ],
    races: [
      'Dragonborn',
      'Dwarf',
      'Elf',
      'Elf (Drow)',
      'Elf (High)',
      'Gnome',
      'Half-elf',
      'Half-orc',
      'Halfling',
      'Human',
      'Tiefling',
    ],
  }),
  computed: {
    abilityBlank() {
      return {
        strength: {
          val: 0,
          mod: 0,
        },
        dexterity: {
          val: 0,
          mod: 0,
        },
        constitution: {
          val: 0,
          mod: 0,
        },
        intelligence: {
          val: 0,
          mod: 0,
        },
        wisdom: {
          val: 0,
          mod: 0,
        },
        charisma: {
          val: 0,
          mod: 0,
        },
      };
    },
  },
  methods: {
    ...mapActions('characters', { createChar: 'create' }),
    async createCharacter() {
      const char = {
        name: this.newChar.name,
        sessionId: null,
        level: this.newChar.level,
        race: this.newChar.race,
        class: this.newChar.class,
        abilities: this.abilityBlank,
        inSession: false,
      };

      await this.createChar(char);
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.v-text-field {
  width: 300px;
}

.v-select {
  width: 300px;
}
</style>
