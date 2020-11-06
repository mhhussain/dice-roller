<template>
    <div class="characters-container">
        <div v-for="(character, index) in characters"
            v-bind:value="character"
            v-bind:item="character"
            v-bind:index="index"
            v-bind:key="index"
            class="character-section"
        >
            <div class="characater-row">
                <div class="character-details">
                    <label for="character-name">{{ character.name }}</label>
                </div>
                <div class="character-rolls-container">
                    <div v-for="(roll, rindex) in rollsForCharacter(character._id)"
                        v-bind:value="roll"
                        v-bind:item="roll"
                        v-bind:index="rindex"
                        v-bind:key="rindex"
                    >
                        <Roll :roll="roll" :controlsVisible="character._id === currentCharacter._id" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import _ from 'lodash';
import Roll from '../components/Roll';

export default {
    name: 'CharacterList',
    props: ['session', 'currentCharacter'],
    components: {
        Roll,
    },
    data: () => ({
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
.characters-container {
  display: flex;
  flex-direction: column;
}

.characater-row {
  display: flex;
  margin-bottom: 15px;
}

.character-details {
  min-width: 150px;
  width: 150px;
  text-align: left;
}

.character-rolls-container {
  display: flex;
  margin-left: 50px;
}
</style>