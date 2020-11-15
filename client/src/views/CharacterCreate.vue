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
  </v-container>
</template>

<script>
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
