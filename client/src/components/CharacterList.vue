<template>
  <v-container fluid class="d-flex flex-column align-center">
    <v-card class="mb-4" v-for="(c, index) in characters" v-bind:key="index">
      <v-card-title>
        {{ c.name }}
        <v-spacer></v-spacer>
        <span
          v-if="c._id === currentCharacter._id"
          class="grey--text text-subtitle-2"
        >
          <div>(you)</div>
          <v-icon>mdi-dots-horizontal</v-icon>
        </span>
      </v-card-title>
      <v-card-subtitle> Level {{ c.level }} {{ c.class }} </v-card-subtitle>
      <v-divider class="mx-4"></v-divider>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Stats</v-expansion-panel-header>
          <v-expansion-panel-content
            ><v-card-text>
              <v-row>
                <v-col>Armor Class: {{ c.armorClass }}</v-col>
                <v-col>Initiative: {{ c.initiative }}</v-col>
                <v-col>Speed: {{ c.speed }}</v-col>
              </v-row>
              <v-row>
                <v-col
                  >Strength: {{ c.abilities.strength.val }} ({{
                    c.abilities.strength.mod
                  }})</v-col
                >
                <v-col
                  >Dexterity: {{ c.abilities.dexterity.val }} ({{
                    c.abilities.dexterity.mod
                  }})</v-col
                >
                <v-col
                  >Constitution: {{ c.abilities.constitution.val }} ({{
                    c.abilities.constitution.mod
                  }})</v-col
                >
              </v-row>
              <v-row>
                <v-col
                  >Intelligence: {{ c.abilities.intelligence.val }} ({{
                    c.abilities.intelligence.mod
                  }})</v-col
                >
                <v-col
                  >Wisdom: {{ c.abilities.wisdom.val }} ({{
                    c.abilities.wisdom.mod
                  }})</v-col
                >
                <v-col
                  >Charisma: {{ c.abilities.charisma.val }} ({{
                    c.abilities.charisma.mod
                  }})</v-col
                >
              </v-row>
            </v-card-text></v-expansion-panel-content
          >
        </v-expansion-panel>
      </v-expansion-panels>
      <v-divider class="mx-4"></v-divider>
      <v-card-text>
        Rolls
        <v-chip-group column>
          <v-chip
            v-for="(r, i) in rollsForCharacter(c._id)"
            :key="i"
            :color="
              r.visible
                ? c._id === currentCharacter._id
                  ? 'primary'
                  : 'secondary'
                : ''
            "
            @click.stop="openRollsDialog(c._id)"
          >
            <template v-if="c._id === currentCharacter._id">
              <span class="font-weight-bold">{{ r.roll }}</span>
              |
              <span class="font-weight-light">{{ r.dvalue }}</span>
            </template>
            <template v-if="c._id != currentCharacter._id">
              <template v-if="r.visible">
                <span class="font-weight-bold">{{ ` ${r.roll}` }}</span>
                |
                <span class="font-weight-light">{{ r.dvalue }}</span>
              </template>
              <template v-if="!r.visible"> ?? </template>
            </template>
          </v-chip>
        </v-chip-group>
      </v-card-text>
    </v-card>
    <v-dialog v-model="rollsDialog">
      <v-card-title class="headline light-blue">{{
        rollsDialogCharacter.name
      }}</v-card-title>
      <v-simple-table dense>
        <template #default>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll</th>
              <th>Die</th>
              <th v-if="rollsDialogCharacter._id === currentCharacter._id"></th>
              <th v-if="rollsDialogCharacter._id === currentCharacter._id"></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(r, i) in rollsForCharacter(rollsDialogCharacter._id)"
              :key="i"
            >
              <td>
                <p
                  class="text-caption"
                  v-on:keydown.enter.capture.prevent="saveName($event, r._id)"
                  :contenteditable="
                    rollsDialogCharacter._id === currentCharacter._id
                  "
                >
                  {{ r.name }}
                </p>
              </td>
              <template
                v-if="rollsDialogCharacter._id === currentCharacter._id"
              >
                <td class="font-weight-bold">{{ r.roll }}</td>
                <td class="font-weight-light">{{ r.dvalue }}</td>
              </template>
              <template v-if="rollsDialogCharacter._id != currentCharacter._id">
                <td class="font-weight-bold">
                  {{ r.visible ? r.roll : '--' }}
                </td>
                <td class="font-weight-light">
                  {{ r.visible ? r.dvalue : '--' }}
                </td>
              </template>
              <td v-if="rollsDialogCharacter._id === currentCharacter._id">
                <v-icon
                  :color="r.visible ? 'primary' : ''"
                  @click="toggleRollVisibility(r._id, !r.visible)"
                >
                  {{ r.visible ? 'mdi-eye' : 'mdi-eye-off' }}
                </v-icon>
              </td>
              <td v-if="rollsDialogCharacter._id === currentCharacter._id">
                <v-icon color="red" @click="deleteRoll(r._id)">
                  mdi-delete
                </v-icon>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import _ from 'lodash';

export default {
  name: 'CharacterList',
  props: ['session', 'currentCharacter'],
  components: {},
  data: () => ({
    rollsDialog: false,
    rollsDialogCharacter: {},
    newName: '',
  }),
  async created() {
    await this.findChars({
      query: {
        sessionId: this.session._id,
      },
    });

    await this.findRolls({
      query: {
        sessionId: this.session._id,
      },
    });
  },
  computed: {
    ...mapGetters('characters', { findCharsInStore: 'find' }),
    ...mapGetters('rolls', { findRollsInStore: 'find' }),
    rolls() {
      return this.findRollsInStore({
        query: {
          sessionId: this.session._id,
        },
      }).data;
    },
    characters() {
      return this.findCharsInStore({
        query: {
          sessionId: this.session._id,
        },
      }).data;
    },
  },
  methods: {
    ...mapActions('characters', { findChars: 'find' }),
    ...mapActions('rolls', { findRolls: 'find' }),
    ...mapActions('rolls', { patchRoll: 'patch' }),
    ...mapActions('rolls', { deleteRoll: 'remove' }),
    rollsForCharacter(characterId) {
      return _.filter(this.rolls, (r) => r.characterId === characterId);
    },
    openRollsDialog(characterId) {
      this.rollsDialogCharacter = this.characters.find(
        (c) => c._id === characterId
      );
      this.rollsDialog = true;
    },
    toggleRollVisibility(rollId, visible) {
      this.patchRoll([rollId, { visible }]);
    },
    onInput(e) {
      this.newName = e.target.innerText;
    },
    saveName(e, rollId) {
      this.patchRoll([rollId, { name: e.target.innerText }]);
      e.target.blur();
    },
  },
};
</script>

<style scoped>
.v-card {
  width: 100%;
  max-width: 500px;
  min-width: 300px;
}

p {
  margin-block-start: 0;
  margin-block-end: 0;
}
</style>
