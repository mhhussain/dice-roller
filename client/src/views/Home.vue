<template>
  <div class="home-view">
      <h1>HOME</h1>
      <el-button type="success" @click="navigateSession">Find or Create Session</el-button>
  </div>
</template>

<script>
import { Button } from 'element-ui';

export default {
    name: 'Home',
    components: {
        'el-button': Button,
    },
    methods: {
        navigateSession() {
            this.$router.push({ name: 'findcreatesession' });
        }
    }
}
</script>

<style scoped>

</style>