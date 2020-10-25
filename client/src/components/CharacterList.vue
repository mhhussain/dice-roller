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
                    <div v-for="(roll, rindex) in character.rolls"
                        v-bind:value="roll"
                        v-bind:item="roll"
                        v-bind:index="rindex"
                        v-bind:key="rindex"
                    >
                        <Roll :roll="roll" :controlsVisible="character._id === currentCharacter._id" @rollUpdated="rollUpdated" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Roll from '../components/Roll';

export default {
    name: 'CharacterList',
    props: ['characters', 'currentCharacter'],
    components: {
        Roll,
    },
    async created() {},
    methods: {
        rollUpdated() {
            this.$emit('rollUpdated', null);
        }
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