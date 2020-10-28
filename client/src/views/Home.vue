<template>
  <div class="home-view">
      <h1>HOME</h1>
      <el-button type="success" @click="navigateSession">Find or Create Session</el-button>
      <h2>Characters:</h2>
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
//import { models } from 'feathers-vuex';
import { mapActions, mapGetters } from 'vuex';

import { Button, Table, TableColumn } from 'element-ui';

export default {
    name: 'Home',
    components: {
        'el-button': Button,
        'el-table': Table,
        'el-table-column': TableColumn,
    },
    async created() {
      this.findChars({ query: {} });
    },
    computed: {
      ...mapGetters('characters', { findCharsInStore: 'find' }),
      characters() {
        return this.findCharsInStore().data;
      }
    },
    methods: {
      ...mapActions('characters', { findChars: 'find' }),
      navigateSession() {
        this.$router.push({ name: 'findcreatesession' });
      },
      joinSession(r) {
        const { _id: characterId, sessionId } = r;
        this.$router.push(`/session/${sessionId}/character/${characterId}`);
      }
    }
}
</script>

<style scoped>
.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 25vw;
  padding-right: 25vw;
}

.character-table {
  width: 50vw;
}
</style>