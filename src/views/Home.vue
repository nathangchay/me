<template>
  <Title />
  <TitleCard />
</template>

<script>
import TitleCard from '../components/TitleCard.vue';
import Title from '../components/Title.vue';

export default {
  name: 'Home',
  components: {
    TitleCard,
    Title,
  },
};
</script>

<style>

</style>