<template>
  <div class="home-view">
    <h1>Join a Session</h1>
    <div class="session-name">
      <label for="session-name">Session name:</label>
      <input type="textbox" v-model="sessionName" placeholder="session name" />
    </div>
    <div class="session-password">
      <label for="session-password">Password:</label>
      <input
        type="password"
        v-model="sessionPassword"
        placeholder="session password"
      />
    </div>
    <button @click="joinSession">Join Session</button>
    <button @click="createSession">Create Session</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      sessionName: '',
      sessionPassword: '',
    };
  },
  async created() {},
  methods: {
    joinSession() {
      console.log(`join session ${this.sessionName}`);
    },
    createSession() {
      console.log(`create session ${this.sessionName}`);
    },
  },
};
</script>

<style></style>
