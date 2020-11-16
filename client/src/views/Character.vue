<template>
  <v-container>
    <v-card class="pa-4">
      <v-row>
        <v-container>
          <v-card-title>{{ character.name }}</v-card-title>
          <v-card-subtitle>{{
            `Level ${character.level} - ${character.race} ${character.class}`
          }}</v-card-subtitle>
          <v-divider></v-divider>
        </v-container>
      </v-row>
      <v-row>
        <v-text-field
          v-model="character.background"
          label="background"
        ></v-text-field>
        <v-select
          :items="alignments"
          v-model="character.alignment"
          label="alignment"
        ></v-select>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            v-model="character.armorClass"
            label="armor class"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            v-model="character.initiative"
            label="initiative"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field v-model="character.speed" label="speed"></v-text-field>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-space-between" v-if="character.abilities">
        <v-card class="ability-card">
          <v-card-title>Strength</v-card-title>
          <template>
            <v-icon @click="character.abilities.strength.val++"
              >mdi-plus</v-icon
            >
            <h3>
              {{ character.abilities.strength.val }}
            </h3>
            <v-icon @click="character.abilities.strength.val--"
              >mdi-minus</v-icon
            >
          </template>
          <v-card-subtitle>
            {{ character.abilities.strength.mod }}
          </v-card-subtitle>
        </v-card>
        <v-card class="ability-card">
          <v-card-title>Dexterity</v-card-title>
          <template>
            <v-icon @click="character.abilities.dexterity.val++"
              >mdi-plus</v-icon
            >
            <h3>
              {{ character.abilities.dexterity.val }}
            </h3>
            <v-icon @click="character.abilities.dexterity.val--"
              >mdi-minus</v-icon
            >
          </template>
          <v-card-subtitle>
            {{ character.abilities.dexterity.mod }}
          </v-card-subtitle>
        </v-card>
        <v-card class="ability-card">
          <v-card-title>Constitution</v-card-title>
          <template>
            <v-icon @click="character.abilities.constitution.val++"
              >mdi-plus</v-icon
            >
            <h3>
              {{ character.abilities.constitution.val }}
            </h3>
            <v-icon @click="character.abilities.constitution.val--"
              >mdi-minus</v-icon
            >
          </template>
          <v-card-subtitle>
            {{ character.abilities.constitution.mod }}
          </v-card-subtitle>
        </v-card>
        <v-card class="ability-card">
          <v-card-title>Intelligence</v-card-title>
          <template>
            <v-icon @click="character.abilities.intelligence.val++"
              >mdi-plus</v-icon
            >
            <h3>
              {{ character.abilities.intelligence.val }}
            </h3>
            <v-icon @click="character.abilities.intelligence.val--"
              >mdi-minus</v-icon
            >
          </template>
          <v-card-subtitle>
            {{ character.abilities.intelligence.mod }}
          </v-card-subtitle>
        </v-card>
        <v-card class="ability-card">
          <v-card-title>Wisdom</v-card-title>
          <template>
            <v-icon @click="character.abilities.wisdom.val++">mdi-plus</v-icon>
            <h3>
              {{ character.abilities.wisdom.val }}
            </h3>
            <v-icon @click="character.abilities.wisdom.val--">mdi-minus</v-icon>
          </template>
          <v-card-subtitle>
            {{ character.abilities.wisdom.mod }}
          </v-card-subtitle>
        </v-card>
        <v-card class="ability-card mb-4">
          <v-card-title>Charisma</v-card-title>
          <template>
            <v-icon @click="character.abilities.charisma.val++"
              >mdi-plus</v-icon
            >
            <h3>
              {{ character.abilities.charisma.val }}
            </h3>
            <v-icon @click="character.abilities.charisma.val--"
              >mdi-minus</v-icon
            >
          </template>
          <v-card-subtitle>
            {{ character.abilities.charisma.mod }}
          </v-card-subtitle>
        </v-card>
      </v-row>
      <v-row>
        <v-btn color="success" @click="save"> Save </v-btn>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'character',
  data: () => ({
    character: {},
    alignments: [
      'lawful good',
      'lawful neutral',
      'lawful evil',
      'neutral good',
      'neutral (true)',
      'neutral evil',
      'chaotic good',
      'chaotic neutral',
      'chaotic evil',
    ],
  }),
  async created() {
    const { id } = this.$route.params;
    const res = await this.getCharacter(id);

    const character = await res;

    this.character = {
      _id: character._id,
      name: character.name,
      level: character.level,
      race: character.race,
      class: character.class,
      background: character.background,
      alignment: character.alignment,
      armorClass: character.armorClass,
      initiative: character.initiative,
      speed: character.speed,
      abilities: character.abilities || this.abilityBlank,
    };
  },
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
    ...mapActions('characters', { getCharacter: 'get' }),
    ...mapActions('characters', { patchCharacter: 'patch' }),
    async save() {
      await this.patchCharacter([this.character._id, this.character]);
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
.v-card {
  height: 100%;
  margin: 4px;
}

.v-text-field {
  margin-left: 4px;
  margin-right: 4px;
}

.ability-card {
  width: 47%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
