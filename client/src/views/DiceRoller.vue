<template>
  <div class="dice-roller-view">
      <div class="title">
        <h1>{{ session.name }}</h1>
      </div>
      <div class="rolls-container">
        <div class="characters-container">
          <div v-for="(character, index) in characters"
            v-bind:value="character"
            v-bind:item="character"
            v-bind:index="index"
            v-bind:key="index"
            class="character-section"
          >
            <div class="characater-row">
              <div class="character-details">
                <label for="character-name">{{ character.name }}</label>
              </div>
              <div class="character-rolls-container">
                <div v-for="(roll, rindex) in character.rolls"
                  v-bind:value="roll"
                  v-bind:item="roll"
                  v-bind:index="rindex"
                  v-bind:key="rindex"
                >
                  <el-card class="roll-card" shadow="hover">
                    <div slot="header" v-on:click="toggleRollDialog(roll)">
                      {{ roll.name }}
                    </div>
                    <div class="roll-value">
                      <i v-if="roll.roll">{{ roll.roll }} / {{ roll.dvalue }}</i>
                      <i v-if="!roll.roll">-- / --</i>
                    </div>
                    <div class="roll-view">
                      <el-button type="success" icon="el-icon-view" circle v-if="!roll.visible && character._id === currentCharacter._id" @click="showRoll(roll._id)"></el-button>
                      <el-button type="danger" icon="el-icon-view" circle v-if="roll.visible && character._id === currentCharacter._id" @click="hideRoll(roll._id)"></el-button>
                    </div>
                    <div class="roll-delete">
                      <i class="el-icon-delete" v-if="character._id === currentCharacter._id" @click="deleteRoll(roll._id)"></i>
                    </div>
                  </el-card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="roll-btn">
        <el-button type="primary" @click="roll">Roll</el-button>
      </div>

      <!-- MODAL -->
      <el-dialog :title="rollDialog.roll.name"
        :visible.sync="rollDialog.visible"
        width="30%"
        center
      >
        {{ rollDialog.roll.roll }} / {{ rollDialog.roll.dvalue }}
      </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash';
import api from '../api/diceroller';
import { Button, Card, Dialog } from 'element-ui';

export default {
  name: 'diceroller',
  components: {
    'el-button': Button,
    'el-card': Card,
    'el-dialog': Dialog,
  },
  data() {
    return {
      error: '',
      session: {},
      currentCharacter: {},
      characterList: [],
      characters: [],
      rollDialog: {
        visible: false,
        roll: {}
      }
    }
  },
  async created() {
    const { sessionId, characterId } = this.$route.params;
    const res = await api.getSession(sessionId);
    this.session = res.data[0];
    this.currentCharacter._id = characterId;

    // Get character list
    const chars = await api.getAllCharacters(this.session._id);
    this.characterList = chars;

    this.getRolls();
  },
  methods: {
    async roll() {
      await api.rollDie(this.session._id, this.currentCharacter._id, 20)
      
      this.getRolls();
    },
    async showRoll(rollId) {
      await api.showRoll(rollId);

      this.getRolls();
    },
    async hideRoll(rollId) {
      await api.hideRoll(rollId);

      this.getRolls();
    },
    async renameRoll(rollId, name) {
      await api.nameRoll(rollId, name);

      this.getRolls()
    },
    async deleteRoll(rollId) {
      await api.deleteRoll(rollId);

      this.getRolls();
    },
    async getRolls() {
      // Get roll list
      const rolls = await api.getRolls(this.session._id, this.currentCharacter._id);

      this.characters = _.map(this.characterList, (char) => {
        return {
          ...char,
          rolls: _.filter(rolls, (roll) => { return roll.characterId === char._id; })
        };
      });
    },
    async toggleRollDialog(roll) {
      this.rollDialog.visible = true;
      this.rollDialog.roll = roll;
    }
  },
}
</script>

<style scoped>
.dice-roller-view {
  display: flex;
  flex-direction: column;
  height: 90vh;
}

.title {
  flex: 1;
  margin-left: 20vw;
  margin-right: 20vw;
  text-align: left;
}

.rolls-container {
  flex: 5;
  margin-left: 20vw;
  margin-right: 20vw;
}

.roll-btn {
  flex: 1;
  background-color: #A9BCD0;
}

.roll-btn .el-button {
  float: right;
  height: 85%;
  width: 150px;
  margin: 10px;
}

.characters-container {
  display: flex;
  flex-direction: column;
}

.characater-row {
  display: flex;
  margin-bottom: 15px;
}

.character-details {
  min-width: 150px;
  width: 150px;
  text-align: left;
}

.character-rolls-container {
  display: flex;
  margin-left: 50px;
}

.roll-card {
  margin: 2px;
  width: 200px;
  height: 200px;
}

.roll-value {
  margin-bottom: 30px;
  font-weight: bold;
}

.roll-view {
  margin-bottom: 10px;
}
</style>