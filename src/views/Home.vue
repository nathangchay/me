<template>
  <Title />

  <h1>
    about me
  </h1>
  <TitleCard />
</template>

<script>
import Title from '../components/Title.vue';
import TitleCard from '../components/TitleCard.vue'

export default {
  name: 'Home',
  components: {
    Title,
    TitleCard,
  },
};
</script>

<style scoped>
</style>