<template>
  <div class="dice-roller-view">
      <div class="title">
        <h1>{{ session.name }}</h1>
      </div>
      <div class="rolls-container">
        <CharacterList :session="session" :currentCharacter="currentCharacter" />
      </div>
      <div class="roll-btn">
        <el-button type="primary" @click="rollDie(2)">Roll 2</el-button>
        <el-button type="primary" @click="rollDie(3)">Roll 3</el-button>
        <el-button type="primary" @click="rollDie(4)">Roll 4</el-button>
        <el-button type="primary" @click="rollDie(5)">Roll 5</el-button>
        <el-button type="primary" @click="rollDie(6)">Roll 6</el-button>
        <el-button type="primary" @click="rollDie(8)">Roll 8</el-button>
        <el-button type="primary" @click="rollDie(10)">Roll 10</el-button>
        <el-button type="primary" @click="rollDie(12)">Roll 12</el-button>
        <el-button type="primary" @click="rollDie(20)">Roll 20</el-button>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
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
    }
  },
  async created() {
    const { sessionId, characterId } = this.$route.params;
    this.session._id = sessionId;
    this.currentCharacter._id = characterId;
  },
  computed: {
  },
  methods: {
    ...mapActions('rolls', { createRoll: 'create' }),
    async rollDie(val) {
      const newRoll = {
        sessionId: this.session._id,
        characterId: this.currentCharacter._id,
        dvalue: val,
        name: 'roll',
      };
      
      await this.createRoll(newRoll);
    },
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