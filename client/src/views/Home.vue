<template>
  <v-container class="d-flex flex-column">
    <h1 class="mb-10">Dashboard</h1>
    <v-container class="d-flex flex-column align-end">
      <v-btn color="success" @click="navigateSession">Find or Create Session</v-btn>
    </v-container>
    <v-container class="d-flex flex-column">
      <h3>Characters:</h3>
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
    </v-container>
  </v-container>
</template>

<script>
//import { models } from 'feathers-vuex';
import { mapState, mapActions, mapGetters } from 'vuex';

import { Table, TableColumn } from 'element-ui';

export default {
    name: 'Home',
    components: {
        'el-table': Table,
        'el-table-column': TableColumn,
    },
    async created() {
      this.findChars({
        query: {
          userId: this.user._id
        }
      });
    },
    computed: {
      ...mapGetters('characters', { findCharsInStore: 'find' }),
      ...mapState(['user']),
      characters() {
        return this.findCharsInStore({
          query: {
            userId: this.user._id
          }
        }).data;
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

.character-table {
}
</style>