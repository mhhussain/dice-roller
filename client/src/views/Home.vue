<template>
  <div class="home-view">
      <h1>HOME</h1>
      <el-button type="success" @click="navigateSession">Find or Create Session</el-button>
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
import { Button, Table, TableColumn } from 'element-ui';

export default {
    name: 'Home',
    components: {
        'el-button': Button,
        'el-table': Table,
        'el-table-column': TableColumn,
    },
    data() {
        return {
            characters: []
        };
    },
    async created() {
        this.characters = await api.getUserCharacters();
    },
    methods: {
        navigateSession() {
            this.$router.push({ name: 'findcreatesession' });
        },
        joinSession() {

        }
    }
}
</script>

<style scoped>

</style>