<template>
    <v-container class="d-flex flex-column">
        <v-card class="mb-4" v-for="(c, index) in characters"
            v-bind:key="index"
        >
            <v-card-title>{{ c.name }}</v-card-title>
            <v-card-text>
                <v-chip-group column >
                    <v-chip>4</v-chip>
                    <v-chip>5</v-chip>
                    <v-chip>6</v-chip>
                </v-chip-group>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import _ from 'lodash';

export default {
    name: 'CharacterList',
    props: ['session', 'currentCharacter'],
    components: {},
    data: () => ({
        selection: 1,
    }),
    async created() {
        await this.findChars({
            query: {
                sessionId: this.session._id,
            }
        });
        
        await this.findRolls({
            query: {
                sessionId: this.session._id,
            }
        });
    },
    computed: {
        ...mapGetters('characters', { findCharsInStore: 'find' }),
        ...mapGetters('rolls', { findRollsInStore: 'find' }),
        rolls() {
            return this.findRollsInStore({
                query: {
                    sessionId: this.session._id,
                }
            }).data;
        },
        characters() {
            return this.findCharsInStore({
                query: {
                    sessionId: this.session._id,
                }
            }).data;
        },
    },
    methods: {
        ...mapActions('characters', { findChars: 'find' }),
        ...mapActions('rolls', { findRolls: 'find' }),
        rollsForCharacter(characterId) {
            return _.filter(this.rolls, (r) => r.characterId === characterId);
        },
    }
}
</script>

<style scoped>

.v-card {
    max-width: 300px;
}
</style>