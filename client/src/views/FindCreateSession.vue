<template>
    <div class="session-view">
      <h1>Find or create a session</h1>
      <div class="error" v-if="error">{{ error.message }}</div>
      <div class="session-name">
          <div>
              <el-input type="text" v-model="session.name" placeholder="session name" />
          </div>
      </div>
      <div class="session-password">
          <div>
              <el-input v-model="session.password" placeholder="session password" show-password />
          </div>
      </div>
      <div class="home-btn">
          <el-button type="primary" @click="onJoinSession">Join Session</el-button>
      </div>
      <div class="home-btn">
          <el-button type="success" @click="onCreateSession">Create Session</el-button>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Input, Button } from 'element-ui';

export default {
    name: 'FindCreateSession',
    components: {
        'el-input': Input,
        'el-button': Button,
    },
    data() {
        return {
            error: '',
            session: {
                name: '',
                password: '',
            },
        };
    },
    async created() {},
    methods: {
        ...mapActions('sessions', { findSessions: 'find' }),
        ...mapActions('sessions', { createSession: 'create' }),
        ...mapActions(['raiseError']),
        async onJoinSession() {
            const data = {
                name: this.session.name,
                password: this.session.password,
            };
            const session = await this.findSessions({
                query: data
            });

            if (session.data.length === 0) {
                this.raiseError({ message: 'no session found' });
                // global message
                return;
            }

            this.$router.push(`/session/${session.data[0]._id}/character`);
        },
        async onCreateSession() {
            const data = {
                name: this.session.name,
                password: this.session.password,
                status: 'open',
            };

            const session = await this.createSession(data);

            this.$router.push(`/session/${session._id}/character`);
        },
    }
}
</script>

<style scoped>
.home-view {
    display: flex;
    flex-direction: column;
}

.el-input {
    min-width: 250px;
    width: 25vw;
    margin: 5px;
}

.el-button {
    min-width: 250px;
    width: 25vw;
    margin: 5px;
}
</style>