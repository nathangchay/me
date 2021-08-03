<template>
  <TitleCard />
</template>

<script>
import TitleCard from './components/TitleCard.vue';
//

export default {
  name: 'App',
  components: {
    TitleCard,
  },
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inconsolata&display=swap');

  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  #app {
    background-color: rgb(40, 40, 40);
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: Inconsolata, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #fff;
  }
</style>
