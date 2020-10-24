<template>
  <div class="character-view">
      <div class="create-character">
        <el-input class="create-char-input" type="text" v-model="newChar.name" placeholder="create character name" />
        <el-button class="create-char-button" type="success" @click="createCharacter">New</el-button>
      </div>
      <div class="character-table">
        <el-table :data="characters" @row-click="joinSession">
          <el-table-column prop="name" label="Name" />
          <el-table-column prop="inSession" label="In Session" width="150">
            <template slot-scope="scope">
              <i v-if="scope.row.inSession" class="el-icon-time"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
  </div>
</template>

<script>
import api from '../api/diceroller';
import { Input, Button, Table, TableColumn } from 'element-ui';

export default {
  name: 'character',
  components: {
    'el-input': Input,
    'el-button': Button,
    'el-table': Table,
    'el-table-column': TableColumn,
  },
  data() {
    return {
      session: {},
      characters: [],
      newChar: {}
    };
  },
  async created() {
    const { id: sessionId } = this.$route.params;
    this.session.id = sessionId;
    this.characters = await api.getCharacters(this.session.id);
  },
  methods: {
    async createCharacter() {
      await api.createCharacter(this.newChar.name, this.session.id);
      this.characters = await api.getCharacters(this.session.id);
      this.newChar = {};
    },
    async joinSession(r) {
      const { _id: characterId } = r;
      this.$router.push(`/session/${this.session.id}/character/${characterId}`);
    }
  }
}
</script>

<style scoped>
.character-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 25vw;
  padding-right: 25vw;
}

.create-character {
  display: flex;
  align-self: flex-end;
  margin-bottom: 10px;
}

.create-char-input {
  width: 250px;
  margin-right: 10px;
  margin-top: 10px;
}

.create-char-button {
  width: 100px;
  margin-top: 10px;
}

.character-table {
  width: 50vw;
}
</style>