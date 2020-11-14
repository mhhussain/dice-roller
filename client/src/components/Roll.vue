<template>
  <el-card class="roll-card" shadow="hover">
    <div slot="header" v-on:click="toggleRollDialog(roll)">
      {{ roll.name }}
    </div>
    <div class="roll-value">
      <i v-if="roll.roll">{{ roll.roll }} / {{ roll.dvalue }}</i>
      <i v-if="!roll.roll">-- / --</i>
    </div>
    <div class="roll-view">
      <el-button
        type="success"
        icon="el-icon-view"
        circle
        v-if="!roll.visible && controlsVisible"
        @click="showRoll(roll._id)"
      ></el-button>
      <el-button
        type="danger"
        icon="el-icon-view"
        circle
        v-if="roll.visible && controlsVisible"
        @click="hideRoll(roll._id)"
      ></el-button>
    </div>
    <div class="roll-delete">
      <i
        class="el-icon-delete"
        v-if="controlsVisible"
        @click="deleteRoll(roll._id)"
      ></i>
    </div>
  </el-card>
</template>

<script>
import { mapActions } from "vuex";
import api from "../api/diceroller";
import { Button, Card } from "element-ui";

export default {
  name: "Roll",
  props: ["roll", "controlsVisible"],
  components: {
    "el-button": Button,
    "el-card": Card,
  },
  data() {
    return {};
  },
  async created() {},
  methods: {
    ...mapActions("rolls", { patchRoll: "patch" }),
    async showRoll(rollId) {
      const roll = {
        visible: true,
      };

      this.patchRoll([rollId, {}, { data: roll }]);
    },
    async hideRoll(rollId) {
      const roll = {
        visible: false,
      };

      this.patchRoll([rollId, {}, { data: roll }]);
    },
    async renameRoll(rollId, name) {
      await api.nameRoll(rollId, name);
      this.$emit("rollUpdated", rollId);
    },
    async deleteRoll(rollId) {
      await api.deleteRoll(rollId);
      this.$emit("rollUpdated", rollId);
    },
  },
};
</script>

<style scoped>
.roll-card {
  margin: 2px;
  width: 300px;
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