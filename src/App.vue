<template>
  <div id="nav">
    <router-link to="/">
      home
    </router-link> -
    <router-link to="/projects">
      projects
    </router-link> -
    <router-link to="/contact">
      contact
    </router-link>
  </div>
  <router-view />

  <ColorButton />
</template>

<script>
import ColorButton from './components/ColorButton.vue';

export default {
  name: 'App',
  components: {
    ColorButton,
  }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');
@import './assets/styles/colors.css';

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  background-color: var(--background);
  display: flex;
  height: 100%;
  align-items: center;
  flex-direction: column;
  font-family: Rubik, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--text);
  transition: background-color 300ms ease-in-out, color 300ms ease-in-out;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  text-decoration: none;
  color: var(--text);
  transition: color 300ms ease-in-out;
}

#nav a.router-link-exact-active {
  color: var(--accent2);
  text-decoration: none;
  transition: color 300ms ease-in-out;
}
</style>
