<template>
  <div class="dice-roller-view">
      <div class="title">
        <h1>{{ session.name }}</h1>
      </div>
      <div class="rolls-container">
        <CharacterList :characters="characters" :currentCharacter="currentCharacter" @rollUpdated="getRolls" />
      </div>
      <div class="roll-btn">
        <el-button type="primary" @click="roll(2)">Roll 2</el-button>
        <el-button type="primary" @click="roll(3)">Roll 3</el-button>
        <el-button type="primary" @click="roll(4)">Roll 4</el-button>
        <el-button type="primary" @click="roll(5)">Roll 5</el-button>
        <el-button type="primary" @click="roll(6)">Roll 6</el-button>
        <el-button type="primary" @click="roll(8)">Roll 8</el-button>
        <el-button type="primary" @click="roll(10)">Roll 10</el-button>
        <el-button type="primary" @click="roll(12)">Roll 12</el-button>
        <el-button type="primary" @click="roll(20)">Roll 20</el-button>
      </div>
  </div>
</template>

<script>
import _ from 'lodash';
import api from '../api/diceroller';
import { Button } from 'element-ui';
import CharacterList from '../components/CharacterList';

export default {
  name: 'diceroller',
  components: {
    'el-button': Button,
    CharacterList,
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
    async roll(val) {
      await api.rollDie(this.session._id, this.currentCharacter._id, val)
      
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
  margin-top: 10px;
}

</style>