<template>
  <div class="header-component">
    <h2 class="header-label">Dice Roller</h2>
  </div>
</template>

<script>
export default {
    name: 'Header',
    components: {},
    async created() {},
    methods: {}
}
</script>

<style scoped>
.header-component {
  height: 10vh;
  color: #D8DBE2;
  background-color: #373F51;
  display: flex;
  justify-content: space-between;
  padding-left: 10vw;
  padding-right: 10vw;
}

.header-label {
    align-self: center;
}

.header-btn {
    align-self: center;
}
</style>