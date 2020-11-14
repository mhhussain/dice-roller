<template>
  <v-container class="d-flex flex-column">
    <v-card
      class="mb-4"
      v-for="(c, index) in characters"
      v-bind:key="index"
      @click.stop="openRollsDialog(c._id)"
    >
      <v-card-title>{{ c.name }}</v-card-title>
      <v-divider class="mx-4"></v-divider>
      <v-card-text>
        Rolls
        <v-chip-group column>
          <v-chip
            v-for="(r, i) in rollsForCharacter(c._id)"
            :key="i"
            :color="r.visible ? 'primary' : ''"
          >
            <span v-if="r.roll">
              <span class="font-weight-bold">{{ r.roll }}</span>
              |
              <span class="font-weight-light">{{ r.dvalue }}</span></span
            >
            <span v-if="!r.roll">??</span>
          </v-chip>
        </v-chip-group>
      </v-card-text>
    </v-card>
    <v-dialog v-model="rollsDialog">
      <v-card>
        <v-card-title class="headline">{{
          rollsDialogCharacter.name
        }}</v-card-title>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Roll</th>
                  <th>Die</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(r, i) in rollsForCharacter(rollsDialogCharacter._id)"
                  :key="i"
                >
                  <td>
                    <p
                      v-on:keydown.enter.capture.prevent="
                        saveName($event, r._id)
                      "
                      contenteditable="true"
                    >
                      {{ r.name }}
                    </p>
                  </td>
                  <td class="font-weight-bold">{{ r.roll || '--' }}</td>
                  <td class="font-weight-light">{{ r.dvalue || '--' }}</td>
                  <td>
                    <v-icon
                      :color="r.visible ? 'primary' : ''"
                      @click="toggleRollVisibility(r._id, !r.visible)"
                    >
                      {{ r.visible ? 'mdi-eye' : 'mdi-eye-off' }}
                    </v-icon>
                  </td>
                  <td>
                    <v-icon color="red" @click="deleteRoll(r._id)">
                      mdi-delete
                    </v-icon>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
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
      console.log('fijoe');
      console.log(e);
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
  max-width: 500px;
}
</style>
