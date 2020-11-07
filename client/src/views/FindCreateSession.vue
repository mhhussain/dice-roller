<template>
    <v-container class="d-flex flex-column align-center">
        <h1>Find or create a session</h1>
        <div>
            <v-text-field label="session name" v-model="session.name" />
        </div>
        <div>
            <v-text-field
                label="password"
                v-model="session.password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                @click:append="show = !show"
            />
        </div>
        <div class="home-btn">
            <v-btn class="mt-8 mb-6" color="primary" @click="onJoinSession">Join Session</v-btn>
        </div>
        <div class="home-btn">
            <v-btn @click="onCreateSession">Create Session</v-btn>
        </div>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'FindCreateSession',
    components: {},
    data() {
        return {
            show: false,
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

            try {
                const session = await this.createSession(data);
                this.$router.push(`/session/${session._id}/character`);
            } catch (e) {
                this.raiseError({ message: 'could not create session' });
            }
        },
    }
}
</script>

<style scoped>
.v-text-field {
    width: 300px;
}

.v-btn {
    width: 300px;
}

</style>