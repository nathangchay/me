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
</template>

<script>
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  background-color: rgb(40, 40, 40);
  display: flex;
  height: 100%;
  align-items: center;
  flex-direction: column;
  font-family: Rubik, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  text-decoration: none;
  color: rgb(150, 150, 150);
}

#nav a.router-link-exact-active {
  color: white;
  text-decoration: none;
}
</style>
